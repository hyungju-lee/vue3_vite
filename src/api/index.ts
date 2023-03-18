import axios from "axios";
import setKakaoInterceptors from "@/api/kakaoInterceptors";

const config = {
    timeout: 60 * 1000,
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
}

const kakaoSearchApiConfig = {
    ...config,
    baseURL: import.meta.env.VITE_KAKAO_SEARCH_APP_BASE_URL,
}

const kakaoSearchInstance = axios.create(kakaoSearchApiConfig);
setKakaoInterceptors(kakaoSearchInstance);

export {kakaoSearchInstance}