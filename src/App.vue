<script setup lang="ts">
import theCard from "./components/the-card.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

import { ref } from "vue";
import { listVideos } from "./graphql/queries";
const videos = ref([]) as any;
async function myListVideos() {
  const myVideos = await API.graphql({
    query: listVideos,
    authMode: "API_KEY",
    variables: {
      limit: 20
    }
  });
  console.log("myVideos", myVideos);
  videos.value = (myVideos as any).data?.listVideos?.items;
}
myListVideos();
</script>

<template>
  <h1 class="font-bold text-3xl p-10">#TeamSeas Latest Videos</h1>

  <!-- <authenticator :loginMechanisms="['email']" v-slot="{ signOut }">
    <h3>Hello From Logged in</h3>
    <button @click="signOut">Sign me Out</button> -->
  <!-- </authenticator> -->
  <div class="flex flex-wrap gap-3 justify-center m-auto">
    <div v-for="video in videos" :key="video.id">
      <the-card
        :title="video.title"
        :description="video.description"
        :img="video.thumbnailHigh"
        :date="video.datetime"
        :channelTitle="video.channelTitle"
        :videoid="video.videoid"
        :channelId="video.channelId"
      ></the-card>
    </div>
  </div>
</template>

<style></style>
