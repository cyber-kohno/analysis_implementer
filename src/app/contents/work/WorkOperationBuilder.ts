import type StoreWork from "../../store/work/storeWork";

namespace WorkOperationBuilder {

    export type Operation = 'Args' | 'Resources' | 'Iterate-Resources' | 'Proc' | 'Start-Proc' | 'Iterate-Proc' | 'End-Proc' | 'Choose';

    export const getOprs = (type: StoreWork.WorkType): Operation[] => {
        switch (type) {
            case 'execute': return ['Args', 'Resources', 'Proc'];
            case 'execute-iterate': return ['Args', 'Resources', 'Iterate-Resources', 'Start-Proc', 'Iterate-Proc', 'End-Proc'];
            case 'file-choose': return ['Choose'];
        }
    }
};
export default WorkOperationBuilder;