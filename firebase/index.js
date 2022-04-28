
var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://e-commerce-22769-default-rtdb.firebaseio.com"
});

module.exports = admin;
