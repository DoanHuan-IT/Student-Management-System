import {render, screen, fireEvent} from "@testing-library/react";
import {vi, describe, it, expect} from "vitest";
import LoginForm from "./LoginForm";

describe("LoginForm Component", () => {
    it("Completely display all input field and button", () => {
        const mockSubmit = vi.fn();
        render(<LoginForm onSubmit={mockSubmit}/>);

        expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole("button", {name: /login/i})).toBeInTheDocument();
    })

    it("Call onSubmit function with the correct username and password when click Login",() => {
        const mockSubmit = vi.fn();
        render(<LoginForm onSubmit={mockSubmit}/>)

        const usernameInput = screen.getByLabelText(/username/i)
        const passwordInput = screen.getByLabelText(/password/i)

        fireEvent.change(usernameInput, {target: {value: "testadmin"}})
        fireEvent.change(passwordInput, {target: {value: "password123"}})

        const loginButton = screen.getByRole("button", {name: /login/i})
        fireEvent.click(loginButton)

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith("testadmin", "password123");
    })

    it("Should change type input password when click eye icon", () => {
        render(<LoginForm onSubmit={() => {}} />)

        const passwordInput = screen.getByLabelText(/password/i)

        expect(passwordInput).toHaveAttribute("type", "password")

        const toggleButton = screen.getByTestId("toggle-password");

        fireEvent.click(toggleButton)
        expect(passwordInput).toHaveAttribute("type", "text")

        fireEvent.click(toggleButton)
        expect(passwordInput).toHaveAttribute("type", "password")
    
    })
})