<template>
  <div>
    <button @click="loginWithTwitch">Login with Twitch</button>
  </div>
</template>

<script setup>
const loginWithTwitch = async () => {
  window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=zveul1fehyvyh4tml0w9zz14k83elz&redirect_uri=${window.location.origin}/auth/callback&response_type=code&scope=user:read:follows+user:read:subscriptions`;
};
</script>
