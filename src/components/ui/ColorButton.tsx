import GoogleIcon from "./icons/GoogleIcon";
import GuestIcon from "./icons/GuestIcon";
import KakaoIcon from "./icons/KakaoIcon";

type Props = {
    text: string;
    onClick: () => void;
    size?: "big" | "small";
};

const InstagramColor =
    "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300";

const ColorsClass = [
    {
        text: "Sign out",
        color: InstagramColor,
        icon: "",
    },
    {
        text: "Sign in",
        color: InstagramColor,
        icon: "",
    },
    {
        text: "Google",
        color: "bg-google",
        icon: <GoogleIcon />,
    },
    {
        text: "Kakao",
        color: "bg-kakao",
        icon: <KakaoIcon />,
    },
    {
        text: "Guest",
        color: "bg-guest",
        icon: <GuestIcon />,
    },
];

export default function ColorButton({ text, onClick, size = "small" }: Props) {
    const buttonColor =
        ColorsClass.find((item) => item.text === text)?.color ?? InstagramColor;
    const icon =
        ColorsClass.find((item) => item.text === text)?.icon ?? undefined;

    return (
        <div
            className={`${buttonColor} p-[0.15rem] ${
                size === "big" && "rounded-lg"
            }`}
        >
            <button
                onClick={onClick}
                className={`w-full bg-white p-[0.3rem] rounded-sm hover:opacity-90 transition-opacity flex items-center gap-2 ${
                    size === "big"
                        ? "text-2xl !rounded-md py-3 sm:px-16 px-10"
                        : "text-base"
                }`}
            >
                {icon && <span>{icon}</span>}
                <span>{text}</span>
            </button>
        </div>
    );
}
