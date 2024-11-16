/**
* Default config
* @type {Object}
*/
import { Editor } from "./editor";
export declare const defaultConfig: {
    classes: {
        row: string;
        form: string;
        item: string;
        menu: string;
        save: string;
        block: string;
        cancel: string;
        close: string;
        inner: string;
        input: string;
        label: string;
        modal: string;
        action: string;
        header: string;
        wrapper: string;
        editable: string;
        container: string;
        separator: string;
    };
    labels: {
        closeX: string;
        editCell: string;
        editRow: string;
        removeRow: string;
        reallyRemove: string;
        reallyCancel: string;
        save: string;
        cancel: string;
    };
    cancelModal: (editor: any) => boolean;
    inline: boolean;
    hiddenColumns: boolean;
    contextMenu: boolean;
    clickEvent: string;
    excludeColumns: any[];
    menuItems: ({
        text: (editor: Editor) => string;
        action: (editor: Editor, _event: Event) => void;
        separator?: undefined;
    } | {
        separator: boolean;
        text?: undefined;
        action?: undefined;
    })[];
};
