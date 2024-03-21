<template>
  <div class="flex justify-center items-center min-w-[100vw]">
    <div
      v-if="!error && !success"
      class="flex flex-col justify-center items-center"
    >
      <h2 class="mb-5 font-bold text-2xl">Enter your Minecraft Username</h2>
      <div class="flex flex-row">
        <input
          type="text"
          v-model="minecraftUsername"
          placeholder="Minecraft Username"
          class="py-2 px-5 rounded-[10px_0px_0px_10px] text-slate-900"
        />
        <button
          @click="whitelistUser"
          class="flex shadow-[0_0px_30px_0px_#553adf94] hover:shadow-none justify-center text-sm font-bold uppercase bg-[#553adf] py-2 px-5 rounded-[0px_10px_10px_0px] border-2 border-[#6e55e7] hover:bg-transparent transition-all duration-200"
        >
          Whitelist
        </button>
      </div>
    </div>
    <div v-else>
      <div v-if="error" class="flex flex-col justify-center items-center">
        <h2 class="mb-5 font-bold text-2xl">{{ error }}</h2>
        <button
          @click="goBack"
          class="flex shadow-[0_0px_30px_0px_#553adf94] hover:shadow-none justify-center text-sm font-bold uppercase bg-[#553adf] py-2 px-5 rounded-xl border-2 border-[#6e55e7] hover:bg-transparent transition-all duration-200"
        >
          Go Back
        </button>
      </div>
      <div v-else class="flex flex-col justify-center items-center">
        <h2 class="font-bold text-2xl">{{ success }}</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
const userData = ref([]);
const minecraftUsername = ref("");
const error = ref("");
const success = ref("");

onMounted(async () => {
  userData.value = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    window.location.href = "/";
  }
});

const goBack = () => {
  window.location.href = "/whitelist";
};

const whitelistUser = async () => {
  try {
    const { id, display_name, access_token } = userData.value;
    const response = await fetch("/api/whitelist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        twitchId: id,
        displayName: display_name,
        accessToken: access_token,
        minecraftUsername: minecraftUsername.value,
      }),
    });
    if (response.ok) {
      success.value = "You have been whitelisted!";
      console.log("Error whitelisting user:", response);
    } else {
      error.value = await response.text();
    }
  } catch (error) {
    console.error("Error whitelisting user:", error);
    error.value =
      error +
      "<br />Please contact the Site Administrator with this error message.";
  }
};
</script>
