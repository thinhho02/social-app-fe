'use server'

import API from "@/apis/httpConfig";


export const incrementViews = async (url: string, param: string): Promise<undefined> => {
    try {
        const path = url + param
        await API.put(path)
    } catch (error) {
        throw new Error((error as Error).message);
    }
};