<template>
  <div
    class="min-h-screen min-w-[100vw] bg-slate-900 text-white flex justify-center items-center"
  >
    <slot />
  </div>
</template>
<script setup>
useSeoMeta({
  title: "Twitch Whitelister | Add your Minecraft Account to the Whitelist",
  ogTitle: "Twitch Whitelister | Add your Minecraft Account to the Whitelist",
  description:
    "Streamline Minecraft server access for Twitch viewers. Authenticate, verify follows, and whitelist effortlessly.",
  ogDescription:
    "Streamline Minecraft server access for Twitch viewers. Authenticate, verify follows, and whitelist effortlessly.",
});
</script>
<style>
body {
  background-color: #0f172a;
}
</style>
