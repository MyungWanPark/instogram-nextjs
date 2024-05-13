import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewPost from "@/components/NewPost";
import * as nextRouter from "next/navigation";

const mockUser = {
    id: "123",
    name: "test user",
    username: "test username",
    email: "test email",
    image: "test image",
};

jest.mock("next/navigation", () => ({
    ...jest.requireActual("next/navigation"),
    useRouter: jest.fn(),
}));

beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => "https://dummyurl.com/dummy");
});
afterAll(() => {
    jest.restoreAllMocks();
});

jest.mock("@/components/PostUserAvatar", () => () => <div>PostUserAvatar</div>);
jest.mock("@/components/ui/icons/FileIcon", () => () => <div>FileIcon</div>);
jest.mock("@/components/GridSpinner", () => () => <div>Loading...</div>);

describe("NewPost Component", () => {
    it("handles file selection correctly", async () => {
        const { getByText, getByTestId, getByLabelText } = render(
            <NewPost user={mockUser} />
        );

        const fileInput = screen.getByTestId("file-input");
        const file = new File(["hello"], "hello.png", { type: "image/png" });

        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() =>
            expect(screen.getByAltText("local-file")).toHaveAttribute(
                "src",
                expect.stringContaining("/_next/image?url")
            )
        );
    });

    it("calls network request after submit and navigates on success", async () => {
        const push = jest.fn();
        (nextRouter.useRouter as jest.Mock).mockImplementation(() => ({
            push,
        }));
        render(<NewPost user={mockUser} />);

        const fileInput = screen.getByTestId("file-input");
        const file = new File(["hello"], "hello.png", { type: "image/png" });

        fireEvent.change(fileInput, { target: { files: [file] } });

        const textArea = screen.getByPlaceholderText("Write a caption...");

        fireEvent.change(textArea, { target: { value: "New post content" } });

        (global.fetch as jest.Mock).mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ message: "Post created" }),
            })
        );

        const form = screen
            .getByText("publish")
            .closest("form") as HTMLFormElement;

        fireEvent.submit(form);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            expect(fetch).toHaveBeenCalledWith("/api/posts/", {
                method: "POST",
                body: expect.any(FormData),
            });
            expect(push).toHaveBeenCalledWith("/");
        });
    });
});
