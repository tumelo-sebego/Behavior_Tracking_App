<template>
  <div>
    <!-- Hamburger Icon to Toggle Sidebar -->
    <Button
      icon="pi pi-bars"
      class="p-button-text p-mb-3"
      @click="toggleSidebar" />

    <!-- Sidebar Drawer -->
    <Sidebar v-model:visible="sidebarVisible" position="left">
      <h3>Menu</h3>
      <Button
        label="Home"
        icon="pi pi-home"
        @click="navigateTo('/')"
        class="p-button-text" />
      <Button
        label="Add Task"
        icon="pi pi-plus"
        @click="navigateTo('/add-task')"
        class="p-button-text" />
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        @click="logout"
        class="p-button-danger" />
    </Sidebar>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";

export default {
  components: {
    Sidebar,
    Button,
  },
  setup() {
    const sidebarVisible = ref(false);
    const router = useRouter();

    const toggleSidebar = () => {
      sidebarVisible.value = !sidebarVisible.value;
    };

    const navigateTo = (path) => {
      router.push(path);
      sidebarVisible.value = false; // Close the sidebar after navigation
    };

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/");
    };

    return {
      sidebarVisible,
      toggleSidebar,
      navigateTo,
      logout,
    };
  },
};
</script>

<style scoped>
/* Add custom styles for the sidebar if needed */
</style>
