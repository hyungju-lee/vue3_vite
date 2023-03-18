<script setup lang="ts">
import {onMounted, onUnmounted, provide, ref} from "vue";
import {
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
} from "@/components/SearchComponent/keys";
import {setLocalStorageArrayData, getLocalStorage, removeLocalStorageArrayData} from "@/utils/localStorage";
import {isTextInputElement, isHtmlElement} from '@/typeGuard';

// 프롭스
interface Props {
  localStorageKey: string;
  class?: string;
  style?: object;
}

const props = withDefaults(defineProps<Props>(), {
  style: () => ({}),
})
const emit = defineEmits(["search"]);

// 반응성 없는 데이터
const lsNum = 10;
let timeId: number;

// 데이터
const searchInput = ref<HTMLInputElement | null>(null);
const searchInputValue = ref('');
const searchLists = ref<HTMLElement | null>(null);
const searchKeywords = ref<string[]>([]);
const isActiveSearchKeywords = ref(false);
const searchListIndex = ref(0);
const searchItems = ref<HTMLElement[] | null>(null);

function getLocalStorageSearchKeywords(value: string) {
  // 입력할 때마다 localStorage 에서 최근 검색어 가져옴
  const res = getLocalStorage(props.localStorageKey);
  if (res) {
    // 검색어 목록 데이터에 반영
    const result: string[] = JSON.parse(res);
    searchKeywords.value = result.filter(v => v.includes(value) && value !== "");
    isActiveSearchKeywords.value = true;
  }
}

// 메서드
const keyupSearchInput = (event: KeyboardEvent, value: string) => {
  getLocalStorageSearchKeywords(value);
}
const enterSearchInput = (event: KeyboardEvent, value: string) => {
  // localStorage 에 검색어 저장
  setLocalStorageArrayData(props.localStorageKey, value, lsNum);
  emit("search", value);
  // // 검색 event emit
  // //  - 한글입력시 맥OS auto collection 기능으로 인해 API 호출 두번가는 현상 방지하기 위해 아래와 같이 작성
  // if (timeId) {
  //   clearTimeout(timeId);
  // }
  // timeId = setTimeout(() => {
  //   emit("search", value);
  // }, 100);
}
const upDownSearchInput = (e: KeyboardEvent) => {
  if (!isHtmlElement(searchLists.value)) {
    return;
  }
  searchItems.value = Array.prototype.slice.call(searchLists.value.querySelectorAll('li'));
  if (!searchItems.value.length) {
    return;
  }
  if (e.key === 'ArrowDown') {
    searchListIndex.value = 0;
    searchItems.value[searchListIndex.value]?.focus();
  } else {
    searchListIndex.value = searchItems.value.length - 1;
    searchItems.value[searchListIndex.value]?.focus();
  }
}
const upDownSearchList = (e: KeyboardEvent) => {
  if (e.key === 'ArrowDown') {
    searchListIndex.value += 1;
    if (!searchItems.value || !searchItems.value[searchListIndex.value]) {
      isTextInputElement(searchInput.value) && searchInput.value.focus();
      return
    }
    searchItems.value[searchListIndex.value].focus();
  } else {
    searchListIndex.value -= 1;
    if (!searchItems.value || searchListIndex.value < 0) {
      isTextInputElement(searchInput.value) && searchInput.value.focus();
      return
    }
    searchItems.value[searchListIndex.value].focus();
  }
}
const clickSearchList = (e: Event) => {
  const target = e.target;
  if (!isHtmlElement(target)) {
    return
  }
  searchInputValue.value = target.innerText;
  isActiveSearchKeywords.value = false;
  if (!isTextInputElement(searchInput.value)) {
    return;
  }
  searchInput.value.focus();
  getLocalStorageSearchKeywords(searchInputValue.value);
}
const clickSearchButton = (event: Event) => {
  // localStorage 에 검색어 저장
  const target = searchInput.value;
  const typeCheckResult = isTextInputElement(target);
  if (typeCheckResult) {
    setLocalStorageArrayData(props.localStorageKey, target.value, lsNum);
    // 검색 event emit
    emit("search", target.value);
  }
}
const focusInput = () => {
  isActiveSearchKeywords.value = true;
}

const searchBox = ref<HTMLElement | null>(null);
const searchListsPosition = ref({});

function checkClickedElement(e: Event) {
  const target = e.target;
  if (!isHtmlElement(target) || !isHtmlElement(searchBox.value)) {
    return;
  }
  if (!target.closest(`.${searchBox.value.className}`)) {
    isActiveSearchKeywords.value = false;
  }
}

function checkSearchBoxPosition() {
  if (!isHtmlElement(searchBox.value)) {
    return;
  }
  const rect = searchBox.value.getBoundingClientRect();
  let listRect = {height: 0};
  let positionBottom = rect.top + rect.height;
  if (isHtmlElement(searchLists.value)) {
    listRect = searchLists.value.getBoundingClientRect();
    positionBottom += listRect.height;
  }
  if (positionBottom < window.innerHeight) {
    searchListsPosition.value = {
      top: `${rect.top + rect.height}px`,
      left: `${rect.left}px`,
      bottom: 'auto',
      right: `${window.innerWidth - rect.right}px`,
    }
  } else {
    searchListsPosition.value = {
      top: 'auto',
      left: `${rect.left}px`,
      bottom: `${window.innerHeight - rect.top}px`,
      right: `${window.innerWidth - rect.right}px`,
    }
  }
}

const escSearchInput = () => {
  isActiveSearchKeywords.value = false;
}

const deleteSearchKeyword = (e: Event) => {
  const target = e.currentTarget;
  if (!isHtmlElement(target)) {
    return
  }
  if (!target.dataset.keyword) {
    return;
  }
  removeLocalStorageArrayData(props.localStorageKey, target.dataset.keyword);
  getLocalStorageSearchKeywords(props.localStorageKey);
}

onMounted(() => {
  window.addEventListener('click', checkClickedElement);
  window.addEventListener('scroll', checkSearchBoxPosition);
  window.addEventListener('resize', checkSearchBoxPosition);
})

onUnmounted(() => {
  window.removeEventListener('click', checkClickedElement);
  window.removeEventListener('scroll', checkSearchBoxPosition);
  window.removeEventListener('resize', checkSearchBoxPosition);
})

// 주입
provide(CLICK_SEARCH_BUTTON, clickSearchButton);
provide(ENTER_SEARCH_INPUT, enterSearchInput);
provide(KEYUP_SEARCH_INPUT, keyupSearchInput);
provide(FOCUS_INPUT, focusInput);
provide(UPDOWN_SEARCH_INPUT, upDownSearchInput);
provide(UPDOWN_SEARCH_LIST, upDownSearchList);
provide(CLICK_SEARCH_LIST, clickSearchList);
provide(ESC_SEARCH_INPUT, escSearchInput);

provide(SEARCH_INPUT, searchInput);
provide(SEARCH_LISTS, searchLists);
provide(SEARCH_INPUT_VALUE, searchInputValue);
provide(SEARCH_LISTS_POSITION, searchListsPosition);
provide(CHECK_SEARCH_BOX_POSITION, checkSearchBoxPosition);
provide(DELETE_SEARCH_KEYWORD, deleteSearchKeyword)
</script>

<template>
  <div class="search_box" ref="searchBox" :class="props.class" :style="{...style}">
    <slot :keywords="searchKeywords" :active="isActiveSearchKeywords">검색영역</slot>
  </div>
</template>

<style scoped lang="scss">

</style>