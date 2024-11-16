import { DataTable } from "../datatable";
/**
 * Export table to JSON
 */
interface jsonUserOptions {
    download?: boolean;
    skipColumn?: number[];
    replacer?: null | ((key: any, value: any) => string) | (string | number)[];
    space?: number;
    selection?: number | number[];
    filename?: string;
}
export declare const exportJSON: (dt: DataTable, userOptions?: jsonUserOptions) => string | false;
export {};
