import { ZIndexes } from "../constants";
import { ObjectDefinitions, type ObjectDefinition } from "../utils/objectDefinitions";
import { RotationMode } from "./obstacles";

export interface DecalDefinition extends ObjectDefinition {
    readonly image: string
    readonly scale: number
    /**
     * @default {RotationMode.Limited}
     */
    readonly rotationMode: RotationMode
    readonly zIndex?: ZIndexes
}

export const Decals = ObjectDefinitions.create<DecalDefinition>()(
    defaultTemplate => ({
        [defaultTemplate]: () => ({
            scale: 1,
            rotationMode: RotationMode.Limited
        }),
        decal_factory: (name: string) => {
            const idString = name.toLowerCase().replace(/ /g, "_");
            return {
                idString,
                name,
                image: idString
            };
        }
    })
)(
    apply => [
        apply(
            "decal_factory",
            { rotationMode: RotationMode.Full },
            "Explosion Decal"
        ),
        apply(
            "decal_factory",
            { rotationMode: RotationMode.Full },
            "Frag Explosion Decal"
        ),
        apply(
            "decal_factory",
            { rotationMode: RotationMode.Full },
            "Smoke Explosion Decal"
        ),
        apply("decal_factory", {}, "Floor Oil 01"),
        apply("decal_factory", {}, "Floor Oil 02"),
        apply("decal_factory", {}, "Floor Oil 03"),
        apply("decal_factory", {}, "Floor Oil 04"),
        apply("decal_factory", {}, "Floor Oil 05"),
        apply("decal_factory", {}, "Floor Oil 06"),
        apply("decal_factory", {}, "Floor Oil 07"),
        apply(
            "decal_factory",
            { zIndex: ZIndexes.BuildingsFloor },
            "Container mark"
        )
    ]
);
