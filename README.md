# Chrome Extension: JIRA issue tools
A Chrome extension with some tools regarding JIRA issues, e.g. branch name, first commit message, migration file name...

## Setup
* Clone the project locally
* Open "Google Chrome" settings menu > More Tools > Extensions
* Click on "Load unpacked" button and specify the folder of the just cloned extension

## Pre requisite
This extension only works if the current page url match the following patterns
* https://jira.rocket-internet.de/browse/TML-*
* https://jira.rocket-internet.de/browse/TMLSD-*

## Example
Imagine to open issue "**TML-24974**" and the title is "**QC. The Price Section.2**", by clicking on the Extension icon you will get:


Field                    | Value
------------------------ | -----------------------------------
**First commit message** | TML-24974 - QC. The Price Section.2
**Branch name**          | TML-24974-qc.-the-price-section.2
**Migration file**       | 20180425_1713_TML-24974.sql


