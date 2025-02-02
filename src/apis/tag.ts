import { TagResponse, TagsResponse } from "@/types/tag";
import API from "./httpConfig";


export const getTags = async (url: string): Promise<TagsResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url

        const res = await fetch(path, { next: { tags: ['tag'] } });

        const data: TagsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const getTagBySlug = async (url: string, param: string): Promise<TagResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param
        
        const res = await fetch(path, { next: { tags: ['tag'] } });

        const data: TagResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getHotTag = async (url: string): Promise<TagsResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url

        const res = await fetch(path, { next: { tags: ['tag'] } });

        const data: TagsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const incrementViewsTag = async (url: string, param: string): Promise<TagResponse> => {
    try {
        const path = url + param
        
        const res = await API.put(path)

        const data: TagResponse = await res.data;
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

