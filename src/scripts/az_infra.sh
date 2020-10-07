#!/bin/bash

# Function app and storage account names must be unique.
storageName=crashbox
functionAppName=crashboxFn
region=westus
resourceGroupName=crashbox-rg

# Create a resource group.
if !($(az group exists -g $resourceGroupName)) then
    echo "---> Creating the Resourcegroup: " $resourceGroupName
    az group create --name $resourceGroupName --location $region
else 
    echo "---> Resourcegroup:" $resourceGroupName "already exists"

# Create an Azure storage account in the resource group.
az storage account create \
  --name $storageName \
  --location $region \
  --resource-group $resourceGroupName \
  --sku Standard_LRS

# Create a serverless function app in the resource group.
az functionapp create \
  --name $functionAppName \
  --storage-account $storageName \
  --consumption-plan-location $region \
  --resource-group $resourceGroupName  \
  --functions-version 3
  

