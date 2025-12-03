import type StoreResource from "../../store/work/StoreResource";

namespace DataUtil {

    export const convertTableToJson = (source: string, convMethod: StoreResource.ConvertMethod) => {
        const table = source
            .split('\n')
            .map(r => {
                if (convMethod === 'csv') {
                    return r.split(',').map(col => col.trim().replaceAll('"', ''));
                } else if (convMethod === 'tsv') {
                    r.split('\t');
                }
                throw new Error();
            });
        // console.log(table);
        const header = table[0];
        const records = table.slice(1);
        const json = records.map(r => {
            const obj: any = {};
            r.forEach((colValue, i) => {
                const colName = header[i];
                obj[colName] = colValue;
            });
            return obj;
        });
        // console.log(json);
        return json;
    }
    export const convertTableToColNames = (source: string, convMethod: StoreResource.ConvertMethod) => {
        const header = source.split('\n')[0];
        if (convMethod === 'csv') {
            return header.split(',').map(col => col.trim().replaceAll('"', ''));
        } else if (convMethod === 'tsv') {
            return header.split('\t');
        }
        throw new Error();
    }

    export const convertNamesToTypeDefs = (names: string[]) => {
        return `{\n${names.map(name => `  ${name}: string`)}\n}`;
    }

}
export default DataUtil;