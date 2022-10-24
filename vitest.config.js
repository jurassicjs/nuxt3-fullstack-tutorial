import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    environment: "jsdom",
    deps: {
      inline: [/@nuxt\/test-utils-edge/],
    },
  },
})