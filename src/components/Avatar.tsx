type AvatarSize = "small" | "medium" | "large" | "xlarge";

type Props = {
    image?: string;
    size?: AvatarSize;
    heightLight?: boolean;
};

export default function Avatar({
    image,
    size = "large",
    heightLight = false,
}: Props) {
    return (
        <div className={getContainerStyle(size, heightLight)}>
            <img
                className={`object-cover rounded-full bg-white ${
                    getSizeStyle(size).image
                }`}
                src={image}
                alt="avatar"
                referrerPolicy="no-referrer"
            />
        </div>
    );
}

function getContainerStyle(size: AvatarSize, heightLight: boolean): string {
    const baseStyle = "rounded-full flex justify-center items-center shrink-0";
    const highLightStyle = heightLight
        ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
        : "";
    const sizeStyle = getSizeStyle(size).containenr;
    return `${baseStyle} ${highLightStyle} ${sizeStyle}`;
}

type ImageSize = {
    containenr: string;
    image: string;
};

function getSizeStyle(size: AvatarSize): ImageSize {
    switch (size) {
        case "small":
            return {
                containenr: "w-9 h-9",
                image: "w-[34px] h-[34px] p-[0.1rem]",
            };
        case "medium":
            return {
                containenr: "w-11 h-11",
                image: "w-[42px] h-[42px] p-[0.1rem]",
            };
        case "large":
            return {
                containenr: "w-[68px] h-[68px]",
                image: "w-16 h-16 p-[0.2rem]",
            };
        case "xlarge":
            return {
                containenr: "w-[142px] h-[142px]",
                image: "w-[138px] h-[138px] p-[0.25rem]",
            };
        default:
            throw new Error(`size ${size} is not defined`);
    }
}
