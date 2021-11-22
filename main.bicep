resource storageaccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: 'notepublisher'
  location: resourceGroup().location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
}

resource logicApp 'Microsoft.Logic/workflows@2019-05-01' = {
  name: 'UploadNote'
  location: resourceGroup().location
  properties: {
    definition: {
      '$schema': 'https://schema.management.azure.com/schemas/2016-06-01/Microsoft.Logic.json'
      contentVersion: '1.0.0.0'
    }
  }
}
  