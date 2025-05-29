export const updateLocalStg = (key, value, set = true) => {
  try {
    if (set) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  } catch (err) {
    console.error("LocalStorage error:", err);
  }
};
