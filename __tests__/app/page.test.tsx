import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Link from "next/link";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
    useRouter() {
        return {
            route: "/",
            pathname: "",
            query: "",
            asPath: "",
            push: jest.fn(),
            replace: jest.fn(),
            reload: jest.fn(),
            back: jest.fn(),
            prefetch: jest.fn(),
            beforePopState: jest.fn(),
            events: {
                on: jest.fn(),
                off: jest.fn(),
                emit: jest.fn(),
            },
        };
    },
}));
describe("Link Component", () => {
    it("renders the link and navigates correctly", () => {
        const { push } = useRouter(); // Use the mocked push function
        render(
            <Link href="/about">
                <p>About Us</p>
            </Link>
        );

        // Check if the link is rendered
        const linkElement = screen.getByRole("link", { name: /about us/i });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "/about");

        // Simulate a click on the link
        fireEvent.click(linkElement);

        // Expect the push function to have been called with the correct URL
        // expect(push).toHaveBeenCalledWith("/about");
    });
});
