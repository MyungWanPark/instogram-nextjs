import { SchemaTypeDefinition } from "sanity";

export default <SchemaTypeDefinition>{
    title: "User",
    name: "user",
    type: "document",
    fields: [
        {
            title: "Username",
            name: "username",
            type: "string",
        },
        {
            title: "Name",
            name: "name",
            type: "string",
        },
        {
            title: "Email",
            name: "email",
            type: "string",
        },
        {
            title: "Image",
            name: "image",
            type: "string",
        },
        {
            title: "Following",
            name: "following",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "user",
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: "Followers",
            name: "followers",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "user",
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
        {
            title: "Bookmark",
            name: "bookmark",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [
                        {
                            type: "post",
                        },
                    ],
                },
            ],
            validation: (Rule) => Rule.unique(),
        },
    ],
};
