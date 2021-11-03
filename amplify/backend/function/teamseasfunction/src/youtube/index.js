"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grabYTData = exports.formatVideos = void 0;
const api_1 = require("../api");
const uuid_1 = require("uuid");
let YT_URL_PARTIAL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=%23%23teamseas&maxResults=2&key=";
async function getYTURL() {
    const Parameters = await (0, api_1.grabSecrets)();
    const googlekey = await (0, api_1.findSecret)("GOOGLE_ACCESS_KEY", Parameters);
    return `${YT_URL_PARTIAL}${googlekey}`;
}
async function formatVideos(fetch) {
    const data = await grabYTData(fetch);
    const snippets = data.items;
    return snippets.map(video => {
        const snippet = video.snippet;
        return {
            id: (0, uuid_1.v4)(),
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
exports.formatVideos = formatVideos;
//https://stackoverflow.com/questions/14173428/how-to-change-page-results-with-youtube-data-api-v3
let nextPageToken = "";
let timesThrough = 0;
let totalData = {};
async function grabYTData(fetch) {
    const YT_URL = await getYTURL();
    try {
        let data = await fetch(YT_URL);
        let json = (await data.json());
        while (timesThrough < 1) {
            if (json.nextPageToken) {
                nextPageToken = json.nextPageToken;
                data = await fetch(`${YT_URL}&pageToken=${nextPageToken}`);
                json = await data.json();
                totalData = { ...totalData, ...json };
            }
            timesThrough++;
        }
    }
    catch (err) {
        console.log("err", err);
    }
    return totalData;
}
exports.grabYTData = grabYTData;
