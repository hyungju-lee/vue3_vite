<script setup lang="ts">
import {ref} from "vue";
import {SearchBox, SearchInput, SearchButton, SearchLists, SearchList} from '@/components/SearchComponent/index';
import {ListBox, ListItem} from '@/components/ListComponent/index';
import {RadioBox, RadioInput, RadioLabel} from '@/components/RadioComponent/index';
import {ToastBox, ToastPopup} from '@/components/ToastPopup/index';
import LazyImage from '@/components/LazyImage/LazyImage.vue'
import IconSearch from '@/components/icons/IconSearch.vue';
import IconLoading from '@/components/icons/IconLoading.vue';
import InfiniteScroll from '@/components/InfiniteScrollComponent/InfiniteScroll.vue'
import {useSearchListsStore, sortType} from "@/stores/search";
import {storeToRefs} from "pinia";
import {isRadioInputElement, isSortType} from "@/typeGuard";
import emitter from "@/utils/eventBus";
import {KAKAO_PAGE_IS_MORE_THAN_MAX} from "@/errorHandler";

const searchListsData = useSearchListsStore();
const {getSearchLists, setSearchLists, addSearchLists} = searchListsData;
const {lists} = storeToRefs(searchListsData);
const scrollArea = ref(null);

// 검색 데이터
const searchKeyword = ref('');
const searchSort = ref(sortType.accuracy);
const searchPage = ref(1);
const searchSize = ref(10);
const isLoading = ref(false);
const listsNum = ref(0);
const isShowInfiniteScroll = ref(true);

let timeId: number;

async function callGetSearchLists() {
  isLoading.value = true;
  isShowInfiniteScroll.value = false;
  const res = await getSearchLists({
    query: searchKeyword.value,
    sort: searchSort.value,
    page: searchPage.value,
    size: searchSize.value,
  });
  isLoading.value = false;
  if (timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(() => {
    isShowInfiniteScroll.value = true;
  }, 1500);
  return res;
}

const fetchFilterSearchLists = async (e: Event) => {
  const target = e.target;
  if (!isRadioInputElement(target)) {
    return;
  }

  const val = target.value;
  if (!isSortType(val)) {
    return;
  }

  searchSort.value = val;

  if (searchKeyword.value === "") {
    return;
  }

  listsNum.value = 0;

  searchPage.value = 1;
  const res = await callGetSearchLists();
  setSearchLists(res);
}

const fetchKeywordSearchLists = async (query: string) => {
  if (query === "") {
    return;
  }
  listsNum.value = 0;

  searchKeyword.value = query;
  searchPage.value = 1;
  const res = await callGetSearchLists();
  setSearchLists(res);
}

const visibleInfiniteScroll = async () => {
  if (!lists.value) {
    return;
  }
  searchPage.value += 1;
  const res = await callGetSearchLists();
  addSearchLists(res);
}

const checkIsShowInfiniteScroll = () => {
  listsNum.value++;
  if (lists.value?.length === listsNum.value) {
    isShowInfiniteScroll.value = true;
  }
}

const loadImage = () => {
  setTimeout(() => {
    checkIsShowInfiniteScroll();
  }, 500)
}

const errorImage = () => {
  setTimeout(() => {
    checkIsShowInfiniteScroll();
  }, 500)
}

const errMessages = ref<string[]>([]);

const toastPopupTransitionEnd = () => {
  errMessages.value.shift();
}

emitter.on(`error:${KAKAO_PAGE_IS_MORE_THAN_MAX}`, err => {
  if (typeof err !== "string") {
    return;
  }
  errMessages.value.push(err);
  isLoading.value = false;
})
</script>

<template>
  <main class="main" ref="scrollArea">
    <div style="padding: 10px">
      <SearchBox
          v-slot="searchBox"
          local-storage-key="searchKeywords"
          @search="fetchKeywordSearchLists"
      >
        <div :style="{
          position: 'relative',
        }">
          <SearchInput
              :style="{
              display: 'block',
              width: '100%',
              padding: '10px 40px 10px 10px',
            }"
          />
          <SearchButton :style="{
            position: 'absolute',
            top: '0',
            right: '0',
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent',
            border: 'none',
          }">
            <IconSearch/>
          </SearchButton>
        </div>
        <SearchLists v-if="searchBox.active && searchBox.keywords.length" :style="{
        marginTop: '3px',
        boxShadow: '0 1px 4px 0px rgba(0, 0, 0, 0.7)'
      }">
          <SearchList
              v-for="(keyword, index) in searchBox.keywords"
              :key="index"
              :style="{
              padding: '10px',
            }"
          >{{keyword}}</SearchList>
        </SearchLists>
      </SearchBox>
    </div>
    <div class="filter_area" :style="{padding: '10px'}">
      <RadioBox :current-value="searchSort" @change:input="fetchFilterSearchLists">
        <div :style="{
          position: 'relative',
          display: 'inline-block',
        }">
          <RadioInput id="accuracy" name="search_filter" :value="sortType.accuracy" :class="'blind chx_filter'"/>
          <RadioLabel label-for="accuracy" :class="'lb_filter'" :style="{
            display: 'block',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: '#ddd',
          }">
            정확도순
          </RadioLabel>
        </div>
        <div :style="{
          position: 'relative',
          display: 'inline-block',
          marginLeft: '5px',
        }">
          <RadioInput id="recency" name="search_filter" :value="sortType.recency" :class="'blind chx_filter'"/>
          <RadioLabel label-for="recency" :class="'lb_filter'" :style="{
            display: 'block',
            padding: '5px 10px',
            borderRadius: '5px',
            backgroundColor: '#ddd',
          }">
            최신순
          </RadioLabel>
        </div>
      </RadioBox>
    </div>
    <ListBox v-if="lists">
      <ListItem
          v-for="(list, index) in lists"
          :key="index"
          :style="{
            display: 'inline-block',
            width: '50%',
            padding: '20px 10px',
          }"
      >
        <figure class="figure">
          <LazyImage
              :src="list.image_url"
              :alt="list.display_sitename"
              @load="loadImage"
              @error="errorImage"
          />
          <figcaption class="caption">
            {{list.display_sitename}}
          </figcaption>
        </figure>
      </ListItem>
    </ListBox>
    <div v-if="isLoading" style="display: flex; justify-content: center; align-items: center; height: 100px;">
      <IconLoading />
    </div>
    <InfiniteScroll
        v-if="lists && isShowInfiniteScroll"
        :height="0"
        @visible="visibleInfiniteScroll"
    />
    <ToastBox>
      <ToastPopup
          v-for="(errMsg, index) in errMessages"
          :key="index"
          :index="index"
          @transitionEnd="toastPopupTransitionEnd"
          :style="{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50px',
            borderRadius: '5px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            textAlign: 'center',
            color: '#fff',
          }"
      >
        {{ errMsg }}
      </ToastPopup>
    </ToastBox>
  </main>
</template>

<style scoped lang="scss">
.main {
  max-width: 1280px;
  margin: 0 auto;
}

.chx_filter {
  &:checked {
    + .lb_filter {
      background-color: #F2C037 !important;
    }
  }
}

.figure {
  overflow: hidden;
  border: 1px solid #ddd;
  border-radius: 5px
}

.caption {
  padding: 10px 0;
  border: 1px solid #ddd;
  text-align: center;
}
</style>