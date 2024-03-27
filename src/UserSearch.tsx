"use client";

import { useState } from "react";
import useSWR from "swr";

export default function UserSearch() {
    const [keyword, setKeyword] = useState("bo");
    const { data, isLoading, error } = useSWR(`/api/search/${keyword}`);
    console.log("data = ", data);
    return <></>;
}
