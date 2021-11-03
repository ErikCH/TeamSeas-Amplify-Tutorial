import { grabSecrets, findSecret } from "../api";
import { v4 as uuidv4 } from "uuid";

let YT_URL_PARTIAL =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q=%23%23teamseas&maxResults=2&key=";

async function getYTURL() {
  const Parameters = await grabSecrets();
  const googlekey = await findSecret("GOOGLE_ACCESS_KEY", Parameters);

  return `${YT_URL_PARTIAL}${googlekey}`;
}

export async function formatVideos(fetch) {
  const data = await grabYTData(fetch);
  const snippets = data.items;
  return snippets.map(video => {
    const snippet = video.snippet;

    return {
      id: uuidv4(),
      videoid: video.id.videoId,
      publishedAt: snippet.publishedAt,
      channelId: snippet.channelId,
      title: snippet.title,
      description: snippet.description,
      thumnbnailDefault: snippet.thumbnails.default.url,
      thumbnailMediume: snippet.thumbnails.medium.url,
      thumbnailHigh: snippet.thumbnails.high.url,
      channelTitle: snippet.channelTitle
    };
  });
}

//https://stackoverflow.com/questions/14173428/how-to-change-page-results-with-youtube-data-api-v3

let nextPageToken = "";
let timesThrough = 0;
let totalData = {};

export async function grabYTData(fetch): Promise<any> {
  const YT_URL = await getYTURL();
  try {
    let data = await fetch(YT_URL);
    let json = (await data.json()) as any;
    while (timesThrough < 1) {
      if (json.nextPageToken) {
        nextPageToken = json.nextPageToken;
        data = await fetch(`${YT_URL}&pageToken=${nextPageToken}`);
        json = await data.json();
        totalData = { ...totalData, ...json };
      }
      timesThrough++;
    }
  } catch (err) {
    console.log("err", err);
  }
  return totalData;
}
