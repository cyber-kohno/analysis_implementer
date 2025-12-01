import { writable } from "svelte/store";
import type StoreProject from "./storeProject";

const store = writable<Store>({
    fileHandle: null,
    project: null,
    focus: []
});

export type Store = {
    fileHandle: null | FileSystemFileHandle;
    project: null | StoreProject.Props;
    focus: number[];
}

export default store;