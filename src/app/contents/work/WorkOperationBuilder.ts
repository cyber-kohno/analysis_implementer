import type StoreWork from "../../store/work/storeWork";

namespace WorkOperationBuilder {

    export type Operation = 'Args' | 'Resources' | 'Iterate-Resources' | 'Proc' | 'Iterate-Proc' | 'File-Choose';

    export const getOprs = (type: StoreWork.WorkType): Operation[] => {
        switch (type) {
            case 'execute': return ['Args', 'Resources', 'Proc'];
            case 'execute-iterate': return ['Args', 'Resources', 'Iterate-Resources', 'Iterate-Proc'];
            case 'file-choose': return ['File-Choose'];
        }
    }
};
export default WorkOperationBuilder;