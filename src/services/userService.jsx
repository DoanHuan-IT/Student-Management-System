import axios from "axios";
import { USER_API } from "../utils/constants";

export const getUsersAPI = async () => {
    try {
        const response = await axios.get(USER_API);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};
