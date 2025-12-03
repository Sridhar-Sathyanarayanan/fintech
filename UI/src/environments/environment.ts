// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://localhost:3010',
  apiEndpoints: {
    feedback: '/feedback/sendMail',
    market: '/api/market'
  },
  seo: {
    domain: 'http://localhost:4200',
    ogImage: 'http://localhost:4200/assets/images/og-tax-calculator.jpg',
    twitterImage: 'http://localhost:4200/assets/images/twitter-tax-card.jpg'
  },
  marketPolling: {
    openInterval: 60000,
    closedInterval: 300000
  },
  adsense: {
    enabled: false, // Disable ads in development
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your AdSense publisher ID
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
