import {describe, it, expect, vi} from "vitest";
import axios from "axios";
import {getUsersAPI, } from "./userService";
import {USER_API} from "~/utils/constants";

vi.mock("axios");

describe('UserService', () => {
    it("should return data when API call is successfully", () => {
        const mockData = [{id: 99, name: "admin"}];
        axios.get.mockResolvedValue({data: mockData});

        const result = getUsersAPI();

        expect(axios.get).toHaveBeenCalledWith(USER_API);
        expect(result).toEqual(mockData);
    })

    it('should throw an error when API call fails', () => {
        
    })
})