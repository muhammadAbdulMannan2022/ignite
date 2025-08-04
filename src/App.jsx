import React from "react";
import Landing from "./pages/Landing/Landing";
import { Outlet } from "react-router";

export default function App() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
