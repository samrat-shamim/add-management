/**
 * Created by Shamim on 1/20/2018.
 */

let config = require("../config");
let Q = require('q');

const adsSdk = require('facebook-nodejs-ads-sdk');
const Ad = adsSdk.Ad;
const AdAccount = adsSdk.AdAccount;
const Business = adsSdk.Business;
const Campaign = adsSdk.Campaign;
const accountId = 'act_' + config.facebook.account_id;
const accessToken = config.facebook.access_token;
const bussinessId = config.facebook.business_id;
const campaignId ="120330000020702103";
const api = adsSdk.FacebookAdsApi.init(accessToken);
const account = new AdAccount(accountId);
const showDebugingInfo = false;
if (showDebugingInfo) {
    api.setDebug(true);
}

const errorFunction = function (scenarioName) {
    var returnFunction = function (error) {
        console.log('An error occurred while processing, ' + scenarioName);
        console.log('Error Message:' + error);
        console.log('Error Stack:' + error.stack);
    };
    return returnFunction;
};

const logPassedTest = function (testName, data) {
    console.log(testName);
    if (showDebugingInfo) {
        console.log('Data:' + JSON.stringify(data));
    }
}

let test7 = 'CRUD Campaign';
let campaignIdToDelete;

function createCampaign(camp) {
    var defered = Q.defer();
    account
        .createCampaign(
            [Campaign.Fields.status],
            {
                [Campaign.Fields.name]: camp.name,
                [Campaign.Fields.status]: Campaign.Status.paused,
                [Campaign.Fields.objective]: Campaign.Objective.page_likes
            }
        )
        .then(function (campaign) {
            logPassedTest(test7 + '-Create:Pass', campaign);
            campaignIdToDelete = campaign.id;
            return new Campaign(campaign.id)
                .read([Campaign.Fields.id, Campaign.Fields.name, Campaign.Fields.objective]).then(function (campaign) {
                    defered.resolve(campaign);
                });
        })

    return defered.promise;
}

function getCampaign(campaignId) {
    let deferred = Q.defer();
    if(campaignId){
        let campaign = new Campaign(campaignId);
        campaign.read([Campaign.Fields.id, Campaign.Fields.name, Campaign.Fields.objective]).then(function (camp) {
            deferred.resolve(camp);
        }, function (err) {
            deferred.reject(err);
        })
    } else {
        const campaignFields =[Campaign.Fields.id, Campaign.Fields.name, Campaign.Fields.objective];
        account.getCampaigns(campaignFields, { limit: 5 })
            .then(function(campaigns) {
                deferred.resolve(campaigns);
            }, function (err) {
                deferred.reject(err);
            })

    }
    return deferred.promise;
}

module.exports = {
    createCampaign : createCampaign,
    getCampaign:getCampaign
}

