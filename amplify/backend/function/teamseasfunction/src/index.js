"use strict";
/*
Use the following code to retrieve configured secrets from SSM:

const aws = require('aws-sdk');

const { Parameters } = await (new aws.SSM())
  .getParameters({
    Names: ["GOOGLE_ACCESS_KEY","clientid","password","username","userpoolid"].map(secretName => process.env[secretName]),
    WithDecryption: true,
  })
  .promise();

Parameters will be of the form { Name: 'secretName', Value: 'secretValue', ... }[]
*/
/* Amplify Params - DO NOT EDIT
    API_TEAMSEASVUEAWS_GRAPHQLAPIENDPOINTOUTPUT
    API_TEAMSEASVUEAWS_GRAPHQLAPIIDOUTPUT
    API_TEAMSEASVUEAWS_GRAPHQLAPIKEYOUTPUT
    AUTH_TEAMSEASVUEAWS978C8FCB_USERPOOLID
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// import * as aws from "aws-sdk";
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const graphql_1 = require("./graphql");
const youtube_1 = require("./youtube");
// import { formatVideos } from "./youtube/";
// const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
//   apiVersion: "2016-04-18"
// });
const handler = async (event, context) => {
    const client = await (0, graphql_1.getAppSyncClient)();
    const videos = await (0, youtube_1.formatVideos)(isomorphic_fetch_1.default);
    const query = await (0, graphql_1.listData)(client);
    console.log("query", JSON.stringify(query));
    // console.log("got videos", videos);
    for (const video of videos) {
        let exists = query.listVideos.items.find(val => val.videoid === video.videoid);
        if (!!exists) {
            console.log("skipped", video.videoid);
            continue;
        }
        let t = await (0, graphql_1.createVideos)(video, client);
        console.log("created", t);
    }
    const response = {
        statusCode: 200,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ test: "hello" })
    };
    return response;
};
exports.handler = handler;
