import {sortType} from "@/stores/search";

const isFunctionType = (a: unknown): a is Function => typeof a === "function";
const isHtmlElement = (a: unknown): a is HTMLElement => (
    typeof a === 'object' &&
    a !== null &&
    a instanceof HTMLElement
)
const isTextInputElement = (a: unknown): a is HTMLInputElement => (
    typeof a === 'object' &&
    a !== null &&
    a instanceof HTMLInputElement &&
    a.type === 'text'
)
const isRadioInputElement = (a: unknown): a is HTMLInputElement => (
    typeof a === 'object' &&
    a !== null &&
    a instanceof HTMLInputElement &&
    a.type === 'radio'
)
const isSortType = (a: unknown): a is sortType => {
    return Object.values(sortType).includes(a as sortType);
}

export {isFunctionType, isTextInputElement, isRadioInputElement, isSortType, isHtmlElement}