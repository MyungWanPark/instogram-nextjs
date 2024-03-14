"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
    providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: Props) {
    return (
        <>
            {Object.values(providers).map((provider) => (
                <ColorButton
                    key={provider.id}
                    text={`Sign in with ${provider.name}`}
                    onClick={() => signIn(provider.id)}
                    size="big"
                />
            ))}
        </>
    );
}
