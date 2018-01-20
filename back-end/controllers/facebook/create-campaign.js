var utilities = require('../../services/utilities');
var fbCampaigner = require('../../services/fb-campaigner');
module.exports = function(app, route) {
    return function(req, res, next) {
        var campaign  = {
            name: req.params.name || req.body.name,
            objective: req.body.objective
        }
        if(validateCampaignPayload(campaign)){
            fbCampaigner.createCampaign(campaign).then(function (campaign) {
                utilities.sendSuccess(res, campaign, "Campaign created", next);
            }, function (error) {
                utilities.sendError(res, error, "Failed to create campaign", next);
            })
        } else {
            utilities.sendError(res, "Invalid payload", "Please supply a valid payload", next);
        }

        function validateCampaignPayload(campaign) {
            if(campaign.name){
                return true;
            }else {
                return false;
            }
        }
    };
};

/*
request url: '/ads/facebook/campaigns/create-new/:name?'
sample body: {
name: "Name of the campaign",
objective: "PRODUCT_CATALOG_SALES"
}
*/