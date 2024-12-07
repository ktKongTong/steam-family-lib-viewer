// @generated by protoc-gen-es v1.8.0 with parameter "target=ts"
// @generated from file web-ui/service_accountprivateapps.proto (syntax proto2)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto2 } from "@bufbuild/protobuf";

/**
 * @generated from message CAccountPrivateAppList
 */
export class CAccountPrivateAppList extends Message<CAccountPrivateAppList> {
  /**
   * @generated from field: repeated int32 appids = 1;
   */
  appids: number[] = [];

  constructor(data?: PartialMessage<CAccountPrivateAppList>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateAppList";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "appids", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateAppList {
    return new CAccountPrivateAppList().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateAppList {
    return new CAccountPrivateAppList().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateAppList {
    return new CAccountPrivateAppList().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateAppList | PlainMessage<CAccountPrivateAppList> | undefined, b: CAccountPrivateAppList | PlainMessage<CAccountPrivateAppList> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateAppList, a, b);
  }
}

/**
 * @generated from message CAccountPrivateApps_GetPrivateAppList_Request
 */
export class CAccountPrivateApps_GetPrivateAppList_Request extends Message<CAccountPrivateApps_GetPrivateAppList_Request> {
  constructor(data?: PartialMessage<CAccountPrivateApps_GetPrivateAppList_Request>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateApps_GetPrivateAppList_Request";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateApps_GetPrivateAppList_Request {
    return new CAccountPrivateApps_GetPrivateAppList_Request().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateApps_GetPrivateAppList_Request {
    return new CAccountPrivateApps_GetPrivateAppList_Request().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateApps_GetPrivateAppList_Request {
    return new CAccountPrivateApps_GetPrivateAppList_Request().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateApps_GetPrivateAppList_Request | PlainMessage<CAccountPrivateApps_GetPrivateAppList_Request> | undefined, b: CAccountPrivateApps_GetPrivateAppList_Request | PlainMessage<CAccountPrivateApps_GetPrivateAppList_Request> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateApps_GetPrivateAppList_Request, a, b);
  }
}

/**
 * @generated from message CAccountPrivateApps_GetPrivateAppList_Response
 */
export class CAccountPrivateApps_GetPrivateAppList_Response extends Message<CAccountPrivateApps_GetPrivateAppList_Response> {
  /**
   * @generated from field: optional CAccountPrivateAppList private_apps = 1;
   */
  privateApps?: CAccountPrivateAppList;

  constructor(data?: PartialMessage<CAccountPrivateApps_GetPrivateAppList_Response>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateApps_GetPrivateAppList_Response";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "private_apps", kind: "message", T: CAccountPrivateAppList, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateApps_GetPrivateAppList_Response {
    return new CAccountPrivateApps_GetPrivateAppList_Response().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateApps_GetPrivateAppList_Response {
    return new CAccountPrivateApps_GetPrivateAppList_Response().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateApps_GetPrivateAppList_Response {
    return new CAccountPrivateApps_GetPrivateAppList_Response().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateApps_GetPrivateAppList_Response | PlainMessage<CAccountPrivateApps_GetPrivateAppList_Response> | undefined, b: CAccountPrivateApps_GetPrivateAppList_Response | PlainMessage<CAccountPrivateApps_GetPrivateAppList_Response> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateApps_GetPrivateAppList_Response, a, b);
  }
}

/**
 * @generated from message CAccountPrivateApps_ToggleAppPrivacy_Request
 */
export class CAccountPrivateApps_ToggleAppPrivacy_Request extends Message<CAccountPrivateApps_ToggleAppPrivacy_Request> {
  /**
   * @generated from field: repeated int32 appids = 1;
   */
  appids: number[] = [];

  /**
   * @generated from field: optional bool private = 2;
   */
  private?: boolean;

  constructor(data?: PartialMessage<CAccountPrivateApps_ToggleAppPrivacy_Request>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateApps_ToggleAppPrivacy_Request";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "appids", kind: "scalar", T: 5 /* ScalarType.INT32 */, repeated: true },
    { no: 2, name: "private", kind: "scalar", T: 8 /* ScalarType.BOOL */, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Request {
    return new CAccountPrivateApps_ToggleAppPrivacy_Request().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Request {
    return new CAccountPrivateApps_ToggleAppPrivacy_Request().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Request {
    return new CAccountPrivateApps_ToggleAppPrivacy_Request().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateApps_ToggleAppPrivacy_Request | PlainMessage<CAccountPrivateApps_ToggleAppPrivacy_Request> | undefined, b: CAccountPrivateApps_ToggleAppPrivacy_Request | PlainMessage<CAccountPrivateApps_ToggleAppPrivacy_Request> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateApps_ToggleAppPrivacy_Request, a, b);
  }
}

/**
 * @generated from message CAccountPrivateApps_ToggleAppPrivacy_Response
 */
export class CAccountPrivateApps_ToggleAppPrivacy_Response extends Message<CAccountPrivateApps_ToggleAppPrivacy_Response> {
  constructor(data?: PartialMessage<CAccountPrivateApps_ToggleAppPrivacy_Response>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateApps_ToggleAppPrivacy_Response";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Response {
    return new CAccountPrivateApps_ToggleAppPrivacy_Response().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Response {
    return new CAccountPrivateApps_ToggleAppPrivacy_Response().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateApps_ToggleAppPrivacy_Response {
    return new CAccountPrivateApps_ToggleAppPrivacy_Response().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateApps_ToggleAppPrivacy_Response | PlainMessage<CAccountPrivateApps_ToggleAppPrivacy_Response> | undefined, b: CAccountPrivateApps_ToggleAppPrivacy_Response | PlainMessage<CAccountPrivateApps_ToggleAppPrivacy_Response> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateApps_ToggleAppPrivacy_Response, a, b);
  }
}

/**
 * @generated from message CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification
 */
export class CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification extends Message<CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification> {
  /**
   * @generated from field: optional CAccountPrivateAppList private_apps = 1;
   */
  privateApps?: CAccountPrivateAppList;

  constructor(data?: PartialMessage<CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification>) {
    super();
    proto2.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto2 = proto2;
  static readonly typeName = "CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification";
  static readonly fields: FieldList = proto2.util.newFieldList(() => [
    { no: 1, name: "private_apps", kind: "message", T: CAccountPrivateAppList, opt: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification {
    return new CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification {
    return new CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification {
    return new CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification().fromJsonString(jsonString, options);
  }

  static equals(a: CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification | PlainMessage<CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification> | undefined, b: CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification | PlainMessage<CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification> | undefined): boolean {
    return proto2.util.equals(CAccountPrivateApsClient_NotifyPrivateAppListChanged_Notification, a, b);
  }
}
