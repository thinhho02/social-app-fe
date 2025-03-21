import { CategoriesResponse, CategoryResponse } from "@/types/category";


export const getCategories = async (url: string, limit: number = 0, status: string = ''): Promise<CategoriesResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + `?limit=${limit}&status=${status}`
        const res = await fetch(path, { next: { tags: ['category'], revalidate: 3600 } });
        const data: CategoriesResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getCategoryBySlug = async (url: string, param: string, status: string = ''): Promise<CategoryResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param + `?status=${status}`

        const res = await fetch(path, { next: { tags: ['category'], revalidate: 3600 } });

        const data: CategoryResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getCategoryByID = async (url: string, param: string, status: string = ''): Promise<CategoryResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param + `?status=${status}`

        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoryResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const searchByNameCategory = async (url: string, query: string, status: string = ''): Promise<CategoriesResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + `?name=${query}&status=${status}`

        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoriesResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};