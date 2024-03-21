<template>
  <div>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
const route = useRoute();

const fetchData = async () => {
  try {
    const response = await fetch("/api/twitch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: route.query.code,
      }),
    });

    if (!response.ok) {
      return console.error("Error fetching user data:", await response.text());
    }

    const userData = await response.json();
    localStorage.setItem("userData", JSON.stringify(userData));
    window.location.href = "/whitelist";
  } catch (error) {
    console.error("Error whitelisting user:", error);
  }
};

onMounted(() => {
  fetchData();
});
</script>
