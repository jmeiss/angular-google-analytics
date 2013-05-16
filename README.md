# angular-google-analytics

A simple service that let you integrate google analytics tracker in your AngularJS applications.

Proudly brought to you by the [@revolunet](http://twitter.com/revolunet) team.

## features

 - configurable
 - automatic page tracking
 - events tracking

## example

```js
var app = angular.module('app', ['google-analytics'])
  .config(function(AnalyticsProvider, function() {
    // initial configuration
    AnalyticsProvider.setAccount('UA-XXXXX-xx');
    
    // Set DomainName to 'none' if you want to track localhost events, unless comment this line
    AnalyticsProvider.setDomainName('none');

    // track all routes (or not)
    AnalyticsProvider.trackPages(true);
  }))
  .controller('SampleController', function(Analytics) {
    // create a new pageview event
    Analytics.trackPage('/video/detail/XXX');

    // create a new tracking event
    Analytics.trackEvent('video', 'play', 'django.mp4');
  })
  // Inject Analytics Provider in you main controller to turn on tracking
  .controller('MainCtrl', function (Analytics) { }
```

## configuration

```js
// setup your account
AnalyticsProvider.setAccount('UA-XXXXX-xx');
// automatic route tracking (default=true)
AnalyticsProvider.trackPages(false);

// Inject Analytics Provider in you main controller to turn on tracking
angular.module('app', ['angular-google-analytics'])
    .controller('MainCtrl', function (Analytics) { }
```

## Licence
As AngularJS itself, this module is released under the permissive [MIT license](http://revolunet.mit-license.org). Your contributions are always welcome.
