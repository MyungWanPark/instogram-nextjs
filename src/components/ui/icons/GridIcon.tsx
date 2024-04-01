import { CiGrid41 } from "react-icons/ci";

type Props = {
    className?: string;
};

export default function GridIcon({ className }: Props) {
    return <CiGrid41 className={className || "w-9 h-9"} />;
}
