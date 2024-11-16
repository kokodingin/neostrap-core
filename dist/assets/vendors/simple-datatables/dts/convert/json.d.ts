interface jsonConvertUserOptions {
    lineDelimiter?: string;
    columnDelimiter?: string;
    removeDoubleQuotes?: boolean;
    data: string;
    headings?: string[];
}
/**
 * Convert JSON data to fit the format used in the table.
 */
export declare const convertJSON: (userOptions: jsonConvertUserOptions) => any;
export {};
