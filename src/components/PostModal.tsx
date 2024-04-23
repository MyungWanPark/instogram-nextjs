import CloseIcon from "./ui/icons/CloseIcon";

type Props = {
    onClose: () => void;
    children: React.ReactNode;
};

export default function PostModal({ onClose, children }: Props) {
    return (
        <section
            className="fixed top-0 left-0 w-full h-full bg-slate-900/70 z-50 flex justify-center items-center"
            onClick={(event) => {
                if (event.target === event.currentTarget) {
                    onClose();
                }
            }}
        >
            <button onClick={onClose} className="fixed top-0 right-0 p-4">
                <CloseIcon />
            </button>
            <div className="bg-white w-3/5 h-3/5 max-w-7xl">{children}</div>
        </section>
    );
}
