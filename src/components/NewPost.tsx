"use client";

import { AuthUser } from "@/model/user";
import UserProfile from "./UserProfile";
import PostUserAvatar from "./PostUserAvatar";
import FileIcon from "./ui/icons/FileIcon";
import Button from "./ui/Button";
import React, { ChangeEvent, useState } from "react";

type Props = {
    user: AuthUser;
};

export default function NewPost({ user: { username, image } }: Props) {
    const [isDrag, setIsDrag] = useState(false);
    const [file, setFile] = useState<File>();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const files = e.target.files;
        if (files && files[0]) {
            setFile(files[0]);
            console.log(file);
        }
    };
    const handleDrag = (e: React.DragEvent) => {
        if (e.type === "dragenter") {
            setIsDrag(true);
        } else if (e.type === "dragleave") {
            setIsDrag(false);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDragDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDrag(false);
        const files = e.dataTransfer.files;
        if (files && files[0]) {
            setFile(files[0]);
            console.log(files[0]);
        }
    };
    return (
        <section>
            <PostUserAvatar userImage={image || ""} username={username} />
            <form>
                <input
                    type="file"
                    name="input-image"
                    id="input-image"
                    className="hidden"
                    onChange={handleChange}
                    accept="image/*"
                />
                <label
                    htmlFor="input-image"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDragOver}
                    onDrop={handleDragDrop}
                >
                    <FileIcon />
                    <p>Drag and Drop your image here or click</p>
                </label>
                <textarea
                    name="text"
                    id="input-text"
                    rows={10}
                    placeholder="Write a caption..."
                />
                <Button text="publish" onClick={() => {}} />
            </form>
        </section>
    );
}
