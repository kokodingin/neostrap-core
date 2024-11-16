import { DataTable } from "../datatable";
/**
 * Export table to TXT
 */
interface txtUserOptions {
    download?: boolean;
    skipColumn?: number[];
    lineDelimiter?: string;
    columnDelimiter?: string;
    selection?: number | number[];
    filename?: string;
}
export declare const exportTXT: (dt: DataTable, userOptions?: txtUserOptions) => string | false;
export {};
