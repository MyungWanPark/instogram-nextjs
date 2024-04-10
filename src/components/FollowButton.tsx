"use client";

import { ProfileUser } from "@/model/user";
import Button from "./ui/Button";
import useMe from "@/hooks/me";
import { revalidatePath } from "@/app/actions";
import { useState, useTransition } from "react";
import { PulseLoader } from "react-spinners";

type Props = {
    user: ProfileUser;
};
export default function FollowButton({ user }: Props) {
    const { user: logginUser, toggleFollow, error, isLoading } = useMe();
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const isUpdating = isPending || isFetching;

    const showButton = logginUser && logginUser.username !== user.username;
    const isFollowing = !!(
        logginUser &&
        logginUser.following.find(
            (followingUser) => followingUser.username === user.username
        )
    );

    const handleFollow = async () => {
        setIsFetching(true);
        startTransition(() => {
            toggleFollow(user.id, !isFollowing)
                .then(() => setIsFetching(false))
                .then(() => revalidatePath(`/user/${user.username}`));
        });
    };

    return (
        <>
            {showButton && (
                <div className="relative">
                    {isUpdating && (
                        <div className="absolute inset-0 z-20 flex justify-center items-center">
                            <PulseLoader size={6} />
                        </div>
                    )}
                    <Button
                        text={isFollowing ? "Unfollow" : "Follow"}
                        onClick={handleFollow}
                        isRed={isFollowing}
                        disabled={isUpdating}
                    />
                </div>
            )}
        </>
    );
}
