export interface StoryEvent {
    docID?: string,
    chapterID: string,
    storyID: string | undefined,
    title: string,
    note: string,
    index: number | undefined
}