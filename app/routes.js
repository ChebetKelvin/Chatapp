import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("login", "routes/login.jsx"),
  route("signup", "routes/signup.jsx"),
  route("dashboard", "routes/chat.jsx"),
  route("logout", "routes/logout.jsx"),
];
