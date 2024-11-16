import { DataTable } from "../datatable";
import { ColumnFilterOptions } from "./types";
declare class ColumnFilter {
    addedButtonDOM: boolean;
    menuOpen: boolean;
    buttonDOM: HTMLElement;
    dt: DataTable;
    events: {
        [key: string]: () => void;
    };
    initialized: boolean;
    options: ColumnFilterOptions;
    menuDOM: HTMLElement;
    containerDOM: HTMLElement;
    wrapperDOM: HTMLElement;
    limits: {
        x: number;
        y: number;
    };
    rect: {
        width: number;
        height: number;
    };
    event: Event;
    constructor(dataTable: DataTable, options?: {});
    init(): void;
    dismiss(): void;
    _bind(): void;
    _openMenu(): void;
    _closeMenu(): void;
    _measureSpace(): void;
    _click(event: MouseEvent): void;
}
export declare const addColumnFilter: (dataTable: DataTable, options?: {}) => ColumnFilter;
export {};
