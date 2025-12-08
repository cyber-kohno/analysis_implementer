import type StoreResource from "./StoreResource";

namespace StoreExecute {

    export type Props = {
        resouces: StoreResource.Props[];
        source: string;
    }

    export const getInitial = (): Props => {
        return {
            resouces: [],
            source: ''
        }
    }
}
export default StoreExecute;