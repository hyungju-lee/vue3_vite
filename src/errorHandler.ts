import type { ComponentPublicInstance } from "vue";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";
import emitter from "@/utils/eventBus";

export const KAKAO_PAGE_IS_MORE_THAN_MAX = 'page is more than max'; // 카카오 이미지 검색: 더 이상 검색결과가 없을 때

const errorHandler = (
    err: AxiosError | unknown,
    instance: ComponentPublicInstance | null,
    info: string
) => {
    if (isAxiosError(err)) {
        if (err.response?.status === 400) { // 400 에러
            const msg = err.response?.data.message;
            switch (msg) {
                case KAKAO_PAGE_IS_MORE_THAN_MAX: // 더 이상 검색결과가 없을 때
                    emitter.emit(`error:${KAKAO_PAGE_IS_MORE_THAN_MAX}`, msg);
                    break;
                default:
                    break;
            }
        }
    } else {
        emitter.emit('error:script', err); // 스크립트 에러
    }
};

export default errorHandler;
