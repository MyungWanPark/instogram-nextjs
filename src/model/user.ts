export type User = {
    name: string;
    username: string;
    email: string;
    image?: string;
};

export type SimpleUser = Pick<User, "username" | "image">;

export type DetailUser = User & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmark: string[];
};

export type SearchUserResult = User & {
    following: number;
    followers: number;
};
