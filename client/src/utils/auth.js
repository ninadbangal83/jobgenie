export const getUserRole = () => {
  const role = localStorage.getItem('role'); // 'user' or 'admin'
  return role || 'user';
};
