"use client";

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import { usePathname } from "next/navigation";
import ColorButton from "./ui/ColorButton";

const menu = [
    {
        href: "/",
        icon: <HomeIcon />,
        clickedIcon: <HomeFillIcon />,
    },
    {
        href: "/search",
        icon: <SearchIcon />,
        clickedIcon: <SearchFillIcon />,
    },
    {
        href: "/new",
        icon: <NewIcon />,
        clickedIcon: <NewFillIcon />,
    },
];

export default function Navbar() {
    const pathname = usePathname();
    return (
        <div className="flex items-center justify-between p-4">
            <Link href="/">Instatgram</Link>
            <nav>
                <ul className="flex gap-4 items-center">
                    {menu.map(({ href, icon, clickedIcon }) => {
                        return (
                            <li key={href}>
                                <Link href={href}>
                                    {pathname === href ? clickedIcon : icon}
                                </Link>
                            </li>
                        );
                    })}
                    <ColorButton text="Sign in" onClick={() => {}} />
                </ul>
            </nav>
        </div>
    );
}
