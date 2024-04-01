import { SimplePost } from "@/model/post";
import GridSpinner from "./GridSpinner";
import { Tab } from "./UserPosts";
import useSWR from "swr";
import PostGridCard from "./PostGridCard";

type Props = {
    username: string;
    query: Tab;
};

export default function PostGrid({ username, query }: Props) {
    const {
        data: posts,
        isLoading,
        error,
    } = useSWR<SimplePost[]>(`/api/user/${username}/${query}`);
    return (
        <div className="w-full">
            {isLoading && (
                <div className="flex h-36 items-center justify-center">
                    <GridSpinner />
                </div>
            )}
            <ul className="grid grid-cols-3 gap-4 py-2 px-8">
                {posts &&
                    posts.map((post, id) => (
                        <li key={post.id}>
                            <PostGridCard post={post} priority={id < 6} />
                        </li>
                    ))}
            </ul>
        </div>
    );
}
