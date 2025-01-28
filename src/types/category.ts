import { Creator } from "./creator";

export interface Category {
    _id: string;
    name: string;
    slug: string;
    creators: Creator[];
    mediaUrl: string;
}