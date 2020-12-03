/**
 * ticmServices - mapping
 * Copyright(c) 2020 Alejandro Villén
 * MIT Licensed
 */


document.addEventListener('DOMContentLoaded', function () {
    // List user files
    ticmServices_mappingGetAssets();


    $("#uploadFileForm").click(function () {

        var file = $("#fileForm")[0].files[0];
        var form = new FormData();
        form.append("media", file);
        form.append("title", $("input[name=title]").val().toString());
        form.append("description", $("input[name=description]").val().toString());

        ticmServices_mappingSetAssets(form);
    });
});


