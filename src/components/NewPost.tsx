"use client";

import { AuthUser } from "@/model/user";
import UserProfile from "./UserProfile";
import PostUserAvatar from "./PostUserAvatar";
import FileIcon from "./ui/icons/FileIcon";
import Button from "./ui/Button";
import React, { ChangeEvent, useState } from "react";
import Image from "next/image";

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
        <section className="w-full max-w-xl flex flex-col items-center mt-6">
            <PostUserAvatar userImage={image || ""} username={username} />
            <form className="w-full flex flex-col">
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
                    className={`w-full h-60 flex flex-col items-center justify-center ${
                        !file && "border-2 border-sky-500 border-dashed"
                    }`}
                >
                    {isDrag && (
                        <div className="fixed inset-0 z-10 bg-sky-500/20 pointer-events-none"></div>
                    )}
                    {!file && (
                        <div className="flex flex-col items-center justify-center pointer-events-none">
                            <FileIcon />
                            <p>Drag and Drop your image here or click</p>
                        </div>
                    )}
                    {file && (
                        <div className="relative w-full aspect-square">
                            <Image
                                src={URL.createObjectURL(file)}
                                alt="local-file"
                                fill
                                sizes="650px"
                                className="object-cover"
                            />
                        </div>
                    )}
                </label>

                <textarea
                    name="text"
                    id="input-text"
                    rows={10}
                    required
                    placeholder="Write a caption..."
                    className="outline-none text-lg border border-neutral-300"
                />
                <Button text="publish" onClick={() => {}} />
            </form>
        </section>
    );
}
