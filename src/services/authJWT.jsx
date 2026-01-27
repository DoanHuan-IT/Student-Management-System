import axios from "axios";
import {USER_API} from "../utils/constants";
import {STUDENT_API} from "../utils/constants";

export const loginAPI = async (username, password) => {
    const requestUser = axios.get(`${USER_API}?username=${username}&password=${password}`
    ).catch(() => ({data:[]})); //Return [] instead of error 404
    const requestStudent = axios.get(`${STUDENT_API}?username=${username}&password=${password}`
    ).catch(() => ({data:[]}));

    const [responseUser, responseStudent] = await Promise.all([requestUser, requestStudent]);

    if (responseUser.data && responseUser.data.length > 0) {
        const user = responseUser.data.find(u => u.username === username);
        if (user?.role === 'admin' || user?.role === 'teacher') {
            const normalizedUser = {
                ...user,    //take infor
                ...(user.profile || {}),    //take profile
            }
            return saveUserToStorage(normalizedUser, "user-token");
        }
    }

    if (responseStudent.data && responseStudent.data.length > 0) {
        const student = responseStudent.data.find(st => st.username === username);
        if (student){
            const normalizedStudent = {
                ...student,
                ...(student.profile || {}),
                fullName: student.profile?.fullName
            }
            return saveUserToStorage(normalizedStudent, "student-token");
        }
    }
    throw new Error("Invalid username or password");
}

export const logoutAPI = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
}

const saveUserToStorage = (userData, token) => {
    const data = {...userData, accessToken: token};
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
}