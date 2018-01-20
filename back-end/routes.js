module.exports = {
    '/ads/facebook/campaigns/create-new/:name': require('./controllers/facebook/create-campaign'),
    '/ads/facebook/campaigns/:id?': require('./controllers/facebook/get-campaign')
};
