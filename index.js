require('dotenv').config();

var https = require("https");
const vision = require('@google-cloud/vision');

let GCP_CLIENT = null; // Lazy Initialzation
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.handle = (req, res) => {

  var url = req.body.url;
  if (url == null) res.end("Bad request");

  // async function handleRequest(req, res, url) {
  console.log("URL : " + url);

  // Initialize the GCP Client if necessary
  let client = getGCPClient();

  // Download the FIle instead of asking Vision API to do it 
  var request = https.get(url, function (response) {
    var buffer = Buffer.alloc(0);

    // Download in progress
    response.on('data', (d) => {
      buffer = Buffer.concat([buffer, Buffer.from(d, "binary")]);
    });

    // Download Completed
    response.on('end', async () => {
      console.log(`Download completed ${buffer.length}`);

      // Trigger Google Cloud Client Detect 
      var [results] = await client.textDetection(buffer);

      // Handle the Vision Detection Result
      let annotation = results.fullTextAnnotation;
      let response = null;
      if (results.error != null) {
        response = {
          code: results.error.code.toString(),
          message: results.error.message
        };
      } else {
        response = {
          code: "000",
          message: annotation.text.replace(/(\r\n|\n|\r)/gm, " "),
          raw: annotation
        }
      }
      
      // Send Response
      res.status(200).send(JSON.stringify(response));

    });

  }).on('error', function (err) { // Handle errors
    console.log(err)
    res.end(`Unknown error :  ${err}`);
  });
}

function getGCPClient() {
  if (GCP_CLIENT == null) {
    console.log("=============================================================");
    console.log("Google Application Credentials : " + process.env.GOOGLE_APPLICATION_CREDENTIALS);
    GCP_CLIENT = new vision.ImageAnnotatorClient();
    console.log("=============================================================");
  }
  return GCP_CLIENT;
}