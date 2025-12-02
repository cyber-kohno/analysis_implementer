import type StoreResource from "./StoreResource";

namespace StoreExecute {

    export type Props = {
        resouces: StoreResource.Props[];
        source: string;
        output: string | null;
    }

    export const getInitial = (): Props => {
        return {
            resouces: [],
            source: '',
            output: null
        }
    }
}
export default StoreExecute;