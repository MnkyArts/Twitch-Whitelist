<template>
  <div class="flex justify-center items-center">
    <button
      @click="loginWithTwitch"
      class="flex shadow-[0_0px_30px_0px_#553adf94] hover:shadow-none justify-center text-sm font-bold uppercase bg-[#553adf] py-2 px-16 rounded-xl border-2 border-[#6e55e7] hover:bg-transparent transition-all duration-200"
    >
      Login with Twitch
    </button>
  </div>
</template>

<script setup>
const loginWithTwitch = async () => {
  window.location.href = `https://id.twitch.tv/oauth2/authorize?client_id=zveul1fehyvyh4tml0w9zz14k83elz&redirect_uri=${window.location.origin}/auth/callback&response_type=code&scope=user:read:follows+user:read:subscriptions`;
};
</script>
