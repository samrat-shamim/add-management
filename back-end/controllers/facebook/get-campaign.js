var utilities = require('../../services/utilities');
var fbCampaigner = require('../../services/fb-campaigner');
module.exports = function(app, route) {
    return function(req, res, next) {
        var campaignId = req.params.id;
        fbCampaigner.getCampaign(campaignId).then(function (campaigns) {
            var result = campaigns.map(function (cam) {
                console.log(cam._data.name);
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