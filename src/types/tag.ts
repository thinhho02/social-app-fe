import { Creator } from "./creator";

export interface Tag {
    _id: string;
    name: string;
    creators: Creator[];
    views: number;
    slug: string
}

export interface TagsResponse {
    message: string;
    data: Tag[];
}

export interface TagResponse {
    message: string;
    data: Tag
}