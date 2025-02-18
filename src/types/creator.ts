import { Category } from "./category";
import { Tag } from "./tag";

export interface Creator {
    _id : string;
    name: string;
    description: string;
    views: number;
    category: Category;
    tags: Tag[];
    mediaUrl: string;
    slug: string;
    status: string;
}

export interface CreatorsResponse {
    message: string;
    data: Creator[];
}

export interface CreatorResponse {
    message: string;
    data: Creator
}

export interface ReactTag {
    id: string;
    className: string;
    [key: string]: string;
}