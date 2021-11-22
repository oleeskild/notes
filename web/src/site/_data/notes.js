require('dotenv').config();
const { BlobServiceClient } = require('@azure/storage-blob');
const connectionString = process.env.BLOB_SERVICE_CONNECTION_STRING
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);

const md = require('markdown-it')({
  html: true,
  highlight: function (str, lang) {

    if (lang && lang=="mermaid") {
      return '<pre class="mermaid">' +
               str +               
               '</pre>';
      }      
      return '';
    }

});

module.exports = async function () {
    let noteList = [];
    let containerName = "notes"
    const containerClient = blobServiceClient.getContainerClient(containerName);
    for await (const blob of containerClient.listBlobsFlat()) {

        let blobClient = containerClient.getBlobClient(blob.name);
        const blobResponse = await blobClient.download(0);
        let markdownContent = await streamToString(blobResponse.readableStreamBody);
        noteList.push({title: blob.name.replace(".md", ""), content: md.render(markdownContent)});
    }

    return noteList;
};

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on("data", (data) => {
      chunks.push(data.toString());
    });
    readableStream.on("end", () => {
      resolve(chunks.join(""));
    });
    readableStream.on("error", reject);
  });
}