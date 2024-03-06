import { type SchemaTypeDefinition } from "sanity";
import user from "./schemas/user";
import post from "./schemas/post";
export const schema: { types: SchemaTypeDefinition[] } = {
    types: [user, post],
};
