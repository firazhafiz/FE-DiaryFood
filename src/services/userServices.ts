import { apiRequest } from "./api";

const getProfile = async () => {
  try {
    const response = await apiRequest("/user/profile", "GET");
    return response;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export { getProfile };
