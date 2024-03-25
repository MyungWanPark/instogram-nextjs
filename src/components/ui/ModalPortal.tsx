import { createPortal } from "react-dom";

type Props = {
    children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
    if (typeof window === "undefined") {
        // 클라이언트가 브라우저 환경이 아닐 경우 ex. ssr, ssg 사용 못하게 함.
        return null;
    }
    const portal = document.getElementById("modalPortal") as Element;
    return createPortal(children, portal);
}
