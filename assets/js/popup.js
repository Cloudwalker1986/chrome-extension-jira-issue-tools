function leadingZero(aNumber) {
    if (aNumber < 10) {
        return '0' + '' + aNumber;
    } else {
        return aNumber;
    }
}

function getMigrationNameByPageTitle(pageTitle) {
    var migrationFile = "#DATE#_#TIME#_#TML#.sql";

    var now = new Date();
    var currentMonth = leadingZero(now.getMonth() + 1);
    var currentDay = leadingZero(now.getDate());
    var currentHours = leadingZero(now.getHours());
    var currentMinutes = leadingZero(now.getMinutes());

    migrationFile = migrationFile.replace('#DATE#', now.getFullYear() + "" + currentMonth + "" + currentDay)
        .replace('#TIME#', currentHours + "" + currentMinutes)
        .replace('#TML#', pageTitle.match(/\[(.*?)\]/)[1]);

    return migrationFile;
}

function getFirstCommitMessageByPageTitle(pageTitle) {
    return pageTitle.replace(" - JIRA", "")
        .replace("[", "")
        .replace("]", " -");
}

function getBranchNameByPageTitle(pageTitle) {
    return pageTitle.replace(" - JIRA", "")
        .replace(/'/g, "")
        .replace(/&/g, "and")
        .replace(/\[/g, "")
        .replace(/\]/g, "")
        .replace(/`/g, "")
        .replace(/:/g, "")
        .replace(/"/g, "")
        .replace(/\*/g, "")
        .replace(/ /g, "-")
        .replace(/---/g, "-")
        .replace(/\//g, "-")
        .toLowerCase()
        .replace("tmlrsin", "TMLRSIN")
        .replace("tmlsd", "TMLSD")
        .replace("tml", "TML");
}

function getPageTitleByRequest(request) {
    var rs = request.source.match(/<title>(.*?TML(SD|RSIN)?-\d+.*?)<\/title>/);

    if (rs) {
        return $('<div/>').html(rs[1]).text();
    }

    // Board!
    var ticket = $('<div/>').html(request.source).find('.ghx-selected');

    return '[' + ticket.data('issueKey') + '] ' + $('.ghx-summary', ticket).text();
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    if (request.action == "getSource") {
        new ClipboardJS('.btn');

        var pageTitle = getPageTitleByRequest(request);

        jQuery('#firstCommitMessage').val(
            getFirstCommitMessageByPageTitle(pageTitle)
        );

        jQuery('#branchName').val(
            getBranchNameByPageTitle(pageTitle)
        );

        jQuery('#migrationFile').val(
            getMigrationNameByPageTitle(pageTitle)
        );
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