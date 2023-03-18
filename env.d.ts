/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_KAKAO_SEARCH_API_PROXY: string;
    readonly VITE_KAKAO_SEARCH_APP_BASE_URL: string;
    readonly VITE_KAKAO_REST_API_KEY: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}