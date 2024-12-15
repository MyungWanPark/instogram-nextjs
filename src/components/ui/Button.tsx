type Props = {
    text: string;
    onClick: () => void;
    isRed?: boolean;
    disabled?: boolean;
};

export default function Button({
    text,
    onClick,
    isRed,
    disabled = false,
}: Props) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-6 text-white rounded-md font-bold ${
                isRed ? "bg-red-500" : "bg-sky-500"
            } ${disabled ? "opacity-80" : ""}`}
            disabled={disabled}
        >
            {text}
        </button>
    );
}
