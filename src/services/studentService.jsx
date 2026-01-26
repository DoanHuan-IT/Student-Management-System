import axios from "axios";
import { STUDENT_API } from "../utils/constants";

export const getStudentsAPI = async () => {
    try {
        const response = await axios.get(STUDENT_API);
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};
