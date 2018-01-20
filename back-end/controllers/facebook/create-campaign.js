var utilities = require('../../services/utilities');
var fbCampaigner = require('../../services/fb-campaigner');
module.exports = function(app, route) {
    return function(req, res, next) {
        var campaign  = {
            name: req.params.name || "Test campaign"
        }
        fbCampaigner.createCampaign(campaign).then(function (campaign) {
            utilities.sendSuccess(res, campaign, "Campaign created", next);
        }, function (error) {
            utilities.sendError(res, error, "Failed to create campaign", next);
        })
    };
};