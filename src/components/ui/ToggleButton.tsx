type Props = {
    toggled: boolean;
    onToggle: (toggled: boolean) => void;
    outlineIcon: React.ReactNode;
    fillIcon: React.ReactNode;
    title: string;
};

export default function ToggleButton({
    toggled,
    onToggle,
    outlineIcon,
    fillIcon,
    title,
}: Props) {
    return (
        <button onClick={() => onToggle(!toggled)} aria-label={title}>
            {toggled ? fillIcon : outlineIcon}
        </button>
    );
}
