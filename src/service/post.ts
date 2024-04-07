import { SimplePost } from "@/model/post";
import { client } from "../../sanity/lib/client";
import { urlForImage } from "../../sanity/lib/image";

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
    return client
        .fetch(
            `*[_type == "post" && author->username == "${username}" 
            || author._ref in *[_type == "user" && username == "${username}"].following[]._ref] 
            | order(_createdAt desc){
                ${simplePostProjection}
            }`
        )
        .then(formatDataIncludingImgURL);
}

export async function getPostById(id: string) {
    return client
        .fetch(
            `*[_type == "post" && _id == "${id}"][0]{
            ...,
            "username": author->username,
            "userImage": author->image,
            "image": photo,
            "likes": likes[]->username,
            comments[]{comment, "username": author->username, "image": author->image},
            "id": _id,
            "createdAt": _createdAt
        }
    `
        )
        .then((post) => ({ ...post, image: urlForImage(post.image) }));
}

export async function getPostsOf(username: string) {
    return client
        .fetch(
            `*[_type == "post" && author->username == "${username}"] 
            | order(_createdAt desc)
            {${simplePostProjection}}`
        )
        .then(formatDataIncludingImgURL);
}

export async function getLikedPostsOf(username: string) {
    return client
        .fetch(
            `*[_type == "post" && "${username}" in likes[]->username] 
            | order(_createdAt desc)
            {${simplePostProjection}}`,
            undefined,
            { cache: "no-store" }
        )
        .then(formatDataIncludingImgURL);
}

export async function getSavedPostsOf(username: string) {
    return client
        .fetch(
            `*[_type == "post" && _id in *[_type == "user" && username == "${username}"].bookmark[]._ref ] 
            | order(_createdAt desc)
            {${simplePostProjection}}`,
            undefined,
            { cache: "no-store" }
        )
        .then(formatDataIncludingImgURL);
}

function formatDataIncludingImgURL(posts: SimplePost[]) {
    return posts.map((post) => ({
        ...post,
        likes: post.likes ?? [],
        image: urlForImage(post.image),
    }));
}

export async function likePost(postId: string, userId: string) {
    return client
        .patch(postId)
        .setIfMissing({ likes: [] })
        .append("likes", [{ _ref: userId, _type: "reference" }])
        .commit({ autoGenerateArrayKeys: true });
}

export async function dislikePost(postId: string, userId: string) {
    return client
        .patch(postId)
        .unset([`likes[_ref == "${userId}"]`])
        .commit();
}

export async function addComment(
    postId: string,
    userId: string,
    comment: string
) {
    return client
        .patch(postId)
        .setIfMissing({ comments: [] })
        .append("comments", [
            {
                comment,
                author: { _ref: userId, _type: "reference" },
            },
        ])
        .commit({ autoGenerateArrayKeys: true });
}
