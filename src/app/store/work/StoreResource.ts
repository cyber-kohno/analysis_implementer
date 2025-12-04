namespace StoreResource {

    export type RetentionMethod = 'static' | 'dynamic';
    export type ParseMethod = 'csv' | 'tsv';
    export type Props = {
        varName: string;
        retention: RetentionMethod;
        source?: string;
        filePath?: string;
        parse?: ParseMethod;
    }

    export const getInitial = (varName: string): Props => {
        return {
            varName,
            retention: 'static',
            source: ''
        }
    }
}
export default StoreResource;