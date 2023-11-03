import EventEmitter from "events";
import { PlatformName, PluginIdentifier } from "./api";
import {
  Accessory,
  AccessoryEventTypes,
  Categories,
  Service,
  VoidCallback,
} from "hap-nodejs";

export declare interface PlatformAccessory {
  on(event: "identify", listener: () => void): this;

  emit(event: "identify"): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownContext = Record<string, any>;

export class PlatformAccessory<
  T extends UnknownContext = UnknownContext,
> extends EventEmitter {
  // somewhat ugly way to inject custom Accessory object, while not changing the publicly exposed constructor signature
  private static injectedAccessory?: Accessory;

  _associatedPlugin?: PluginIdentifier; // present as soon as it is registered
  _associatedPlatform?: PlatformName; // not present for external accessories

  _associatedHAPAccessory: Accessory;

  // ---------------- HAP Accessory mirror ----------------
  displayName: string;
  UUID: string;
  category: Categories;
  services: Service[] = [];
  // ------------------------------------------------------

  constructor(displayName: string, uuid: string, category?: Categories) {
    // category is only useful for external accessories
    super();
    this._associatedHAPAccessory = PlatformAccessory.injectedAccessory
      ? PlatformAccessory.injectedAccessory
      : new Accessory(displayName, uuid);

    if (category) {
      this._associatedHAPAccessory.category = category;
    }

    this.displayName = this._associatedHAPAccessory.displayName;
    this.UUID = this._associatedHAPAccessory.UUID;
    this.category = category || Categories.OTHER;
    this.services = this._associatedHAPAccessory.services;

    // forward identify event
    this._associatedHAPAccessory.on(
      AccessoryEventTypes.IDENTIFY,
      (paired: boolean, callback: VoidCallback) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.emit(PlatformAccessoryEvent.IDENTIFY, paired, () => {}); // empty callback for backwards compatibility
        callback();
      }
    );
  }
}
