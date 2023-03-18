import { ref } from 'vue'
import { defineStore } from 'pinia'
import { kakaoSearchInstance } from "@/api";

interface searchResultType {
    collection: string;
    datetime: string;
    display_sitename: string;
    doc_url: string;
    height: number;
    image_url: string;
    thumbnail_url: string;
    width: number;
}

export enum sortType {
    accuracy = 'accuracy',
    recency = 'recency',
}

interface searchListsType {
    query: string,
    sort?: sortType,
    page?: number,
    size?: number,
}

export const useSearchListsStore = defineStore('searchLists', () => {
    const lists = ref<searchResultType[] | null>(null);

    async function getSearchLists({query, sort = sortType.accuracy, page, size}: searchListsType): Promise<searchResultType[]> {
        const res = await kakaoSearchInstance.get('', {
            params: {
                query,
                sort,
                page,
                size,
            }
        })
        return res.data.documents;
    }

    function setSearchLists(documents: searchResultType[]): void {
        lists.value = documents;
    }

    function addSearchLists(documents: searchResultType[]): void {
        if (lists.value) {
            lists.value = [...lists.value, ...documents];
        } else {
            lists.value = [...documents];
        }
    }

    return { lists, getSearchLists, setSearchLists, addSearchLists }
})
