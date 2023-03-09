"use strict";

// ----------------------------------------------------- //
//  routes/index.js
// ----------------------------------------------------- //

const express = require("express");
const fs = require("fs");
const moment = require("moment-timezone");
const router = express.Router();

// == Routes/Start =========================================

// la base ...
router.get("/", function (req, res) {
  res.render("index.html", {
    title: "Glitch:node-july",
    donnee: "Donnée DATA",
  });
});

router.get("/app-ai", function (req, res) {
  res.render("openai.html");
});

require("dotenv").config();

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;
  console.log(prompt) // ✅
  try {
    if (prompt == null) {
      throw new Error("Uh oh, no prompt was provided");
    }
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
    });
    //console.log(response.data);
    const completion = response.data.choices[0].text;
    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error) {
    console.log(error.message);
  }
});

/*
curl -X POST \
  https://speech-development-tools.glitch.me/ask \
  -H 'Content-Type: application/json' \
  -d '{ "prompt": "Hi! This is a test prompt!" }'
  
{
    "success": true,
    "message": "\n\nHello! It looks like you have a test prompt here. What kind"
}  
  */

/* -----------------------------------------------------------
  document.getElementById("myFrame0").src = 
    "https://speech-development-tools.glitch.me/my-api/app-1";
   ----------------------------------------------------------- */

router.get("/my-api/app-1", function (req, res) {
  res.render("app1.html");
});

router.get("/my-api/app-2", function (req, res) {
  res.render("app2.html");
});

function formatCurrentTime() {
  return moment().utcOffset(120).format("LLLL");
}

/* ------------------------------------------- */

router.get("/cal", (req, res) => {
  res.render("calendar.html");
});

router.get("/bot", (req, res) => {
  res.render("bot.html");
});

/*    MAKE          */

// ✅
async function scaryClown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🤡");
    }, 1500);
  });
}

//
router.get("/my-openai-api/", async (req, res) => {
  console.log("GET::body :", req.body);
  console.log("GET::query :", req.query);
  console.log("====1====================================");
  res.send(await scaryClown());
});

/***********************************
 *  POST json 2022 ✔
 ***********************************/
router.post("/api/i_think_of_you/v1/", function (req, res, next) {
  console.log("POST::I_think_of_you::body :", req.body);
  console.log("POST::I_think_of_you::query :", req.query);
  console.log("====2====================================");
  res.send("Ok");
});

//  .post("https://speech-development-tools.glitch.me/api/v1/"
router.post("/api/v1/", function (req, res, next) {
  console.log("POST::I_think_of_you::body :", req.body);
  console.log("POST::I_think_of_you::query :", req.query);
  console.log("====3====================================");
  res.send("Ok");
});

var data = {
      name: "Akashdeep",
      hobbies: ["vide", "vide", "vide"],
    };

// 18.12.2022
router.post("/api/v1/make/", function (req, res, next) {
  console.log("POST::I_think_of_you::query :", req.query);
  console.log("====4====================================");
  if (req.query['MAKE-2'] == "Web Speech API Demo chrome") {
    data = {
      name: "Akashdeep",
      hobbies: ["playing football", "playing chess", "cycling"],
    };
  } else {
    data = {
      name: "Akashdeep",
      hobbies: ["playing flute", "playing foot", "tennis"],
    };
  }
  console.log(data);
  res.send("Ok");
});

router.get("/api/v1/makeX/", function (req, res, next) {
  console.log("POST::I_think_of_you::query :", req.query);
  console.log("====4.2====================================");
  console.log(data);

  res.render("calendar_display.html", { data: data });
});

/*
Call from https://pipedream.com/@Philippe-AD/demarrage-rapide-p_2gCwebj/build
*/

router.post("/CHATGPT/V1/", function (req, res) {
  console.log("====< 5====================================");
  //console.log("POST::I_think_of_you::query :", req.query);
  console.log("POST::I_think_of_you::body :", req.body);
  console.log("====> 5====================================");
  /*var x = req.body;
  console.log("Xn=", x.length);
  console.log("X0=", x[0].X);
  console.log("X1=", x[1].X);*/

  //console.log("A=",x["activity recognition"])

  res.send(data);
});

/*
https://hook.eu1.make.com/sv98o2ld8whpk0onk5nmj58zal4m6uwf?StartDate=18.12.2022&EndDate=19.12.2022

====4====================================
POST::I_think_of_you::query : {
  summary: 'Travail du matin,start=2022-12-18T09:00:00.000Z,end=2022-12-18T11:00:00.000Z'
}
====4====================================
POST::I_think_of_you::query : {
  summary: "Travail de l'après-midi,start=2022-12-18T11:45:00.000Z,end=2022-12-18T15:15:00.000Z"
}
====4====================================*/

// ✅
router.get("/api/v1/make/", function (req, res, next) {
  console.log("====4.1==================================");
  var data = {
    name: "Akashdeep",
    hobbies: ["playing football", "playing chess", "cycling"],
  };

  res.render("calendar_display.html", { data: data });
});

/*
GET::body : {}
GET::query : { MAKE: 'By Philippe' }
========================================
POST::I_think_of_you::body : {}
POST::I_think_of_you::query : { 'MAKE-2': 'La poste' }
========================================
*/

/* ✅ https://speech-development-tools.glitch.me/my-api?utterance=Then run the application. */


/* ------------------------------------------------------- */

module.exports = router;
