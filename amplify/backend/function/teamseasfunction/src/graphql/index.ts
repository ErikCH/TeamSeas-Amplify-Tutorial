import AWSAppSyncClient from "aws-appsync";
import { getCredentials } from "../api";
import gql from "graphql-tag";

export async function getAppSyncClient() {
  let cred;
  let credExpirationDate = new Date("01-01-1970"); // to keep track of if credentials are out of date
  const url = process.env.API_TEAMSEASVUEAWS_GRAPHQLAPIENDPOINTOUTPUT as string;
  return new AWSAppSyncClient({
    disableOffline: true,
    url,
    region: "us-east-2",
    auth: {
      type: "AMAZON_COGNITO_USER_POOLS",
      jwtToken: async () => {
        // check if we already have credentials or if credentials are expired
        if (!cred || credExpirationDate < new Date()) {
          // get new credentials
          cred = await getCredentials();
          // give ourselves a 10 minute leeway here
          credExpirationDate = new Date(
            +new Date() + (cred.AuthenticationResult.ExpiresIn - 600) * 1000
          );
        }
        return cred.AuthenticationResult.IdToken;
      }
    }
  });
}

export async function listData(client) {
  await client.hydrated();
  try {
    const transactionComplete = await client.query({
      query: gql`
        ${listVideos}
      `,
      fetchPolicy: "no-cache"
    });
    return transactionComplete.data;
  } catch (err) {
    console.log("error", err);
  }
}

export async function createVideos(input, client) {
  const {
    id,
    videoid,
    publishedAt,
    channelId,
    title,
    description,
    thumnbnailDefault,
    thumbnailMediume,
    thumbnailHigh,
    channelTitle
  } = input;

  await client.hydrated();
  try {
    const transactionComplete = await client.mutate({
      mutation: gql`
        ${createVideosMutation}
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
  } catch (err) {
    console.log(err);
  }
}

export const listVideos = /* GraphQL */ `
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

export const createVideosMutation = /* GraphQL */ `
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
