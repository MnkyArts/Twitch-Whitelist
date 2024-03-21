import { Rcon } from "rcon-client";

const {
  CHECK_FOLLOWED,
  CHECK_SUBSCRIBED,
  TWITCH_CLIENT_ID,
  CHANNEL_LIST,
  RCON_HOST,
  RCON_PORT,
  RCON_PASSWORD,
} = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  const { twitchId, displayName, accessToken, minecraftUsername } =
    await readBody(event);

  if (!twitchId || !displayName || !accessToken || !minecraftUsername) {
    return new Response("Missing required fields", { status: 400 });
  }

  const accountExists = await checkAccountExists(minecraftUsername);
  if (!accountExists) {
    return new Response("Minecraft account not found", { status: 404 });
  }

  try {
    const channelList = CHANNEL_LIST.split(", ");
    const promises = channelList.map(async (channel) => {
      let isFollowingAnyChannel = false;
      let isSubscribedToAnyChannel = false;

      if (CHECK_FOLLOWED === "true") {
        const followResponse = await fetchTwitchAPI(
          `/channels/followed?user_id=${twitchId}&broadcaster_id=${channel}`,
          accessToken
        );
        const followData = await followResponse.json();
        isFollowingAnyChannel = followData.data.length > 0;
      }

      if (CHECK_SUBSCRIBED === "true") {
        const subscribeResponse = await fetchTwitchAPI(
          `/subscriptions/user?user_id=${twitchId}&broadcaster_id=${channel}`,
          accessToken
        );
        const subscribeData = await subscribeResponse.json();
        isSubscribedToAnyChannel = subscribeData.data.length > 0;
      }

      return { isFollowingAnyChannel, isSubscribedToAnyChannel };
    });

    const results = await Promise.all(promises);

    const isFollowingAnyChannel = results.some(
      (result) => result.isFollowingAnyChannel
    );
    const isSubscribedToAnyChannel = results.some(
      (result) => result.isSubscribedToAnyChannel
    );

    if (CHECK_FOLLOWED === "true" && !isFollowingAnyChannel) {
      return new Response("Not following any channel", { status: 403 });
    }

    if (CHECK_SUBSCRIBED === "true" && !isSubscribedToAnyChannel) {
      return new Response("Not subscribed to any channel", { status: 403 });
    }

    const RCONClient = new Rcon({
      host: RCON_HOST,
      port: RCON_PORT,
      password: RCON_PASSWORD,
    });

    await RCONClient.connect()
      .then(() => {
        console.log("Connected to RCON server");

        RCONClient.send(`whitelist add ${minecraftUsername}`).then(
          (response) => {
            console.log(`${response}`);
          }
        );

        RCONClient.send(
          `say ${minecraftUsername} has been added to the whitelist.`
        );

        RCONClient.end();
        return new Response("Added to whitelist", { status: 200 });
      })
      .catch((error) => {
        console.error("Error connecting to RCON server:", error);
        return new Response("Error connecting to RCON server", { status: 500 });
      });
  } catch (error) {
    console.error("Error checking follower status:", error);
    return new Response("Error checking follower status", { status: 500 });
  }
});

async function checkAccountExists(username) {
  try {
    const response = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${username}`
    );
    return response.ok;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function fetchTwitchAPI(endpoint, accessToken) {
  return fetch(`https://api.twitch.tv/helix${endpoint}`, {
    headers: {
      "Client-ID": TWITCH_CLIENT_ID,
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
