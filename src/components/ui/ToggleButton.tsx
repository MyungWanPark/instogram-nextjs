type Props = {
    toggled: boolean;
    onToggle: (toggled: boolean) => void;
    outlineIcon: React.ReactNode;
    fillIcon: React.ReactNode;
};

export default function ToggleButton({
    toggled,
    onToggle,
    outlineIcon,
    fillIcon,
}: Props) {
    return (
        <button onClick={() => onToggle(!toggled)}>
            {toggled ? fillIcon : outlineIcon}
        </button>
    );
}
