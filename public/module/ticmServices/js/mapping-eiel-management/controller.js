/**
 * ticmServices - mapping
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */

function ticmServices_mappingGetAssets() {

    var apiURL = `/api/ticmServices/mapping/assets`;
    $.ajax({
        type: "GET",
        url: apiURL

    }).done(function (response) {
        if (response.status && response.size > 0) {
            ticmServices_print_mappingGetAssets(response.data);
        } else {
            doNotify("error", response.status, response.message);
        }
    });

};

function ticmServices_mappingSetAssets(data) {

    var apiURL = `/api/ticmServices/mapping/asset/upload`;
    $.ajax({
        type: "POST",
        url: apiURL,
        data: data,
        enctype: "multipart/form-data",
        contentType: false,
        processData: false,
        cache: false

    }).done(function (response) {

        if (response.status) {
            ticmServices_mappingGetAssets();
        } else {
            doNotify("error", response.status, response.message);
        }
    });

};


function ticmServices_getMappingAsset(data) {

    var apiURL = `/api/ticmServices/asset`;
    $.ajax({
        type: "GET",
        url: apiURL,
        data: {
            file: data
        }
    }).done(function (response) {
        if (response !== {}) {
            var blob = new Blob([response]);
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "<FILENAME_TO_SAVE_WITH_EXTENSION>";
            link.click();
        }

    });

};


