<template>
  <div v-if="!error">
    <input
      type="text"
      v-model="minecraftUsername"
      placeholder="Minecraft Username"
    />
    <button @click="whitelistUser">Whitelist</button>
  </div>
  <div v-else>
    {{ error }}
  </div>
</template>

<script setup>
const userData = ref([]);
const minecraftUsername = ref("");
const error = ref("");

onMounted(async () => {
  userData.value = JSON.parse(localStorage.getItem("userData"));
  if (!userData) {
    window.location.href = "/";
  }
});

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
      alert("User whitelisted!");
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
