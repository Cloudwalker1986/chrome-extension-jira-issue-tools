function leadingZero(aNumber) {
    if (aNumber < 10) {
        return '0' + '' + aNumber;
    } else {
        return aNumber;
    }
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        new ClipboardJS('.btn');

        var page = jQuery(request.source);
        var pageTitle = request.source.match(/<title>(.*?)<\/title>/)[1];
        pageTitle = $('<div/>').html(pageTitle).text();

        var firstCommitMessage = pageTitle.replace(" - JIRA", "")
            .replace("[", "")
            .replace("]", " -");

        jQuery('#firstCommitMessage').val(firstCommitMessage);

        var branchName = pageTitle.replace(" - JIRA", "")
            .replace(/'/g, "")
            .replace(/&/g, "and")
            .replace(/\[/g, "")
            .replace(/\]/g, "")
            .replace(/:/g, "")
            .replace(/"/g, "")
            .replace(/ /g, "-")
            .replace(/---/g, "-")
            .replace(/\//g, "-")
            .toLowerCase()
            .replace("tmlsd", "TMLSD")
            .replace("tml", "TML");

        jQuery('#branchName').val(branchName);

        var migrationFile = "#DATE#_#TIME#_#TML#.sql";

        var now = new Date();
        var currentMonth = leadingZero(now.getMonth() + 1);
        var currentDay = leadingZero(now.getDate());
        var currentHours = leadingZero(now.getHours());
        var currentMinutes = leadingZero(now.getMinutes());

        migrationFile = migrationFile.replace('#DATE#', now.getFullYear() + "" + currentMonth + "" + currentDay)
            .replace('#TIME#', currentHours + "" + currentMinutes)
            .replace('#TML#', pageTitle.match(/\[(.*?)\]/)[1]);

        jQuery('#migrationFile').val(migrationFile);
    }
});

function onWindowLoad() {

    chrome.tabs.executeScript(null, {
        file: "assets/js/getPagesSource.js"
    }, function() {
        if (chrome.runtime.lastError) {
            jQuery('#alert').html('<strong>Error: </strong>' + chrome.runtime.lastError.message)
                .show();
        }
    });

}

window.onload = onWindowLoad;