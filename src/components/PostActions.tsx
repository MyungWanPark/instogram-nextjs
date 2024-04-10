import HeartIcon from "./ui/icons/HeartIcon";
import BookmarkIcon from "./ui/icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import ToggleButton from "./ui/ToggleButton";
import HeartFillIcon from "./ui/icons/HeartFillIcon";
import BookmarkFillIcon from "./ui/icons/BookmarkFillIcon";
import { Comment, SimplePost } from "@/model/post";
import usePosts from "@/hooks/posts";
import useMe from "@/hooks/me";
import CommentForm from "./CommentForm";

type Props = {
    post: SimplePost;
    children?: React.ReactNode;
    onComment: (comment: Comment) => void;
    cacheKey?: string;
};

export default function PostActions({
    post,
    children,
    onComment,
    cacheKey,
}: Props) {
    const { id, likes, text, username, createdAt } = post;
    const { user, setBookmark } = useMe();

    const liked = user ? likes.includes(user.username) : false;
    const bookmarked = user?.bookmark.includes(id) ?? false;
    console.log("cacheKey in PostActions = ", cacheKey);
    const { setLike } = usePosts(cacheKey);

    const handleLike = (like: boolean) => {
        user && setLike(post, like, user.username);
    };

    const handleBookmark = (bookmark: boolean) => {
        user && setBookmark(id, bookmark);
    };

    const handleComment = (comment: string) => {
        user &&
            onComment({ username: user.username, image: user.image, comment });
    };

    return (
        <>
            <div className="flex justify-between p-2 text-xl font-bold">
                <ToggleButton
                    toggled={liked}
                    onToggle={handleLike}
                    outlineIcon={<HeartIcon />}
                    fillIcon={<HeartFillIcon />}
                />
                <ToggleButton
                    toggled={bookmarked}
                    onToggle={handleBookmark}
                    outlineIcon={<BookmarkIcon />}
                    fillIcon={<BookmarkFillIcon />}
                />
            </div>
            <p className="px-2 text-gray-900 font-bold text-md">
                {likes?.length ?? 0} {likes.length > 1 ? "likes" : "like"}
            </p>
            {children}
            <p className="text-gray-500 px-2 py-1 text-sm">
                {parseDate(createdAt)}
            </p>
            <CommentForm onCommentSubmit={handleComment} />
        </>
    );
}
