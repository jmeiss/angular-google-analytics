/* global module, angular, console, describe, expect, it, before, beforeEach, inject, spyOn, AnalyticsProvider */

'use strict';

describe('google-analytics', function(){

    beforeEach(module('google-analytics'));
    beforeEach(module(function(AnalyticsProvider) {
      AnalyticsProvider.setAccount('UA-XXXXXX-xx');
    }));

   describe('automatic trackPages', function() {

      it('should inject the GA script', function() {
        inject(function(Analytics) {
          expect(document.querySelectorAll("script[src='http://www.google-analytics.com/ga.js']").length).toBe(1);
        });
      });

      it('should generate pageTracks', function() {
        inject(function(Analytics) {
          expect(Analytics._logs.length).toBe(0);
          Analytics.trackPage('test');
          expect(Analytics._logs.length).toBe(1);
          Analytics.trackEvent('test');
          expect(Analytics._logs.length).toBe(2);
        });
      });

      it('should generate an trackpage to viewContentLoaded', function() {
        inject(function(Analytics, $rootScope) {
          $rootScope.$broadcast('$viewContentLoaded');
          expect(Analytics._logs.length).toBe(1);
        });
      });
  });

  describe('NOT automatic trackPages', function() {
    beforeEach(module(function(AnalyticsProvider) {
      AnalyticsProvider.trackPages(false);
    }));

    it('should NOT generate an trackpage to viewContentLoaded', function() {
      inject(function(Analytics, $rootScope) {
        $rootScope.$broadcast('$viewContentLoaded');
        expect(Analytics._logs.length).toBe(0);
      });
    });
  });

});

