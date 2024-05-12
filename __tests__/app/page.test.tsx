import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewPost from "@/components/NewPost";
// import { useRouter as useRouterOriginal } from "next/navigation";
import * as nextRouter from "next/navigation";
import PostUserAvatar from "@/components/PostUserAvatar";
import FileIcon from "@/components/ui/icons/FileIcon";

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
    /*     (nextRouter.useRouter as jest.Mock).mockImplementation(() => ({
        push: jest.fn(),
    })); */
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
                body: expect.any(FormData), // Ensures FormData was sent
            });
            expect(push).toHaveBeenCalledWith("/");
        });
    });
});

/* describe("App Component with LoginForm", () => {
    test("submits the form with username and password", () => {
        const mockConsoleLog = jest.spyOn(console, "log");
        render(<App />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: "john_doe" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: "123456" },
        });
        fireEvent.submit(screen.getByRole("button", { name: /login/i }));

        expect(mockConsoleLog).toHaveBeenCalledWith("Login data:", {
            username: "john_doe",
            password: "123456",
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});

describe("Comments Section", () => {
    it("allows users to add a comment to a post", async () => {
        const mockSubmitComment = jest.fn();
        render(<CommentForm onSubmit={mockSubmitComment} />);
        userEvent.type(
            screen.getByRole("textbox", { name: /add a comment/i }),
            "Nice pic!"
        );
        userEvent.click(screen.getByRole("button", { name: /post/i }));

        expect(mockSubmitComment).toHaveBeenCalledWith("Nice pic!");
    });

    it("displays an error if the comment fails to post", async () => {
        const mockSubmitComment = jest
            .fn()
            .mockRejectedValue(new Error("Failed to post comment"));
        render(<CommentForm onSubmit={mockSubmitComment} />);
        userEvent.click(screen.getByRole("button", { name: /post/i }));

        const errorAlert = await screen.findByRole("alert");
        expect(errorAlert).toHaveTextContent("Failed to post comment");
    });
});
 */
/*   describe('Feed', () => {
    it('loads posts on component mount', async () => {
      const mockFetchPosts = jest.fn().mockResolvedValue([{ id: 1, title: 'First post', content: 'Hello world!' }]);
      render(<Feed fetchPosts={mockFetchPosts} />);
      expect(mockFetchPosts).toHaveBeenCalled();
      
      const posts = await screen.findAllByRole('article');
      expect(posts).toHaveLength(1 */
