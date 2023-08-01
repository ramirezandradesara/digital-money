/**
 * getAuthStorage Method used to manage auth token value from local storage object
 * @returns method returns a json value of the specified Storage Object item: token
 */
export const setAuthStorage = (auth: string) => {
  localStorage.setItem("token", JSON.stringify(auth));
};

export const getAuthStorage = () => {
  const tokenHere : string | null = localStorage.getItem("token");
  return tokenHere;
};

export const removeAuthStorage = () => {
  localStorage.removeItem("token");
};
