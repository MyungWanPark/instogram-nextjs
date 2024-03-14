import { GET } from "@/app/api/auth/[...nextauth]/route";
import SignIn from "@/components/SignIn";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";

export default async function SignInPage() {
    const session = await getServerSession(GET);
    if (session) {
        return redirect("/");
    }
    const providers = await getProviders();

    return (
        <section className="flex justify-center mt-[5rem]">
            <SignIn providers={providers ?? {}} />
        </section>
    );
}
