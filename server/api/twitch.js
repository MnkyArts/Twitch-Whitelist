const { APP_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = useRuntimeConfig();

export default defineEventHandler(async (event) => {
  try {
    const { code } = await readBody(event);
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${APP_URL}/auth/callback`,
      }),
    });

    if (!tokenResponse.ok) {
      console.error(
        "Error obtaining access token:",
        await tokenResponse.text()
      );
      return new Response("Failed to obtain access token", { status: 500 });
    }

    const { access_token } = await tokenResponse.json();
    const userResponse = await fetch("https://api.twitch.tv/helix/users", {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Client-Id": TWITCH_CLIENT_ID,
      },
    });

    if (!userResponse.ok) {
      console.error("Error fetching user data:", await userResponse.text());
      return new Response("Failed to fetch user data", { status: 500 });
    }

    const userData = await userResponse.json();
    const userInfo = {
      id: userData.data[0].id,
      display_name: userData.data[0].display_name,
      access_token,
    };

    return new Response(JSON.stringify(userInfo), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response("An error occurred", { status: 500 });
  }
});
