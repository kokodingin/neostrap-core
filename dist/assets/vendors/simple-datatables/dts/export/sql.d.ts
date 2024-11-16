import { DataTable } from "../datatable";
/**
 * Export table to SQL
 */
interface sqlUserOptions {
    download?: boolean;
    skipColumn?: number[];
    tableName?: string;
    selection?: number | number[];
    filename?: string;
}
export declare const exportSQL: (dt: DataTable, userOptions?: sqlUserOptions) => string | false;
export {};
