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
          `/subscriptions/user?broadcaster_id=${channel}&user_id=${twitchId}`,
          accessToken
        );
        const subscribeData = await subscribeResponse.json();
        if (subscribeData.status === 404)
          return (isSubscribedToAnyChannel = false);
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
      return new Response("You are not a follower of the Channel!", {
        status: 403,
      });
    }

    if (CHECK_SUBSCRIBED === "true" && !isSubscribedToAnyChannel) {
      return new Response("You are not a subscriber of the Channel!", {
        status: 403,
      });
    }

    const RCONClient = new Rcon({
      host: RCON_HOST,
      port: RCON_PORT,
      password: RCON_PASSWORD,
    });

    try {
      await RCONClient.connect();
      console.log("Connected to RCON server");

      const whitelistResponse = await RCONClient.send(
        `whitelist add ${minecraftUsername}`
      );
      console.log(`${whitelistResponse}`);

      await RCONClient.send(
        `say ${minecraftUsername} has been added to the whitelist.`
      );

      RCONClient.end();
      return new Response("You have been whitelisted!", { status: 200 });
    } catch (error) {
      console.error("Error sending commands via RCON:", error);
      return new Response("Error sending commands via RCON", { status: 500 });
    }
  } catch (error) {
    console.error("Error checking follower or subscription status:", error);
    return new Response("Error checking follower or subscription status", {
      status: 500,
    });
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
