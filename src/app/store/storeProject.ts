import type { KeyValue } from "./types";
import type StoreWork from "./work/storeWork";

namespace StoreProject {
    export type Props = {

        works: StoreWork.Props[];
        envVars: KeyValue[];
    };

    export const getInitial = (): Props => {

        return {
            envVars: [],
            works: []
        }
    }
};
export default StoreProject;