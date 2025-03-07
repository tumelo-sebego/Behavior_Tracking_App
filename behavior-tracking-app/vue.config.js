const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "^/auth": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "^/tasks": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
      "^/progress": {
        target: "http://127.0.0.1:5000",
        changeOrigin: true,
      },
    },
  },
});
