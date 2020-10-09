const express = require("express");
const router = express.Router();
const { db } = require("../src/database");
const config = require("../config/config");

router.post("/login", async (req, res, next) => {
  //verify req
  let user = req.body;
  if (!user) {
    res.status(400).send({
      message: "GAuth Info can not be empty",
    });
    return;
  }

  //verify user with gauth-library
  const { OAuth2Client } = require("google-auth-library");
  const client = new OAuth2Client(
    "133839807075-cu5qaq7jn6bn9u23017752n4kmmbk7vu.apps.googleusercontent.com"
  );
  const ticket = await client.verifyIdToken({
    idToken: user.token,
    audience:
      "133839807075-cu5qaq7jn6bn9u23017752n4kmmbk7vu.apps.googleusercontent.com",
  });
  const payload = ticket.getPayload();
  console.log("Google Payload is " + JSON.stringify(payload));
  const userid = payload["sub"];
  let email = payload["email"];
  let emailVerified = payload["email_verified"];
  let name = payload["name"];
  let pictureUrl = payload["picture"];

  // let user = {};
  let token = null;

  //find user by email
  let sql = "SELECT * FROM user WHERE user_email = ?;";
  try {
    await db.query(sql, [user.email], function (err, result) {
      if (err) {
        res.status(500);
        res.send(err);
      } else {
        //set token here
        res.json(result);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }

  //create new token for our database
  //create session

  res.end();
});

router.post("/logout", (req, res, next) => {
  //delete session
  //delete token from database
  res.json(req.body);
});

module.exports = {
  authRouter: router,
};
