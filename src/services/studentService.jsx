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

// export const CreateStudentsAPI = async (studentData) => {
//     try {
//         const response = await axios.post(STUDENT_API, studentData);
//         return response.data;
//     } catch (error) {
//         console.error("Error when creating students:", error);
//         throw error;
//     }
// }

export const updateStudentProfileAPI = async (id, updatedData) => {
    try {
        const response = await axios.put(`${STUDENT_API}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error when updating students:", error);
        throw error;
    }
}
