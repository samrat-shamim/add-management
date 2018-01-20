var mongoose = require('mongoose');
var Q = require('q');

module.exports = {
    sendError: sendError,
    sendSuccess: sendSuccess,
    insertDoc: insertDoc,
    getMany: getMany,
    getById: getById,
    deleteById: deleteById,
    bigNumber: 9999999999999,
    keyValueToArray: keyValueToArray,
    productionGhors: ["autoghor", "fittinghor", "colorghor"]
}

function keyValueToArray(keyValue) {
    var array = [];
    for(var key in keyValue){
        array.push(keyValue[key]);
    }
     return array;
}

function deleteById(entityName, entityId) {
    var deferred = Q.defer();
    var model = getModel(entityName);
    model.findByIdAndRemove({_id: entityId}, function (err, doc) {
        if (!err) {
            deferred.resolve(doc);
        } else {
            deferred.reject(err);
        }
    });
    return deferred.promise;
}

function getById(entityName, entityId) {
    var deferred = Q.defer();
    var model = getModel(entityName)
    model.findById({_id: entityId}, function (err, doc) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }
    });
    return deferred.promise;
}

function getMany(entityName, query, sort, pageNumber, pageSize) {
    var model = getModel(entityName);
    var defered = Q.defer();
    model.find(query, null, {sort: sort || {}}, function (err, documents) {
        if (err) {
            defered.reject(err);
        } else {
            defered.resolve(buildGetManyResponse(pageNumber, pageSize, documents));
        }
    });

    return defered.promise;

};

function buildGetManyResponse(pageNumber, pageSize, documents) {
    var totalCount = documents.length;
    var totalPage = Math.ceil(totalCount / pageSize);
    var response = {
        totalCount: totalCount,
        pageNumber: pageNumber,
        pageSize: pageSize,
        data: documents.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
        success: true
    }
    return response;
}

function sendError(res, err, message, next) {
    res.send({
        success: false,
        msg: message,
        err: err
    });
    next();
}

function sendSuccess(res, data, msg, next) {
    res.send({
        success: true,
        data: data,
        msg: msg
    });
    next();
}

function getModel(entityName) {
    var schema = models[entityName];
    if (!schema) {
        throw "Invalid entity name " + entityName;
    }
    return mongoose.model(entityName, schema);

}


function insertDoc(entityName, entity, req) {
    var deferred = Q.defer();
    var createdById = req.decoded._doc._id;
    entity.createdById = createdById;
    var model = getModel(entityName);
    var document = new model(entity);
    document.save(function (err, doc) {
        if (err) {
            deferred.reject(err);
        } else {
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}