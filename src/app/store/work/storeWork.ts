import type { Store } from "../store";
import StoreEachProc from "./StoreEachProc";
import StoreSingleProc from "./StoreSingleProc";
import StoreFileChoose from "./storeFileChoose";

namespace StoreWork {
    export type WorkType = 'file-choose' | 'single-proc' | 'each-proc'

    export type Props = {
        type: WorkType;
        name: string;

        detail: any;
    };

    export const getInitial = (type: WorkType, num: number): Props => {

        const getDetail = () => {
            switch (type) {
                case 'single-proc': return StoreSingleProc.getInitial();
                case 'each-proc': return StoreEachProc.getInitial();
                case 'file-choose': return StoreFileChoose.getInitial();
                default: throw new Error();
            }
        }
        return {
            type,
            name: `work${num}`,
            detail: getDetail()
        }
    }

    export const getDetail = (store: Store) => {
        const project = store.project;
        if (project == null) throw new Error();
        const work = project.works[store.focus[1]];
        if (work == undefined) throw new Error();
        return work.detail;
    }
};
export default StoreWork;