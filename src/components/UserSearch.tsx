"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchUserResult } from "../model/user";
import GridSpinner from "./GridSpinner";

export default function UserSearch() {
    const [keyword, setKeyword] = useState("bo");
    const {
        data: users,
        isLoading,
        error,
    } = useSWR<SearchUserResult[]>(`/api/search/${keyword}`);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    value={keyword}
                    placeholder="Enter a Username or name..."
                    autoFocus
                    onChange={(e) => setKeyword(e.target.value)}
                />
            </form>
            {error && <p>Something went wrong...</p>}
            {isLoading && <GridSpinner />}
            {!isLoading && !error && users?.length === 0 && (
                <p>검색 결과가 없습니다.</p>
            )}
            {users && (
                <ul>
                    {users.map((user, id) => (
                        <li key={user.username}>
                            <p>{user.username}</p>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
}
