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
