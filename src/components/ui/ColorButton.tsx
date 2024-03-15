type Props = {
    text: string;
    onClick: () => void;
    size?: "big" | "small";
};

export default function ColorButton({ text, onClick, size = "small" }: Props) {
    return (
        <div
            className={`bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem] ${
                size === "big" ? "p-[0.3rem]" : "p-[0.15rem]"
            }`}
        >
            <button
                onClick={onClick}
                className={`bg-white p-[0.3rem] rounded-sm hover:opacity-90 transition-opacity ${
                    size === "big" ? "text-2xl p-5" : "text-base"
                }`}
            >
                {text}
            </button>
        </div>
    );
}
