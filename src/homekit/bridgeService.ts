import {
  AccessoryName,
  AccessoryIdentifier,
  BridgeConfiguration,
  PlatformName,
  PlatformIdentifier,
} from "./api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface AccessoryConfig extends Record<string, any> {
  accessory: AccessoryName | AccessoryIdentifier;
  name: string;
  uuid_base?: string;
  _bridge?: BridgeConfiguration;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PlatformConfig extends Record<string, any> {
  platform: PlatformName | PlatformIdentifier;
  name?: string;
  _bridge?: BridgeConfiguration;
}
