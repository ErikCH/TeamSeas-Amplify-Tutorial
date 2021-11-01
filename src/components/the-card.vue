<script setup lang="ts">
import { toRefs } from "vue";
const VIDEO_URL = "https://www.youtube.com/watch?v=";
const CHANNEL_URL = "https://www.youtube.com/channel/";
// Thanks to this template
//https://tailwindcomponents.com/component/movie-car-20
const props = defineProps({
  channelTitle: String,
  title: String,
  description: String,
  img: String,
  date: String,
  videoid: String,
  channelId: String
});

const { channelTitle, title, description, img, date } = toRefs(props);
const dateTime = new Date(date?.value as string);
const [month, day, year] = [
  dateTime.getMonth(),
  dateTime.getDate(),
  dateTime.getFullYear()
];
function openLink(url: string) {
  window.open(url, "_blank");
}
</script>
<template>
  <div>
    <div
      class="
        flex
        max-w-sm
        w-full
        bg-white
        shadow-md
        rounded-lg
        overflow-hidden
        mx-auto
      "
    >
      <div class="w-2 bg-gray-800"></div>

      <div
        class="
          overflow-hidden
          rounded-xl
          relative
          transform
          hover:-translate-y-2
          transition
          ease-in-out
          duration-500
          shadow-lg
          hover:shadow-2xl
          movie-item
          text-white
          movie-card
        "
        data-movie-id="438631"
      >
        <div
          class="
            absolute
            inset-0
            z-10
            transition
            duration-300
            ease-in-out
            bg-gradient-to-t
            from-black
            via-gray-900
            to-transparent
          "
        ></div>
        <div
          class="
            relative
            cursor-pointer
            group
            z-10
            px-10
            pt-10
            space-y-6
            movie_info
          "
          data-lity=""
          @click="openLink(`${VIDEO_URL}${videoid}`)"
          target="_blank"
        >
          <div class="poster__info align-self-end w-full">
            <div class="h-32"></div>
            <div class="space-y-6 detail_info">
              <div class="flex flex-col space-y-2 inner">
                <a
                  class="
                    relative
                    flex
                    items-center
                    w-min
                    flex-shrink-0
                    p-1
                    text-center text-white
                    bg-red-500
                    rounded-full
                    group-hover:bg-red-700
                  "
                  data-unsp-sanitized="clean"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-10 h-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM9.555 7.168A1 1 0 0 0 8 8v4a1 1 0 0 0 1.555.832l3-2a1 1 0 0 0 0-1.664l-3-2z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <div
                    class="
                      absolute
                      transition
                      opacity-0
                      duration-500
                      ease-in-out
                      transform
                      group-hover:opacity-100 group-hover:translate-x-16
                      text-xl
                      font-bold
                      text-white
                      group-hover:pr-2
                    "
                  >
                    Play
                  </div>
                </a>
                <h3
                  class="text-2xl font-bold text-white"
                  data-unsp-sanitized="clean"
                >
                  {{ title }}
                </h3>
                <div class="mb-0 text-lg text-gray-400">
                  {{ channelTitle }}
                </div>
              </div>
              <div class="flex flex-row justify-center datos">
                <div class="flex flex-col datos_col">
                  <div class="release">{{ `${month}/${day}/${year}` }}</div>
                  <div class="text-sm text-gray-400">Release date:</div>
                </div>
              </div>
              <div class="flex flex-col overview">
                <div class="flex flex-col"></div>
                <div class="text-xs text-gray-400 mb-2">Description:</div>
                <p class="text-xs text-gray-100 mb-6">
                  {{ description }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <img
          class="absolute inset-0 transform w-full -translate-y-4"
          :src="img"
          style="filter: grayscale(1%)"
        />
        <div class="poster__footer flex flex-row relative pb-10 space-x-4 z-10">
          <a
            class="
              flex
              items-center
              py-2
              px-4
              rounded-full
              mx-auto
              text-white
              bg-red-500
              hover:bg-red-700
            "
            :href="`${CHANNEL_URL}${channelId}`"
            target="_blank"
            data-unsp-sanitized="clean"
          >
            <div class="text-sm text-white">Channel Info</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
