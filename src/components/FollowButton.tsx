"use client";

import { HomeUser, ProfileUser } from "@/model/user";
import useSWR from "swr";
import Button from "./ui/Button";

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { data: logginUser, error, isLoading } = useSWR<HomeUser>("/api/me");

    const showButton = logginUser && logginUser.username !== user.username;
    const isFollowing = !!(
        logginUser &&
        logginUser.following.find(
            (followingUser) => followingUser.username === user.username
        )
    );
    return (
        <>
            {showButton && (
                <Button
                    text={isFollowing ? "Unfollow" : "Follow"}
                    onClick={() => {}}
                    isRed={isFollowing}
                />
            )}
        </>
    );
}
