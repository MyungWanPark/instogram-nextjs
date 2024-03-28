"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import { SearchUserResult } from "../model/user";
import GridSpinner from "./GridSpinner";
import UserSearchCard from "./UserSearchCard";

export default function UserSearch() {
    const [keyword, setKeyword] = useState("");
    const {
        data: users,
        isLoading,
        error,
    } = useSWR<SearchUserResult[]>(`/api/search/${keyword}`);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <section className="flex flex-col items-center w-full max-w-2xl my-3">
            <form onSubmit={onSubmit} className="w-full">
                <input
                    type="text"
                    value={keyword}
                    placeholder="Enter a Username or name..."
                    autoFocus
                    onChange={(e) => setKeyword(e.target.value)}
                    className="w-full outline-none border border-neutral-300 p-3"
                />
            </form>
            {error && <p>Something went wrong...</p>}
            {isLoading && <GridSpinner />}
            {!isLoading && !error && users?.length === 0 && (
                <p>검색 결과가 없습니다.</p>
            )}
            {users && (
                <ul className="w-full py-4">
                    {users.map((user, id) => (
                        <li key={user.username}>
                            <UserSearchCard user={user} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
