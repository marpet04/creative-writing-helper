export interface StoryChapter {
    docID?: string,
    storyID: string,
    title: string,
    body: string,
    lastUpdated? : {
        nanos: number,
        seconds: number
    }
}