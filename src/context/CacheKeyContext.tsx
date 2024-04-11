import { createContext, useContext } from "react";

type CacheKey = {
    postApiKey: string;
};

export const CacheKeyContext = createContext<CacheKey>({
    postApiKey: "/api/posts",
});

export const useCacheKey = () => useContext(CacheKeyContext);
