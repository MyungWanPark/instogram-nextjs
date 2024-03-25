import SmileIcon from "./ui/icons/SmileIcon";

export default function CommentForm() {
    return (
        <form className="flex items-center px-2 border-t border-gray-200">
            <SmileIcon />
            <input
                type="text"
                placeholder="write a comment..."
                className="p-2 outline-none w-full"
            />
            <button className="text-sky-500 font-bold ml-2">post</button>
        </form>
    );
}
