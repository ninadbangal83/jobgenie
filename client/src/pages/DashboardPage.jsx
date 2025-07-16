// src/pages/DashboardPage.js
import React from "react";
import { getUserRole } from "../utils/auth";
import UserDashboard from "../components/dashboard/UserDashboard";
import AdminDashboard from "../components/dashboard/AdminDashboard";

const DashboardPage = () => {
  const isAdmin = getUserRole();

  console.log(isAdmin)
  return isAdmin === "true" ? <AdminDashboard /> : <UserDashboard />;
};

export default DashboardPage;
