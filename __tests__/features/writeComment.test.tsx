import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostDetail from "@/components/PostDetail";
import CommentForm from "@/components/CommentForm";

jest.mock("next/image", () => ({
    __esModule: true,
    default: () => {
        return <img />;
    },
}));
const mockSubmitComment = jest
    .fn()
    .mockImplementation((comment) =>
        console.log("Mock submitComment called with:", comment)
    );

jest.mock("@/hooks/detailPost", () => ({
    __esModule: true,
    default: jest.fn((id) => ({
        post: {
            comments: [
                {
                    comment: "Great post!",
                    username: "user1",
                    image: "path/to/image1",
                },
                {
                    comment: "Thanks for sharing!",
                    username: "user2",
                    image: "path/to/image2",
                },
            ],
        },
        submitComment: mockSubmitComment,
    })),
}));

describe("PostDetail", () => {
    it("renders comments correctly", () => {
        const post = {
            id: "post1",
            username: "author",
            userImage: "path/to/userImage",
            image: "path/to/image",
            likes: ["user1", "user2"],
            text: "Here is a sample post",
            comments: 2,
            createdAt: "2021-01-01",
        };

        render(<PostDetail post={post} />);

        expect(screen.getByText("Great post!")).toBeInTheDocument();
        expect(screen.getByText("Thanks for sharing!")).toBeInTheDocument();
    });

    it("allows a comment to be submitted when input is valid", () => {
        const onCommentSubmit = jest.fn();
        render(<CommentForm onCommentSubmit={onCommentSubmit} />);

        const input = screen.getByPlaceholderText("write a comment...");
        fireEvent.change(input, { target: { value: "Test comment" } });

        const submitButton = screen.getByRole("button", { name: /post/i });
        expect(submitButton).not.toBeDisabled();

        fireEvent.click(submitButton);

        expect(onCommentSubmit).toHaveBeenCalledTimes(1);
        expect(onCommentSubmit).toHaveBeenCalledWith("Test comment");
    });
});
