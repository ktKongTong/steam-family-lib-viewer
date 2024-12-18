// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file web-ui/service_wishlist.proto (syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { CUserInterface_NavData, CUserInterface_NavDataJson, StoreBrowseContext, StoreBrowseContextJson, StoreBrowseItemDataRequest, StoreBrowseItemDataRequestJson, StoreItem, StoreItemJson } from "./common_pb";
import { file_web_ui_common } from "./common_pb";
import { file_web_ui_common_base } from "./common_base_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file web-ui/service_wishlist.proto.
 */
export const file_web_ui_service_wishlist: GenFile = /*@__PURE__*/
  fileDesc("Ch13ZWItdWkvc2VydmljZV93aXNobGlzdC5wcm90byJaCh9DV2lzaGxpc3RfQWRkVG9XaXNobGlzdF9SZXF1ZXN0Eg0KBWFwcGlkGAEgASgNEigKB25hdmRhdGEYAiABKAsyFy5DVXNlckludGVyZmFjZV9OYXZEYXRhIjoKIENXaXNobGlzdF9BZGRUb1dpc2hsaXN0X1Jlc3BvbnNlEhYKDndpc2hsaXN0X2NvdW50GAEgASgNIjAKHUNXaXNobGlzdF9HZXRXaXNobGlzdF9SZXF1ZXN0Eg8KB3N0ZWFtaWQYASABKAYiXQoeQ1dpc2hsaXN0X0dldFdpc2hsaXN0X1Jlc3BvbnNlEjsKBWl0ZW1zGAEgAygLMiwuQ1dpc2hsaXN0X0dldFdpc2hsaXN0X1Jlc3BvbnNlX1dpc2hsaXN0SXRlbSJiCitDV2lzaGxpc3RfR2V0V2lzaGxpc3RfUmVzcG9uc2VfV2lzaGxpc3RJdGVtEg0KBWFwcGlkGAEgASgNEhAKCHByaW9yaXR5GAIgASgNEhIKCmRhdGVfYWRkZWQYAyABKA0iOQomQ1dpc2hsaXN0X0dldFdpc2hsaXN0SXRlbUNvdW50X1JlcXVlc3QSDwoHc3RlYW1pZBgBIAEoBiI4CidDV2lzaGxpc3RfR2V0V2lzaGxpc3RJdGVtQ291bnRfUmVzcG9uc2USDQoFY291bnQYASABKA0igwEKKENXaXNobGlzdF9HZXRXaXNobGlzdEl0ZW1zT25TYWxlX1JlcXVlc3QSJAoHY29udGV4dBgBIAEoCzITLlN0b3JlQnJvd3NlQ29udGV4dBIxCgxkYXRhX3JlcXVlc3QYAiABKAsyGy5TdG9yZUJyb3dzZUl0ZW1EYXRhUmVxdWVzdCJzCilDV2lzaGxpc3RfR2V0V2lzaGxpc3RJdGVtc09uU2FsZV9SZXNwb25zZRJGCgVpdGVtcxgBIAMoCzI3LkNXaXNobGlzdF9HZXRXaXNobGlzdEl0ZW1zT25TYWxlX1Jlc3BvbnNlX1dpc2hsaXN0SXRlbSJnCjZDV2lzaGxpc3RfR2V0V2lzaGxpc3RJdGVtc09uU2FsZV9SZXNwb25zZV9XaXNobGlzdEl0ZW0SDQoFYXBwaWQYASABKA0SHgoKc3RvcmVfaXRlbRgCIAEoCzIKLlN0b3JlSXRlbSKMAgorQ1dpc2hsaXN0X0dldFdpc2hsaXN0U29ydGVkRmlsdGVyZWRfUmVxdWVzdBIPCgdzdGVhbWlkGAEgASgGEiQKB2NvbnRleHQYAiABKAsyEy5TdG9yZUJyb3dzZUNvbnRleHQSMQoMZGF0YV9yZXF1ZXN0GAMgASgLMhsuU3RvcmVCcm93c2VJdGVtRGF0YVJlcXVlc3QSHwoKc29ydF9vcmRlchgEIAEoBToBMEIIgrUYBGVudW0SIgoHZmlsdGVycxgFIAEoCzIRLkNXaXNobGlzdEZpbHRlcnMSFgoLc3RhcnRfaW5kZXgYBiABKAU6ATASFgoJcGFnZV9zaXplGAcgASgFOgMxMDAieQosQ1dpc2hsaXN0X0dldFdpc2hsaXN0U29ydGVkRmlsdGVyZWRfUmVzcG9uc2USSQoFaXRlbXMYASADKAsyOi5DV2lzaGxpc3RfR2V0V2lzaGxpc3RTb3J0ZWRGaWx0ZXJlZF9SZXNwb25zZV9XaXNobGlzdEl0ZW0ikAEKOUNXaXNobGlzdF9HZXRXaXNobGlzdFNvcnRlZEZpbHRlcmVkX1Jlc3BvbnNlX1dpc2hsaXN0SXRlbRINCgVhcHBpZBgBIAEoDRIQCghwcmlvcml0eRgCIAEoDRISCgpkYXRlX2FkZGVkGAMgASgNEh4KCnN0b3JlX2l0ZW0YBCABKAsyCi5TdG9yZUl0ZW0iNQokQ1dpc2hsaXN0X1JlbW92ZUZyb21XaXNobGlzdF9SZXF1ZXN0Eg0KBWFwcGlkGAEgASgNIj8KJUNXaXNobGlzdF9SZW1vdmVGcm9tV2lzaGxpc3RfUmVzcG9uc2USFgoOd2lzaGxpc3RfY291bnQYASABKA0iyQIKEENXaXNobGlzdEZpbHRlcnMSEgoKbWFjb3Nfb25seRgBIAEoCBIaChJzdGVhbW9zX2xpbnV4X29ubHkYAiABKAgSEgoKb25seV9nYW1lcxgKIAEoCBIVCg1vbmx5X3NvZnR3YXJlGAsgASgIEhAKCG9ubHlfZGxjGAwgASgIEhEKCW9ubHlfZnJlZRgNIAEoCBIaChJtYXhfcHJpY2VfaW5fY2VudHMYFCABKAMSHAoUbWluX2Rpc2NvdW50X3BlcmNlbnQYFSABKAUSOwoNZXhjbHVkZV90eXBlcxgWIAEoCzIkLkNXaXNobGlzdEZpbHRlcnNfRXhjbHVkZVR5cGVGaWx0ZXJzEj4KEnN0ZWFtX2RlY2tfZmlsdGVycxgXIAEoCzIiLkNXaXNobGlzdEZpbHRlcnNfU3RlYW1EZWNrRmlsdGVycyJ5CiNDV2lzaGxpc3RGaWx0ZXJzX0V4Y2x1ZGVUeXBlRmlsdGVycxIcChRleGNsdWRlX2Vhcmx5X2FjY2VzcxgBIAEoCBIbChNleGNsdWRlX2NvbWluZ19zb29uGAIgASgIEhcKD2V4Y2x1ZGVfdnJfb25seRgDIAEoCCJXCiFDV2lzaGxpc3RGaWx0ZXJzX1N0ZWFtRGVja0ZpbHRlcnMSGAoQaW5jbHVkZV92ZXJpZmllZBgBIAEoCBIYChBpbmNsdWRlX3BsYXlhYmxlGAIgASgIMusECghXaXNobGlzdBJUCg1BZGRUb1dpc2hsaXN0EiAuQ1dpc2hsaXN0X0FkZFRvV2lzaGxpc3RfUmVxdWVzdBohLkNXaXNobGlzdF9BZGRUb1dpc2hsaXN0X1Jlc3BvbnNlEk4KC0dldFdpc2hsaXN0Eh4uQ1dpc2hsaXN0X0dldFdpc2hsaXN0X1JlcXVlc3QaHy5DV2lzaGxpc3RfR2V0V2lzaGxpc3RfUmVzcG9uc2USaQoUR2V0V2lzaGxpc3RJdGVtQ291bnQSJy5DV2lzaGxpc3RfR2V0V2lzaGxpc3RJdGVtQ291bnRfUmVxdWVzdBooLkNXaXNobGlzdF9HZXRXaXNobGlzdEl0ZW1Db3VudF9SZXNwb25zZRJvChZHZXRXaXNobGlzdEl0ZW1zT25TYWxlEikuQ1dpc2hsaXN0X0dldFdpc2hsaXN0SXRlbXNPblNhbGVfUmVxdWVzdBoqLkNXaXNobGlzdF9HZXRXaXNobGlzdEl0ZW1zT25TYWxlX1Jlc3BvbnNlEngKGUdldFdpc2hsaXN0U29ydGVkRmlsdGVyZWQSLC5DV2lzaGxpc3RfR2V0V2lzaGxpc3RTb3J0ZWRGaWx0ZXJlZF9SZXF1ZXN0Gi0uQ1dpc2hsaXN0X0dldFdpc2hsaXN0U29ydGVkRmlsdGVyZWRfUmVzcG9uc2USYwoSUmVtb3ZlRnJvbVdpc2hsaXN0EiUuQ1dpc2hsaXN0X1JlbW92ZUZyb21XaXNobGlzdF9SZXF1ZXN0GiYuQ1dpc2hsaXN0X1JlbW92ZUZyb21XaXNobGlzdF9SZXNwb25zZQ", [file_web_ui_common, file_web_ui_common_base]);

/**
 * @generated from message CWishlist_AddToWishlist_Request
 */
export type CWishlist_AddToWishlist_Request = Message<"CWishlist_AddToWishlist_Request"> & {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid: number;

  /**
   * @generated from field: optional CUserInterface_NavData navdata = 2;
   */
  navdata?: CUserInterface_NavData;
};

/**
 * @generated from message CWishlist_AddToWishlist_Request
 */
export type CWishlist_AddToWishlist_RequestJson = {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid?: number;

  /**
   * @generated from field: optional CUserInterface_NavData navdata = 2;
   */
  navdata?: CUserInterface_NavDataJson;
};

/**
 * Describes the message CWishlist_AddToWishlist_Request.
 * Use `create(CWishlist_AddToWishlist_RequestSchema)` to create a new message.
 */
export const CWishlist_AddToWishlist_RequestSchema: GenMessage<CWishlist_AddToWishlist_Request, CWishlist_AddToWishlist_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 0);

/**
 * @generated from message CWishlist_AddToWishlist_Response
 */
export type CWishlist_AddToWishlist_Response = Message<"CWishlist_AddToWishlist_Response"> & {
  /**
   * @generated from field: optional uint32 wishlist_count = 1;
   */
  wishlistCount: number;
};

/**
 * @generated from message CWishlist_AddToWishlist_Response
 */
export type CWishlist_AddToWishlist_ResponseJson = {
  /**
   * @generated from field: optional uint32 wishlist_count = 1;
   */
  wishlistCount?: number;
};

/**
 * Describes the message CWishlist_AddToWishlist_Response.
 * Use `create(CWishlist_AddToWishlist_ResponseSchema)` to create a new message.
 */
export const CWishlist_AddToWishlist_ResponseSchema: GenMessage<CWishlist_AddToWishlist_Response, CWishlist_AddToWishlist_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 1);

/**
 * @generated from message CWishlist_GetWishlist_Request
 */
export type CWishlist_GetWishlist_Request = Message<"CWishlist_GetWishlist_Request"> & {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid: bigint;
};

/**
 * @generated from message CWishlist_GetWishlist_Request
 */
export type CWishlist_GetWishlist_RequestJson = {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid?: string;
};

/**
 * Describes the message CWishlist_GetWishlist_Request.
 * Use `create(CWishlist_GetWishlist_RequestSchema)` to create a new message.
 */
export const CWishlist_GetWishlist_RequestSchema: GenMessage<CWishlist_GetWishlist_Request, CWishlist_GetWishlist_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 2);

/**
 * @generated from message CWishlist_GetWishlist_Response
 */
export type CWishlist_GetWishlist_Response = Message<"CWishlist_GetWishlist_Response"> & {
  /**
   * @generated from field: repeated CWishlist_GetWishlist_Response_WishlistItem items = 1;
   */
  items: CWishlist_GetWishlist_Response_WishlistItem[];
};

/**
 * @generated from message CWishlist_GetWishlist_Response
 */
export type CWishlist_GetWishlist_ResponseJson = {
  /**
   * @generated from field: repeated CWishlist_GetWishlist_Response_WishlistItem items = 1;
   */
  items?: CWishlist_GetWishlist_Response_WishlistItemJson[];
};

/**
 * Describes the message CWishlist_GetWishlist_Response.
 * Use `create(CWishlist_GetWishlist_ResponseSchema)` to create a new message.
 */
export const CWishlist_GetWishlist_ResponseSchema: GenMessage<CWishlist_GetWishlist_Response, CWishlist_GetWishlist_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 3);

/**
 * @generated from message CWishlist_GetWishlist_Response_WishlistItem
 */
export type CWishlist_GetWishlist_Response_WishlistItem = Message<"CWishlist_GetWishlist_Response_WishlistItem"> & {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid: number;

  /**
   * @generated from field: optional uint32 priority = 2;
   */
  priority: number;

  /**
   * @generated from field: optional uint32 date_added = 3;
   */
  dateAdded: number;
};

/**
 * @generated from message CWishlist_GetWishlist_Response_WishlistItem
 */
export type CWishlist_GetWishlist_Response_WishlistItemJson = {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid?: number;

  /**
   * @generated from field: optional uint32 priority = 2;
   */
  priority?: number;

  /**
   * @generated from field: optional uint32 date_added = 3;
   */
  dateAdded?: number;
};

/**
 * Describes the message CWishlist_GetWishlist_Response_WishlistItem.
 * Use `create(CWishlist_GetWishlist_Response_WishlistItemSchema)` to create a new message.
 */
export const CWishlist_GetWishlist_Response_WishlistItemSchema: GenMessage<CWishlist_GetWishlist_Response_WishlistItem, CWishlist_GetWishlist_Response_WishlistItemJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 4);

/**
 * @generated from message CWishlist_GetWishlistItemCount_Request
 */
export type CWishlist_GetWishlistItemCount_Request = Message<"CWishlist_GetWishlistItemCount_Request"> & {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid: bigint;
};

/**
 * @generated from message CWishlist_GetWishlistItemCount_Request
 */
export type CWishlist_GetWishlistItemCount_RequestJson = {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid?: string;
};

/**
 * Describes the message CWishlist_GetWishlistItemCount_Request.
 * Use `create(CWishlist_GetWishlistItemCount_RequestSchema)` to create a new message.
 */
export const CWishlist_GetWishlistItemCount_RequestSchema: GenMessage<CWishlist_GetWishlistItemCount_Request, CWishlist_GetWishlistItemCount_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 5);

/**
 * @generated from message CWishlist_GetWishlistItemCount_Response
 */
export type CWishlist_GetWishlistItemCount_Response = Message<"CWishlist_GetWishlistItemCount_Response"> & {
  /**
   * @generated from field: optional uint32 count = 1;
   */
  count: number;
};

/**
 * @generated from message CWishlist_GetWishlistItemCount_Response
 */
export type CWishlist_GetWishlistItemCount_ResponseJson = {
  /**
   * @generated from field: optional uint32 count = 1;
   */
  count?: number;
};

/**
 * Describes the message CWishlist_GetWishlistItemCount_Response.
 * Use `create(CWishlist_GetWishlistItemCount_ResponseSchema)` to create a new message.
 */
export const CWishlist_GetWishlistItemCount_ResponseSchema: GenMessage<CWishlist_GetWishlistItemCount_Response, CWishlist_GetWishlistItemCount_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 6);

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Request
 */
export type CWishlist_GetWishlistItemsOnSale_Request = Message<"CWishlist_GetWishlistItemsOnSale_Request"> & {
  /**
   * @generated from field: optional StoreBrowseContext context = 1;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 2;
   */
  dataRequest?: StoreBrowseItemDataRequest;
};

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Request
 */
export type CWishlist_GetWishlistItemsOnSale_RequestJson = {
  /**
   * @generated from field: optional StoreBrowseContext context = 1;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 2;
   */
  dataRequest?: StoreBrowseItemDataRequestJson;
};

/**
 * Describes the message CWishlist_GetWishlistItemsOnSale_Request.
 * Use `create(CWishlist_GetWishlistItemsOnSale_RequestSchema)` to create a new message.
 */
export const CWishlist_GetWishlistItemsOnSale_RequestSchema: GenMessage<CWishlist_GetWishlistItemsOnSale_Request, CWishlist_GetWishlistItemsOnSale_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 7);

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Response
 */
export type CWishlist_GetWishlistItemsOnSale_Response = Message<"CWishlist_GetWishlistItemsOnSale_Response"> & {
  /**
   * @generated from field: repeated CWishlist_GetWishlistItemsOnSale_Response_WishlistItem items = 1;
   */
  items: CWishlist_GetWishlistItemsOnSale_Response_WishlistItem[];
};

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Response
 */
export type CWishlist_GetWishlistItemsOnSale_ResponseJson = {
  /**
   * @generated from field: repeated CWishlist_GetWishlistItemsOnSale_Response_WishlistItem items = 1;
   */
  items?: CWishlist_GetWishlistItemsOnSale_Response_WishlistItemJson[];
};

/**
 * Describes the message CWishlist_GetWishlistItemsOnSale_Response.
 * Use `create(CWishlist_GetWishlistItemsOnSale_ResponseSchema)` to create a new message.
 */
export const CWishlist_GetWishlistItemsOnSale_ResponseSchema: GenMessage<CWishlist_GetWishlistItemsOnSale_Response, CWishlist_GetWishlistItemsOnSale_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 8);

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Response_WishlistItem
 */
export type CWishlist_GetWishlistItemsOnSale_Response_WishlistItem = Message<"CWishlist_GetWishlistItemsOnSale_Response_WishlistItem"> & {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid: number;

  /**
   * @generated from field: optional StoreItem store_item = 2;
   */
  storeItem?: StoreItem;
};

/**
 * @generated from message CWishlist_GetWishlistItemsOnSale_Response_WishlistItem
 */
export type CWishlist_GetWishlistItemsOnSale_Response_WishlistItemJson = {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid?: number;

  /**
   * @generated from field: optional StoreItem store_item = 2;
   */
  storeItem?: StoreItemJson;
};

/**
 * Describes the message CWishlist_GetWishlistItemsOnSale_Response_WishlistItem.
 * Use `create(CWishlist_GetWishlistItemsOnSale_Response_WishlistItemSchema)` to create a new message.
 */
export const CWishlist_GetWishlistItemsOnSale_Response_WishlistItemSchema: GenMessage<CWishlist_GetWishlistItemsOnSale_Response_WishlistItem, CWishlist_GetWishlistItemsOnSale_Response_WishlistItemJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 9);

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Request
 */
export type CWishlist_GetWishlistSortedFiltered_Request = Message<"CWishlist_GetWishlistSortedFiltered_Request"> & {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid: bigint;

  /**
   * @generated from field: optional StoreBrowseContext context = 2;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 3;
   */
  dataRequest?: StoreBrowseItemDataRequest;

  /**
   * @generated from field: optional int32 sort_order = 4 [default = 0];
   */
  sortOrder: number;

  /**
   * @generated from field: optional CWishlistFilters filters = 5;
   */
  filters?: CWishlistFilters;

  /**
   * @generated from field: optional int32 start_index = 6 [default = 0];
   */
  startIndex: number;

  /**
   * @generated from field: optional int32 page_size = 7 [default = 100];
   */
  pageSize: number;
};

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Request
 */
export type CWishlist_GetWishlistSortedFiltered_RequestJson = {
  /**
   * @generated from field: optional fixed64 steamid = 1;
   */
  steamid?: string;

  /**
   * @generated from field: optional StoreBrowseContext context = 2;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 3;
   */
  dataRequest?: StoreBrowseItemDataRequestJson;

  /**
   * @generated from field: optional int32 sort_order = 4 [default = 0];
   */
  sortOrder?: number;

  /**
   * @generated from field: optional CWishlistFilters filters = 5;
   */
  filters?: CWishlistFiltersJson;

  /**
   * @generated from field: optional int32 start_index = 6 [default = 0];
   */
  startIndex?: number;

  /**
   * @generated from field: optional int32 page_size = 7 [default = 100];
   */
  pageSize?: number;
};

/**
 * Describes the message CWishlist_GetWishlistSortedFiltered_Request.
 * Use `create(CWishlist_GetWishlistSortedFiltered_RequestSchema)` to create a new message.
 */
export const CWishlist_GetWishlistSortedFiltered_RequestSchema: GenMessage<CWishlist_GetWishlistSortedFiltered_Request, CWishlist_GetWishlistSortedFiltered_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 10);

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Response
 */
export type CWishlist_GetWishlistSortedFiltered_Response = Message<"CWishlist_GetWishlistSortedFiltered_Response"> & {
  /**
   * @generated from field: repeated CWishlist_GetWishlistSortedFiltered_Response_WishlistItem items = 1;
   */
  items: CWishlist_GetWishlistSortedFiltered_Response_WishlistItem[];
};

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Response
 */
export type CWishlist_GetWishlistSortedFiltered_ResponseJson = {
  /**
   * @generated from field: repeated CWishlist_GetWishlistSortedFiltered_Response_WishlistItem items = 1;
   */
  items?: CWishlist_GetWishlistSortedFiltered_Response_WishlistItemJson[];
};

/**
 * Describes the message CWishlist_GetWishlistSortedFiltered_Response.
 * Use `create(CWishlist_GetWishlistSortedFiltered_ResponseSchema)` to create a new message.
 */
export const CWishlist_GetWishlistSortedFiltered_ResponseSchema: GenMessage<CWishlist_GetWishlistSortedFiltered_Response, CWishlist_GetWishlistSortedFiltered_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 11);

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Response_WishlistItem
 */
export type CWishlist_GetWishlistSortedFiltered_Response_WishlistItem = Message<"CWishlist_GetWishlistSortedFiltered_Response_WishlistItem"> & {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid: number;

  /**
   * @generated from field: optional uint32 priority = 2;
   */
  priority: number;

  /**
   * @generated from field: optional uint32 date_added = 3;
   */
  dateAdded: number;

  /**
   * @generated from field: optional StoreItem store_item = 4;
   */
  storeItem?: StoreItem;
};

/**
 * @generated from message CWishlist_GetWishlistSortedFiltered_Response_WishlistItem
 */
export type CWishlist_GetWishlistSortedFiltered_Response_WishlistItemJson = {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid?: number;

  /**
   * @generated from field: optional uint32 priority = 2;
   */
  priority?: number;

  /**
   * @generated from field: optional uint32 date_added = 3;
   */
  dateAdded?: number;

  /**
   * @generated from field: optional StoreItem store_item = 4;
   */
  storeItem?: StoreItemJson;
};

/**
 * Describes the message CWishlist_GetWishlistSortedFiltered_Response_WishlistItem.
 * Use `create(CWishlist_GetWishlistSortedFiltered_Response_WishlistItemSchema)` to create a new message.
 */
export const CWishlist_GetWishlistSortedFiltered_Response_WishlistItemSchema: GenMessage<CWishlist_GetWishlistSortedFiltered_Response_WishlistItem, CWishlist_GetWishlistSortedFiltered_Response_WishlistItemJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 12);

/**
 * @generated from message CWishlist_RemoveFromWishlist_Request
 */
export type CWishlist_RemoveFromWishlist_Request = Message<"CWishlist_RemoveFromWishlist_Request"> & {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid: number;
};

/**
 * @generated from message CWishlist_RemoveFromWishlist_Request
 */
export type CWishlist_RemoveFromWishlist_RequestJson = {
  /**
   * @generated from field: optional uint32 appid = 1;
   */
  appid?: number;
};

/**
 * Describes the message CWishlist_RemoveFromWishlist_Request.
 * Use `create(CWishlist_RemoveFromWishlist_RequestSchema)` to create a new message.
 */
export const CWishlist_RemoveFromWishlist_RequestSchema: GenMessage<CWishlist_RemoveFromWishlist_Request, CWishlist_RemoveFromWishlist_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 13);

/**
 * @generated from message CWishlist_RemoveFromWishlist_Response
 */
export type CWishlist_RemoveFromWishlist_Response = Message<"CWishlist_RemoveFromWishlist_Response"> & {
  /**
   * @generated from field: optional uint32 wishlist_count = 1;
   */
  wishlistCount: number;
};

/**
 * @generated from message CWishlist_RemoveFromWishlist_Response
 */
export type CWishlist_RemoveFromWishlist_ResponseJson = {
  /**
   * @generated from field: optional uint32 wishlist_count = 1;
   */
  wishlistCount?: number;
};

/**
 * Describes the message CWishlist_RemoveFromWishlist_Response.
 * Use `create(CWishlist_RemoveFromWishlist_ResponseSchema)` to create a new message.
 */
export const CWishlist_RemoveFromWishlist_ResponseSchema: GenMessage<CWishlist_RemoveFromWishlist_Response, CWishlist_RemoveFromWishlist_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 14);

/**
 * @generated from message CWishlistFilters
 */
export type CWishlistFilters = Message<"CWishlistFilters"> & {
  /**
   * @generated from field: optional bool macos_only = 1;
   */
  macosOnly: boolean;

  /**
   * @generated from field: optional bool steamos_linux_only = 2;
   */
  steamosLinuxOnly: boolean;

  /**
   * @generated from field: optional bool only_games = 10;
   */
  onlyGames: boolean;

  /**
   * @generated from field: optional bool only_software = 11;
   */
  onlySoftware: boolean;

  /**
   * @generated from field: optional bool only_dlc = 12;
   */
  onlyDlc: boolean;

  /**
   * @generated from field: optional bool only_free = 13;
   */
  onlyFree: boolean;

  /**
   * @generated from field: optional int64 max_price_in_cents = 20;
   */
  maxPriceInCents: bigint;

  /**
   * @generated from field: optional int32 min_discount_percent = 21;
   */
  minDiscountPercent: number;

  /**
   * @generated from field: optional CWishlistFilters_ExcludeTypeFilters exclude_types = 22;
   */
  excludeTypes?: CWishlistFilters_ExcludeTypeFilters;

  /**
   * @generated from field: optional CWishlistFilters_SteamDeckFilters steam_deck_filters = 23;
   */
  steamDeckFilters?: CWishlistFilters_SteamDeckFilters;
};

/**
 * @generated from message CWishlistFilters
 */
export type CWishlistFiltersJson = {
  /**
   * @generated from field: optional bool macos_only = 1;
   */
  macosOnly?: boolean;

  /**
   * @generated from field: optional bool steamos_linux_only = 2;
   */
  steamosLinuxOnly?: boolean;

  /**
   * @generated from field: optional bool only_games = 10;
   */
  onlyGames?: boolean;

  /**
   * @generated from field: optional bool only_software = 11;
   */
  onlySoftware?: boolean;

  /**
   * @generated from field: optional bool only_dlc = 12;
   */
  onlyDlc?: boolean;

  /**
   * @generated from field: optional bool only_free = 13;
   */
  onlyFree?: boolean;

  /**
   * @generated from field: optional int64 max_price_in_cents = 20;
   */
  maxPriceInCents?: string;

  /**
   * @generated from field: optional int32 min_discount_percent = 21;
   */
  minDiscountPercent?: number;

  /**
   * @generated from field: optional CWishlistFilters_ExcludeTypeFilters exclude_types = 22;
   */
  excludeTypes?: CWishlistFilters_ExcludeTypeFiltersJson;

  /**
   * @generated from field: optional CWishlistFilters_SteamDeckFilters steam_deck_filters = 23;
   */
  steamDeckFilters?: CWishlistFilters_SteamDeckFiltersJson;
};

/**
 * Describes the message CWishlistFilters.
 * Use `create(CWishlistFiltersSchema)` to create a new message.
 */
export const CWishlistFiltersSchema: GenMessage<CWishlistFilters, CWishlistFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 15);

/**
 * @generated from message CWishlistFilters_ExcludeTypeFilters
 */
export type CWishlistFilters_ExcludeTypeFilters = Message<"CWishlistFilters_ExcludeTypeFilters"> & {
  /**
   * @generated from field: optional bool exclude_early_access = 1;
   */
  excludeEarlyAccess: boolean;

  /**
   * @generated from field: optional bool exclude_coming_soon = 2;
   */
  excludeComingSoon: boolean;

  /**
   * @generated from field: optional bool exclude_vr_only = 3;
   */
  excludeVrOnly: boolean;
};

/**
 * @generated from message CWishlistFilters_ExcludeTypeFilters
 */
export type CWishlistFilters_ExcludeTypeFiltersJson = {
  /**
   * @generated from field: optional bool exclude_early_access = 1;
   */
  excludeEarlyAccess?: boolean;

  /**
   * @generated from field: optional bool exclude_coming_soon = 2;
   */
  excludeComingSoon?: boolean;

  /**
   * @generated from field: optional bool exclude_vr_only = 3;
   */
  excludeVrOnly?: boolean;
};

/**
 * Describes the message CWishlistFilters_ExcludeTypeFilters.
 * Use `create(CWishlistFilters_ExcludeTypeFiltersSchema)` to create a new message.
 */
export const CWishlistFilters_ExcludeTypeFiltersSchema: GenMessage<CWishlistFilters_ExcludeTypeFilters, CWishlistFilters_ExcludeTypeFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 16);

/**
 * @generated from message CWishlistFilters_SteamDeckFilters
 */
export type CWishlistFilters_SteamDeckFilters = Message<"CWishlistFilters_SteamDeckFilters"> & {
  /**
   * @generated from field: optional bool include_verified = 1;
   */
  includeVerified: boolean;

  /**
   * @generated from field: optional bool include_playable = 2;
   */
  includePlayable: boolean;
};

/**
 * @generated from message CWishlistFilters_SteamDeckFilters
 */
export type CWishlistFilters_SteamDeckFiltersJson = {
  /**
   * @generated from field: optional bool include_verified = 1;
   */
  includeVerified?: boolean;

  /**
   * @generated from field: optional bool include_playable = 2;
   */
  includePlayable?: boolean;
};

/**
 * Describes the message CWishlistFilters_SteamDeckFilters.
 * Use `create(CWishlistFilters_SteamDeckFiltersSchema)` to create a new message.
 */
export const CWishlistFilters_SteamDeckFiltersSchema: GenMessage<CWishlistFilters_SteamDeckFilters, CWishlistFilters_SteamDeckFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_wishlist, 17);

/**
 * @generated from service Wishlist
 */
export const Wishlist: GenService<{
  /**
   * @generated from rpc Wishlist.AddToWishlist
   */
  addToWishlist: {
    methodKind: "unary";
    input: typeof CWishlist_AddToWishlist_RequestSchema;
    output: typeof CWishlist_AddToWishlist_ResponseSchema;
  },
  /**
   * @generated from rpc Wishlist.GetWishlist
   */
  getWishlist: {
    methodKind: "unary";
    input: typeof CWishlist_GetWishlist_RequestSchema;
    output: typeof CWishlist_GetWishlist_ResponseSchema;
  },
  /**
   * @generated from rpc Wishlist.GetWishlistItemCount
   */
  getWishlistItemCount: {
    methodKind: "unary";
    input: typeof CWishlist_GetWishlistItemCount_RequestSchema;
    output: typeof CWishlist_GetWishlistItemCount_ResponseSchema;
  },
  /**
   * @generated from rpc Wishlist.GetWishlistItemsOnSale
   */
  getWishlistItemsOnSale: {
    methodKind: "unary";
    input: typeof CWishlist_GetWishlistItemsOnSale_RequestSchema;
    output: typeof CWishlist_GetWishlistItemsOnSale_ResponseSchema;
  },
  /**
   * @generated from rpc Wishlist.GetWishlistSortedFiltered
   */
  getWishlistSortedFiltered: {
    methodKind: "unary";
    input: typeof CWishlist_GetWishlistSortedFiltered_RequestSchema;
    output: typeof CWishlist_GetWishlistSortedFiltered_ResponseSchema;
  },
  /**
   * @generated from rpc Wishlist.RemoveFromWishlist
   */
  removeFromWishlist: {
    methodKind: "unary";
    input: typeof CWishlist_RemoveFromWishlist_RequestSchema;
    output: typeof CWishlist_RemoveFromWishlist_ResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_web_ui_service_wishlist, 0);

