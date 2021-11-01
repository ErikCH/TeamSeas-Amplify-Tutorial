/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getVideo = /* GraphQL */ `
  query GetVideo($id: ID!) {
    getVideo(id: $id) {
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
