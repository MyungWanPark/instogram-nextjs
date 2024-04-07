export type Comment = {
    username: string;
    image?: string | undefined;
    comment: string;
};

export type SimplePost = Omit<FullPost, "comments"> & {
    comments: number;
};

export type FullPost = {
    id: string;
    username: string;
    userImage: string;
    image: string;
    likes: string[];
    text: string;
    comments: Comment[];
    createdAt: string;
};
