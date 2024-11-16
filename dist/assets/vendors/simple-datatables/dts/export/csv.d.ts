import { DataTable } from "../datatable";
/**
 * Export table to CSV
 */
interface csvUserOptions {
    download?: boolean;
    skipColumn?: number[];
    lineDelimiter?: string;
    columnDelimiter?: string;
    selection?: number | number[];
    filename?: string;
}
export declare const exportCSV: (dt: DataTable, userOptions?: csvUserOptions) => string | false;
export {};
