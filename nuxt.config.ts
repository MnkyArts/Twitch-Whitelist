// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],

  runtimeConfig: {
    APP_URL: process.env.APP_URL,
    CHECK_FOLLOWED: process.env.CHECK_FOLLOWED,
    CHECK_SUBSCRIBED: process.env.CHECK_SUBSCRIBED,
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET,
    CHANNEL_LIST: process.env.CHANNEL_LIST,
    RCON_HOST: process.env.RCON_HOST,
    RCON_PORT: process.env.RCON_PORT,
    RCON_PASSWORD: process.env.RCON_PASSWORD,
  },
});
