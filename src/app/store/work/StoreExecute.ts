namespace StoreExecute {

    export type Props = {
        source: string;
        output: string | null;
    }

    export const getInitial = (): Props => {
        return {
            source: '',
            output: null
        }
    }
}
export default StoreExecute;