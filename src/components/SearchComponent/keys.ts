import type {InjectionKey, Ref} from "vue";

const CLICK_SEARCH_BUTTON: InjectionKey<(e: Event) => void> = Symbol('CLICK_SEARCH_BUTTON');
const ENTER_SEARCH_INPUT: InjectionKey<(e: KeyboardEvent, value: string) => void> = Symbol('ENTER_SEARCH_INPUT');
const KEYUP_SEARCH_INPUT: InjectionKey<(e: KeyboardEvent, value: string) => void> = Symbol('KEYUP_SEARCH_INPUT');
const FOCUS_INPUT: InjectionKey<() => void> = Symbol('FOCUS_INPUT');
const UPDOWN_SEARCH_INPUT: InjectionKey<(e: KeyboardEvent) => void> = Symbol('UPDOWN_SEARCH_INPUT')
const UPDOWN_SEARCH_LIST: InjectionKey<(e: KeyboardEvent) => void> = Symbol('UPDOWN_SEARCH_LIST');
const CLICK_SEARCH_LIST: InjectionKey<(e: Event) => void> = Symbol('ENTER_SEARCH_LIST')

const SEARCH_INPUT: InjectionKey<Ref> = Symbol('SEARCH_INPUT');
const SEARCH_LISTS: InjectionKey<Ref> = Symbol('SEARCH_LISTS');
const SEARCH_INPUT_VALUE: InjectionKey<Ref> = Symbol('SEARCH_INPUT_VALUE')
const SEARCH_LISTS_POSITION: InjectionKey<Ref> = Symbol('SEARCH_LISTS_POSITION')
const CHECK_SEARCH_BOX_POSITION: InjectionKey<() => void> = Symbol('CHECK_SEARCH_BOX_POSITION')

const ESC_SEARCH_INPUT: InjectionKey<() => void> = Symbol('ESC_SEARCH_INPUT');
const DELETE_SEARCH_KEYWORD: InjectionKey<() => void> = Symbol('DELETE_SEARCH_KEYWORD');

export {
    CLICK_SEARCH_BUTTON,
    ENTER_SEARCH_INPUT,
    KEYUP_SEARCH_INPUT,
    SEARCH_INPUT,
    FOCUS_INPUT,
    UPDOWN_SEARCH_INPUT,
    SEARCH_LISTS,
    UPDOWN_SEARCH_LIST,
    CLICK_SEARCH_LIST,
    SEARCH_INPUT_VALUE,
    SEARCH_LISTS_POSITION,
    CHECK_SEARCH_BOX_POSITION,
    ESC_SEARCH_INPUT,
    DELETE_SEARCH_KEYWORD
}