type ButtonText = "Sign out" | "Sign in" | "Google" | "Guest";

type Props = {
    text: string;
    onClick: () => void;
    size?: "big" | "small";
};

const InstagramColor =
    "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300";

const GuestColor = "bg-gradient-to-bl from-lime-600 via-lime-400 to-lime-200";

const ColorsClass = [
    {
        text: "Google",
        color: "bg-google",
    },
    {
        text: "Sign out",
        color: InstagramColor,
    },
    {
        text: "Sign in",
        color: InstagramColor,
    },
    { text: "Guest", color: "bg-guest" },
];

export default function ColorButton({ text, onClick, size = "small" }: Props) {
    const buttonColor =
        ColorsClass.find((item) => item.text === text)?.color ?? InstagramColor;
    const isNavBtn = size === "small";
    const isGuest = text === "Guest";

    return (
        <div
            className={`${buttonColor} ${
                size === "big" ? "p-[0.2rem]" : "p-[0.15rem]"
            }`}
        >
            <button
                onClick={onClick}
                className={`w-full bg-white p-[0.3rem] rounded-sm hover:opacity-90 transition-opacity ${
                    size === "big" ? "text-2xl p-5" : "text-base"
                }`}
            >
                {isNavBtn && text}
                {isGuest && `I 'm ${text}`}
                {!isNavBtn && !isGuest && `Log in as ${text}`}
            </button>
        </div>
    );
}
