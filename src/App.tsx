// src/App.tsx
import { NavLink, Outlet } from "react-router-dom";


export default function App() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `navlink ${isActive ? "active" : ""}`;

  return (
      <Outlet />
  );
}
