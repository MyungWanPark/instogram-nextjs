import { ProfileUser, SearchUserResult } from "@/model/user";
import { client } from "../../sanity/lib/client";

type OAuthUser = {
    id: string;
    username: string;
    name: string;
    email: string;
    image?: string | null;
};

export async function addUser({ id, username, name, email, image }: OAuthUser) {
    return client.createIfNotExists({
        _id: id,
        _type: "user",
        username,
        name,
        email,
        image: image || "",
        followers: [],
        following: [],
        bookmark: [],
    });
}

export async function getUserByUsername(username: string) {
    return client.fetch(`*[_type == 'user' && username == "${username}"]{
        ...,
        "id":_id,
        following[]->{username, image},
        followers[]->{username, image},
        "bookmark": bookmark[]->_id
    }[0]`);
}

export async function searchUsers(keyword?: string) {
    const query = keyword
        ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
        : "";
    return client
        .fetch(
            `*[_type == "user" ${query}]{
        ...,
        "following": count(following),
        "followers": count(followers)
    }`
        )
        .then((users: SearchUserResult[]) =>
            users.map((user) => ({
                ...user,
                following: user.following ?? 0,
                followers: user.followers ?? 0,
            }))
        );
}

export async function getUserProfileBy(username: string): Promise<ProfileUser> {
    return client
        .fetch(
            `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type == "post" && author->username == "${username}"])
    }`,
            undefined,
            { cache: "no-store" }
        )
        .then((user) => ({
            ...user,
            following: user.following ?? 0,
            followers: user.followers ?? 0,
            posts: user.posts ?? 0,
        }));
}

export async function addBookmark(userId: string, postId: string) {
    return client
        .patch(userId)
        .setIfMissing({ bookmark: [] })
        .append("bookmark", [{ _ref: postId, _type: "reference" }])
        .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
    return client
        .patch(userId)
        .unset([`bookmark[_ref == "${postId}"]`])
        .commit();
}

export async function follow(myId: string, targetId: string) {
    return client //
        .transaction()
        .patch(myId, (user) =>
            user
                .setIfMissing({ follow: [] })
                .append("following", [{ _ref: targetId, _type: "reference" }])
        )
        .patch(targetId, (targetUser) =>
            targetUser
                .setIfMissing({ followers: [] })
                .append("followers", [{ _ref: myId, _type: "reference" }])
        )
        .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(myId: string, targetId: string) {
    return client //
        .transaction()
        .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
        .patch(targetId, (targetUser) =>
            targetUser.unset([`followers[_ref=="${myId}"]`])
        )
        .commit();
}
