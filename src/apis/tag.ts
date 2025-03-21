import { TagResponse, TagsResponse } from "@/types/tag";
import API from "./httpConfig";


export const getTags = async (url: string, status: string = ''): Promise<TagsResponse> => {
    try {
        const path = process.env.DEV_ORIGIN_PATH_BACKEND + url + `?status=${status}`

        const res = await fetch(path, { next: { tags: ['tag'], revalidate: 3600 } });

        const data: TagsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const getTagBySlug = async (url: string, param: string, status: string = ''): Promise<TagResponse> => {
    try {
        const path = process.env.DEV_ORIGIN_PATH_BACKEND + url + param + `?status=${status}`

        const res = await fetch(path, { next: { tags: ['tag'], revalidate: 3600 } });

        const data: TagResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getHotTag = async (url: string): Promise<TagsResponse> => {
    try {
        const path = process.env.DEV_ORIGIN_PATH_BACKEND + url

        const res = await fetch(path, { next: { tags: ['tag'], revalidate: 3600 } });

        const data: TagsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}


