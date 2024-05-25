"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import ColorButton from "./ui/ColorButton";

type Props = {
    providers: Record<string, ClientSafeProvider>;
    callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
    return (
        <div className="flex flex-col gap-3">
            {Object.values(providers).map((provider) => {
                return (
                    <ColorButton
                        key={provider.id}
                        text={provider.name}
                        onClick={() => signIn(provider.id, { callbackUrl })}
                        size="big"
                    />
                );
            })}
        </div>
    );
}
