import { SearchUserResult } from "@/model/user";
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
    });
}

export async function getUserByUsername(username: string) {
    return client.fetch(`*[_type == 'user' && username == "${username}"]{
        ...,
        "id":_id,
        following[]->{username, image},
        followers[]->{username, image}
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

export async function getUserProfileBy(username: string) {
    return client
        .fetch(
            `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type == "post" && author->username == "${username}"])
    }`
        )
        .then((user) => ({
            ...user,
            following: user.following ?? 0,
            followers: user.followers ?? 0,
            posts: user.posts ?? 0,
        }));
}
