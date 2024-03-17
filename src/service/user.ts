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
