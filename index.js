require('dotenv').config();

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

  let client = getGCPClient();
  setTimeout(quickstart, 1000, req, res, url);
};

async function quickstart(req, res, url) {
  console.log("URL : " + url);

  // Initialize the GCP Client if necessary
  let client = getGCPClient();

  // Prepare the Image Object (Undocument in nodejs client but define in AbstractImageAnnotation)
  var imageObject = {
    image: {
      source: {
        imageUri: url
      }
    }
  }

  // Trigger Google Cloud Client Detect 
  var [results] = await client.textDetection(imageObject);

  // Handle the Result
  let annotation = results.fullTextAnnotation;
  let response = null;
  if (annotation == null)
  {
    response = { code : "099", message :"URL do not contains any text" };
  }
  else{
    response = {
      code : "000",
      message : annotation.text.replace(/(\r\n|\n|\r)/gm, " "),
      raw : annotation
    }
  }
  
  // Send Response
  res.status(200).send(JSON.stringify(response));
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