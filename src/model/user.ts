export type AuthUser = {
    id: string;
    name: string;
    username: string;
    email: string;
    image?: string;
};

export type SimpleUser = Pick<AuthUser, "username" | "image">;

export type HomeUser = AuthUser & {
    following: SimpleUser[];
    followers: SimpleUser[];
    bookmark: string[];
};

export type SearchUserResult = AuthUser & {
    following: number;
    followers: number;
};

export type ProfileUser = SearchUserResult & {
    posts: number;
};
