import { client } from "../../sanity/lib/client";

const simplePostProjection = `
    ...,
    "username": author->username,
    "userImage": author->image,
    "image": photo,
    "likes": likes[]->username,
    "text": comments[0].comment,
    "comments": count(comments),
    "id": _id,
    "createdAt":_createdAt
`;

export async function getFollowingPostsBy(username: string) {
    return client.fetch(
        `*[_type == "post" && author->username == "${username}" || author._ref in *[_type == "user" && username == "${username}"].following[]._ref] | order(_createdAt desc){${simplePostProjection}}`
    );
}
