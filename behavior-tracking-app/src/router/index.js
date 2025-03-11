import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddTask from "@/views/Add-Task.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/add-task", component: AddTask },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
