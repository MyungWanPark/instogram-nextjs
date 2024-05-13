import { render, screen, act, waitFor } from "@testing-library/react";
import useSWR from "swr";
import "@testing-library/jest-dom";
import PostList from "@/components/PostList";
type mockType = {
    post: { title: string };
};

jest.mock("swr");
jest.mock("@/components/PostCard", () => ({ post: { title } }: mockType) => (
    <div>{title}</div>
));

const mockUseSWR = useSWR as jest.MockedFunction<typeof useSWR>;

describe("PostList Component", () => {
    it("shows loading spinner when data is being fetched", async () => {
        mockUseSWR.mockReturnValue({
            data: undefined,
            error: undefined,
            isLoading: true,
            mutate: jest.fn(),
            isValidating: true,
        });
        await act(async () => {
            render(<PostList />);
        });
        const girdSpinner = screen.getByTestId("loading-spinner");

        await waitFor(() => expect(girdSpinner).toBeInTheDocument());
    });

    it("renders posts correctly after fetching data", async () => {
        const posts = [
            { id: "1", title: "Post 1" },
            { id: "2", title: "Post 2" },
        ];
        mockUseSWR.mockReturnValue({
            data: posts,
            error: undefined,
            isLoading: false,
            mutate: jest.fn(),
            isValidating: false,
        });

        render(<PostList />);
        expect(screen.getByText("Post 1")).toBeInTheDocument();
        expect(screen.getByText("Post 2")).toBeInTheDocument();
    });
});
