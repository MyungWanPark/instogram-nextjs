"use client";

import Link from "next/link";
import HomeIcon from "./ui/icons/HomeIcon";
import HomeFillIcon from "./ui/icons/HomeFillIcon";
import SearchIcon from "./ui/icons/SearchIcon";
import SearchFillIcon from "./ui/icons/SearchFillIcon";
import NewIcon from "./ui/icons/NewIcon";
import NewFillIcon from "./ui/icons/NewFillIcon";
import { usePathname } from "next/navigation";

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
        <div>
            <Link href="/">Instatgram</Link>
            <nav>
                <ul>
                    {menu.map(({ href, icon, clickedIcon }) => {
                        return (
                            <li key={href}>
                                <Link href={href}>
                                    {pathname === href ? clickedIcon : icon}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
