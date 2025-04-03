import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import DailyProgress from "../views/DailyProgress.vue";
import Profile from "../views/Profile.vue";
import AddTask from "@/views/Add-Task.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/add-task", component: AddTask },
  { path: "/dailyprogress", component: DailyProgress },
  { path: "/profile", component: Profile },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
