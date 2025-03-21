import { CreatorResponse, CreatorsResponse } from "@/types/creator";

export const getCreators = async (url: string): Promise<CreatorsResponse> => {
    try {
        const path = process.env.DEV_ORIGIN_PATH_BACKEND + url

        const res = await fetch(path, { next: { tags: ['creator'] } });

        const data: CreatorsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getCreatorBySlug = async (url: string, param: string): Promise<CreatorResponse> => {
    try {
        const path = process.env.DEV_ORIGIN_PATH_BACKEND + url + param

        const res = await fetch(path, { next: { tags: ['creator'] } });

        const data: CreatorResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};


export const getCreatorByTab = async (url: string, limit?: number): Promise<CreatorsResponse> => {
    try {
        let path = process.env.DEV_ORIGIN_PATH_BACKEND + url + (limit ? `?limit=${limit}` : '')
        const res = await fetch(path, { cache: "no-store" });

        const data: CreatorsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};