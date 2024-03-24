import { Image } from "sanity";

export type Comment = {
    username: string;
    image: string;
    comment: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
};

export type FullPost = {
    id: string;
    username: string;
    userImage: string;
    image: Image;
    likes: string[];
    text: string;
    comments: Comment[];
    createdAt: string;
};
