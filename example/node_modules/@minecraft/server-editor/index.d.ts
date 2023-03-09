import { Color, Player, Vector3 } from "@minecraft/server";

import { PlayerUISession, PropertyPane } from "./internal";

export enum ActionTypes {
    NoArgsAction = "NoArgsAction",
    MouseRayCastAction = "MouseRayCastAction",
}

export class BedrockEventSubscriptionCache {
    subscribeToBedrockEvent(event: string, ...params: any[]): Function;

    teardown(): void;
}

export class BlockVolume {
    contains(): any;
    offset(): any;
    intersects(): any;
    getBlockPositionIterator(): any;
    equals(): any;
    min: Vector3;
    max: Vector3;
    boundingBox: BoundingBox;
    volume: number;
}

export enum BlockVolumeIntersection {
    disjoint = 0,
    contains = 1,
    intersects = 2,
}

export class BlockVolumeIterator {}

export class BoundingBox {
    equals(): boolean;
    fromBlockLocation(): any;
    intersects(): any;
    expand(): any;
    dilate(): any;
    offset(): any;
    contains(): boolean;
    min: Vector3;
    max: Vector3;
    center: Vector3;
    spanX: number;
    spanY: number;
    spanZ: number;
}

export class ClipboardItem {
    readFromSelection(): any;
    readFromWorld(): any;
    writeToWorld(): any;
    getPredictedWriteAsSelection(): any;
    clear(): any;
    size: Vector3;
    isEmpty: boolean;
}

export class ClipboardManager {
    create(): any;

    clipboard: ClipboardItem;
}

export enum ClipboardMirrorAxis {
    none = "none",
    X = "X",
    Z = "Z",
    XZ = "XZ",
}

export enum ClipboardRotation {
    none = "none",
    Rotate90 = "Rotate90",
    Rotate180 = "Rotate180",
    Rotate270 = "Rotate270",
}

export class ClipboardWriteOptions {}

export class Cursor {
    getState(): any;

    setState(): any;

    moveBy(): any;

    resetToDefaultState(): any;

    show(): any;

    hide(): any;

    position: Vector3;
    faceDirection: number;
    isVisible: boolean;
}

export enum CursorControlMode {
    Keyboard = 0,
    Mouse = 1,
    KeyboardAndMouse = 2,
    Fixed = 3,
}

export class CursorState {}

export enum CursorTargetMode {
    Block = 0,
    Face = 1,
}

export enum EDITOR_PANE_PROPERTY_ITEM_TYPE {
    Number = "editorUI:Number",
    String = "editorUI:String",
    Boolean = "editorUI:Boolean",
    BlockPicker = "editorUI:BlockPicker",
    Dropdown = "editorUI:Dropdown",
    Divider = "editorUI:Divider",
    SubPane = "editorUI:SubPane",
    Action = "editorUI:Action",
    Vec3 = "editorUI:Vec3",
}

export enum EditorInputContext {
    GlobalEditor = "global.editor",
    GlobalToolMode = "global.toolMode",
    Viewport = "local.toolMode.viewport",
}

export enum EditorServerEventType {
    ServerActionEvents = "Editor::ServerActionEvents",
    ServerInputBindingEvents = "Editor::ServerInputBindingEvents",
    ServerUXEvents = "Editor::ServerUXEvents",
}

export enum EditorStatusBarAlignment {
    Right = 0,
    Left = 1,
}

export class Extension {}

export class ExtensionContext {
    player: Player;
    selectionManager: SelectionManager;
    transactionManager: TransactionManager;
    clipboardManager: ClipboardManager;
    cursor: Cursor;
}

export enum InputModifier {
    Unused = 0,
    None = 1,
    Alt = 2,
    Control = 4,
    Shift = 8,
    Any = 15,
}
export enum KeyInputType {
    Press = 1,
    Release = 2,
}

export enum KeyboardKey {
    BACKSPACE = 8,
    TAB = 9,
    ENTER = 13,
    SHIFT = 16,
    CTRL = 17,
    ALT = 18,
    CAPS_LOCK = 20,
    ESCAPE = 27,
    SPACE = 32,
    PAGE_UP = 33,
    PAGE_DOWN = 34,
    END = 35,
    HOME = 36,
    LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40,
    PRINT_SCREEN = 44,
    INSERT = 45,
    DELETE = 46,
    KEY_0 = 48,
    KEY_1 = 49,
    KEY_2 = 50,
    KEY_3 = 51,
    KEY_4 = 52,
    KEY_5 = 53,
    KEY_6 = 54,
    KEY_7 = 55,
    KEY_8 = 56,
    KEY_9 = 57,
    KEY_A = 65,
    KEY_B = 66,
    KEY_C = 67,
    KEY_D = 68,
    KEY_E = 69,
    KEY_F = 70,
    KEY_G = 71,
    KEY_H = 72,
    KEY_I = 73,
    KEY_J = 74,
    KEY_K = 75,
    KEY_L = 76,
    KEY_M = 77,
    KEY_N = 78,
    KEY_O = 79,
    KEY_P = 80,
    KEY_Q = 81,
    KEY_R = 82,
    KEY_S = 83,
    KEY_T = 84,
    KEY_U = 85,
    KEY_V = 86,
    KEY_W = 87,
    KEY_X = 88,
    KEY_Y = 89,
    KEY_Z = 90,
    NUMPAD_0 = 96,
    NUMPAD_1 = 97,
    NUMPAD_2 = 98,
    NUMPAD_3 = 99,
    NUMPAD_4 = 100,
    NUMPAD_5 = 101,
    NUMPAD_6 = 102,
    NUMPAD_7 = 103,
    NUMPAD_8 = 104,
    NUMPAD_9 = 105,
    NUMPAD_MULTIPLY = 106,
    NUMPAD_ADD = 107,
    NUMPAD_SEPARATOR = 108,
    NUMPAD_SUBTRACT = 109,
    NUMPAD_DECIMAL = 110,
    NUMPAD_DIVIDE = 111,
    F1 = 112,
    F2 = 113,
    F3 = 114,
    F4 = 115,
    F5 = 116,
    F6 = 117,
    F7 = 118,
    F8 = 119,
    F9 = 120,
    F10 = 121,
    F11 = 122,
    F12 = 123,
    COMMA = 188,
    PERIOD = 190,
    SLASH = 191,
    BACK_QUOTE = 192,
    BRACKET_OPEN = 219,
    BACK_SLASH = 220,
    BRACKET_CLOSE = 221,
    QUOTE = 222,
}

export class MinecraftEditor {
    registerExtension(
        extensionName: string,
        activationFunction: (context: PlayerUISession) => void,
        shutdownFunction: (context: PlayerUISession) => void
    ): { description: string; notes: string };
}

export enum MouseActionCategory {
    Button = 1,
    Wheel = 2,
    Drag = 3,
}

export enum MouseActionType {
    LeftButton = 1,
    MiddleButton = 2,
    RightButton = 3,
    Wheel = 4,
}

export enum MouseInputType {
    ButtonDown = 1,
    ButtonUp = 2,
    WheelIn = 3,
    WheelOut = 4,
    DragStart = 5,
    Drag = 6,
    DragEnd = 7,
}

export class Selection {
    clear(): any;
    pushVolume(): any;
    popVolume(): any;
    copyFrom(): any;
    getBlockPositionIterator(): any;
    moveBy(): any;
    moveTo(): any;
    peekLastVolume: BlockVolume;
    boundingBox: BoundingBox;
    isEmpty: boolean;
    visible: boolean;
    fillColor: Color;
    borderColor: Color;
}

export enum SelectionBlockVolumeAction {
    add = 0,
    subtract = 1,
}

export class SelectionManager {
    createSelection(): any;
    selection: Selection;
}

export enum ServerUXEventType {
    UpdatePropertyPane = 1,
    DestroyPropertyPane = 2,
    UpdateMenu = 3,
    DestroyMenu = 4,
    UpdateStatusBarItem = 5,
    DestroyStatusBarItem = 6,
    UpdateModalToolOption = 7,
    DestroyModalToolOption = 8,
    UpdateModalToolContainer = 9,
    DestroyModalToolContainer = 10,
    BindActionToControl = 11,
    RemoveActionBindingFromControl = 12,
    UpdatePropertyItem = 13,
    DestroyPropertyItem = 14,
    OnNavigateFromEditor = 15,
    UpdateControlDemoVisibility_deprecated = 16,
    UpdateWelcomePanelVisibility_deprecated = 17,
    UpdateClientPanelVisibility = 18,
}

export class TransactionManager {
    undo(): any;
    redo(): any;
    undoSize(): any;
    redoSize(): any;
    trackBlockChangeList(): any;
    trackBlockChangeArea(): any;
    trackBlockChangeSelection(): any;
    commitTrackedChanges(): any;
    discardTrackedChanges(): any;
    openTransaction(): any;
    commitOpenTransaction(): any;
    discardOpenTransaction(): any;
}

export function createPaneBindingObject(
    propertyPane: PropertyPane,
    target: any
): any;

export const editor: MinecraftEditor;

export function executeLargeOperation(
    selection: Selection,
    operation: (blockLocation: Vector3) => void
): Promise<void>;

export function getLocalizationId(locId: string): string;

export function registerEditorExtension(
    extensionName: string,
    activationFunction: (uiSession: PlayerUISession) => void,
    shutdownFunction: (uiSession: PlayerUISession) => void
): void;
