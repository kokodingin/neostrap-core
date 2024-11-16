import { DataTableConfiguration, DataTableOptions, inputCellType, inputRowType, elementNodeType, renderOptions, rowType, TableDataType } from "./types";
import { DiffDOM } from "diff-dom";
import { Rows } from "./rows";
import { Columns } from "./columns";
export declare class DataTable {
    columns: Columns;
    containerDOM: HTMLDivElement;
    _currentPage: number;
    data: TableDataType;
    _dd: DiffDOM;
    dom: HTMLTableElement;
    _events: {
        [key: string]: ((...args: any[]) => void)[];
    };
    hasHeadings: boolean;
    hasRows: boolean;
    headerDOM: HTMLDivElement;
    _initialHTML: string;
    initialized: boolean;
    _label: HTMLElement;
    lastPage: number;
    _listeners: {
        [key: string]: () => void;
    };
    onFirstPage: boolean;
    onLastPage: boolean;
    options: DataTableConfiguration;
    _pagerDOMs: HTMLElement[];
    _virtualPagerDOM: elementNodeType;
    pages: rowType[][];
    _rect: {
        width: number;
        height: number;
    };
    rows: Rows;
    _searchData: number[];
    _searchQueries: {
        source: string;
        terms: string[];
        columns: (number[] | undefined);
    }[];
    _tableAttributes: {
        [key: string]: string;
    };
    _tableFooters: elementNodeType[];
    _tableCaptions: elementNodeType[];
    totalPages: number;
    _virtualDOM: elementNodeType;
    _virtualHeaderDOM: elementNodeType;
    wrapperDOM: HTMLElement;
    constructor(table: HTMLTableElement | string, options?: DataTableOptions);
    /**
     * Initialize the instance
     */
    init(): boolean;
    /**
     * Render the instance
     */
    _render(): void;
    _renderTable(renderOptions?: renderOptions): void;
    /**
     * Render the page
     * @return {Void}
     */
    _renderPage(lastRowCursor?: boolean): void;
    /** Render the pager(s)
     *
     */
    _renderPagers(): void;
    _renderSeparateHeader(): void;
    /**
     * Bind event listeners
     * @return {[type]} [description]
     */
    _bindEvents(): void;
    /**
     * execute on resize and debounce to avoid multiple calls
     */
    _onResize: (..._args: any[]) => void;
    /**
     * Destroy the instance
     * @return {void}
     */
    destroy(): void;
    /**
     * Update the instance
     * @return {Void}
     */
    update(measureWidths?: boolean): void;
    _paginate(): number;
    /**
     * Fix the container height
     */
    _fixHeight(): void;
    /**
     * Perform a simple search of the data set
     */
    search(term: string, columns?: (number[] | undefined), source?: string): boolean;
    /**
     * Perform a search of the data set searching for up to multiple strings in various columns
     */
    multiSearch(rawQueries: {
        terms: string[];
        columns: (number[] | undefined);
    }[], source?: string): boolean;
    /**
     * Change page
     */
    page(page: number, lastRowCursor?: boolean): boolean;
    /**
     * Add new row data
     */
    insert(data: ({
        headings?: string[];
        data?: (inputRowType | inputCellType[])[];
    } | {
        [key: string]: inputCellType;
    }[])): void;
    /**
     * Refresh the instance
     */
    refresh(): void;
    /**
     * Print the table
     */
    print(): void;
    /**
     * Show a message in the table
     */
    setMessage(message: string): void;
    /**
     * Add custom event listener
     */
    on(event: string, callback: () => void): void;
    /**
     * Remove custom event listener
     */
    off(event: string, callback: () => void): void;
    /**
     * Fire custom event
     */
    emit(event: string, ...args: any[]): void;
}
