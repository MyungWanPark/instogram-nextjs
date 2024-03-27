import UserSearch from "@/UserSearch";

export default function SearchPage() {
    /* 
        1. /api/search/keyword 로 검색
            해당 유저 검색
        2. /api/search 로 검색
            모든 유저 검색
    */
    return <UserSearch />;
}
