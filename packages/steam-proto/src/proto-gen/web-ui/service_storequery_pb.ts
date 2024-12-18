// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file web-ui/service_storequery.proto (syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import type { CStorePageFilter, CStorePageFilterJson, StoreBrowseContext, StoreBrowseContextJson, StoreBrowseItemDataRequest, StoreBrowseItemDataRequestJson, StoreItem, StoreItemID, StoreItemIDJson, StoreItemJson } from "./common_pb";
import { file_web_ui_common } from "./common_pb";
import { file_web_ui_common_base } from "./common_base_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file web-ui/service_storequery.proto.
 */
export const file_web_ui_service_storequery: GenFile = /*@__PURE__*/
  fileDesc("Ch93ZWItdWkvc2VydmljZV9zdG9yZXF1ZXJ5LnByb3RvIoMCCjVDU3RvcmVRdWVyeV9HZXRJdGVtQnlVc2VyQ29tYmluZWRUYWdzUHJpb3JpdHlfUmVxdWVzdBIZCgRzb3J0GAEgASgFOgEwQgiCtRgEZW51bRIRCgltYXhfaXRlbXMYAiABKA0SEQoJcmFuZG9taXplGAMgASgIEh8KEGluY2x1ZGVfcGFja2FnZXMYBCABKAg6BWZhbHNlEh4KD2luY2x1ZGVfYnVuZGxlcxgFIAEoCDoFZmFsc2USIgoHZmlsdGVycxgGIAEoCzIRLkNTdG9yZVBhZ2VGaWx0ZXISJAoHY29udGV4dBgHIAEoCzITLlN0b3JlQnJvd3NlQ29udGV4dCJ/CjZDU3RvcmVRdWVyeV9HZXRJdGVtQnlVc2VyQ29tYmluZWRUYWdzUHJpb3JpdHlfUmVzcG9uc2USDQoFdGFnaWQYASADKA0SJAoOc3RvcmVfaXRlbV9pZHMYAiADKAsyDC5TdG9yZUl0ZW1JRBIQCgh0YWdfbmFtZRgDIAMoCSLLAQoxQ1N0b3JlUXVlcnlfR2V0SXRlbXNCeVVzZXJSZWNvbW1lbmRlZFRhZ3NfUmVxdWVzdBIiCgdmaWx0ZXJzGAIgASgLMhEuQ1N0b3JlUGFnZUZpbHRlchIkCgdjb250ZXh0GAUgASgLMhMuU3RvcmVCcm93c2VDb250ZXh0EkwKCHNlY3Rpb25zGAYgAygLMjouQ1N0b3JlUXVlcnlfR2V0SXRlbXNCeVVzZXJSZWNvbW1lbmRlZFRhZ3NfUmVxdWVzdF9TZWN0aW9uIr0BCjlDU3RvcmVRdWVyeV9HZXRJdGVtc0J5VXNlclJlY29tbWVuZGVkVGFnc19SZXF1ZXN0X1NlY3Rpb24SGQoEc29ydBgBIAEoBToBMEIIgrUYBGVudW0SEQoJbWluX2l0ZW1zGAIgASgNEhEKCXJhbmRvbWl6ZRgDIAEoCBIfChBpbmNsdWRlX3BhY2thZ2VzGAQgASgIOgVmYWxzZRIeCg9pbmNsdWRlX2J1bmRsZXMYBSABKAg6BWZhbHNlIoMBCjJDU3RvcmVRdWVyeV9HZXRJdGVtc0J5VXNlclJlY29tbWVuZGVkVGFnc19SZXNwb25zZRJNCghzZWN0aW9ucxgBIAMoCzI7LkNTdG9yZVF1ZXJ5X0dldEl0ZW1zQnlVc2VyUmVjb21tZW5kZWRUYWdzX1Jlc3BvbnNlX1NlY3Rpb24igwEKOkNTdG9yZVF1ZXJ5X0dldEl0ZW1zQnlVc2VyUmVjb21tZW5kZWRUYWdzX1Jlc3BvbnNlX1NlY3Rpb24SDQoFdGFnaWQYASABKA0SJAoOc3RvcmVfaXRlbV9pZHMYAiADKAsyDC5TdG9yZUl0ZW1JRBIQCgh0YWdfbmFtZRgDIAEoCSLKAQoZQ1N0b3JlUXVlcnlfUXVlcnlfUmVxdWVzdBISCgpxdWVyeV9uYW1lGAEgASgJEiEKBXF1ZXJ5GAIgASgLMhIuQ1N0b3JlUXVlcnlQYXJhbXMSJAoHY29udGV4dBgDIAEoCzITLlN0b3JlQnJvd3NlQ29udGV4dBIxCgxkYXRhX3JlcXVlc3QYBCABKAsyGy5TdG9yZUJyb3dzZUl0ZW1EYXRhUmVxdWVzdBIdChVvdmVycmlkZV9jb3VudHJ5X2NvZGUYBSABKAkihgEKGkNTdG9yZVF1ZXJ5X1F1ZXJ5X1Jlc3BvbnNlEiwKCG1ldGFkYXRhGAEgASgLMhouQ1N0b3JlUXVlcnlSZXN1bHRNZXRhZGF0YRIZCgNpZHMYAiADKAsyDC5TdG9yZUl0ZW1JRBIfCgtzdG9yZV9pdGVtcxgDIAMoCzIKLlN0b3JlSXRlbSLGAgolQ1N0b3JlUXVlcnlfU2VhcmNoU3VnZ2VzdGlvbnNfUmVxdWVzdBISCgpxdWVyeV9uYW1lGAEgASgJEiQKB2NvbnRleHQYAiABKAsyEy5TdG9yZUJyb3dzZUNvbnRleHQSEwoLc2VhcmNoX3Rlcm0YAyABKAkSEwoLbWF4X3Jlc3VsdHMYBCABKA0SJAoHZmlsdGVycxgFIAEoCzITLkNTdG9yZVF1ZXJ5RmlsdGVycxIxCgxkYXRhX3JlcXVlc3QYBiABKAsyGy5TdG9yZUJyb3dzZUl0ZW1EYXRhUmVxdWVzdBIWCg51c2Vfc3BlbGxjaGVjaxgHIAEoCBITCgtzZWFyY2hfdGFncxgIIAEoCBIXCg9zZWFyY2hfY3JlYXRvcnMYCSABKAgSGgoScHJlZmlsdGVyX2NyZWF0b3JzGAogASgIIpIBCiZDU3RvcmVRdWVyeV9TZWFyY2hTdWdnZXN0aW9uc19SZXNwb25zZRIsCghtZXRhZGF0YRgBIAEoCzIaLkNTdG9yZVF1ZXJ5UmVzdWx0TWV0YWRhdGESGQoDaWRzGAIgAygLMgwuU3RvcmVJdGVtSUQSHwoLc3RvcmVfaXRlbXMYAyADKAsyCi5TdG9yZUl0ZW0i3gQKEkNTdG9yZVF1ZXJ5RmlsdGVycxIVCg1yZWxlYXNlZF9vbmx5GAEgASgIEhgKEGNvbWluZ19zb29uX29ubHkYAiABKAgSNQoMdHlwZV9maWx0ZXJzGAMgASgLMh8uQ1N0b3JlUXVlcnlGaWx0ZXJzX1R5cGVGaWx0ZXJzEh4KDGV4Y2x1ZGVfZnJvbRgEIAMoBUIIgrUYBGVudW0SOAoRdGFnaWRzX211c3RfbWF0Y2gYCiADKAsyHS5DU3RvcmVRdWVyeUZpbHRlcnNfVGFnRmlsdGVyEhYKDnRhZ2lkc19leGNsdWRlGAsgAygFEjcKDXByaWNlX2ZpbHRlcnMYDCABKAsyIC5DU3RvcmVRdWVyeUZpbHRlcnNfUHJpY2VGaWx0ZXJzEjAKHmNvbnRlbnRfZGVzY3JpcHRvcnNfbXVzdF9tYXRjaBgPIAMoBUIIgrUYBGVudW0SLgocY29udGVudF9kZXNjcmlwdG9yc19leGNsdWRlZBgQIAMoBUIIgrUYBGVudW0SHgoWcmVnaW9uYWxfdG9wX25fc2VsbGVycxgoIAEoBRIcChRnbG9iYWxfdG9wX25fc2VsbGVycxgpIAEoBRIoCiByZWdpb25hbF9sb25nX3Rlcm1fdG9wX25fc2VsbGVycxgqIAEoBRImCh5nbG9iYWxfbG9uZ190ZXJtX3RvcF9uX3NlbGxlcnMYKyABKAUSLAoRc3RvcmVfcGFnZV9maWx0ZXIYLCABKAsyES5DU3RvcmVQYWdlRmlsdGVyEhUKDXBhcmVudF9hcHBpZHMYLSADKA0idAofQ1N0b3JlUXVlcnlGaWx0ZXJzX1ByaWNlRmlsdGVycxIXCg9vbmx5X2ZyZWVfaXRlbXMYASABKAgSGgoSZXhjbHVkZV9mcmVlX2l0ZW1zGAIgASgIEhwKFG1pbl9kaXNjb3VudF9wZXJjZW50GAMgASgFIi4KHENTdG9yZVF1ZXJ5RmlsdGVyc19UYWdGaWx0ZXISDgoGdGFnaWRzGAEgAygFIrwCCh5DU3RvcmVRdWVyeUZpbHRlcnNfVHlwZUZpbHRlcnMSFAoMaW5jbHVkZV9hcHBzGAEgASgIEhgKEGluY2x1ZGVfcGFja2FnZXMYAiABKAgSFwoPaW5jbHVkZV9idW5kbGVzGAMgASgIEhUKDWluY2x1ZGVfZ2FtZXMYCiABKAgSFQoNaW5jbHVkZV9kZW1vcxgLIAEoCBIUCgxpbmNsdWRlX21vZHMYDCABKAgSEwoLaW5jbHVkZV9kbGMYDSABKAgSGAoQaW5jbHVkZV9zb2Z0d2FyZRgOIAEoCBIVCg1pbmNsdWRlX3ZpZGVvGA8gASgIEhgKEGluY2x1ZGVfaGFyZHdhcmUYECABKAgSFgoOaW5jbHVkZV9zZXJpZXMYESABKAgSFQoNaW5jbHVkZV9tdXNpYxgSIAEoCCJ5ChFDU3RvcmVRdWVyeVBhcmFtcxIQCgVzdGFydBgBIAEoBToBMBIRCgVjb3VudBgCIAEoBToCMTASGQoEc29ydBgKIAEoBToBMEIIgrUYBGVudW0SJAoHZmlsdGVycxgUIAEoCzITLkNTdG9yZVF1ZXJ5RmlsdGVycyJsChxDU3RvcmVRdWVyeVBlclJlc3VsdE1ldGFkYXRhEhgKAmlkGAEgASgLMgwuU3RvcmVJdGVtSUQSDQoFc2NvcmUYAiABKAESIwobc3BlbGxjaGVja19nZW5lcmF0ZWRfcmVzdWx0GAMgASgIIrUBChlDU3RvcmVRdWVyeVJlc3VsdE1ldGFkYXRhEh4KFnRvdGFsX21hdGNoaW5nX3JlY29yZHMYASABKAUSDQoFc3RhcnQYAiABKAUSDQoFY291bnQYAyABKAUSOgoTcGVyX3Jlc3VsdF9tZXRhZGF0YRgEIAMoCzIdLkNTdG9yZVF1ZXJ5UGVyUmVzdWx0TWV0YWRhdGESHgoWc3BlbGxjaGVja19zdWdnZXN0aW9ucxgFIAMoCTLWAwoKU3RvcmVRdWVyeRKUAQohR2V0SXRlbUJ5VXNlckNvbWJpbmVkVGFnc1ByaW9yaXR5EjYuQ1N0b3JlUXVlcnlfR2V0SXRlbUJ5VXNlckNvbWJpbmVkVGFnc1ByaW9yaXR5X1JlcXVlc3QaNy5DU3RvcmVRdWVyeV9HZXRJdGVtQnlVc2VyQ29tYmluZWRUYWdzUHJpb3JpdHlfUmVzcG9uc2USiAEKHUdldEl0ZW1zQnlVc2VyUmVjb21tZW5kZWRUYWdzEjIuQ1N0b3JlUXVlcnlfR2V0SXRlbXNCeVVzZXJSZWNvbW1lbmRlZFRhZ3NfUmVxdWVzdBozLkNTdG9yZVF1ZXJ5X0dldEl0ZW1zQnlVc2VyUmVjb21tZW5kZWRUYWdzX1Jlc3BvbnNlEkAKBVF1ZXJ5EhouQ1N0b3JlUXVlcnlfUXVlcnlfUmVxdWVzdBobLkNTdG9yZVF1ZXJ5X1F1ZXJ5X1Jlc3BvbnNlEmQKEVNlYXJjaFN1Z2dlc3Rpb25zEiYuQ1N0b3JlUXVlcnlfU2VhcmNoU3VnZ2VzdGlvbnNfUmVxdWVzdBonLkNTdG9yZVF1ZXJ5X1NlYXJjaFN1Z2dlc3Rpb25zX1Jlc3BvbnNl", [file_web_ui_common, file_web_ui_common_base]);

/**
 * @generated from message CStoreQuery_GetItemByUserCombinedTagsPriority_Request
 */
export type CStoreQuery_GetItemByUserCombinedTagsPriority_Request = Message<"CStoreQuery_GetItemByUserCombinedTagsPriority_Request"> & {
  /**
   * @generated from field: optional int32 sort = 1 [default = 0];
   */
  sort: number;

  /**
   * @generated from field: optional uint32 max_items = 2;
   */
  maxItems: number;

  /**
   * @generated from field: optional bool randomize = 3;
   */
  randomize: boolean;

  /**
   * @generated from field: optional bool include_packages = 4 [default = false];
   */
  includePackages: boolean;

  /**
   * @generated from field: optional bool include_bundles = 5 [default = false];
   */
  includeBundles: boolean;

  /**
   * @generated from field: optional CStorePageFilter filters = 6;
   */
  filters?: CStorePageFilter;

  /**
   * @generated from field: optional StoreBrowseContext context = 7;
   */
  context?: StoreBrowseContext;
};

/**
 * @generated from message CStoreQuery_GetItemByUserCombinedTagsPriority_Request
 */
export type CStoreQuery_GetItemByUserCombinedTagsPriority_RequestJson = {
  /**
   * @generated from field: optional int32 sort = 1 [default = 0];
   */
  sort?: number;

  /**
   * @generated from field: optional uint32 max_items = 2;
   */
  maxItems?: number;

  /**
   * @generated from field: optional bool randomize = 3;
   */
  randomize?: boolean;

  /**
   * @generated from field: optional bool include_packages = 4 [default = false];
   */
  includePackages?: boolean;

  /**
   * @generated from field: optional bool include_bundles = 5 [default = false];
   */
  includeBundles?: boolean;

  /**
   * @generated from field: optional CStorePageFilter filters = 6;
   */
  filters?: CStorePageFilterJson;

  /**
   * @generated from field: optional StoreBrowseContext context = 7;
   */
  context?: StoreBrowseContextJson;
};

/**
 * Describes the message CStoreQuery_GetItemByUserCombinedTagsPriority_Request.
 * Use `create(CStoreQuery_GetItemByUserCombinedTagsPriority_RequestSchema)` to create a new message.
 */
export const CStoreQuery_GetItemByUserCombinedTagsPriority_RequestSchema: GenMessage<CStoreQuery_GetItemByUserCombinedTagsPriority_Request, CStoreQuery_GetItemByUserCombinedTagsPriority_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 0);

/**
 * @generated from message CStoreQuery_GetItemByUserCombinedTagsPriority_Response
 */
export type CStoreQuery_GetItemByUserCombinedTagsPriority_Response = Message<"CStoreQuery_GetItemByUserCombinedTagsPriority_Response"> & {
  /**
   * @generated from field: repeated uint32 tagid = 1;
   */
  tagid: number[];

  /**
   * @generated from field: repeated StoreItemID store_item_ids = 2;
   */
  storeItemIds: StoreItemID[];

  /**
   * @generated from field: repeated string tag_name = 3;
   */
  tagName: string[];
};

/**
 * @generated from message CStoreQuery_GetItemByUserCombinedTagsPriority_Response
 */
export type CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseJson = {
  /**
   * @generated from field: repeated uint32 tagid = 1;
   */
  tagid?: number[];

  /**
   * @generated from field: repeated StoreItemID store_item_ids = 2;
   */
  storeItemIds?: StoreItemIDJson[];

  /**
   * @generated from field: repeated string tag_name = 3;
   */
  tagName?: string[];
};

/**
 * Describes the message CStoreQuery_GetItemByUserCombinedTagsPriority_Response.
 * Use `create(CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseSchema)` to create a new message.
 */
export const CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseSchema: GenMessage<CStoreQuery_GetItemByUserCombinedTagsPriority_Response, CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 1);

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Request
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Request = Message<"CStoreQuery_GetItemsByUserRecommendedTags_Request"> & {
  /**
   * @generated from field: optional CStorePageFilter filters = 2;
   */
  filters?: CStorePageFilter;

  /**
   * @generated from field: optional StoreBrowseContext context = 5;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: repeated CStoreQuery_GetItemsByUserRecommendedTags_Request_Section sections = 6;
   */
  sections: CStoreQuery_GetItemsByUserRecommendedTags_Request_Section[];
};

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Request
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_RequestJson = {
  /**
   * @generated from field: optional CStorePageFilter filters = 2;
   */
  filters?: CStorePageFilterJson;

  /**
   * @generated from field: optional StoreBrowseContext context = 5;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: repeated CStoreQuery_GetItemsByUserRecommendedTags_Request_Section sections = 6;
   */
  sections?: CStoreQuery_GetItemsByUserRecommendedTags_Request_SectionJson[];
};

/**
 * Describes the message CStoreQuery_GetItemsByUserRecommendedTags_Request.
 * Use `create(CStoreQuery_GetItemsByUserRecommendedTags_RequestSchema)` to create a new message.
 */
export const CStoreQuery_GetItemsByUserRecommendedTags_RequestSchema: GenMessage<CStoreQuery_GetItemsByUserRecommendedTags_Request, CStoreQuery_GetItemsByUserRecommendedTags_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 2);

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Request_Section
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Request_Section = Message<"CStoreQuery_GetItemsByUserRecommendedTags_Request_Section"> & {
  /**
   * @generated from field: optional int32 sort = 1 [default = 0];
   */
  sort: number;

  /**
   * @generated from field: optional uint32 min_items = 2;
   */
  minItems: number;

  /**
   * @generated from field: optional bool randomize = 3;
   */
  randomize: boolean;

  /**
   * @generated from field: optional bool include_packages = 4 [default = false];
   */
  includePackages: boolean;

  /**
   * @generated from field: optional bool include_bundles = 5 [default = false];
   */
  includeBundles: boolean;
};

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Request_Section
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Request_SectionJson = {
  /**
   * @generated from field: optional int32 sort = 1 [default = 0];
   */
  sort?: number;

  /**
   * @generated from field: optional uint32 min_items = 2;
   */
  minItems?: number;

  /**
   * @generated from field: optional bool randomize = 3;
   */
  randomize?: boolean;

  /**
   * @generated from field: optional bool include_packages = 4 [default = false];
   */
  includePackages?: boolean;

  /**
   * @generated from field: optional bool include_bundles = 5 [default = false];
   */
  includeBundles?: boolean;
};

/**
 * Describes the message CStoreQuery_GetItemsByUserRecommendedTags_Request_Section.
 * Use `create(CStoreQuery_GetItemsByUserRecommendedTags_Request_SectionSchema)` to create a new message.
 */
export const CStoreQuery_GetItemsByUserRecommendedTags_Request_SectionSchema: GenMessage<CStoreQuery_GetItemsByUserRecommendedTags_Request_Section, CStoreQuery_GetItemsByUserRecommendedTags_Request_SectionJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 3);

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Response
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Response = Message<"CStoreQuery_GetItemsByUserRecommendedTags_Response"> & {
  /**
   * @generated from field: repeated CStoreQuery_GetItemsByUserRecommendedTags_Response_Section sections = 1;
   */
  sections: CStoreQuery_GetItemsByUserRecommendedTags_Response_Section[];
};

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Response
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_ResponseJson = {
  /**
   * @generated from field: repeated CStoreQuery_GetItemsByUserRecommendedTags_Response_Section sections = 1;
   */
  sections?: CStoreQuery_GetItemsByUserRecommendedTags_Response_SectionJson[];
};

/**
 * Describes the message CStoreQuery_GetItemsByUserRecommendedTags_Response.
 * Use `create(CStoreQuery_GetItemsByUserRecommendedTags_ResponseSchema)` to create a new message.
 */
export const CStoreQuery_GetItemsByUserRecommendedTags_ResponseSchema: GenMessage<CStoreQuery_GetItemsByUserRecommendedTags_Response, CStoreQuery_GetItemsByUserRecommendedTags_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 4);

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Response_Section
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Response_Section = Message<"CStoreQuery_GetItemsByUserRecommendedTags_Response_Section"> & {
  /**
   * @generated from field: optional uint32 tagid = 1;
   */
  tagid: number;

  /**
   * @generated from field: repeated StoreItemID store_item_ids = 2;
   */
  storeItemIds: StoreItemID[];

  /**
   * @generated from field: optional string tag_name = 3;
   */
  tagName: string;
};

/**
 * @generated from message CStoreQuery_GetItemsByUserRecommendedTags_Response_Section
 */
export type CStoreQuery_GetItemsByUserRecommendedTags_Response_SectionJson = {
  /**
   * @generated from field: optional uint32 tagid = 1;
   */
  tagid?: number;

  /**
   * @generated from field: repeated StoreItemID store_item_ids = 2;
   */
  storeItemIds?: StoreItemIDJson[];

  /**
   * @generated from field: optional string tag_name = 3;
   */
  tagName?: string;
};

/**
 * Describes the message CStoreQuery_GetItemsByUserRecommendedTags_Response_Section.
 * Use `create(CStoreQuery_GetItemsByUserRecommendedTags_Response_SectionSchema)` to create a new message.
 */
export const CStoreQuery_GetItemsByUserRecommendedTags_Response_SectionSchema: GenMessage<CStoreQuery_GetItemsByUserRecommendedTags_Response_Section, CStoreQuery_GetItemsByUserRecommendedTags_Response_SectionJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 5);

/**
 * @generated from message CStoreQuery_Query_Request
 */
export type CStoreQuery_Query_Request = Message<"CStoreQuery_Query_Request"> & {
  /**
   * @generated from field: optional string query_name = 1;
   */
  queryName: string;

  /**
   * @generated from field: optional CStoreQueryParams query = 2;
   */
  query?: CStoreQueryParams;

  /**
   * @generated from field: optional StoreBrowseContext context = 3;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 4;
   */
  dataRequest?: StoreBrowseItemDataRequest;

  /**
   * @generated from field: optional string override_country_code = 5;
   */
  overrideCountryCode: string;
};

/**
 * @generated from message CStoreQuery_Query_Request
 */
export type CStoreQuery_Query_RequestJson = {
  /**
   * @generated from field: optional string query_name = 1;
   */
  queryName?: string;

  /**
   * @generated from field: optional CStoreQueryParams query = 2;
   */
  query?: CStoreQueryParamsJson;

  /**
   * @generated from field: optional StoreBrowseContext context = 3;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 4;
   */
  dataRequest?: StoreBrowseItemDataRequestJson;

  /**
   * @generated from field: optional string override_country_code = 5;
   */
  overrideCountryCode?: string;
};

/**
 * Describes the message CStoreQuery_Query_Request.
 * Use `create(CStoreQuery_Query_RequestSchema)` to create a new message.
 */
export const CStoreQuery_Query_RequestSchema: GenMessage<CStoreQuery_Query_Request, CStoreQuery_Query_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 6);

/**
 * @generated from message CStoreQuery_Query_Response
 */
export type CStoreQuery_Query_Response = Message<"CStoreQuery_Query_Response"> & {
  /**
   * @generated from field: optional CStoreQueryResultMetadata metadata = 1;
   */
  metadata?: CStoreQueryResultMetadata;

  /**
   * @generated from field: repeated StoreItemID ids = 2;
   */
  ids: StoreItemID[];

  /**
   * @generated from field: repeated StoreItem store_items = 3;
   */
  storeItems: StoreItem[];
};

/**
 * @generated from message CStoreQuery_Query_Response
 */
export type CStoreQuery_Query_ResponseJson = {
  /**
   * @generated from field: optional CStoreQueryResultMetadata metadata = 1;
   */
  metadata?: CStoreQueryResultMetadataJson;

  /**
   * @generated from field: repeated StoreItemID ids = 2;
   */
  ids?: StoreItemIDJson[];

  /**
   * @generated from field: repeated StoreItem store_items = 3;
   */
  storeItems?: StoreItemJson[];
};

/**
 * Describes the message CStoreQuery_Query_Response.
 * Use `create(CStoreQuery_Query_ResponseSchema)` to create a new message.
 */
export const CStoreQuery_Query_ResponseSchema: GenMessage<CStoreQuery_Query_Response, CStoreQuery_Query_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 7);

/**
 * @generated from message CStoreQuery_SearchSuggestions_Request
 */
export type CStoreQuery_SearchSuggestions_Request = Message<"CStoreQuery_SearchSuggestions_Request"> & {
  /**
   * @generated from field: optional string query_name = 1;
   */
  queryName: string;

  /**
   * @generated from field: optional StoreBrowseContext context = 2;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: optional string search_term = 3;
   */
  searchTerm: string;

  /**
   * @generated from field: optional uint32 max_results = 4;
   */
  maxResults: number;

  /**
   * @generated from field: optional CStoreQueryFilters filters = 5;
   */
  filters?: CStoreQueryFilters;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 6;
   */
  dataRequest?: StoreBrowseItemDataRequest;

  /**
   * @generated from field: optional bool use_spellcheck = 7;
   */
  useSpellcheck: boolean;

  /**
   * @generated from field: optional bool search_tags = 8;
   */
  searchTags: boolean;

  /**
   * @generated from field: optional bool search_creators = 9;
   */
  searchCreators: boolean;

  /**
   * @generated from field: optional bool prefilter_creators = 10;
   */
  prefilterCreators: boolean;
};

/**
 * @generated from message CStoreQuery_SearchSuggestions_Request
 */
export type CStoreQuery_SearchSuggestions_RequestJson = {
  /**
   * @generated from field: optional string query_name = 1;
   */
  queryName?: string;

  /**
   * @generated from field: optional StoreBrowseContext context = 2;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: optional string search_term = 3;
   */
  searchTerm?: string;

  /**
   * @generated from field: optional uint32 max_results = 4;
   */
  maxResults?: number;

  /**
   * @generated from field: optional CStoreQueryFilters filters = 5;
   */
  filters?: CStoreQueryFiltersJson;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 6;
   */
  dataRequest?: StoreBrowseItemDataRequestJson;

  /**
   * @generated from field: optional bool use_spellcheck = 7;
   */
  useSpellcheck?: boolean;

  /**
   * @generated from field: optional bool search_tags = 8;
   */
  searchTags?: boolean;

  /**
   * @generated from field: optional bool search_creators = 9;
   */
  searchCreators?: boolean;

  /**
   * @generated from field: optional bool prefilter_creators = 10;
   */
  prefilterCreators?: boolean;
};

/**
 * Describes the message CStoreQuery_SearchSuggestions_Request.
 * Use `create(CStoreQuery_SearchSuggestions_RequestSchema)` to create a new message.
 */
export const CStoreQuery_SearchSuggestions_RequestSchema: GenMessage<CStoreQuery_SearchSuggestions_Request, CStoreQuery_SearchSuggestions_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 8);

/**
 * @generated from message CStoreQuery_SearchSuggestions_Response
 */
export type CStoreQuery_SearchSuggestions_Response = Message<"CStoreQuery_SearchSuggestions_Response"> & {
  /**
   * @generated from field: optional CStoreQueryResultMetadata metadata = 1;
   */
  metadata?: CStoreQueryResultMetadata;

  /**
   * @generated from field: repeated StoreItemID ids = 2;
   */
  ids: StoreItemID[];

  /**
   * @generated from field: repeated StoreItem store_items = 3;
   */
  storeItems: StoreItem[];
};

/**
 * @generated from message CStoreQuery_SearchSuggestions_Response
 */
export type CStoreQuery_SearchSuggestions_ResponseJson = {
  /**
   * @generated from field: optional CStoreQueryResultMetadata metadata = 1;
   */
  metadata?: CStoreQueryResultMetadataJson;

  /**
   * @generated from field: repeated StoreItemID ids = 2;
   */
  ids?: StoreItemIDJson[];

  /**
   * @generated from field: repeated StoreItem store_items = 3;
   */
  storeItems?: StoreItemJson[];
};

/**
 * Describes the message CStoreQuery_SearchSuggestions_Response.
 * Use `create(CStoreQuery_SearchSuggestions_ResponseSchema)` to create a new message.
 */
export const CStoreQuery_SearchSuggestions_ResponseSchema: GenMessage<CStoreQuery_SearchSuggestions_Response, CStoreQuery_SearchSuggestions_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 9);

/**
 * @generated from message CStoreQueryFilters
 */
export type CStoreQueryFilters = Message<"CStoreQueryFilters"> & {
  /**
   * @generated from field: optional bool released_only = 1;
   */
  releasedOnly: boolean;

  /**
   * @generated from field: optional bool coming_soon_only = 2;
   */
  comingSoonOnly: boolean;

  /**
   * @generated from field: optional CStoreQueryFilters_TypeFilters type_filters = 3;
   */
  typeFilters?: CStoreQueryFilters_TypeFilters;

  /**
   * @generated from field: repeated int32 exclude_from = 4;
   */
  excludeFrom: number[];

  /**
   * @generated from field: repeated CStoreQueryFilters_TagFilter tagids_must_match = 10;
   */
  tagidsMustMatch: CStoreQueryFilters_TagFilter[];

  /**
   * @generated from field: repeated int32 tagids_exclude = 11;
   */
  tagidsExclude: number[];

  /**
   * @generated from field: optional CStoreQueryFilters_PriceFilters price_filters = 12;
   */
  priceFilters?: CStoreQueryFilters_PriceFilters;

  /**
   * @generated from field: repeated int32 content_descriptors_must_match = 15;
   */
  contentDescriptorsMustMatch: number[];

  /**
   * @generated from field: repeated int32 content_descriptors_excluded = 16;
   */
  contentDescriptorsExcluded: number[];

  /**
   * @generated from field: optional int32 regional_top_n_sellers = 40;
   */
  regionalTopNSellers: number;

  /**
   * @generated from field: optional int32 global_top_n_sellers = 41;
   */
  globalTopNSellers: number;

  /**
   * @generated from field: optional int32 regional_long_term_top_n_sellers = 42;
   */
  regionalLongTermTopNSellers: number;

  /**
   * @generated from field: optional int32 global_long_term_top_n_sellers = 43;
   */
  globalLongTermTopNSellers: number;

  /**
   * @generated from field: optional CStorePageFilter store_page_filter = 44;
   */
  storePageFilter?: CStorePageFilter;

  /**
   * @generated from field: repeated uint32 parent_appids = 45;
   */
  parentAppids: number[];
};

/**
 * @generated from message CStoreQueryFilters
 */
export type CStoreQueryFiltersJson = {
  /**
   * @generated from field: optional bool released_only = 1;
   */
  releasedOnly?: boolean;

  /**
   * @generated from field: optional bool coming_soon_only = 2;
   */
  comingSoonOnly?: boolean;

  /**
   * @generated from field: optional CStoreQueryFilters_TypeFilters type_filters = 3;
   */
  typeFilters?: CStoreQueryFilters_TypeFiltersJson;

  /**
   * @generated from field: repeated int32 exclude_from = 4;
   */
  excludeFrom?: number[];

  /**
   * @generated from field: repeated CStoreQueryFilters_TagFilter tagids_must_match = 10;
   */
  tagidsMustMatch?: CStoreQueryFilters_TagFilterJson[];

  /**
   * @generated from field: repeated int32 tagids_exclude = 11;
   */
  tagidsExclude?: number[];

  /**
   * @generated from field: optional CStoreQueryFilters_PriceFilters price_filters = 12;
   */
  priceFilters?: CStoreQueryFilters_PriceFiltersJson;

  /**
   * @generated from field: repeated int32 content_descriptors_must_match = 15;
   */
  contentDescriptorsMustMatch?: number[];

  /**
   * @generated from field: repeated int32 content_descriptors_excluded = 16;
   */
  contentDescriptorsExcluded?: number[];

  /**
   * @generated from field: optional int32 regional_top_n_sellers = 40;
   */
  regionalTopNSellers?: number;

  /**
   * @generated from field: optional int32 global_top_n_sellers = 41;
   */
  globalTopNSellers?: number;

  /**
   * @generated from field: optional int32 regional_long_term_top_n_sellers = 42;
   */
  regionalLongTermTopNSellers?: number;

  /**
   * @generated from field: optional int32 global_long_term_top_n_sellers = 43;
   */
  globalLongTermTopNSellers?: number;

  /**
   * @generated from field: optional CStorePageFilter store_page_filter = 44;
   */
  storePageFilter?: CStorePageFilterJson;

  /**
   * @generated from field: repeated uint32 parent_appids = 45;
   */
  parentAppids?: number[];
};

/**
 * Describes the message CStoreQueryFilters.
 * Use `create(CStoreQueryFiltersSchema)` to create a new message.
 */
export const CStoreQueryFiltersSchema: GenMessage<CStoreQueryFilters, CStoreQueryFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 10);

/**
 * @generated from message CStoreQueryFilters_PriceFilters
 */
export type CStoreQueryFilters_PriceFilters = Message<"CStoreQueryFilters_PriceFilters"> & {
  /**
   * @generated from field: optional bool only_free_items = 1;
   */
  onlyFreeItems: boolean;

  /**
   * @generated from field: optional bool exclude_free_items = 2;
   */
  excludeFreeItems: boolean;

  /**
   * @generated from field: optional int32 min_discount_percent = 3;
   */
  minDiscountPercent: number;
};

/**
 * @generated from message CStoreQueryFilters_PriceFilters
 */
export type CStoreQueryFilters_PriceFiltersJson = {
  /**
   * @generated from field: optional bool only_free_items = 1;
   */
  onlyFreeItems?: boolean;

  /**
   * @generated from field: optional bool exclude_free_items = 2;
   */
  excludeFreeItems?: boolean;

  /**
   * @generated from field: optional int32 min_discount_percent = 3;
   */
  minDiscountPercent?: number;
};

/**
 * Describes the message CStoreQueryFilters_PriceFilters.
 * Use `create(CStoreQueryFilters_PriceFiltersSchema)` to create a new message.
 */
export const CStoreQueryFilters_PriceFiltersSchema: GenMessage<CStoreQueryFilters_PriceFilters, CStoreQueryFilters_PriceFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 11);

/**
 * @generated from message CStoreQueryFilters_TagFilter
 */
export type CStoreQueryFilters_TagFilter = Message<"CStoreQueryFilters_TagFilter"> & {
  /**
   * @generated from field: repeated int32 tagids = 1;
   */
  tagids: number[];
};

/**
 * @generated from message CStoreQueryFilters_TagFilter
 */
export type CStoreQueryFilters_TagFilterJson = {
  /**
   * @generated from field: repeated int32 tagids = 1;
   */
  tagids?: number[];
};

/**
 * Describes the message CStoreQueryFilters_TagFilter.
 * Use `create(CStoreQueryFilters_TagFilterSchema)` to create a new message.
 */
export const CStoreQueryFilters_TagFilterSchema: GenMessage<CStoreQueryFilters_TagFilter, CStoreQueryFilters_TagFilterJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 12);

/**
 * @generated from message CStoreQueryFilters_TypeFilters
 */
export type CStoreQueryFilters_TypeFilters = Message<"CStoreQueryFilters_TypeFilters"> & {
  /**
   * @generated from field: optional bool include_apps = 1;
   */
  includeApps: boolean;

  /**
   * @generated from field: optional bool include_packages = 2;
   */
  includePackages: boolean;

  /**
   * @generated from field: optional bool include_bundles = 3;
   */
  includeBundles: boolean;

  /**
   * @generated from field: optional bool include_games = 10;
   */
  includeGames: boolean;

  /**
   * @generated from field: optional bool include_demos = 11;
   */
  includeDemos: boolean;

  /**
   * @generated from field: optional bool include_mods = 12;
   */
  includeMods: boolean;

  /**
   * @generated from field: optional bool include_dlc = 13;
   */
  includeDlc: boolean;

  /**
   * @generated from field: optional bool include_software = 14;
   */
  includeSoftware: boolean;

  /**
   * @generated from field: optional bool include_video = 15;
   */
  includeVideo: boolean;

  /**
   * @generated from field: optional bool include_hardware = 16;
   */
  includeHardware: boolean;

  /**
   * @generated from field: optional bool include_series = 17;
   */
  includeSeries: boolean;

  /**
   * @generated from field: optional bool include_music = 18;
   */
  includeMusic: boolean;
};

/**
 * @generated from message CStoreQueryFilters_TypeFilters
 */
export type CStoreQueryFilters_TypeFiltersJson = {
  /**
   * @generated from field: optional bool include_apps = 1;
   */
  includeApps?: boolean;

  /**
   * @generated from field: optional bool include_packages = 2;
   */
  includePackages?: boolean;

  /**
   * @generated from field: optional bool include_bundles = 3;
   */
  includeBundles?: boolean;

  /**
   * @generated from field: optional bool include_games = 10;
   */
  includeGames?: boolean;

  /**
   * @generated from field: optional bool include_demos = 11;
   */
  includeDemos?: boolean;

  /**
   * @generated from field: optional bool include_mods = 12;
   */
  includeMods?: boolean;

  /**
   * @generated from field: optional bool include_dlc = 13;
   */
  includeDlc?: boolean;

  /**
   * @generated from field: optional bool include_software = 14;
   */
  includeSoftware?: boolean;

  /**
   * @generated from field: optional bool include_video = 15;
   */
  includeVideo?: boolean;

  /**
   * @generated from field: optional bool include_hardware = 16;
   */
  includeHardware?: boolean;

  /**
   * @generated from field: optional bool include_series = 17;
   */
  includeSeries?: boolean;

  /**
   * @generated from field: optional bool include_music = 18;
   */
  includeMusic?: boolean;
};

/**
 * Describes the message CStoreQueryFilters_TypeFilters.
 * Use `create(CStoreQueryFilters_TypeFiltersSchema)` to create a new message.
 */
export const CStoreQueryFilters_TypeFiltersSchema: GenMessage<CStoreQueryFilters_TypeFilters, CStoreQueryFilters_TypeFiltersJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 13);

/**
 * @generated from message CStoreQueryParams
 */
export type CStoreQueryParams = Message<"CStoreQueryParams"> & {
  /**
   * @generated from field: optional int32 start = 1 [default = 0];
   */
  start: number;

  /**
   * @generated from field: optional int32 count = 2 [default = 10];
   */
  count: number;

  /**
   * @generated from field: optional int32 sort = 10 [default = 0];
   */
  sort: number;

  /**
   * @generated from field: optional CStoreQueryFilters filters = 20;
   */
  filters?: CStoreQueryFilters;
};

/**
 * @generated from message CStoreQueryParams
 */
export type CStoreQueryParamsJson = {
  /**
   * @generated from field: optional int32 start = 1 [default = 0];
   */
  start?: number;

  /**
   * @generated from field: optional int32 count = 2 [default = 10];
   */
  count?: number;

  /**
   * @generated from field: optional int32 sort = 10 [default = 0];
   */
  sort?: number;

  /**
   * @generated from field: optional CStoreQueryFilters filters = 20;
   */
  filters?: CStoreQueryFiltersJson;
};

/**
 * Describes the message CStoreQueryParams.
 * Use `create(CStoreQueryParamsSchema)` to create a new message.
 */
export const CStoreQueryParamsSchema: GenMessage<CStoreQueryParams, CStoreQueryParamsJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 14);

/**
 * @generated from message CStoreQueryPerResultMetadata
 */
export type CStoreQueryPerResultMetadata = Message<"CStoreQueryPerResultMetadata"> & {
  /**
   * @generated from field: optional StoreItemID id = 1;
   */
  id?: StoreItemID;

  /**
   * @generated from field: optional double score = 2;
   */
  score: number;

  /**
   * @generated from field: optional bool spellcheck_generated_result = 3;
   */
  spellcheckGeneratedResult: boolean;
};

/**
 * @generated from message CStoreQueryPerResultMetadata
 */
export type CStoreQueryPerResultMetadataJson = {
  /**
   * @generated from field: optional StoreItemID id = 1;
   */
  id?: StoreItemIDJson;

  /**
   * @generated from field: optional double score = 2;
   */
  score?: number | "NaN" | "Infinity" | "-Infinity";

  /**
   * @generated from field: optional bool spellcheck_generated_result = 3;
   */
  spellcheckGeneratedResult?: boolean;
};

/**
 * Describes the message CStoreQueryPerResultMetadata.
 * Use `create(CStoreQueryPerResultMetadataSchema)` to create a new message.
 */
export const CStoreQueryPerResultMetadataSchema: GenMessage<CStoreQueryPerResultMetadata, CStoreQueryPerResultMetadataJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 15);

/**
 * @generated from message CStoreQueryResultMetadata
 */
export type CStoreQueryResultMetadata = Message<"CStoreQueryResultMetadata"> & {
  /**
   * @generated from field: optional int32 total_matching_records = 1;
   */
  totalMatchingRecords: number;

  /**
   * @generated from field: optional int32 start = 2;
   */
  start: number;

  /**
   * @generated from field: optional int32 count = 3;
   */
  count: number;

  /**
   * @generated from field: repeated CStoreQueryPerResultMetadata per_result_metadata = 4;
   */
  perResultMetadata: CStoreQueryPerResultMetadata[];

  /**
   * @generated from field: repeated string spellcheck_suggestions = 5;
   */
  spellcheckSuggestions: string[];
};

/**
 * @generated from message CStoreQueryResultMetadata
 */
export type CStoreQueryResultMetadataJson = {
  /**
   * @generated from field: optional int32 total_matching_records = 1;
   */
  totalMatchingRecords?: number;

  /**
   * @generated from field: optional int32 start = 2;
   */
  start?: number;

  /**
   * @generated from field: optional int32 count = 3;
   */
  count?: number;

  /**
   * @generated from field: repeated CStoreQueryPerResultMetadata per_result_metadata = 4;
   */
  perResultMetadata?: CStoreQueryPerResultMetadataJson[];

  /**
   * @generated from field: repeated string spellcheck_suggestions = 5;
   */
  spellcheckSuggestions?: string[];
};

/**
 * Describes the message CStoreQueryResultMetadata.
 * Use `create(CStoreQueryResultMetadataSchema)` to create a new message.
 */
export const CStoreQueryResultMetadataSchema: GenMessage<CStoreQueryResultMetadata, CStoreQueryResultMetadataJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_storequery, 16);

/**
 * @generated from service StoreQuery
 */
export const StoreQuery: GenService<{
  /**
   * @generated from rpc StoreQuery.GetItemByUserCombinedTagsPriority
   */
  getItemByUserCombinedTagsPriority: {
    methodKind: "unary";
    input: typeof CStoreQuery_GetItemByUserCombinedTagsPriority_RequestSchema;
    output: typeof CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseSchema;
  },
  /**
   * @generated from rpc StoreQuery.GetItemsByUserRecommendedTags
   */
  getItemsByUserRecommendedTags: {
    methodKind: "unary";
    input: typeof CStoreQuery_GetItemsByUserRecommendedTags_RequestSchema;
    output: typeof CStoreQuery_GetItemsByUserRecommendedTags_ResponseSchema;
  },
  /**
   * @generated from rpc StoreQuery.Query
   */
  query: {
    methodKind: "unary";
    input: typeof CStoreQuery_Query_RequestSchema;
    output: typeof CStoreQuery_Query_ResponseSchema;
  },
  /**
   * @generated from rpc StoreQuery.SearchSuggestions
   */
  searchSuggestions: {
    methodKind: "unary";
    input: typeof CStoreQuery_SearchSuggestions_RequestSchema;
    output: typeof CStoreQuery_SearchSuggestions_ResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_web_ui_service_storequery, 0);

