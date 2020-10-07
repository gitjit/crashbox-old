#!/bin/bash

functionAppName=crashboxFn
resourceGroupName=crashbox-rg
storageName=crashbox

#slotName=stage

 az functionapp config appsettings set -n $functionAppName -g $resourceGroupName \
 --settings "@settings.json"

