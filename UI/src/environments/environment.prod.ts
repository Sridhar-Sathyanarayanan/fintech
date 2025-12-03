export const environment = {
  production: true,
  apiURL: 'https://api.amkrtech.com',
  apiEndpoints: {
    feedback: '/feedback/sendMail',
    market: '/api/market'
  },
  seo: {
    domain: 'https://amkrtech.com',
    ogImage: 'https://amkrtech.com/assets/images/og-tax-calculator.jpg',
    twitterImage: 'https://amkrtech.com/assets/images/twitter-tax-card.jpg'
  },
  marketPolling: {
    openInterval: 60000,
    closedInterval: 300000
  },
  adsense: {
    enabled: true, // Enable ads in production
    publisherId: 'ca-pub-XXXXXXXXXXXXXXXX' // Replace with your AdSense publisher ID
  }
};
