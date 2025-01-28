import { Creator } from "./creator";

export interface Tag {
    _id: string;
    name: string;
    creators: Creator[];
    views: number;
    slug: string
}