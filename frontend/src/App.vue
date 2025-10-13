<template>
  <component :is="layout || 'div'">
    <router-view :key="page" />
  </component>
</template>

<script setup>
import { computed, defineAsyncComponent } from "vue";
import { RouterView, useRoute } from "vue-router";

let route = useRoute();

const BaseLayoutComponent = defineAsyncComponent(() =>
  import("./views/layout/BaseLayout.vue")
);
const UserLayoutComponent = defineAsyncComponent(() =>
  import("./views/layout/UserLayout.vue")
);

const layout = computed(() => {
  if (!route.meta.layout) {
    return null; // No layout for this route
  }
  if (route.meta.layout === "UserLayout") {
    return UserLayoutComponent;
  }  else {
    return BaseLayoutComponent;
  }
});

const page = computed(() => route.name || "");
</script>

<style scoped></style>
