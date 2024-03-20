type Props = {
    image: string;
    size?: "small" | "normal";
    heightLight?: boolean;
};

export default function Avatar({
    image,
    size = "normal",
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

function getContainerStyle(
    size: "small" | "normal",
    heightLight: boolean
): string {
    const baseStyle = "rounded-full flex justify-center items-center";
    const highLightStyle = heightLight
        ? "bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300"
        : "";
    const sizeStyle = size === "small" ? "w-9 h-9" : "w-[68px] h-[68px]";
    return `${baseStyle} ${highLightStyle} ${sizeStyle}`;
}

function getImageSizeStyle(size: "small" | "normal"): string {
    return size === "small"
        ? "w-[34px] h-[34px] p-[0.1rem]"
        : "w-16 h-16 p-[0.2rem]";
}
