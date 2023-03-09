import { Player } from "@minecraft/server";

import {
    ActionTypes,
    BedrockEventSubscriptionCache,
    EditorInputContext,
    EditorStatusBarAlignment,
    ExtensionContext,
    InputModifier,
    KeyboardKey,
} from "./index";

export class BaseControl {
    protected constructor();
    get visible(): boolean;
    get enabled(): boolean;
    hide(): void;
    show(): void;
    get disposed(): boolean;
    set disposed(value: boolean);
    dispose(): void;
    update(force: boolean): void;
}

interface ToolParams {
    displayString: string;
    displayStringLocId: string;
    icon: string;
    tooltip: string;
    tooltipLocId: string;
}

export class EventToken {
    unsubscribe(): void;
}

export class EventSinkImpl {
    subscribe(
        handler: (eventArgs: { isActiveTool: boolean }) => void
    ): EventToken;
    unsubscribe(token: EventToken): void;
    trigger(eventArgs: { isActiveTool: boolean }): void;
}

export class ModalToolContainer extends BaseControl {
    get id(): "editorUI:toolRail";
    get currentTools(): ModalTool[];
    get selectedOptionId(): string | undefined;
    setSelectedOptionId(value: string, update: boolean): void;
    addTool(prams: ToolParams): ModalTool;
    removeTool(id: string): void;
    onModalToolActivation: EventSinkImpl;
}

export class ModalTool extends BaseControl {
    get id(): string;
    hide(): void;
    show(): void;
    dispose(): void;
    bindPropertyPane(pane: PropertyPane): void;
    registerMouseButtonBinding(action: Action): void;
    registerMouseWheelBinding(action: Action): void;
    registerMouseDragBinding(action: Action): void;
    registerKeyBinding(
        action: Action,
        button: KeyboardKey,
        modifier: InputModifier
    ): void;
}

interface MenuProps {
    name: string;
    displayStringLocId: string;
}

export class Menu extends BaseControl {
    get id(): string;
    get submenu(): Menu[];
    get displayStringLocId(): string;
    get name(): string;
    set name(value: string);
    dispose(): void;
    get disposed(): boolean;
    set disposed(value: boolean);
    addItem(params: MenuProps, action: Action): Menu;
    replaceAction(action: any): void;
    addSeparator(): void;
}

export class PropertyItem {
    action: Action;
    get id(): string;
    get paneId(): string;
    get obj(): any;
    get property(): any;
    get typeName(): string;
    get propertyItemOptions(): any;
    get enable(): boolean;
    set enable(value: boolean);
    get visible(): boolean;
    set visible(value: boolean);
    get value(): any;
    sendPropertyUpdate(): void;
    dispose(): void;
}

export class PropertyPane extends BaseControl {
    onPropertyPaneVisibilityUpdated: EventSinkImpl;
    setPropertyItemValue(propertyName: string, newValue: any): void;
    get id(): string;
    get parentPaneId(): string;
    get propertyItems(): PropertyItem[];
    get titleStringId(): string;
    set titleStringId(value: string);
    get titleAltText(): string;
    set titleAltText(value: string);
    get width(): number;
    findProperty(propertyName: string): PropertyItem;
    findPropertyRecursive(propertyName: string): PropertyItem;
    createPropertyPane(options: PaneOptions): PropertyItem;
    removePropertyPane(paneToRemove: PropertyItem): boolean;
    hide(): void;
    show(): void;
    addString(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
    addBool(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
    addNumber(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
    addBlockPicker(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
    addButtonAndBindAction(
        action: Record<string, any>,
        options: PaneOptions
    ): PropertyItem;
    addDropdown(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
    addDivider(): PropertyItem;
    addVec3(
        obj: Record<string, any>,
        property: string,
        options: PaneOptions
    ): PropertyItem;
}

export class StatusBarItem extends BaseControl {
    get id(): string;
    get text(): string;
    set text(value: string);
}

type ActionCallback = (mouseRay: any, mouseProps: any) => void;

interface CreateActionOptions {
    actionType: ActionTypes;
    onExecute: ActionCallback;
}

interface Action {
    id: string;
    actionType: ActionTypes;
    onExecute: ActionCallback;
}

export class ActionManagerImpl {
    createAction(options: CreateActionOptions): Action;
    teardown(): void;
}

export class BaseInputManager {
    unregisterAllBindings(): void;
}

export class GlobalInputManager extends BaseInputManager {
    registerKeyBinding(
        inputContextId: EditorInputContext,
        action: Action,
        button: KeyboardKey,
        modifier: InputModifier
    ): void;
}

export class BuiltInUIManagerImpl {
    updateUISettingsPanelVisibility(visibility: boolean): void;
    updateWelcomePanelVisibility(visibility: boolean): void;
    navigateToPauseScreen(): void;
    navigateToDocumentation(): void;
    navigateToFeedback(): void;
}

interface PaneOptions {
    titleStringId: string;
    titleAltText: string;
    width: number;
}

export class PlayerUISession {
    protected constructor();
    scratchStorage: Record<string, any>;
    teardown(): void;
    get toolRail(): ModalToolContainer;
    createMenu(props: MenuProps): Menu;
    createPropertyPane(options: PaneOptions): PropertyPane;
    createStatusBarItem(
        alignment: EditorStatusBarAlignment,
        size: number
    ): StatusBarItem;
    get actionManager(): ActionManagerImpl;
    get inputManager(): GlobalInputManager;
    get extensionContext(): ExtensionContext;
    get builtInUIManager(): BuiltInUIManagerImpl;
    get eventSubscriptionCache(): BedrockEventSubscriptionCache;
}

interface PlayerContext {
    editorContext: ExtensionContext;
    uiSession?: PlayerUISession;
}

export class ExtensionInstanceManager {
    extensionContextToPlayerContext: Map<Player, PlayerContext>;
    onNewPlayerJoin(context: ExtensionContext): void;
    onPlayerLeave(context: ExtensionContext): void;
}
