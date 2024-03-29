type Props = {
    text: string;
    onClick: () => void;
    isRed: boolean;
};

export default function Button({ text, onClick, isRed }: Props) {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 text-white rounded-md font-bold ${
                isRed ? "bg-red-500" : "bg-sky-500"
            }`}
        >
            {text}
        </button>
    );
}
