import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "User Search",
    description: "Search Users to follow",
};

export default function SearchPage() {
    return <UserSearch />;
}
