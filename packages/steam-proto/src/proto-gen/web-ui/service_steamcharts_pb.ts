// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file web-ui/service_steamcharts.proto (syntax proto2)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_web_ui_common_base } from "./common_base_pb";
import type { StoreBrowseContext, StoreBrowseContextJson, StoreBrowseItemDataRequest, StoreBrowseItemDataRequestJson, StoreItem, StoreItemID, StoreItemIDJson, StoreItemJson } from "./common_pb";
import { file_web_ui_common } from "./common_pb";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file web-ui/service_steamcharts.proto.
 */
export const file_web_ui_service_steamcharts: GenFile = /*@__PURE__*/
  fileDesc("CiB3ZWItdWkvc2VydmljZV9zdGVhbWNoYXJ0cy5wcm90byIpCidDU3RlYW1DaGFydHNfR2V0QmVzdE9mWWVhclBhZ2VzX1JlcXVlc3QicwooQ1N0ZWFtQ2hhcnRzX0dldEJlc3RPZlllYXJQYWdlc19SZXNwb25zZRJHCgVwYWdlcxgBIAMoCzI4LkNTdGVhbUNoYXJ0c19HZXRCZXN0T2ZZZWFyUGFnZXNfUmVzcG9uc2VfQmVzdE9mWWVhclBhZ2UinAEKN0NTdGVhbUNoYXJ0c19HZXRCZXN0T2ZZZWFyUGFnZXNfUmVzcG9uc2VfQmVzdE9mWWVhclBhZ2USDAoEbmFtZRgBIAEoCRIQCgh1cmxfcGF0aBgCIAEoCRISCgpiYW5uZXJfdXJsGAMgAygJEhkKEWJhbm5lcl91cmxfbW9iaWxlGAQgAygJEhIKCnN0YXJ0X2RhdGUYBSABKA0iiwEKMENTdGVhbUNoYXJ0c19HZXRHYW1lc0J5Q29uY3VycmVudFBsYXllcnNfUmVxdWVzdBIkCgdjb250ZXh0GAEgASgLMhMuU3RvcmVCcm93c2VDb250ZXh0EjEKDGRhdGFfcmVxdWVzdBgCIAEoCzIbLlN0b3JlQnJvd3NlSXRlbURhdGFSZXF1ZXN0IpoBCjFDU3RlYW1DaGFydHNfR2V0R2FtZXNCeUNvbmN1cnJlbnRQbGF5ZXJzX1Jlc3BvbnNlEhMKC2xhc3RfdXBkYXRlGAEgASgNElAKBXJhbmtzGAIgAygLMkEuQ1N0ZWFtQ2hhcnRzX0dldEdhbWVzQnlDb25jdXJyZW50UGxheWVyc19SZXNwb25zZV9Nb3N0UGxheWVkUmFuayKrAQpAQ1N0ZWFtQ2hhcnRzX0dldEdhbWVzQnlDb25jdXJyZW50UGxheWVyc19SZXNwb25zZV9Nb3N0UGxheWVkUmFuaxIMCgRyYW5rGAEgASgFEg0KBWFwcGlkGAIgASgNEhgKBGl0ZW0YAyABKAsyCi5TdG9yZUl0ZW0SGgoSY29uY3VycmVudF9pbl9nYW1lGAQgASgNEhQKDHBlYWtfaW5fZ2FtZRgFIAEoDSKCAQonQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRHYW1lc19SZXF1ZXN0EiQKB2NvbnRleHQYASABKAsyEy5TdG9yZUJyb3dzZUNvbnRleHQSMQoMZGF0YV9yZXF1ZXN0GAIgASgLMhsuU3RvcmVCcm93c2VJdGVtRGF0YVJlcXVlc3QiiAEKKENTdGVhbUNoYXJ0c19HZXRNb3N0UGxheWVkR2FtZXNfUmVzcG9uc2USEwoLcm9sbHVwX2RhdGUYASABKA0SRwoFcmFua3MYAiADKAsyOC5DU3RlYW1DaGFydHNfR2V0TW9zdFBsYXllZEdhbWVzX1Jlc3BvbnNlX01vc3RQbGF5ZWRSYW5rIrwBCjdDU3RlYW1DaGFydHNfR2V0TW9zdFBsYXllZEdhbWVzX1Jlc3BvbnNlX01vc3RQbGF5ZWRSYW5rEgwKBHJhbmsYASABKAUSDQoFYXBwaWQYAiABKA0SGAoEaXRlbRgDIAEoCzIKLlN0b3JlSXRlbRIWCg5sYXN0X3dlZWtfcmFuaxgEIAEoBRIUCgxwZWFrX2luX2dhbWUYBSABKA0SHAoUZGFpbHlfYWN0aXZlX3BsYXllcnMYBiABKA0ivwEKMENTdGVhbUNoYXJ0c19HZXRNb3N0UGxheWVkU3RlYW1EZWNrR2FtZXNfUmVxdWVzdBIkCgdjb250ZXh0GAEgASgLMhMuU3RvcmVCcm93c2VDb250ZXh0EjEKDGRhdGFfcmVxdWVzdBgCIAEoCzIbLlN0b3JlQnJvd3NlSXRlbURhdGFSZXF1ZXN0EiMKEXRvcF9wbGF5ZWRfcGVyaW9kGAMgASgFQgiCtRgEZW51bRINCgVjb3VudBgEIAEoBSKqAQoxQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRTdGVhbURlY2tHYW1lc19SZXNwb25zZRJQCgVyYW5rcxgBIAMoCzJBLkNTdGVhbUNoYXJ0c19HZXRNb3N0UGxheWVkU3RlYW1EZWNrR2FtZXNfUmVzcG9uc2VfTW9zdFBsYXllZFJhbmsSIwoRdG9wX3BsYXllZF9wZXJpb2QYAiABKAVCCIK1GARlbnVtIpMBCkBDU3RlYW1DaGFydHNfR2V0TW9zdFBsYXllZFN0ZWFtRGVja0dhbWVzX1Jlc3BvbnNlX01vc3RQbGF5ZWRSYW5rEgwKBHJhbmsYASABKAUSDQoFYXBwaWQYAiABKA0SGAoEaXRlbRgDIAEoCzIKLlN0b3JlSXRlbRIYChBsYXN0X3BlcmlvZF9yYW5rGAQgASgFIioKKENTdGVhbUNoYXJ0c19HZXRUb3BSZWxlYXNlc1BhZ2VzX1JlcXVlc3QidgopQ1N0ZWFtQ2hhcnRzX0dldFRvcFJlbGVhc2VzUGFnZXNfUmVzcG9uc2USSQoFcGFnZXMYASADKAsyOi5DU3RlYW1DaGFydHNfR2V0VG9wUmVsZWFzZXNQYWdlc19SZXNwb25zZV9Ub3BSZWxlYXNlc1BhZ2UikwEKOUNTdGVhbUNoYXJ0c19HZXRUb3BSZWxlYXNlc1BhZ2VzX1Jlc3BvbnNlX1RvcFJlbGVhc2VzUGFnZRIMCgRuYW1lGAEgASgJEhYKDnN0YXJ0X29mX21vbnRoGAIgASgNEhAKCHVybF9wYXRoGAMgASgJEh4KCGl0ZW1faWRzGAQgAygLMgwuU3RvcmVJdGVtSUQy3wQKC1N0ZWFtQ2hhcnRzEmkKEkdldEJlc3RPZlllYXJQYWdlcxIoLkNTdGVhbUNoYXJ0c19HZXRCZXN0T2ZZZWFyUGFnZXNfUmVxdWVzdBopLkNTdGVhbUNoYXJ0c19HZXRCZXN0T2ZZZWFyUGFnZXNfUmVzcG9uc2UShAEKG0dldEdhbWVzQnlDb25jdXJyZW50UGxheWVycxIxLkNTdGVhbUNoYXJ0c19HZXRHYW1lc0J5Q29uY3VycmVudFBsYXllcnNfUmVxdWVzdBoyLkNTdGVhbUNoYXJ0c19HZXRHYW1lc0J5Q29uY3VycmVudFBsYXllcnNfUmVzcG9uc2USaQoSR2V0TW9zdFBsYXllZEdhbWVzEiguQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRHYW1lc19SZXF1ZXN0GikuQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRHYW1lc19SZXNwb25zZRKEAQobR2V0TW9zdFBsYXllZFN0ZWFtRGVja0dhbWVzEjEuQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRTdGVhbURlY2tHYW1lc19SZXF1ZXN0GjIuQ1N0ZWFtQ2hhcnRzX0dldE1vc3RQbGF5ZWRTdGVhbURlY2tHYW1lc19SZXNwb25zZRJsChNHZXRUb3BSZWxlYXNlc1BhZ2VzEikuQ1N0ZWFtQ2hhcnRzX0dldFRvcFJlbGVhc2VzUGFnZXNfUmVxdWVzdBoqLkNTdGVhbUNoYXJ0c19HZXRUb3BSZWxlYXNlc1BhZ2VzX1Jlc3BvbnNl", [file_web_ui_common_base, file_web_ui_common]);

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Request
 */
export type CSteamCharts_GetBestOfYearPages_Request = Message<"CSteamCharts_GetBestOfYearPages_Request"> & {
};

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Request
 */
export type CSteamCharts_GetBestOfYearPages_RequestJson = {
};

/**
 * Describes the message CSteamCharts_GetBestOfYearPages_Request.
 * Use `create(CSteamCharts_GetBestOfYearPages_RequestSchema)` to create a new message.
 */
export const CSteamCharts_GetBestOfYearPages_RequestSchema: GenMessage<CSteamCharts_GetBestOfYearPages_Request, CSteamCharts_GetBestOfYearPages_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 0);

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Response
 */
export type CSteamCharts_GetBestOfYearPages_Response = Message<"CSteamCharts_GetBestOfYearPages_Response"> & {
  /**
   * @generated from field: repeated CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage pages = 1;
   */
  pages: CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage[];
};

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Response
 */
export type CSteamCharts_GetBestOfYearPages_ResponseJson = {
  /**
   * @generated from field: repeated CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage pages = 1;
   */
  pages?: CSteamCharts_GetBestOfYearPages_Response_BestOfYearPageJson[];
};

/**
 * Describes the message CSteamCharts_GetBestOfYearPages_Response.
 * Use `create(CSteamCharts_GetBestOfYearPages_ResponseSchema)` to create a new message.
 */
export const CSteamCharts_GetBestOfYearPages_ResponseSchema: GenMessage<CSteamCharts_GetBestOfYearPages_Response, CSteamCharts_GetBestOfYearPages_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 1);

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage
 */
export type CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage = Message<"CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage"> & {
  /**
   * @generated from field: optional string name = 1;
   */
  name: string;

  /**
   * @generated from field: optional string url_path = 2;
   */
  urlPath: string;

  /**
   * @generated from field: repeated string banner_url = 3;
   */
  bannerUrl: string[];

  /**
   * @generated from field: repeated string banner_url_mobile = 4;
   */
  bannerUrlMobile: string[];

  /**
   * @generated from field: optional uint32 start_date = 5;
   */
  startDate: number;
};

/**
 * @generated from message CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage
 */
export type CSteamCharts_GetBestOfYearPages_Response_BestOfYearPageJson = {
  /**
   * @generated from field: optional string name = 1;
   */
  name?: string;

  /**
   * @generated from field: optional string url_path = 2;
   */
  urlPath?: string;

  /**
   * @generated from field: repeated string banner_url = 3;
   */
  bannerUrl?: string[];

  /**
   * @generated from field: repeated string banner_url_mobile = 4;
   */
  bannerUrlMobile?: string[];

  /**
   * @generated from field: optional uint32 start_date = 5;
   */
  startDate?: number;
};

/**
 * Describes the message CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage.
 * Use `create(CSteamCharts_GetBestOfYearPages_Response_BestOfYearPageSchema)` to create a new message.
 */
export const CSteamCharts_GetBestOfYearPages_Response_BestOfYearPageSchema: GenMessage<CSteamCharts_GetBestOfYearPages_Response_BestOfYearPage, CSteamCharts_GetBestOfYearPages_Response_BestOfYearPageJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 2);

/**
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Request
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_Request = Message<"CSteamCharts_GetGamesByConcurrentPlayers_Request"> & {
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
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Request
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_RequestJson = {
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
 * Describes the message CSteamCharts_GetGamesByConcurrentPlayers_Request.
 * Use `create(CSteamCharts_GetGamesByConcurrentPlayers_RequestSchema)` to create a new message.
 */
export const CSteamCharts_GetGamesByConcurrentPlayers_RequestSchema: GenMessage<CSteamCharts_GetGamesByConcurrentPlayers_Request, CSteamCharts_GetGamesByConcurrentPlayers_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 3);

/**
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Response
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_Response = Message<"CSteamCharts_GetGamesByConcurrentPlayers_Response"> & {
  /**
   * @generated from field: optional uint32 last_update = 1;
   */
  lastUpdate: number;

  /**
   * @generated from field: repeated CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank ranks = 2;
   */
  ranks: CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank[];
};

/**
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Response
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_ResponseJson = {
  /**
   * @generated from field: optional uint32 last_update = 1;
   */
  lastUpdate?: number;

  /**
   * @generated from field: repeated CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank ranks = 2;
   */
  ranks?: CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRankJson[];
};

/**
 * Describes the message CSteamCharts_GetGamesByConcurrentPlayers_Response.
 * Use `create(CSteamCharts_GetGamesByConcurrentPlayers_ResponseSchema)` to create a new message.
 */
export const CSteamCharts_GetGamesByConcurrentPlayers_ResponseSchema: GenMessage<CSteamCharts_GetGamesByConcurrentPlayers_Response, CSteamCharts_GetGamesByConcurrentPlayers_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 4);

/**
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank = Message<"CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank"> & {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItem;

  /**
   * @generated from field: optional uint32 concurrent_in_game = 4;
   */
  concurrentInGame: number;

  /**
   * @generated from field: optional uint32 peak_in_game = 5;
   */
  peakInGame: number;
};

/**
 * @generated from message CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank
 */
export type CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRankJson = {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank?: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid?: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItemJson;

  /**
   * @generated from field: optional uint32 concurrent_in_game = 4;
   */
  concurrentInGame?: number;

  /**
   * @generated from field: optional uint32 peak_in_game = 5;
   */
  peakInGame?: number;
};

/**
 * Describes the message CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank.
 * Use `create(CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRankSchema)` to create a new message.
 */
export const CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRankSchema: GenMessage<CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRank, CSteamCharts_GetGamesByConcurrentPlayers_Response_MostPlayedRankJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 5);

/**
 * @generated from message CSteamCharts_GetMostPlayedGames_Request
 */
export type CSteamCharts_GetMostPlayedGames_Request = Message<"CSteamCharts_GetMostPlayedGames_Request"> & {
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
 * @generated from message CSteamCharts_GetMostPlayedGames_Request
 */
export type CSteamCharts_GetMostPlayedGames_RequestJson = {
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
 * Describes the message CSteamCharts_GetMostPlayedGames_Request.
 * Use `create(CSteamCharts_GetMostPlayedGames_RequestSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedGames_RequestSchema: GenMessage<CSteamCharts_GetMostPlayedGames_Request, CSteamCharts_GetMostPlayedGames_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 6);

/**
 * @generated from message CSteamCharts_GetMostPlayedGames_Response
 */
export type CSteamCharts_GetMostPlayedGames_Response = Message<"CSteamCharts_GetMostPlayedGames_Response"> & {
  /**
   * @generated from field: optional uint32 rollup_date = 1;
   */
  rollupDate: number;

  /**
   * @generated from field: repeated CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank ranks = 2;
   */
  ranks: CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank[];
};

/**
 * @generated from message CSteamCharts_GetMostPlayedGames_Response
 */
export type CSteamCharts_GetMostPlayedGames_ResponseJson = {
  /**
   * @generated from field: optional uint32 rollup_date = 1;
   */
  rollupDate?: number;

  /**
   * @generated from field: repeated CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank ranks = 2;
   */
  ranks?: CSteamCharts_GetMostPlayedGames_Response_MostPlayedRankJson[];
};

/**
 * Describes the message CSteamCharts_GetMostPlayedGames_Response.
 * Use `create(CSteamCharts_GetMostPlayedGames_ResponseSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedGames_ResponseSchema: GenMessage<CSteamCharts_GetMostPlayedGames_Response, CSteamCharts_GetMostPlayedGames_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 7);

/**
 * @generated from message CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank
 */
export type CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank = Message<"CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank"> & {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItem;

  /**
   * @generated from field: optional int32 last_week_rank = 4;
   */
  lastWeekRank: number;

  /**
   * @generated from field: optional uint32 peak_in_game = 5;
   */
  peakInGame: number;

  /**
   * @generated from field: optional uint32 daily_active_players = 6;
   */
  dailyActivePlayers: number;
};

/**
 * @generated from message CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank
 */
export type CSteamCharts_GetMostPlayedGames_Response_MostPlayedRankJson = {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank?: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid?: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItemJson;

  /**
   * @generated from field: optional int32 last_week_rank = 4;
   */
  lastWeekRank?: number;

  /**
   * @generated from field: optional uint32 peak_in_game = 5;
   */
  peakInGame?: number;

  /**
   * @generated from field: optional uint32 daily_active_players = 6;
   */
  dailyActivePlayers?: number;
};

/**
 * Describes the message CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank.
 * Use `create(CSteamCharts_GetMostPlayedGames_Response_MostPlayedRankSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedGames_Response_MostPlayedRankSchema: GenMessage<CSteamCharts_GetMostPlayedGames_Response_MostPlayedRank, CSteamCharts_GetMostPlayedGames_Response_MostPlayedRankJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 8);

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Request
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_Request = Message<"CSteamCharts_GetMostPlayedSteamDeckGames_Request"> & {
  /**
   * @generated from field: optional StoreBrowseContext context = 1;
   */
  context?: StoreBrowseContext;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 2;
   */
  dataRequest?: StoreBrowseItemDataRequest;

  /**
   * @generated from field: optional int32 top_played_period = 3;
   */
  topPlayedPeriod: number;

  /**
   * @generated from field: optional int32 count = 4;
   */
  count: number;
};

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Request
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_RequestJson = {
  /**
   * @generated from field: optional StoreBrowseContext context = 1;
   */
  context?: StoreBrowseContextJson;

  /**
   * @generated from field: optional StoreBrowseItemDataRequest data_request = 2;
   */
  dataRequest?: StoreBrowseItemDataRequestJson;

  /**
   * @generated from field: optional int32 top_played_period = 3;
   */
  topPlayedPeriod?: number;

  /**
   * @generated from field: optional int32 count = 4;
   */
  count?: number;
};

/**
 * Describes the message CSteamCharts_GetMostPlayedSteamDeckGames_Request.
 * Use `create(CSteamCharts_GetMostPlayedSteamDeckGames_RequestSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedSteamDeckGames_RequestSchema: GenMessage<CSteamCharts_GetMostPlayedSteamDeckGames_Request, CSteamCharts_GetMostPlayedSteamDeckGames_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 9);

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Response
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_Response = Message<"CSteamCharts_GetMostPlayedSteamDeckGames_Response"> & {
  /**
   * @generated from field: repeated CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank ranks = 1;
   */
  ranks: CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank[];

  /**
   * @generated from field: optional int32 top_played_period = 2;
   */
  topPlayedPeriod: number;
};

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Response
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_ResponseJson = {
  /**
   * @generated from field: repeated CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank ranks = 1;
   */
  ranks?: CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRankJson[];

  /**
   * @generated from field: optional int32 top_played_period = 2;
   */
  topPlayedPeriod?: number;
};

/**
 * Describes the message CSteamCharts_GetMostPlayedSteamDeckGames_Response.
 * Use `create(CSteamCharts_GetMostPlayedSteamDeckGames_ResponseSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedSteamDeckGames_ResponseSchema: GenMessage<CSteamCharts_GetMostPlayedSteamDeckGames_Response, CSteamCharts_GetMostPlayedSteamDeckGames_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 10);

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank = Message<"CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank"> & {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItem;

  /**
   * @generated from field: optional int32 last_period_rank = 4;
   */
  lastPeriodRank: number;
};

/**
 * @generated from message CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank
 */
export type CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRankJson = {
  /**
   * @generated from field: optional int32 rank = 1;
   */
  rank?: number;

  /**
   * @generated from field: optional uint32 appid = 2;
   */
  appid?: number;

  /**
   * @generated from field: optional StoreItem item = 3;
   */
  item?: StoreItemJson;

  /**
   * @generated from field: optional int32 last_period_rank = 4;
   */
  lastPeriodRank?: number;
};

/**
 * Describes the message CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank.
 * Use `create(CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRankSchema)` to create a new message.
 */
export const CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRankSchema: GenMessage<CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRank, CSteamCharts_GetMostPlayedSteamDeckGames_Response_MostPlayedRankJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 11);

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Request
 */
export type CSteamCharts_GetTopReleasesPages_Request = Message<"CSteamCharts_GetTopReleasesPages_Request"> & {
};

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Request
 */
export type CSteamCharts_GetTopReleasesPages_RequestJson = {
};

/**
 * Describes the message CSteamCharts_GetTopReleasesPages_Request.
 * Use `create(CSteamCharts_GetTopReleasesPages_RequestSchema)` to create a new message.
 */
export const CSteamCharts_GetTopReleasesPages_RequestSchema: GenMessage<CSteamCharts_GetTopReleasesPages_Request, CSteamCharts_GetTopReleasesPages_RequestJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 12);

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Response
 */
export type CSteamCharts_GetTopReleasesPages_Response = Message<"CSteamCharts_GetTopReleasesPages_Response"> & {
  /**
   * @generated from field: repeated CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage pages = 1;
   */
  pages: CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage[];
};

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Response
 */
export type CSteamCharts_GetTopReleasesPages_ResponseJson = {
  /**
   * @generated from field: repeated CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage pages = 1;
   */
  pages?: CSteamCharts_GetTopReleasesPages_Response_TopReleasesPageJson[];
};

/**
 * Describes the message CSteamCharts_GetTopReleasesPages_Response.
 * Use `create(CSteamCharts_GetTopReleasesPages_ResponseSchema)` to create a new message.
 */
export const CSteamCharts_GetTopReleasesPages_ResponseSchema: GenMessage<CSteamCharts_GetTopReleasesPages_Response, CSteamCharts_GetTopReleasesPages_ResponseJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 13);

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage
 */
export type CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage = Message<"CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage"> & {
  /**
   * @generated from field: optional string name = 1;
   */
  name: string;

  /**
   * @generated from field: optional uint32 start_of_month = 2;
   */
  startOfMonth: number;

  /**
   * @generated from field: optional string url_path = 3;
   */
  urlPath: string;

  /**
   * @generated from field: repeated StoreItemID item_ids = 4;
   */
  itemIds: StoreItemID[];
};

/**
 * @generated from message CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage
 */
export type CSteamCharts_GetTopReleasesPages_Response_TopReleasesPageJson = {
  /**
   * @generated from field: optional string name = 1;
   */
  name?: string;

  /**
   * @generated from field: optional uint32 start_of_month = 2;
   */
  startOfMonth?: number;

  /**
   * @generated from field: optional string url_path = 3;
   */
  urlPath?: string;

  /**
   * @generated from field: repeated StoreItemID item_ids = 4;
   */
  itemIds?: StoreItemIDJson[];
};

/**
 * Describes the message CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage.
 * Use `create(CSteamCharts_GetTopReleasesPages_Response_TopReleasesPageSchema)` to create a new message.
 */
export const CSteamCharts_GetTopReleasesPages_Response_TopReleasesPageSchema: GenMessage<CSteamCharts_GetTopReleasesPages_Response_TopReleasesPage, CSteamCharts_GetTopReleasesPages_Response_TopReleasesPageJson> = /*@__PURE__*/
  messageDesc(file_web_ui_service_steamcharts, 14);

/**
 * @generated from service SteamCharts
 */
export const SteamCharts: GenService<{
  /**
   * @generated from rpc SteamCharts.GetBestOfYearPages
   */
  getBestOfYearPages: {
    methodKind: "unary";
    input: typeof CSteamCharts_GetBestOfYearPages_RequestSchema;
    output: typeof CSteamCharts_GetBestOfYearPages_ResponseSchema;
  },
  /**
   * @generated from rpc SteamCharts.GetGamesByConcurrentPlayers
   */
  getGamesByConcurrentPlayers: {
    methodKind: "unary";
    input: typeof CSteamCharts_GetGamesByConcurrentPlayers_RequestSchema;
    output: typeof CSteamCharts_GetGamesByConcurrentPlayers_ResponseSchema;
  },
  /**
   * @generated from rpc SteamCharts.GetMostPlayedGames
   */
  getMostPlayedGames: {
    methodKind: "unary";
    input: typeof CSteamCharts_GetMostPlayedGames_RequestSchema;
    output: typeof CSteamCharts_GetMostPlayedGames_ResponseSchema;
  },
  /**
   * @generated from rpc SteamCharts.GetMostPlayedSteamDeckGames
   */
  getMostPlayedSteamDeckGames: {
    methodKind: "unary";
    input: typeof CSteamCharts_GetMostPlayedSteamDeckGames_RequestSchema;
    output: typeof CSteamCharts_GetMostPlayedSteamDeckGames_ResponseSchema;
  },
  /**
   * @generated from rpc SteamCharts.GetTopReleasesPages
   */
  getTopReleasesPages: {
    methodKind: "unary";
    input: typeof CSteamCharts_GetTopReleasesPages_RequestSchema;
    output: typeof CSteamCharts_GetTopReleasesPages_ResponseSchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_web_ui_service_steamcharts, 0);

