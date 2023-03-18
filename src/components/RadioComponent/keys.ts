import type {InjectionKey} from "vue";

const CHANGE_INPUT: InjectionKey<() => void> = Symbol('CHANGE_INPUT');
const CURRENT_VALUE: InjectionKey<string> = Symbol('CURRENT_VALUE');

export {CHANGE_INPUT, CURRENT_VALUE}