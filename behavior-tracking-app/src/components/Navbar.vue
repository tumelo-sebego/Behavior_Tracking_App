<template>
  <div>
    <!-- Hamburger Icon to Toggle Sidebar -->
    <Button
      icon="pi pi-bars"
      class="p-button-text p-mb-3"
      @click="toggleSidebar" />

    <!-- Sidebar Drawer -->
    <Sidebar v-model:visible="sidebarVisible" position="left">
      <div class="sidebar-content">
        <div class="menu-items">
          <Button label="Home" @click="navigateTo('/')" class="p-button-text" />
          <Button
            label="Daily Progress"
            @click="navigateTo('/daily-progress')"
            class="p-button-text" />
          <Button
            label="Weekly Progress"
            @click="navigateTo('/weekly-progress')"
            class="p-button-text" />
          <Button
            label="Monthly Progress"
            @click="navigateTo('/monthly-progress')"
            class="p-button-text" />
        </div>
        <div class="bottom-items">
          <Button
            label="Profile"
            @click="navigateTo('/profile')"
            class="p-button-text" />
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            @click="logout"
            class="p-button-danger" />
        </div>
      </div>
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
.sidebar-content {
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensure the sidebar takes the full height */
  justify-content: space-between; /* Push bottom-items to the bottom */
}

.menu-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left-align menu items */
  gap: 1rem; /* Add spacing between menu items */
}

.bottom-items {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Left-align bottom items */
  gap: 1rem; /* Add spacing between bottom items */
}
</style>
