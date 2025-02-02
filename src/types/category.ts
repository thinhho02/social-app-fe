import { Creator } from "./creator";

export interface Category {
    _id: string;
    name: string;
    slug: string;
    creators: Creator[];
    mediaUrl: string;
}

export interface CategoriesResponse {
    message: string;
    data: Category[];
}

export interface CategoryResponse {
    message: string;
    data: Category
}