"use client";

import useSWR from "swr";

export default function FollowingBar() {
    /* 
        1. 클라이언트에서 서버에게 자신의 팔로워 목록을 요청한다./api/me
        2. 서버에서 사용자의 요청 헤더를 파악해서 유저 정보를 얻어온다.
        3. 서버에서 사용자 정보를 기반으로 sanity에 following 목록을 조회한다.
        4. 서버가 응답으로 클라이언트로 사용자 목록을 되돌려준다.
    */
    const { data, isLoading, error } = useSWR("/api/me");
    console.log("data = ", data);
    return <p>FollowingBar</p>;
}
