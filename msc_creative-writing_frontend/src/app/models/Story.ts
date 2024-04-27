import { Gallery } from "./Gallery";

export interface Story {
    docID?: string,
    title: string,
    description: string,
    author: string,
    gallery: Gallery
}