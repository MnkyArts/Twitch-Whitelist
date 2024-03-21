const { APP_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, CHANNELS_TO_FOLLOW } =
  useRuntimeConfig();

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

  const channelToFollow = CHANNELS_TO_FOLLOW.split(", ");
  try {
    const handleUserRequest = async () => {
      let isFollowingAnyChannel = false;

      for (const channel of channelToFollow) {
        const response = await fetch(
          `https://api.twitch.tv/helix/channels/followed?user_id=${twitchId}&broadcaster_id=${channel}`,
          {
            headers: {
              "Client-ID": TWITCH_CLIENT_ID,
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();

        if (data.data.length > 0) {
          isFollowingAnyChannel = true;
          break;
        }
      }

      if (!isFollowingAnyChannel) {
        return new Response("Not following any channel", { status: 403 });
      }
    };

    await handleUserRequest();
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
    if (response.ok) {
      return true;
    } else if (response.status === 204) {
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
