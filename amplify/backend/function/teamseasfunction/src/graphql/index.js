"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideosMutation = exports.listVideos = exports.createVideos = exports.listData = exports.getAppSyncClient = void 0;
const aws_appsync_1 = __importDefault(require("aws-appsync"));
const api_1 = require("../api");
const graphql_tag_1 = __importDefault(require("graphql-tag"));
async function getAppSyncClient() {
    let cred;
    let credExpirationDate = new Date("01-01-1970"); // to keep track of if credentials are out of date
    const url = process.env.API_TEAMSEASVUEAWS_GRAPHQLAPIENDPOINTOUTPUT;
    return new aws_appsync_1.default({
        disableOffline: true,
        url,
        region: "us-east-2",
        auth: {
            type: "AMAZON_COGNITO_USER_POOLS",
            jwtToken: async () => {
                // check if we already have credentials or if credentials are expired
                if (!cred || credExpirationDate < new Date()) {
                    // get new credentials
                    cred = await (0, api_1.getCredentials)();
                    // give ourselves a 10 minute leeway here
                    credExpirationDate = new Date(+new Date() + (cred.AuthenticationResult.ExpiresIn - 600) * 1000);
                }
                return cred.AuthenticationResult.IdToken;
            }
        }
    });
}
exports.getAppSyncClient = getAppSyncClient;
async function listData(client) {
    await client.hydrated();
    try {
        const transactionComplete = await client.query({
            query: (0, graphql_tag_1.default) `
        ${exports.listVideos}
      `,
            fetchPolicy: "no-cache"
        });
        return transactionComplete.data;
    }
    catch (err) {
        console.log("error", err);
    }
}
exports.listData = listData;
async function createVideos(input, client) {
    const { id, videoid, publishedAt, channelId, title, description, thumnbnailDefault, thumbnailMediume, thumbnailHigh, channelTitle } = input;
    await client.hydrated();
    try {
        const transactionComplete = await client.mutate({
            mutation: (0, graphql_tag_1.default) `
        ${exports.createVideosMutation}
      `,
            variables: {
                input: {
                    id,
                    videoid,
                    publishedAt,
                    channelId,
                    title,
                    description,
                    thumnbnailDefault,
                    thumbnailMediume,
                    thumbnailHigh,
                    channelTitle,
                    datetime: new Date().toISOString()
                }
            },
            fetchPolicy: "no-cache"
        });
        return transactionComplete.data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.createVideos = createVideos;
exports.listVideos = `
  query ListVideos(
    $filter: ModelVideoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        videoid
        publishedAt
        channelId
        title
        description
        thumnbnailDefault
        thumbnailMediume
        thumbnailHigh
        channelTitle
        datetime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
exports.createVideosMutation = `
  mutation CreateVideo(
    $input: CreateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    createVideo(input: $input, condition: $condition) {
      id
      videoid
      publishedAt
      channelId
      title
      description
      thumnbnailDefault
      thumbnailMediume
      thumbnailHigh
      channelTitle
      datetime
      createdAt
      updatedAt
    }
  }
`;
