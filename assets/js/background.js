// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        // With a new rule ...
        chrome.declarativeContent.onPageChanged.addRules([
            {
                // That fires when a page's URL contains a 'https://jira.rocket-internet.de/browse/TML' ...
                conditions: [
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://jira.rocket-internet.de/browse/TML-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://jira.rocket-internet.de/browse/TMLSD-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://jira.rocket-internet.de/browse/TMLRSIN-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://jira.rocket-internet.de/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TML-'
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://jira.rocket-internet.de/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TMLSD-'
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://jira.rocket-internet.de/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TMLRSIN-'
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://gfgroup.atlassian.net/browse/TML-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://gfgroup.atlassian.net/browse/TMLSD-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {urlContains: 'https://gfgroup.atlassian.net/browse/TMLRSIN-'},
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://gfgroup.atlassian.net/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TML-'
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://gfgroup.atlassian.net/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TMLSD-'
                        }
                    }),
                    new chrome.declarativeContent.PageStateMatcher({
                        pageUrl: {
                            urlContains: 'https://gfgroup.atlassian.net/secure/RapidBoard',
                            queryContains: 'view=detail&selectedIssue=TMLRSIN-'
                        }
                    })
                ],
                // And shows the extension's page action.
                actions: [new chrome.declarativeContent.ShowPageAction()]
            }
        ]);
    });
});