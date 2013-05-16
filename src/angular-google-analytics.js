/* global angular */

'use strict';

angular.module('google-analytics', [])
  .provider('Analytics', function () {
    // config methods
    this.setAccount = function(accountId) {
      this.accountId = accountId;
      return true;
    };
    this.trackPages = function(shouldTrackPages) {
      this.shouldTrackPages = shouldTrackPages;
      return true;
    };

    this.$get = ['$document', '$rootScope', '$location', '$window', function($document, $rootScope, $location, $window) {
      var accountId = this.accountId,
          shouldTrackPages = this.shouldTrackPages;

      // private methods
      function _createScriptTag() {
        // inject the google analytics tag
        if (!accountId) {
          return;
        }

        var document  = $document[0];
        var ga        = document.createElement('script');
        var s         = document.getElementsByTagName('script')[0];
        
        $window._gaq = [];
        $window._gaq.push(['_setAccount', accountId]);

        if (shouldTrackPages) {
          $window._gaq.push(['_trackPageview']);
        }

        ga.type   = 'text/javascript';
        ga.async  = true;
        ga.src    = ('https:' === document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        s.parentNode.insertBefore(ga, s);
      }

      this._trackPage = function(url) {
        if (shouldTrackPages && $window._gaq) {
          $window._gaq.push(['_trackPageview', url]);
        }
      };

      this._trackEvent = function(category, action, label, value) {
        if ($window._gaq) {
          $window._gaq.push(['_trackEvent', category, action, label, value]);
        }
      };

      // creates the ganalytics tracker
      _createScriptTag();

      var me = this;

      // activates page tracking
      if (shouldTrackPages) {
        $rootScope.$on('$viewContentLoaded', function(scope, current, previous) {
          me._trackPage($location.path());
        });
      }

      return {
        trackPage: function(url) {
          // add a page event
          me._trackPage(url);
        },
        trackEvent: function(category, action, label, value) {
          // add an action event
          me._trackEvent(category, action, label, value);
        }
      };
    }];
  })
