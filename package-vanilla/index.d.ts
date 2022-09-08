
/**
 * INTERNAL, DO NOT USE. Code may change at any time.
 */
interface Fragment {
    key: string | null;
    first: null;
    c: () => void;
    l: (nodes: any) => void;
    h: () => void;
    m: (target: HTMLElement, anchor: any) => void;
    p: (ctx: any, dirty: any) => void;
    r: () => void;
    f: () => void;
    a: () => void;
    i: (local: any) => void;
    o: (local: any) => void;
    d: (detaching: 0 | 1) => void;
}
interface T$$ {
    dirty: number[];
    ctx: null | any;
    bound: any;
    update: () => void;
    callbacks: any;
    after_update: any[];
    props: Record<string, 0 | string>;
    fragment: null | false | Fragment;
    not_equal: any;
    before_update: any[];
    context: Map<any, any>;
    on_mount: any[];
    on_destroy: any[];
    skip_bound: boolean;
    on_disconnect: any[];
    root: Element | ShadowRoot;
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
declare class SvelteComponent {
    $$: T$$;
    $$set?: ($$props: any) => void;
    $destroy(): void;
    $on(type: any, callback: any): () => void;
    $set($$props: any): void;
}

declare type Props = Record<string, any>;
interface ComponentConstructorOptions<Props extends Record<string, any> = Record<string, any>> {
    target: Element | ShadowRoot;
    anchor?: Element;
    props?: Props;
    context?: Map<any, any>;
    hydrate?: boolean;
    intro?: boolean;
    $$inline?: boolean;
}
interface SvelteComponentDev$1 {
    $set(props?: Props): void;
    $on(event: string, callback: (event: any) => void): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
 */
declare class SvelteComponentDev$1 extends SvelteComponent {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: any;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: any;
    constructor(options: ComponentConstructorOptions);
    $capture_state(): void;
    $inject_state(): void;
}
interface SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> {
    $set(props?: Partial<Props>): void;
    $on<K extends Extract<keyof Events, string>>(type: K, callback: (e: Events[K]) => void): () => void;
    $destroy(): void;
    [accessor: string]: any;
}
/**
 * Base class to create strongly typed Svelte components.
 * This only exists for typing purposes and should be used in `.d.ts` files.
 *
 * ### Example:
 *
 * You have component library on npm called `component-library`, from which
 * you export a component called `MyComponent`. For Svelte+TypeScript users,
 * you want to provide typings. Therefore you create a `index.d.ts`:
 * ```ts
 * import { SvelteComponentTyped } from "svelte";
 * export class MyComponent extends SvelteComponentTyped<{foo: string}> {}
 * ```
 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
 * to provide intellisense and to use the component like this in a Svelte file
 * with TypeScript:
 * ```svelte
 * <script lang="ts">
 * 	import { MyComponent } from "component-library";
 * </script>
 * <MyComponent foo={'bar'} />
 * ```
 *
 * #### Why not make this part of `SvelteComponent(Dev)`?
 * Because
 * ```ts
 * class ASubclassOfSvelteComponent extends SvelteComponent<{foo: string}> {}
 * const component: typeof SvelteComponent = ASubclassOfSvelteComponent;
 * ```
 * will throw a type error, so we need to separate the more strictly typed class.
 */
declare class SvelteComponentTyped<Props extends Record<string, any> = any, Events extends Record<string, any> = any, Slots extends Record<string, any> = any> extends SvelteComponentDev$1 {
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$prop_def: Props;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$events_def: Events;
    /**
     * @private
     * For type checking capabilities only.
     * Does not exist at runtime.
     * ### DO NOT USE!
     */
    $$slot_def: Slots;
    constructor(options: ComponentConstructorOptions<Props>);
}

declare type JSONPointer = string;
declare type JSONPath = string[];
declare type JSONValue = string | number | boolean | null;
declare type JSONData = {
    [key: string]: JSONData;
} | JSONData[] | JSONValue;
declare type JSONObject = {
    [key: string]: JSONData;
};
declare type JSONArray = JSONData[];
interface JSONPatchAdd {
    op: 'add';
    path: JSONPointer;
    value: JSONData;
}
interface JSONPatchRemove {
    op: 'remove';
    path: JSONPointer;
}
interface JSONPatchReplace {
    op: 'replace';
    path: JSONPointer;
    value: JSONData;
}
interface JSONPatchCopy {
    op: 'copy';
    path: JSONPointer;
    from: JSONPointer;
}
interface JSONPatchMove {
    op: 'move';
    path: JSONPointer;
    from: JSONPointer;
}
interface JSONPatchTest {
    op: 'test';
    path: JSONPointer;
    value: JSONData;
}
declare type JSONPatchOperation = JSONPatchAdd | JSONPatchRemove | JSONPatchReplace | JSONPatchCopy | JSONPatchMove | JSONPatchTest;
declare type JSONPatchDocument = JSONPatchOperation[];
declare type JSONPatchOptions = {
    before?: (json: JSONData, operation: JSONPatchOperation) => {
        json?: JSONData;
        operation?: JSONPatchOperation;
    };
    after?: (json: JSONData, operation: JSONPatchOperation, previousJson: JSONData) => JSONData;
};
declare type RevertJSONPatchOptions = {
    before?: (json: JSONData, operation: JSONPatchOperation, revertOperations: JSONPatchOperation[]) => {
        json?: JSONData;
        revertOperations?: JSONPatchOperation[];
    };
};

/**
 * Apply a patch to a JSON object
 * The original JSON object will not be changed,
 * instead, the patch is applied in an immutable way
 */
declare function immutableJSONPatch(json: JSONData, operations: JSONPatchDocument, options?: JSONPatchOptions): JSONData;
declare function parsePath(json: JSONData, pointer: JSONPointer): JSONPath;
declare function parseFrom(fromPointer: JSONPointer): JSONPath;

/**
 * Create the inverse of a set of json patch operations
 * @param json
 * @param operations Array with JSON patch actions
 * @param [options]
 * @return Returns the operations to revert the changes
 */
declare function revertJSONPatch(json: JSONData, operations: JSONPatchDocument, options?: RevertJSONPatchOptions): JSONPatchDocument;

/**
 * Parse a JSON Pointer
 */
declare function parseJSONPointer(pointer: JSONPointer): string[];
/**
 * Compile a JSON Pointer
 */
declare function compileJSONPointer(path: JSONPath): JSONPointer;
/**
 * Compile a single path property from a JSONPath
 */
declare function compileJSONPointerProp(pathProp: string | number): JSONPointer;

/**
 * helper function to get a nested property in an object or array
 *
 * @return Returns the field when found, or undefined when the path doesn't exist
 */
declare function getIn(object: JSONData, path: JSONPath): JSONData | undefined;
/**
 * helper function to replace a nested property in an object with a new value
 * without mutating the object itself.
 *
 * @param object
 * @param path
 * @param value
 * @param [createPath=false]
 *                    If true, `path` will be created when (partly) missing in
 *                    the object. For correctly creating nested Arrays or
 *                    Objects, the function relies on `path` containing number
 *                    in case of array indexes.
 *                    If false (default), an error will be thrown when the
 *                    path doesn't exist.
 * @return Returns a new, updated object or array
 */
declare function setIn(object: JSONData, path: JSONPath, value: JSONData, createPath?: boolean): JSONData;
/**
 * helper function to replace a nested property in an object with a new value
 * without mutating the object itself.
 *
 * @return  Returns a new, updated object or array
 */
declare function updateIn(object: JSONData, path: JSONPath, callback: (value: JSONData) => JSONData): JSONData;
/**
 * helper function to delete a nested property in an object
 * without mutating the object itself.
 *
 * @return Returns a new, updated object or array
 */
declare function deleteIn<T extends JSONData>(object: T, path: JSONPath): T;
/**
 * Insert a new item in an array at a specific index.
 * Example usage:
 *
 *     insertAt({arr: [1,2,3]}, ['arr', '2'], 'inserted')  // [1,2,'inserted',3]
 */
declare function insertAt(object: JSONObject | JSONArray, path: JSONPath, value: JSONData): JSONData;
/**
 * Test whether a path exists in a JSON object
 * @return Returns true if the path exists, else returns false
 */
declare function existsIn(json: JSONData, path: JSONPath): boolean;

declare type TextContent = {
    text: string;
} | {
    json: undefined;
    text: string;
};
declare type JSONContent = {
    json: JSONData;
} | {
    json: JSONData;
    text: undefined;
};
declare type Content = JSONContent | TextContent;
interface VisibleSection {
    start: number;
    end: number;
}
declare enum Mode {
    text = "text",
    tree = "tree"
}
declare enum SelectionType {
    after = "after",
    inside = "inside",
    key = "key",
    value = "value",
    multi = "multi"
}
declare enum CaretType {
    after = "after",
    key = "key",
    value = "value",
    inside = "inside"
}
interface CaretPosition {
    path: JSONPath;
    type: CaretType;
}
interface DocumentState {
    expandedMap: JSONPointerMap<boolean>;
    enforceStringMap: JSONPointerMap<boolean>;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]>;
    selection: JSONSelection | undefined;
}
interface JSONPatchResult {
    json: JSONData;
    previousJson: JSONData;
    undo: JSONPatchDocument;
    redo: JSONPatchDocument;
}
declare type AfterPatchCallback = (patchedJson: JSONData, patchedState: DocumentState) => {
    json?: JSONData;
    state?: DocumentState;
};
interface MultiSelection {
    type: SelectionType.multi;
    paths: JSONPath[];
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface AfterSelection {
    type: SelectionType.after;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface InsideSelection {
    type: SelectionType.inside;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
}
interface KeySelection {
    type: SelectionType.key;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
interface ValueSelection {
    type: SelectionType.value;
    anchorPath: JSONPath;
    focusPath: JSONPath;
    pointersMap: {
        [pointer: JSONPointer]: boolean;
    };
    edit?: boolean;
}
declare type JSONSelection = MultiSelection | AfterSelection | InsideSelection | KeySelection | ValueSelection;
declare type JSONPointerMap<T> = {
    [pointer: JSONPointer]: T;
};
declare type ClipboardValues = Array<{
    key: string;
    value: JSONData;
}>;
interface FontAwesomeIcon {
    prefix: string;
    iconName: string;
    icon: [number, number, Array<number | string>, string, string];
}
interface DropdownButtonItem {
    text: string;
    onClick: () => void;
    icon?: FontAwesomeIcon;
    title?: string;
    disabled?: boolean;
}
interface MenuButtonItem {
    onClick: () => void;
    icon?: FontAwesomeIcon;
    text?: string;
    title?: string;
    className?: string;
    disabled?: boolean;
}
interface MenuSeparatorItem {
    separator: true;
}
interface MenuSpaceItem {
    space: true;
}
declare type MenuItem = MenuButtonItem | MenuSeparatorItem | MenuSpaceItem;
interface MessageAction {
    text: string;
    title: string;
    icon?: FontAwesomeIcon;
    onClick?: () => void;
    onMouseDown?: () => void;
    disabled?: boolean;
}
declare enum ValidationSeverity {
    info = "info",
    warning = "warning",
    error = "error"
}
interface ValidationError {
    path: JSONPath;
    message: string;
    severity: ValidationSeverity;
}
interface NestedValidationError extends ValidationError {
    isChildError?: boolean;
}
declare type Validator = (json: JSONData) => ValidationError[];
interface ParseError {
    position: number | null;
    line: number | null;
    column: number | null;
    message: string;
}
interface ContentParseError {
    parseError: ParseError;
    isRepairable: boolean;
}
interface ContentValidationErrors {
    validationErrors: ValidationError[];
}
declare type ContentErrors = ContentParseError | ContentValidationErrors;
interface RichValidationError extends ValidationError {
    line?: number;
    column?: number;
    from: number;
    to: number;
    actions: Array<{
        name: string;
        apply: () => void;
    }> | null;
}
interface TextLocation {
    path: JSONPath;
    line: number;
    column: number;
    from: number;
    to: number;
}
interface Section {
    start: number;
    end: number;
}
interface QueryLanguage {
    id: string;
    name: string;
    description: string;
    createQuery: (json: JSONData, queryOptions: QueryLanguageOptions) => string;
    executeQuery: (json: JSONData, query: string) => JSONData;
}
interface QueryLanguageOptions {
    filter?: {
        path?: string[];
        relation?: '==' | '!=' | '<' | '<=' | '>' | '>=';
        value?: string;
    };
    sort?: {
        path?: string[];
        direction?: 'asc' | 'desc';
    };
    projection?: {
        paths?: string[][];
    };
}
declare type OnChangeQueryLanguage = (queryLanguageId: string) => void;
interface OnChangeStatus {
    contentErrors: ContentErrors;
    patchResult: JSONPatchResult | null;
}
declare type OnChange = ((content: Content, previousContent: Content, OnChangeStatus: any) => void) | null;
declare type OnSelect = (selection: JSONSelection) => void;
declare type OnPatch = (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => void;
declare type OnSort = (operations: JSONPatchDocument) => void;
declare type OnFind = (findAndReplace: boolean) => void;
declare type OnPaste = (pastedText: string) => void;
declare type OnPasteJson = (pastedJson: {
    path: JSONPath;
    contents: JSONData;
}) => void;
declare type OnRenderValue = (props: RenderValueProps) => RenderValueComponentDescription[];
declare type OnClassName = (path: JSONPath, value: JSONData) => string | undefined;
declare type OnChangeMode = (mode: Mode) => void;
declare type OnContextMenu = (contextMenuProps: AbsolutePopupOptions) => void;
declare type OnRenderMenu = (mode: 'tree' | 'text' | 'repair', items: MenuItem[]) => MenuItem[] | undefined | void;
declare type OnError = (error: Error) => void;
declare type OnFocus = () => void;
declare type OnBlur = () => void;
interface SearchResult {
    items: ExtendedSearchResultItem[];
    itemsMap: JSONPointerMap<ExtendedSearchResultItem[]>;
    activeItem: ExtendedSearchResultItem | undefined;
    activeIndex: number | -1;
}
declare enum SearchField {
    key = "key",
    value = "value"
}
interface SearchResultItem {
    path: JSONPath;
    field: SearchField;
    fieldIndex: number;
    start: number;
    end: number;
}
interface ExtendedSearchResultItem extends SearchResultItem {
    active: boolean;
}
interface ValueNormalization {
    escapeValue: (unescapedValue: unknown) => string;
    unescapeValue: (escapedValue: string) => string;
}
declare type PastedJson = {
    contents: JSONData;
    path: JSONPath;
} | undefined;
declare type EscapeValue = (value: JSONData) => string;
declare type UnescapeValue = (escapedValue: string) => string;
interface DragInsideProps {
    json: JSONData;
    selection: JSONSelection;
    deltaY: number;
    items: Array<{
        path: JSONPath;
        height: number;
    }>;
}
declare type DragInsideAction = {
    beforePath: JSONPath;
    offset: number;
} | {
    append: true;
    offset: number;
};
interface RenderedItem {
    path: JSONPath;
    height: number;
}
interface HistoryItem {
    undo: {
        patch: JSONPatchDocument | undefined;
        json: JSONData | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
    redo: {
        patch: JSONPatchDocument | undefined;
        json: JSONData | undefined;
        text: string | undefined;
        state: DocumentState;
        textIsRepaired: boolean;
    };
}
declare type InsertType = 'value' | 'object' | 'array' | 'structure';
interface PopupEntry {
    id: number;
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
    options: AbsolutePopupOptions;
}
interface AbsolutePopupOptions {
    anchor?: Element;
    left?: number;
    top?: number;
    width?: number;
    height?: number;
    offsetTop?: number;
    offsetLeft?: number;
    showTip?: boolean;
    closeOnOuterClick?: boolean;
    onClose?: () => void;
}
interface JSONEditorPropsOptional {
    content?: Content;
    readOnly?: boolean;
    indentation?: number | string;
    tabSize?: number;
    mode?: Mode;
    mainMenuBar?: boolean;
    navigationBar?: boolean;
    statusBar?: boolean;
    escapeControlCharacters?: boolean;
    escapeUnicodeCharacters?: boolean;
    validator?: Validator;
    queryLanguages?: QueryLanguage[];
    queryLanguageId?: string;
    onChangeQueryLanguage?: OnChangeQueryLanguage;
    onChange?: OnChange;
    onRenderValue?: OnRenderValue;
    onClassName?: OnClassName;
    onRenderMenu?: OnRenderMenu;
    onChangeMode?: OnChangeMode;
    onError?: OnError;
    onFocus?: OnFocus;
    onBlur?: OnBlur;
}
interface TreeModeContext {
    readOnly: boolean;
    normalization: ValueNormalization;
    getJson: () => JSONData;
    getDocumentState: () => DocumentState;
    findElement: (path: JSONPath) => Element | null;
    focus: () => void;
    onPatch: (operations: JSONPatchDocument, afterPatch?: AfterPatchCallback) => JSONPatchResult;
    onInsert: (type: InsertType) => void;
    onExpand: (path: JSONPath, expanded: boolean, recursive?: boolean) => void;
    onSelect: OnSelect;
    onFind: OnFind;
    onExpandSection: (path: JSONPath, section: Section) => void;
    onPasteJson: (newPastedJson: PastedJson) => void;
    onRenderValue: OnRenderValue;
    onContextMenu: OnContextMenu;
    onClassName: OnClassName;
    onDrag: (event: Event) => void;
    onDragEnd: () => void;
}
interface RenderValuePropsOptional {
    path?: JSONPath;
    value?: JSONData;
    readOnly?: boolean;
    enforceString?: boolean;
    selection?: JSONSelection;
    searchResultItems?: SearchResultItem[];
    isSelected?: boolean;
    isEditing?: boolean;
    normalization?: ValueNormalization;
    onPatch?: TreeModeContext['onPatch'];
    onPasteJson?: OnPasteJson;
    onSelect?: OnSelect;
    onFind?: OnFind;
    focus?: () => void;
}
interface RenderValueProps extends RenderValuePropsOptional {
    path: JSONPath;
    value: JSONData;
    readOnly: boolean;
    enforceString: boolean;
    selection: JSONSelection | undefined;
    searchResultItems: SearchResultItem[] | undefined;
    isSelected: boolean;
    isEditing: boolean;
    normalization: ValueNormalization;
    onPatch: TreeModeContext['onPatch'];
    onPasteJson: OnPasteJson;
    onSelect: OnSelect;
    onFind: OnFind;
    focus: () => void;
}
interface JSONNodeProp {
    key: string;
    value: JSONData;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    keySearchResultItemsMap: ExtendedSearchResultItem[] | undefined;
    valueSearchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface JSONNodeItem {
    index: number;
    value: JSONData;
    path: JSONPath;
    pointer: JSONPointer;
    expandedMap: JSONPointerMap<boolean> | undefined;
    enforceStringMap: JSONPointerMap<boolean> | undefined;
    visibleSectionsMap: JSONPointerMap<VisibleSection[]> | undefined;
    validationErrorsMap: JSONPointerMap<NestedValidationError> | undefined;
    searchResultItemsMap: JSONPointerMap<ExtendedSearchResultItem[]> | undefined;
    selection: JSONSelection | undefined;
}
interface DraggingState {
    initialTarget: Element;
    initialClientY: number;
    initialContentTop: number;
    selectionStartIndex: number;
    selectionItemsCount: number;
    items: RenderedItem[] | null;
    offset: number;
    didMoveItems: boolean;
}
interface RenderValueComponentDescription {
    component: SvelteComponentTyped;
    props: Record<string, unknown>;
}
interface TransformModalOptions {
    id?: string;
    selectedPath?: JSONPath;
    onTransform?: (state: {
        operations: JSONPatchDocument;
        json: JSONData;
        transformedJson: JSONData;
    }) => void;
    onClose?: () => void;
}
interface TransformModalCallback extends TransformModalOptions {
    id: string;
    selectedPath: JSONPath;
    json: JSONData;
    onTransform: (state: {
        operations: JSONPatchDocument;
        json: JSONData;
        transformedJson: JSONData;
    }) => void;
    onClose: () => void;
}
interface SortModalCallback {
    id: string;
    json: JSONData;
    selectedPath: JSONPath;
    onSort: OnSort;
    onClose: () => void;
}

declare const __propDef$8: {
    props: {
        content?: Content;
        readOnly?: boolean;
        indentation?: number | string;
        tabSize?: number;
        mode?: Mode;
        mainMenuBar?: boolean;
        navigationBar?: boolean;
        statusBar?: boolean;
        escapeControlCharacters?: boolean;
        escapeUnicodeCharacters?: boolean;
        validator?: Validator | null;
        queryLanguages?: QueryLanguage[];
        queryLanguageId?: string;
        onChangeQueryLanguage?: OnChangeQueryLanguage;
        onChange?: OnChange;
        onRenderValue?: OnRenderValue;
        onClassName?: OnClassName;
        onRenderMenu?: OnRenderMenu;
        onChangeMode?: OnChangeMode;
        onError?: OnError;
        onFocus?: OnFocus;
        onBlur?: OnBlur;
        get?: () => Content;
        set?: (newContent: Content) => void;
        update?: (updatedContent: Content) => void;
        patch?: (operations: JSONPatchDocument) => void;
        expand?: (callback?: (path: JSONPath) => boolean) => void;
        transform?: (options: TransformModalOptions) => void;
        validate?: () => ContentErrors;
        acceptAutoRepair?: () => Content;
        scrollTo?: (path: JSONPath) => void;
        findElement?: (path: JSONPath) => Element;
        focus?: () => void;
        refresh?: () => void;
        updateProps?: (props: JSONEditorPropsOptional) => void;
        destroy?: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type JsonEditorProps = typeof __propDef$8.props;
declare type JsonEditorEvents = typeof __propDef$8.events;
declare type JsonEditorSlots = typeof __propDef$8.slots;
declare class JsonEditor extends SvelteComponentTyped<JsonEditorProps, JsonEditorEvents, JsonEditorSlots> {
    get get(): () => Content;
    get set(): (newContent: Content) => void;
    get update(): (updatedContent: Content) => void;
    get patch(): (operations: JSONPatchDocument) => void;
    get expand(): (callback?: (path: JSONPath) => boolean) => void;
    get transform(): (options: TransformModalOptions) => void;
    get validate(): () => ContentErrors;
    get acceptAutoRepair(): () => Content;
    get scrollTo(): (path: JSONPath) => void;
    get findElement(): (path: JSONPath) => Element;
    get focus(): () => void;
    get refresh(): () => void;
    get updateProps(): (props: JSONEditorPropsOptional) => void;
    get destroy(): () => void;
}

declare const __propDef$7: {
    props: {
        id: string;
        json: JSONData;
        selectedPath: JSONPath;
        onSort: OnSort;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type SortModalProps = typeof __propDef$7.props;
declare type SortModalEvents = typeof __propDef$7.events;
declare type SortModalSlots = typeof __propDef$7.slots;
declare class SortModal extends SvelteComponentTyped<SortModalProps, SortModalEvents, SortModalSlots> {
}

declare const __propDef$6: {
    props: {
        id?: string;
        json: JSONData;
        selectedPath?: JSONPath;
        escapeControlCharacters: boolean;
        escapeUnicodeCharacters: boolean;
        queryLanguages: QueryLanguage[];
        queryLanguageId: string;
        onChangeQueryLanguage: OnChangeQueryLanguage;
        onRenderValue: OnRenderValue;
        onClassName: OnClassName;
        onTransform: OnPatch;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TransformModalProps = typeof __propDef$6.props;
declare type TransformModalEvents = typeof __propDef$6.events;
declare type TransformModalSlots = typeof __propDef$6.slots;
declare class TransformModal extends SvelteComponentTyped<TransformModalProps, TransformModalEvents, TransformModalSlots> {
}

declare const __propDef$5: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type BooleanToggleProps = typeof __propDef$5.props;
declare type BooleanToggleEvents = typeof __propDef$5.events;
declare type BooleanToggleSlots = typeof __propDef$5.slots;
declare class BooleanToggle extends SvelteComponentTyped<BooleanToggleProps, BooleanToggleEvents, BooleanToggleSlots> {
}

declare const __propDef$4: {
    props: {
        path: JSONPath;
        value: string;
        readOnly: boolean;
        onPatch: OnPatch;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ColorPickerProps = typeof __propDef$4.props;
declare type ColorPickerEvents = typeof __propDef$4.events;
declare type ColorPickerSlots = typeof __propDef$4.slots;
declare class ColorPicker extends SvelteComponentTyped<ColorPickerProps, ColorPickerEvents, ColorPickerSlots> {
}

declare const __propDef$3: {
    props: {
        path: JSONPath;
        value: JSONData;
        normalization: ValueNormalization;
        enforceString: boolean;
        onPatch: OnPatch;
        onPasteJson: OnPasteJson;
        onSelect: OnSelect;
        onFind: OnFind;
        focus: () => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EditableValueProps = typeof __propDef$3.props;
declare type EditableValueEvents = typeof __propDef$3.events;
declare type EditableValueSlots = typeof __propDef$3.slots;
declare class EditableValue extends SvelteComponentTyped<EditableValueProps, EditableValueEvents, EditableValueSlots> {
}

declare const __propDef$2: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        isSelected: boolean;
        onPatch: OnPatch;
        options: {
            value: unknown;
            text: string;
        }[];
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type EnumValueProps = typeof __propDef$2.props;
declare type EnumValueEvents = typeof __propDef$2.events;
declare type EnumValueSlots = typeof __propDef$2.slots;
declare class EnumValue extends SvelteComponentTyped<EnumValueProps, EnumValueEvents, EnumValueSlots> {
}

declare const __propDef$1: {
    props: {
        path: JSONPath;
        value: JSONData;
        readOnly: boolean;
        normalization: ValueNormalization;
        onSelect: OnSelect;
        searchResultItems: ExtendedSearchResultItem[] | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type ReadonlyValueProps = typeof __propDef$1.props;
declare type ReadonlyValueEvents = typeof __propDef$1.events;
declare type ReadonlyValueSlots = typeof __propDef$1.slots;
declare class ReadonlyValue extends SvelteComponentTyped<ReadonlyValueProps, ReadonlyValueEvents, ReadonlyValueSlots> {
}

declare const __propDef: {
    props: {
        value: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
declare type TimestampTagProps = typeof __propDef.props;
declare type TimestampTagEvents = typeof __propDef.events;
declare type TimestampTagSlots = typeof __propDef.slots;
declare class TimestampTag extends SvelteComponentTyped<TimestampTagProps, TimestampTagEvents, TimestampTagSlots> {
}

declare function renderValue({ path, value, readOnly, enforceString, searchResultItems, isEditing, normalization, onPatch, onPasteJson, onSelect, onFind, focus }: RenderValueProps): RenderValueComponentDescription[];

/**
 * Search the JSON schema for enums defined at given props.path. If found,
 * return an EnumValue renderer. If not found, return null. In that case you
 * have to fallback on the default valueRender function
 */
declare function renderJSONSchemaEnum(props: RenderValueProps, schema: JSONData, schemaDefinitions: JSONData): RenderValueComponentDescription[];

declare namespace AjvErrors {
  class ValidationError extends Error {
    constructor(errors: Array<ajv.ErrorObject>);

    message: string;
    errors: Array<ajv.ErrorObject>;
    ajv: true;
    validation: true;
  }

  class MissingRefError extends Error {
    constructor(baseId: string, ref: string, message?: string);
    static message: (baseId: string, ref: string) => string;

    message: string;
    missingRef: string;
    missingSchema: string;
  }
}
declare var ajv: {
  (options?: ajv.Options): ajv.Ajv;
  new(options?: ajv.Options): ajv.Ajv;
  ValidationError: typeof AjvErrors.ValidationError;
  MissingRefError: typeof AjvErrors.MissingRefError;
  $dataMetaSchema: object;
}

declare namespace ajv {
  type ValidationError = AjvErrors.ValidationError;

  type MissingRefError = AjvErrors.MissingRefError;

  interface Ajv {
    /**
    * Validate data using schema
    * Schema will be compiled and cached (using serialized JSON as key, [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify) is used to serialize by default).
    * @param  {string|object|Boolean} schemaKeyRef key, ref or schema object
    * @param  {Any} data to be validated
    * @return {Boolean} validation result. Errors from the last validation will be available in `ajv.errors` (and also in compiled schema: `schema.errors`).
    */
    validate(schemaKeyRef: object | string | boolean, data: any): boolean | PromiseLike<any>;
    /**
    * Create validating function for passed schema.
    * @param  {object|Boolean} schema schema object
    * @return {Function} validating function
    */
    compile(schema: object | boolean): ValidateFunction;
    /**
    * Creates validating function for passed schema with asynchronous loading of missing schemas.
    * `loadSchema` option should be a function that accepts schema uri and node-style callback.
    * @this  Ajv
    * @param {object|Boolean} schema schema object
    * @param {Boolean} meta optional true to compile meta-schema; this parameter can be skipped
    * @param {Function} callback optional node-style callback, it is always called with 2 parameters: error (or null) and validating function.
    * @return {PromiseLike<ValidateFunction>} validating function
    */
    compileAsync(schema: object | boolean, meta?: Boolean, callback?: (err: Error, validate: ValidateFunction) => any): PromiseLike<ValidateFunction>;
    /**
    * Adds schema to the instance.
    * @param {object|Array} schema schema or array of schemas. If array is passed, `key` and other parameters will be ignored.
    * @param {string} key Optional schema key. Can be passed to `validate` method instead of schema object or id/ref. One schema per instance can have empty `id` and `key`.
    * @return {Ajv} this for method chaining
    */
    addSchema(schema: Array<object> | object, key?: string): Ajv;
    /**
    * Add schema that will be used to validate other schemas
    * options in META_IGNORE_OPTIONS are alway set to false
    * @param {object} schema schema object
    * @param {string} key optional schema key
    * @return {Ajv} this for method chaining
    */
    addMetaSchema(schema: object, key?: string): Ajv;
    /**
    * Validate schema
    * @param {object|Boolean} schema schema to validate
    * @return {Boolean} true if schema is valid
    */
    validateSchema(schema: object | boolean): boolean;
    /**
    * Get compiled schema from the instance by `key` or `ref`.
    * @param  {string} keyRef `key` that was passed to `addSchema` or full schema reference (`schema.id` or resolved id).
    * @return {Function} schema validating function (with property `schema`). Returns undefined if keyRef can't be resolved to an existing schema.
    */
    getSchema(keyRef: string): ValidateFunction | undefined;
    /**
    * Remove cached schema(s).
    * If no parameter is passed all schemas but meta-schemas are removed.
    * If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    * Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    * @param  {string|object|RegExp|Boolean} schemaKeyRef key, ref, pattern to match key/ref or schema object
    * @return {Ajv} this for method chaining
    */
    removeSchema(schemaKeyRef?: object | string | RegExp | boolean): Ajv;
    /**
    * Add custom format
    * @param {string} name format name
    * @param {string|RegExp|Function} format string is converted to RegExp; function should return boolean (true when valid)
    * @return {Ajv} this for method chaining
    */
    addFormat(name: string, format: FormatValidator | FormatDefinition): Ajv;
    /**
    * Define custom keyword
    * @this  Ajv
    * @param {string} keyword custom keyword, should be a valid identifier, should be different from all standard, custom and macro keywords.
    * @param {object} definition keyword definition object with properties `type` (type(s) which the keyword applies to), `validate` or `compile`.
    * @return {Ajv} this for method chaining
    */
    addKeyword(keyword: string, definition: KeywordDefinition): Ajv;
    /**
    * Get keyword definition
    * @this  Ajv
    * @param {string} keyword pre-defined or custom keyword.
    * @return {object|Boolean} custom keyword definition, `true` if it is a predefined keyword, `false` otherwise.
    */
    getKeyword(keyword: string): object | boolean;
    /**
    * Remove keyword
    * @this  Ajv
    * @param {string} keyword pre-defined or custom keyword.
    * @return {Ajv} this for method chaining
    */
    removeKeyword(keyword: string): Ajv;
    /**
    * Validate keyword
    * @this  Ajv
    * @param {object} definition keyword definition object
    * @param {boolean} throwError true to throw exception if definition is invalid
    * @return {boolean} validation result
    */
    validateKeyword(definition: KeywordDefinition, throwError: boolean): boolean;
    /**
    * Convert array of error message objects to string
    * @param  {Array<object>} errors optional array of validation errors, if not passed errors from the instance are used.
    * @param  {object} options optional options with properties `separator` and `dataVar`.
    * @return {string} human readable string with all errors descriptions
    */
    errorsText(errors?: Array<ErrorObject> | null, options?: ErrorsTextOptions): string;
    errors?: Array<ErrorObject> | null;
    _opts: Options;
  }

  interface CustomLogger {
    log(...args: any[]): any;
    warn(...args: any[]): any;
    error(...args: any[]): any;
  }

  interface ValidateFunction {
    (
      data: any,
      dataPath?: string,
      parentData?: object | Array<any>,
      parentDataProperty?: string | number,
      rootData?: object | Array<any>
    ): boolean | PromiseLike<any>;
    schema?: object | boolean;
    errors?: null | Array<ErrorObject>;
    refs?: object;
    refVal?: Array<any>;
    root?: ValidateFunction | object;
    $async?: true;
    source?: object;
  }

  interface Options {
    $data?: boolean;
    allErrors?: boolean;
    verbose?: boolean;
    jsonPointers?: boolean;
    uniqueItems?: boolean;
    unicode?: boolean;
    format?: false | string;
    formats?: object;
    keywords?: object;
    unknownFormats?: true | string[] | 'ignore';
    schemas?: Array<object> | object;
    schemaId?: '$id' | 'id' | 'auto';
    missingRefs?: true | 'ignore' | 'fail';
    extendRefs?: true | 'ignore' | 'fail';
    loadSchema?: (uri: string, cb?: (err: Error, schema: object) => void) => PromiseLike<object | boolean>;
    removeAdditional?: boolean | 'all' | 'failing';
    useDefaults?: boolean | 'empty' | 'shared';
    coerceTypes?: boolean | 'array';
    strictDefaults?: boolean | 'log';
    strictKeywords?: boolean | 'log';
    strictNumbers?: boolean;
    async?: boolean | string;
    transpile?: string | ((code: string) => string);
    meta?: boolean | object;
    validateSchema?: boolean | 'log';
    addUsedSchema?: boolean;
    inlineRefs?: boolean | number;
    passContext?: boolean;
    loopRequired?: number;
    ownProperties?: boolean;
    multipleOfPrecision?: boolean | number;
    errorDataPath?: string,
    messages?: boolean;
    sourceCode?: boolean;
    processCode?: (code: string, schema: object) => string;
    cache?: object;
    logger?: CustomLogger | false;
    nullable?: boolean;
    serialize?: ((schema: object | boolean) => any) | false;
  }

  type FormatValidator = string | RegExp | ((data: string) => boolean | PromiseLike<any>);
  type NumberFormatValidator = ((data: number) => boolean | PromiseLike<any>);

  interface NumberFormatDefinition {
    type: "number",
    validate: NumberFormatValidator;
    compare?: (data1: number, data2: number) => number;
    async?: boolean;
  }

  interface StringFormatDefinition {
    type?: "string",
    validate: FormatValidator;
    compare?: (data1: string, data2: string) => number;
    async?: boolean;
  }

  type FormatDefinition = NumberFormatDefinition | StringFormatDefinition;

  interface KeywordDefinition {
    type?: string | Array<string>;
    async?: boolean;
    $data?: boolean;
    errors?: boolean | string;
    metaSchema?: object;
    // schema: false makes validate not to expect schema (ValidateFunction)
    schema?: boolean;
    statements?: boolean;
    dependencies?: Array<string>;
    modifying?: boolean;
    valid?: boolean;
    // one and only one of the following properties should be present
    validate?: SchemaValidateFunction | ValidateFunction;
    compile?: (schema: any, parentSchema: object, it: CompilationContext) => ValidateFunction;
    macro?: (schema: any, parentSchema: object, it: CompilationContext) => object | boolean;
    inline?: (it: CompilationContext, keyword: string, schema: any, parentSchema: object) => string;
  }

  interface CompilationContext {
    level: number;
    dataLevel: number;
    dataPathArr: string[];
    schema: any;
    schemaPath: string;
    baseId: string;
    async: boolean;
    opts: Options;
    formats: {
      [index: string]: FormatDefinition | undefined;
    };
    keywords: {
      [index: string]: KeywordDefinition | undefined;
    };
    compositeRule: boolean;
    validate: (schema: object) => boolean;
    util: {
      copy(obj: any, target?: any): any;
      toHash(source: string[]): { [index: string]: true | undefined };
      equal(obj: any, target: any): boolean;
      getProperty(str: string): string;
      schemaHasRules(schema: object, rules: any): string;
      escapeQuotes(str: string): string;
      toQuotedString(str: string): string;
      getData(jsonPointer: string, dataLevel: number, paths: string[]): string;
      escapeJsonPointer(str: string): string;
      unescapeJsonPointer(str: string): string;
      escapeFragment(str: string): string;
      unescapeFragment(str: string): string;
    };
    self: Ajv;
  }

  interface SchemaValidateFunction {
    (
      schema: any,
      data: any,
      parentSchema?: object,
      dataPath?: string,
      parentData?: object | Array<any>,
      parentDataProperty?: string | number,
      rootData?: object | Array<any>
    ): boolean | PromiseLike<any>;
    errors?: Array<ErrorObject>;
  }

  interface ErrorsTextOptions {
    separator?: string;
    dataVar?: string;
  }

  interface ErrorObject {
    keyword: string;
    dataPath: string;
    schemaPath: string;
    params: ErrorParameters;
    // Added to validation errors of propertyNames keyword schema
    propertyName?: string;
    // Excluded if messages set to false.
    message?: string;
    // These are added with the `verbose` option.
    schema?: any;
    parentSchema?: object;
    data?: any;
  }

  type ErrorParameters = RefParams | LimitParams | AdditionalPropertiesParams |
    DependenciesParams | FormatParams | ComparisonParams |
    MultipleOfParams | PatternParams | RequiredParams |
    TypeParams | UniqueItemsParams | CustomParams |
    PatternRequiredParams | PropertyNamesParams |
    IfParams | SwitchParams | NoParams | EnumParams;

  interface RefParams {
    ref: string;
  }

  interface LimitParams {
    limit: number;
  }

  interface AdditionalPropertiesParams {
    additionalProperty: string;
  }

  interface DependenciesParams {
    property: string;
    missingProperty: string;
    depsCount: number;
    deps: string;
  }

  interface FormatParams {
    format: string
  }

  interface ComparisonParams {
    comparison: string;
    limit: number | string;
    exclusive: boolean;
  }

  interface MultipleOfParams {
    multipleOf: number;
  }

  interface PatternParams {
    pattern: string;
  }

  interface RequiredParams {
    missingProperty: string;
  }

  interface TypeParams {
    type: string;
  }

  interface UniqueItemsParams {
    i: number;
    j: number;
  }

  interface CustomParams {
    keyword: string;
  }

  interface PatternRequiredParams {
    missingPattern: string;
  }

  interface PropertyNamesParams {
    propertyName: string;
  }

  interface IfParams {
    failingKeyword: string;
  }

  interface SwitchParams {
    caseIndex: number;
  }

  interface NoParams { }

  interface EnumParams {
    allowedValues: Array<any>;
  }
}

/**
 * Create a JSON Schema validator powered by Ajv.
 * @param schema
 * @param [schemaDefinitions=undefined]
 *                    An object containing JSON Schema definitions
 *                    which can be referenced using $ref
 * @param [ajvOptions] Optional extra options for Ajv
 * @return Returns a validation function
 */
declare function createAjvValidator(schema: JSONData, schemaDefinitions?: JSONData, ajvOptions?: ajv.Options): Validator;

declare const lodashQueryLanguage: QueryLanguage;

declare const javascriptQueryLanguage: QueryLanguage;

declare const jmespathQueryLanguage: QueryLanguage;

/**
 * Find enum options for given path in a JSONSchema
 * @param {JSON} schema
 * @param {JSON} [schemaDefinitions=undefined]
 * @param {Path} path
 * @returns {Array<any> | null}
 */
declare function getJSONSchemaOptions(schema: any, schemaDefinitions: any, path: any): any;
/**
 * find an enum definition in a JSON schema, as property `enum` or inside
 * one of the schemas composites (`oneOf`, `anyOf`, `allOf`)
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param  {Object} schema
 * @return {Array | null} Returns the enum when found, null otherwise.
 * @private
 */
declare function findEnum(schema: any): any;
/**
 * Return the part of a JSON schema matching given path.
 *
 * Source: https://github.com/josdejong/jsoneditor/blob/develop/src/js/Node.js
 *
 * @param {JSON} topLevelSchema
 * @param {JSON} schemaDefinitions
 * @param {Array.<string | number>} path
 * @param {Object} currentSchema
 * @return {Object | null}
 * @private
 */
declare function findSchema(topLevelSchema: any, schemaDefinitions: any, path: any, currentSchema?: any): any;

/**
 * Check whether content contains text (and not JSON)
 */
declare function isTextContent(content: Content): content is TextContent;
/**
 * Returns true when the (estimated) size of the contents exceeds the
 * provided maxSize.
 * @param content
 * @param maxSize  Maximum content size in bytes
 */
declare function isLargeContent(content: Content, maxSize: number): boolean;
/**
 * A rough, fast estimation on whether a document is larger than given size
 * when serialized.
 *
 * maxSize is an optional max size in bytes. When reached, size estimation will
 * be cancelled. This is useful when you're only interested in knowing whether
 * the size exceeds a certain maximum size.
 */
declare function estimateSerializedSize(content: Content, maxSize?: number): number;

declare function isAfterSelection(selection: JSONSelection | undefined): selection is AfterSelection;
declare function isInsideSelection(selection: JSONSelection | undefined): selection is InsideSelection;
declare function isKeySelection(selection: JSONSelection | undefined): selection is KeySelection;
declare function isValueSelection(selection: JSONSelection | undefined): selection is ValueSelection;
declare function isMultiSelection(selection: JSONSelection | undefined): selection is MultiSelection;
declare function createKeySelection(path: JSONPath, edit: boolean): KeySelection;
declare function createValueSelection(path: JSONPath, edit: boolean): ValueSelection;
declare function createInsideSelection(path: JSONPath): InsideSelection;
declare function createAfterSelection(path: JSONPath): AfterSelection;
declare function createMultiSelection(json: JSONData, anchorPath: JSONPath, focusPath: JSONPath): MultiSelection;
declare function isEditingSelection(selection: JSONSelection): boolean;

export { AbsolutePopupOptions, AfterPatchCallback, AfterSelection, BooleanToggle, CaretPosition, CaretType, ClipboardValues, ColorPicker, Content, ContentErrors, ContentParseError, ContentValidationErrors, DocumentState, DragInsideAction, DragInsideProps, DraggingState, DropdownButtonItem, EditableValue, EnumValue, EscapeValue, ExtendedSearchResultItem, FontAwesomeIcon, HistoryItem, InsertType, InsideSelection, JSONContent, JSONData, JsonEditor as JSONEditor, JSONEditorPropsOptional, JSONNodeItem, JSONNodeProp, JSONPatchDocument, JSONPatchResult, JSONPath, JSONPointer, JSONPointerMap, JSONSelection, KeySelection, MenuButtonItem, MenuItem, MenuSeparatorItem, MenuSpaceItem, MessageAction, Mode, MultiSelection, NestedValidationError, OnBlur, OnChange, OnChangeMode, OnChangeQueryLanguage, OnChangeStatus, OnClassName, OnContextMenu, OnError, OnFind, OnFocus, OnPaste, OnPasteJson, OnPatch, OnRenderMenu, OnRenderValue, OnSelect, OnSort, ParseError, PastedJson, PopupEntry, QueryLanguage, QueryLanguageOptions, ReadonlyValue, RenderValueComponentDescription, RenderValueProps, RenderValuePropsOptional, RenderedItem, RichValidationError, SearchField, SearchResult, SearchResultItem, Section, SelectionType, SortModal, SortModalCallback, TextContent, TextLocation, TimestampTag, TransformModal, TransformModalCallback, TransformModalOptions, TreeModeContext, UnescapeValue, ValidationError, ValidationSeverity, Validator, ValueNormalization, ValueSelection, VisibleSection, compileJSONPointer, compileJSONPointerProp, createAfterSelection, createAjvValidator, createInsideSelection, createKeySelection, createMultiSelection, createValueSelection, deleteIn, estimateSerializedSize, existsIn, findEnum, findSchema, getIn, getJSONSchemaOptions, immutableJSONPatch, insertAt, isAfterSelection, isEditingSelection, isInsideSelection, isKeySelection, isLargeContent, isMultiSelection, isTextContent, isValueSelection, javascriptQueryLanguage, jmespathQueryLanguage, lodashQueryLanguage, parseFrom, parseJSONPointer, parsePath, renderJSONSchemaEnum, renderValue, revertJSONPatch, setIn, updateIn };
