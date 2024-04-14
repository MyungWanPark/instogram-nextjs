import GridSpinner from "./GridSpinner";
import PostGridCard from "./PostGridCard";
import usePosts from "@/hooks/posts";

export default function PostGrid() {
    const { posts, isLoading } = usePosts();
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
