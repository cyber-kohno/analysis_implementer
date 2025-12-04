import StoreEachTarget from "./StoreEachTarget";
import type StoreResource from "./StoreResource";

namespace StoreEachProc {

    export type Props = {
        resouces: StoreResource.Props[];
        eachTarget: StoreEachTarget.Props;
        srcStart: string;
        srcEach: string;
        srcEnd: string;
    }

    export const getInitial = (): Props => {
        return {
            resouces: [],
            eachTarget: StoreEachTarget.getInitial(),
            srcStart: '',
            srcEach: '',
            srcEnd: '',
        }
    }
}
export default StoreEachProc;