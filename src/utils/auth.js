/*export const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};*/
export const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  try {
    const parsedUser = JSON.parse(user);
    return !!parsedUser && typeof parsedUser === "object";
  } catch {
    return false;
  }
};

