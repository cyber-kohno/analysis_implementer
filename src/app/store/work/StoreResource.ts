namespace StoreResource {

    export type RetentionMethod = 'static' | 'dynamic';
    export type ConvertMethod = 'csv' | 'tsv';
    export type Props = {
        varName: string;
        retention: RetentionMethod;
        source?: string;
        filePath?: string;
        header?: string;
        convert?: ConvertMethod;
        type: string;
    }

    export const getInitial = (varName: string): Props => {
        return {
            varName,
            retention: 'static',
            source: '',
            type: 'string'
        }
    }
}
export default StoreResource;