namespace StoreEachTarget {

    export type TargetMethod = 'files' | 'directory';
    export type Props = {
        target: TargetMethod;
        files?: string[];
        directory?: string;
    }

    export const getInitial = (): Props => {
        return {
            target: 'files',
            files: []
        }
    }
}
export default StoreEachTarget;