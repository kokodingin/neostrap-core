import { cellDataType, columnSettingsType, inputCellType, nodeType } from "./types";
/**
 * Check is item is object
 */
export declare const isObject: (val: (string | number | boolean | object | null | undefined)) => boolean;
/**
 * Check for valid JSON string
 */
export declare const isJson: (str: string) => boolean;
/**
 * Create DOM element node
 */
export declare const createElement: (nodeName: string, attrs?: {
    [key: string]: string;
}) => HTMLElement;
export declare const objToText: (obj: nodeType) => any;
export declare const cellToText: (obj: inputCellType | cellDataType | null | undefined) => string;
export declare const escapeText: (text: string) => string;
export declare const visibleToColumnIndex: (visibleIndex: number, columns: columnSettingsType[]) => number;
export declare const columnToVisibleIndex: (columnIndex: number, columns: columnSettingsType[]) => number;
/**
 * Converts a [NamedNodeMap](https://developer.mozilla.org/en-US/docs/Web/API/NamedNodeMap) into a normal object.
 *
 * @param map The `NamedNodeMap` to convert
 */
export declare const namedNodeMapToObject: (map: NamedNodeMap) => {};
/**
 * Convert class names to a CSS selector. Multiple classes should be separated by spaces.
 * Examples:
 *  - "my-class" -> ".my-class"
 *  - "my-class second-class" -> ".my-class.second-class"
 *
 * @param classNames The class names to convert. Can contain multiple classes separated by spaces.
 */
export declare const classNamesToSelector: (classNames: string) => string;
/**
 * Check if the element contains all the classes. Multiple classes should be separated by spaces.
 *
 * @param element The element that will be checked
 * @param classes The classes that must be present in the element. Can contain multiple classes separated by spaces.
 */
export declare const containsClass: (element: Element, classes: string) => boolean;
/**
 * Join two strings with spaces. Null values are ignored.
 * Examples:
 *  - joinWithSpaces("a", "b") -> "a b"
 *  - joinWithSpaces("a", null) -> "a"
 *  - joinWithSpaces(null, "b") -> "b"
 *  - joinWithSpaces("a", "b c") -> "a b c"
 *
 * @param first The first string to join
 * @param second The second string to join
 */
export declare const joinWithSpaces: (first: string | null | undefined, second: string | null | undefined) => string;
export declare const debounce: (func: () => void, timeout?: number) => (..._args: any[]) => void;
