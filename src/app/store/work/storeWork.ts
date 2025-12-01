import type { Store } from "../store";
import StoreExecute from "./StoreExecute";

namespace StoreWork {
    export type WorkType = 'file-choose' | 'execute' | 'execute-iterate'

    export type Props = {
        type: WorkType;
        name: string;

        detail: any;
    };

    export const getInitial = (type: WorkType, num: number): Props => {

        const getDetaul = () => {
            switch (type) {
                case 'execute': return StoreExecute.getInitial();
                default: throw new Error();
            }
        }
        return {
            type,
            name: `work${num}`,
            detail: getDetaul()
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