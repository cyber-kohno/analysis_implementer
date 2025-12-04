import type StoreWork from "../../store/work/storeWork";

namespace WorkOperationBuilder {

    export type Operation = 'Resources' | 'Iterate-Target' | 'Program' | 'Iterate-Program' | 'File-Choose';

    export const getOprs = (type: StoreWork.WorkType): Operation[] => {
        switch (type) {
            case 'single-proc': return ['Resources', 'Program'];
            case 'each-proc': return ['Resources', 'Iterate-Target', 'Iterate-Program'];
            case 'file-choose': return ['File-Choose'];
        }
    }
};
export default WorkOperationBuilder;