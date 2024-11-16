import { DataTable } from "./datatable";
import { cellType, columnSettingsType, columnsStateType, dataRowType, inputCellType, inputHeaderCellType } from "./types";
export declare class Columns {
    dt: DataTable;
    settings: columnSettingsType[];
    _state: columnsStateType;
    constructor(dt: DataTable);
    init(): void;
    get(column: number): {
        render?: import("./types").renderType;
        type: "string" | "number" | "boolean" | "html" | "date" | "other";
        format?: string;
        sortable?: boolean;
        locale?: string;
        numeric?: boolean;
        caseFirst?: "false" | "upper" | "lower";
        searchable?: boolean;
        sensitivity?: string;
        ignorePunctuation?: boolean;
        searchItemSeparator?: string;
        searchMethod?: false | ((query: string[], cell: cellType, row: dataRowType, columnIndex: number, source: string) => boolean);
        headerClass?: string;
        cellClass?: string;
        hidden?: boolean;
        filter?: (string | number | boolean | ((arg: string | number | boolean) => boolean))[];
        sort?: "asc" | "desc";
        sortSequence?: ("asc" | "desc")[];
    };
    size(): number;
    /**
     * Swap two columns
     */
    swap(columns: [number, number]): void;
    /**
     * Reorder the columns
     */
    order(columns: number[]): void;
    /**
     * Hide columns
     */
    hide(columns: number | number[]): void;
    /**
     * Show columns
     */
    show(columns: number | number[]): void;
    /**
     * Check column(s) visibility
     */
    visible(columns: number | number[] | undefined): boolean | boolean[];
    /**
     * Add a new column
     */
    add(data: {
        data: inputCellType[];
        heading: inputHeaderCellType;
    } & columnSettingsType): void;
    /**
     * Remove column(s)
     */
    remove(columns: number | number[]): void;
    /**
     * Filter by column
     */
    filter(column: number, init?: boolean): void;
    /**
     * Sort by column
     */
    sort(index: number, dir?: ("asc" | "desc" | undefined), init?: boolean): void;
    /**
     * Measure the actual width of cell content by rendering the entire table with all contents.
     * Note: Destroys current DOM and therefore requires subsequent dt.update()
     */
    _measureWidths(): void;
}
