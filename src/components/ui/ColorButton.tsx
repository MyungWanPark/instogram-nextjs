type Props = {
    text: string;
    onClick: () => void;
};

export default function ColorButton({ text, onClick }: Props) {
    return (
        <div className="bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
            <button
                onClick={onClick}
                className="bg-white p-[0.3rem] rounded-sm hover:opacity-90 transition-opacity"
            >
                {text}
            </button>
        </div>
    );
}
