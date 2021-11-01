<script setup lang="ts">
import theCard from "./components/the-card.vue";
import { Authenticator } from "@aws-amplify/ui-vue";
import Amplify from "aws-amplify";
import "@aws-amplify/ui-vue/styles.css";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);
</script>

<template>
  <h1 class="font-bold text-3xl p-10">#TeamSeas Latest Videos</h1>

  <authenticator :loginMechanisms="['email']" v-slot="{ signOut }">
    <h3>Hello From Logged in</h3>
    <button @click="signOut">Sign me Out</button>
  </authenticator>

  <!-- <the-card
    channelTitle="test"
    title="Test title"
    description="description"
    img=""
    date="2022-10-01"
    videoid="123"
    channelId="456"
  >
  </the-card> -->
</template>

<style></style>
