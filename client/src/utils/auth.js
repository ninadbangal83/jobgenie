export const getUserRole = () => {
  const isAdmin = localStorage.getItem('isAdmin'); // 'user' or 'admin'
  return isAdmin || "false";
};
