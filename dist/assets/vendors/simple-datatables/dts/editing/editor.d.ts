import { cellType, rowRenderType } from "../types";
import { DataTable } from "../datatable";
import { dataType, EditorOptions } from "./types";
/**
 * Main lib
 * @param {Object} dataTable Target dataTable
 * @param {Object} options User config
 */
export declare class Editor {
    menuOpen: boolean;
    containerDOM: HTMLElement;
    data: dataType;
    disabled: boolean;
    dt: DataTable;
    editing: boolean;
    editingCell: boolean;
    editingRow: boolean;
    event: Event;
    events: {
        [key: string]: () => void;
    };
    initialized: boolean;
    limits: {
        x: number;
        y: number;
    };
    menuDOM: HTMLElement;
    modalDOM: HTMLElement | false;
    options: EditorOptions;
    originalRowRender: rowRenderType | false;
    rect: {
        width: number;
        height: number;
    };
    wrapperDOM: HTMLElement;
    constructor(dataTable: DataTable, options?: {});
    /**
     * Init instance
     * @return {Void}
     */
    init(): void;
    /**
     * Bind events to DOM
     * @return {Void}
     */
    bindEvents(): void;
    /**
     * contextmenu listener
     * @param  {Object} event Event
     * @return {Void}
     */
    context(event: MouseEvent): void;
    /**
     * dblclick listener
     * @param  {Object} event Event
     * @return {Void}
     */
    click(event: MouseEvent): void;
    /**
     * keydown listener
     * @param  {Object} event Event
     * @return {Void}
     */
    keydown(event: KeyboardEvent): void;
    /**
     * Edit cell
     * @param  {Object} td    The HTMLTableCellElement
     * @return {Void}
     */
    editCell(td: HTMLTableCellElement): void;
    editCellModal(): void;
    /**
     * Save edited cell
     * @param  {Object} row    The HTMLTableCellElement
     * @param  {String} value   Cell content
     * @return {Void}
     */
    saveCell(value: string): void;
    /**
     * Edit row
     * @param  {Object} row    The HTMLTableRowElement
     * @return {Void}
     */
    editRow(tr: HTMLElement): void;
    editRowModal(): void;
    /**
     * Save edited row
     * @param  {Object} row    The HTMLTableRowElement
     * @param  {Array} data   Cell data
     * @return {Void}
     */
    saveRow(data: string[], row: cellType[]): void;
    /**
     * Open the row editor modal
     * @return {Void}
     */
    openModal(): void;
    /**
     * Close the row editor modal
     * @return {Void}
     */
    closeModal(): void;
    /**
     * Remove a row
     * @param  {Object} tr The HTMLTableRowElement
     * @return {Void}
     */
    removeRow(tr: HTMLElement): void;
    /**
     * Update context menu position
     * @return {Void}
     */
    updateMenu(): void;
    /**
     * Dismiss the context menu
     * @param  {Object} event Event
     * @return {Void}
     */
    dismissMenu(event: Event): void;
    /**
     * Open the context menu
     * @return {Void}
     */
    openMenu(): void;
    /**
     * Close the context menu
     * @return {Void}
     */
    closeMenu(): void;
    /**
     * Destroy the instance
     * @return {Void}
     */
    destroy(): void;
    rowRender(row: any, tr: any, index: any): any;
}
export declare const makeEditable: (dataTable: DataTable, options?: {}) => Editor;
