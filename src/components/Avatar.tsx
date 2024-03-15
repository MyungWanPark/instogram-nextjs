type Props = {
    image: string;
};

export default function Avatar({ image }: Props) {
    return (
        <div className="w-9 h-9 rounded-full bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300 p-[0.15rem]">
            <img
                className="w-full rounded-full p-[0.05rem] border-white border-[0.5px]"
                src={image}
                alt="avatar"
                referrerPolicy="no-referrer"
            />
        </div>
    );
}
