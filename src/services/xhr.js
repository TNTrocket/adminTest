import $ from "jquery"

let path="/ocm-analysis/";

function ajaxSetUp(opition,successCallback,errorCallback) {
    opition.headers=opition.headers || {Accept:"application/json"}
    opition.contentType = opition.contentType || 'application/json';
    opition.type=opition.type || "POST"
    opition.url=path+opition.url
    $.ajax(opition).done(function (data, textStatus, jqXHR) {
        (successCallback || $.noop)(data);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        if(typeof errorCallback=="function") {
            errorCallback(jqXHR, textStatus, errorThrown);
        }
    })
}

export default function callApi(opitions) {
    let deferred = $.Deferred();
    ajaxSetUp(opitions,function (data) {
        deferred.resolve(data);
    },function (jqXHR, textStatus, errorThrown) {
        deferred.reject(textStatus);
    });
    return deferred.promise();
}

