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

// import * as aws from "aws-sdk";
import fetch from "isomorphic-fetch";

import { APIGatewayProxyHandler } from "aws-lambda";
import { getCredentials } from "./api";
import { listData, getAppSyncClient, createVideos } from "./graphql";
import { formatVideos } from "./youtube";
// import { formatVideos } from "./youtube/";

// const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
//   apiVersion: "2016-04-18"
// });

export const handler: APIGatewayProxyHandler = async (event, context) => {
  const client = await getAppSyncClient();

  const videos = await formatVideos(fetch);
  const query = await listData(client);
  console.log("query", JSON.stringify(query));

  // console.log("got videos", videos);

  for (const video of videos) {
    let exists = query.listVideos.items.find(
      val => val.videoid === (video as any).videoid
    );
    if (!!exists) {
      console.log("skipped", (video as any).videoid);
      continue;
    }
    let t = await createVideos(video, client);
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
