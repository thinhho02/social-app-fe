import { Creator } from "@/types/creator";
import API from "./httpConfig";


interface CreatorsResponse {
    message: string;
    data: Creator[];
}

export const getCreators = async (url: string): Promise<CreatorsResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url
        
        const res = await fetch(path, { next: { tags: ['creator'] } });

        const data: CreatorsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

interface CreatorResponse {
    message: string;
    data: Creator
}

export const getCreatorBySlug = async (url: string, param: string): Promise<CreatorResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param
        
        const res = await fetch(path, { next: { tags: ['creator'] } });

        const data: CreatorResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};


export const getTrendingCreator = async (url: string, query?: string): Promise<CreatorsResponse> => {
    try {
        let path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url 
        if(query){
            path += query
        }
        const res = await fetch(path, { next: { tags: ['creator'] } });

        const data: CreatorsResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const incrementViewsCreator = async (url: string, param: string): Promise<CreatorResponse> => {
    try {
        const path = url + param
        
        const res = await API.put(path)

        const data: CreatorResponse = await res.data;
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};