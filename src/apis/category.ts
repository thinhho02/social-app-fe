import { Category } from "@/types/category";

interface CategoriesResponse {
    message: string;
    data: Category[];
}
export const getCategories = async (url: string): Promise<CategoriesResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url
        
        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoriesResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

interface CategoryResponse {
    message: string;
    data: Category
}
export const getCategoryBySlug = async (url: string, param: string): Promise<CategoryResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param
        
        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoryResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const getCategoryByID = async (url: string, param: string): Promise<CategoryResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + param
        
        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoryResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};

export const searchByNameCategory = async (url: string, query: string): Promise<CategoriesResponse> => {
    try {
        const path = process.env.NEXT_PUBLIC_ORIGIN_PATH_BACKEND + url + `?name=${query}`
        
        const res = await fetch(path, { next: { tags: ['category'] } });

        const data: CategoriesResponse = await res.json();
        return data;
    } catch (error) {
        throw new Error((error as Error).message);
    }
};