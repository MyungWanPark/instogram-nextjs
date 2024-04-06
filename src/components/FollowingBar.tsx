"use client";

import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/me";

export default function FollowingBar() {
    /* 
        1. 클라이언트에서 서버에게 자신의 팔로워 목록을 요청한다./api/me
        2. 서버에서 사용자의 요청 헤더를 파악해서 유저 정보를 얻어온다.
        3. 서버에서 사용자 정보를 기반으로 sanity에 following 목록을 조회한다.
        4. 서버가 응답으로 클라이언트로 사용자 목록을 되돌려준다.
    */
    const { user, isLoading: loading, error } = useMe();
    // const followings = data?.following;
    const followings = user?.following && [
        ...user.following,
        ...user.following,
        ...user.following,
        ...user.following,
    ];

    return (
        <section className="p-4 shadow-md rounded-lg w-full flex justify-center min-h-[90px] overflow-x-auto relative z-0">
            {loading && (
                <PropagateLoader
                    size={8}
                    color="red"
                    cssOverride={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                />
            )}
            {followings?.length === 0 && (
                <p>{`You don't have followings...`}</p>
            )}
            {followings && followings.length > 0 && (
                <ScrollableBar>
                    {followings?.map(({ username, image }) => {
                        return (
                            <Link
                                key={username}
                                href={`/user/${username}`}
                                className="flex flex-col items-center w-20 "
                            >
                                <Avatar image={image || ""} heightLight />
                                <p className="text-ellipsis overflow-hidden w-full text-center">
                                    {username}
                                </p>
                            </Link>
                        );
                    })}
                </ScrollableBar>
            )}
        </section>
    );
}
