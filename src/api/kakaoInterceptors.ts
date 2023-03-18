import type {AxiosInstance, InternalAxiosRequestConfig} from "axios";

function setKakaoInterceptors(instance: AxiosInstance): AxiosInstance {
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            // config.headers.Authorization 카카오 REST API KEY 설정
            config.headers.Authorization = `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`;
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    instance.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            return Promise.reject(error);
        }
    )

    return instance;
}

export default setKakaoInterceptors;