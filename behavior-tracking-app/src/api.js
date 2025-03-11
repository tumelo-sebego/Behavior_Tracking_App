import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000", // Flask backend URL
  headers: { "Content-Type": "application/json" },
});

// User Authentication
export const login = (email, password) =>
  API.post("/auth/login", { email, password });
export const register = (email, password) =>
  API.post("/auth/register", { email, password });

// Task Management
export const getTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
export const completeTask = (taskId) => API.put(`/tasks/${taskId}/complete`);
export const getDailyProgress = () => API.get("/progress/daily");

export default API;
