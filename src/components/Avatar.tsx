type AvatarSize = "small" | "medium" | "large";

type Props = {
    image: string;
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
                className={`object-cover rounded-full bg-white ${getImageSizeStyle(
                    size
                )}`}
                src={image}
                alt="avatar"
                referrerPolicy="no-referrer"
            />
        </div>
    );
}

function getContainerStyle(size: AvatarSize, heightLight: boolean): string {
    const baseStyle = "rounded-full flex justify-center items-center";
    const highLightStyle = heightLight
        ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
        : "";
    const sizeStyle = getContainerSizeStyle(size);
    return `${baseStyle} ${highLightStyle} ${sizeStyle}`;
}

function getContainerSizeStyle(size: AvatarSize): string {
    switch (size) {
        case "small":
            return "w-9 h-9";
        case "medium":
            return "w-11 h-11";
        case "large":
            return "w-[68px] h-[68px]";
    }
}

function getImageSizeStyle(size: AvatarSize): string {
    switch (size) {
        case "small":
            return "w-[34px] h-[34px] p-[0.1rem]";
        case "medium":
            return "w-[42px] h-[42px] p-[0.1rem]";
        case "large":
            return "w-16 h-16 p-[0.2rem]";
    }
}
