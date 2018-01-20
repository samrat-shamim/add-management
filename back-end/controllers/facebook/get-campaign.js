var utilities = require('../../services/utilities');
var fbCampaigner = require('../../services/fb-campaigner');
module.exports = function(app, route) {
    return function(req, res, next) {
        var campaignId = req.params.id || req.body.id;
        var limit = req.body.limit || 10;
        fbCampaigner.getCampaign(campaignId, limit).then(function (campaigns) {
            if(!Array.isArray(campaigns)){
                campaigns = [campaigns];
            }
            var result = campaigns.map(function (cam) {
                return {
                    name: cam._data.name,
                    id: cam._data.id,
                    objective: cam._data.objective
                }
            })
            utilities.sendSuccess(res, result, "Campaign(s)", next);
        }, function (error) {
            utilities.sendError(res, error, "Failed to get campaign(s)", next);
        })
    };
};

/*
 request url: '/ads/facebook/campaigns/:id?'
 sample body: {
 id: 'campaign_id',
 limit: 10
 }
 ***if nothing is provided all campaigns of the associated account will be provided
 */