/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createVideo = /* GraphQL */ `
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
export const updateVideo = /* GraphQL */ `
  mutation UpdateVideo(
    $input: UpdateVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    updateVideo(input: $input, condition: $condition) {
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
export const deleteVideo = /* GraphQL */ `
  mutation DeleteVideo(
    $input: DeleteVideoInput!
    $condition: ModelVideoConditionInput
  ) {
    deleteVideo(input: $input, condition: $condition) {
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
