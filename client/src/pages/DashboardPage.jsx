// src/pages/DashboardPage.js
import React from "react";
import { getUserRole } from "../utils/auth";
import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const DashboardPage = () => {
  const role = getUserRole();

  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardPage;
