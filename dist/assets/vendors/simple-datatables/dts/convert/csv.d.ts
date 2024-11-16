interface csvConvertUserOptions {
    lineDelimiter?: string;
    columnDelimiter?: string;
    removeDoubleQuotes?: boolean;
    data: string;
    headings?: string[];
}
/**
 * Convert CSV data to fit the format used in the table.
 */
export declare const convertCSV: (userOptions: csvConvertUserOptions) => any;
export {};
