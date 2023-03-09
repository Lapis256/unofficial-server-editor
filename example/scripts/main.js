// @ts-check

import {
    system,
    world,
    MinecraftDimensionTypes,
    MinecraftEntityTypes,
    MinecraftEffectTypes,
} from "@minecraft/server";
import {
    registerEditorExtension,
    ActionTypes,
    EditorStatusBarAlignment,
    EditorInputContext,
    KeyboardKey,
    InputModifier,
} from "@minecraft/server-editor";

const overworld = world.getDimension(MinecraftDimensionTypes.overworld);

registerEditorExtension(
    "CustomStatusBarExtension",
    (uiSession) => {
        uiSession.scratchStorage = { runId: -1 };
        const status = uiSession.createStatusBarItem(
            EditorStatusBarAlignment.Right,
            30
        );
        uiSession.scratchStorage.runId = system.runInterval(() => {
            status.text = `Current Tick: ${system.currentTick}`;
        });
    },
    (uiSession) => {
        if (uiSession.scratchStorage?.runId !== -1) {
            system.clearRun(uiSession.scratchStorage.runId);
        }
    }
);

registerEditorExtension(
    "CustomMenuExtension",
    (uiSession) => {
        const menu = uiSession.createMenu({
            name: "Custom",
            displayStringLocId: "custom",
        });
        menu.addItem(
            { name: "Kill @e", displayStringLocId: "kill" },
            uiSession.actionManager.createAction({
                actionType: ActionTypes.NoArgsAction,
                onExecute: () => {
                    overworld
                        .getEntities({
                            excludeTypes: [MinecraftEntityTypes.player.id],
                        })
                        .forEach((entity) => entity.kill());
                },
            })
        );
        menu.addItem(
            { name: "Kill @e[type=cow]", displayStringLocId: "kill_cow" },
            uiSession.actionManager.createAction({
                actionType: ActionTypes.NoArgsAction,
                onExecute: () => {
                    overworld
                        .getEntities({
                            type: MinecraftEntityTypes.cow.id,
                        })
                        .forEach((entity) => entity.kill());
                },
            })
        );
        menu.show();
    },
    () => {}
);

registerEditorExtension(
    "NightVisionExtension",
    (uiSession) => {
        uiSession.scratchStorage = { enableNightVision: false, runId: -1 };
        const player = uiSession.extensionContext.player;

        const action = uiSession.actionManager.createAction({
            actionType: ActionTypes.NoArgsAction,
            onExecute: () => {
                uiSession.scratchStorage.enableNightVision =
                    !uiSession.scratchStorage.enableNightVision;
                if (uiSession.scratchStorage.enableNightVision) {
                    player.sendMessage(
                        "[NightVision Extension] Enabled NightVision."
                    );
                    return;
                }
                player.sendMessage(
                    "[NightVision Extension] Disabled NightVision."
                );
            },
        });

        uiSession.inputManager.registerKeyBinding(
            EditorInputContext.GlobalEditor,
            action,
            KeyboardKey.KEY_N,
            InputModifier.None
        );

        uiSession.scratchStorage.runId = system.runInterval(() => {
            if (uiSession.scratchStorage.enableNightVision) {
                player.addEffect(
                    MinecraftEffectTypes.nightVision,
                    400,
                    1,
                    false
                );
                return;
            }
            const effectDuration =
                player.getEffect(MinecraftEffectTypes.nightVision)?.duration ??
                0;
            if (effectDuration <= 0) {
                return;
            }
            player.runCommand("effect @s clear");
        });
    },
    (uiSession) => {
        if (uiSession.scratchStorage?.runId !== -1) {
            system.clearRun(uiSession.scratchStorage.runId);
        }
    }
);
