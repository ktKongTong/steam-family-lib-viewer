
import {
CAccountPrivateApps_GetPrivateAppList_Request, CAccountPrivateApps_GetPrivateAppList_Response,
CAccountPrivateApps_ToggleAppPrivacy_Request, CAccountPrivateApps_ToggleAppPrivacy_Response,
CAuthentication_AccessToken_GenerateForApp_Request, CAuthentication_AccessToken_GenerateForApp_Response,
CAuthentication_BeginAuthSessionViaCredentials_Request, CAuthentication_BeginAuthSessionViaCredentials_Response,
CAuthentication_BeginAuthSessionViaQR_Request, CAuthentication_BeginAuthSessionViaQR_Response,
CAuthentication_GetAuthSessionInfo_Request, CAuthentication_GetAuthSessionInfo_Response,
CAuthentication_GetAuthSessionsForAccount_Request, CAuthentication_GetAuthSessionsForAccount_Response,
CAuthentication_GetPasswordRSAPublicKey_Request, CAuthentication_GetPasswordRSAPublicKey_Response,
CAuthentication_MigrateMobileSession_Request, CAuthentication_MigrateMobileSession_Response,
CAuthentication_PollAuthSessionStatus_Request, CAuthentication_PollAuthSessionStatus_Response,
CAuthentication_RefreshToken_Enumerate_Request, CAuthentication_RefreshToken_Enumerate_Response,
CAuthentication_RefreshToken_Revoke_Request, CAuthentication_RefreshToken_Revoke_Response,
CAuthentication_Token_Revoke_Request, CAuthentication_Token_Revoke_Response,
CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request, CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response,
CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request, CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response,
CClientComm_EnableOrDisableDownloads_Request, CClientComm_EnableOrDisableDownloads_Response,
CClientComm_GetAllClientLogonInfo_Request, CClientComm_GetAllClientLogonInfo_Response,
CClientComm_GetClientAppList_Request, CClientComm_GetClientAppList_Response,
CClientComm_GetClientInfo_Request, CClientComm_GetClientInfo_Response,
CClientComm_GetClientLogonInfo_Request, CClientComm_GetClientLogonInfo_Response,
CClientComm_InstallClientApp_Request, CClientComm_InstallClientApp_Response,
CClientComm_LaunchClientApp_Request, CClientComm_LaunchClientApp_Response,
CClientComm_SetClientAppUpdateState_Request, CClientComm_SetClientAppUpdateState_Response,
CClientComm_UninstallClientApp_Request, CClientComm_UninstallClientApp_Response,
CFamilyGroups_CancelFamilyGroupInvite_Request, CFamilyGroups_CancelFamilyGroupInvite_Response,
CFamilyGroups_ClearCooldownSkip_Request, CFamilyGroups_ClearCooldownSkip_Response,
CFamilyGroups_ConfirmInviteToFamilyGroup_Request, CFamilyGroups_ConfirmInviteToFamilyGroup_Response,
CFamilyGroups_ConfirmJoinFamilyGroup_Request, CFamilyGroups_ConfirmJoinFamilyGroup_Response,
CFamilyGroups_CreateFamilyGroup_Request, CFamilyGroups_CreateFamilyGroup_Response,
CFamilyGroups_DeleteFamilyGroup_Request, CFamilyGroups_DeleteFamilyGroup_Response,
CFamilyGroups_ForceAcceptInvite_Request, CFamilyGroups_ForceAcceptInvite_Response,
CFamilyGroups_GetChangeLog_Request, CFamilyGroups_GetChangeLog_Response,
CFamilyGroups_GetFamilyGroup_Request, CFamilyGroups_GetFamilyGroup_Response,
CFamilyGroups_GetFamilyGroupForUser_Request, CFamilyGroups_GetFamilyGroupForUser_Response,
CFamilyGroups_GetInviteCheckResults_Request, CFamilyGroups_GetInviteCheckResults_Response,
CFamilyGroups_GetPlaytimeSummary_Request, CFamilyGroups_GetPlaytimeSummary_Response,
CFamilyGroups_GetPreferredLenders_Request, CFamilyGroups_GetPreferredLenders_Response,
CFamilyGroups_GetPurchaseRequests_Request, CFamilyGroups_GetPurchaseRequests_Response,
CFamilyGroups_GetSharedLibraryApps_Request, CFamilyGroups_GetSharedLibraryApps_Response,
CFamilyGroups_GetUsersSharingDevice_Request, CFamilyGroups_GetUsersSharingDevice_Response,
CFamilyGroups_InviteToFamilyGroup_Request, CFamilyGroups_InviteToFamilyGroup_Response,
CFamilyGroups_JoinFamilyGroup_Request, CFamilyGroups_JoinFamilyGroup_Response,
CFamilyGroups_ModifyFamilyGroupDetails_Request, CFamilyGroups_ModifyFamilyGroupDetails_Response,
CFamilyGroups_RemoveFromFamilyGroup_Request, CFamilyGroups_RemoveFromFamilyGroup_Response,
CFamilyGroups_RequestPurchase_Request, CFamilyGroups_RequestPurchase_Response,
CFamilyGroups_ResendInvitationToFamilyGroup_Request, CFamilyGroups_ResendInvitationToFamilyGroup_Response,
CFamilyGroups_RespondToRequestedPurchase_Request, CFamilyGroups_RespondToRequestedPurchase_Response,
CFamilyGroups_SetFamilyCooldownOverrides_Request, CFamilyGroups_SetFamilyCooldownOverrides_Response,
CFamilyGroups_SetPreferredLender_Request, CFamilyGroups_SetPreferredLender_Response,
CFamilyGroups_UndeleteFamilyGroup_Request, CFamilyGroups_UndeleteFamilyGroup_Response,
CPlayer_AcceptSSA_Request, CPlayer_AcceptSSA_Response,
CPlayer_AddFriend_Request, CPlayer_AddFriend_Response,
CPlayer_DeletePostedStatus_Request, CPlayer_DeletePostedStatus_Response,
CPlayer_GetAchievementsProgress_Request, CPlayer_GetAchievementsProgress_Response,
CPlayer_GetAnimatedAvatar_Request, CPlayer_GetAnimatedAvatar_Response,
CPlayer_GetAvatarFrame_Request, CPlayer_GetAvatarFrame_Response,
CPlayer_GetCommunityBadgeProgress_Request, CPlayer_GetCommunityBadgeProgress_Response,
CPlayer_GetCommunityPreferences_Request, CPlayer_GetCommunityPreferences_Response,
CPlayer_GetDurationControl_Request, CPlayer_GetDurationControl_Response,
CPlayer_GetEmoticonList_Request, CPlayer_GetEmoticonList_Response,
CPlayer_GetFavoriteBadge_Request, CPlayer_GetFavoriteBadge_Response,
CPlayer_GetFriendsAppsActivity_Request, CPlayer_GetFriendsAppsActivity_Response,
CPlayer_GetFriendsGameplayInfo_Request, CPlayer_GetFriendsGameplayInfo_Response,
CPlayer_GetGameAchievements_Request, CPlayer_GetGameAchievements_Response,
CPlayer_GetGameBadgeLevels_Request, CPlayer_GetGameBadgeLevels_Response,
CPlayer_GetLastPlayedTimes_Request, CPlayer_GetLastPlayedTimes_Response,
CPlayer_GetMiniProfileBackground_Request, CPlayer_GetMiniProfileBackground_Response,
CPlayer_GetMutualFriendsForIncomingInvites_Request, CPlayer_GetMutualFriendsForIncomingInvites_Response,
CPlayer_GetNewSteamAnnouncementState_Request, CPlayer_GetNewSteamAnnouncementState_Response,
CPlayer_GetNicknameList_Request, CPlayer_GetNicknameList_Response,
CPlayer_GetOwnedGames_Request, CPlayer_GetOwnedGames_Response,
CPlayer_GetPerFriendPreferences_Request, CPlayer_GetPerFriendPreferences_Response,
CPlayer_GetPlayerLinkDetails_Request, CPlayer_GetPlayerLinkDetails_Response,
CPlayer_GetPlayNext_Request, CPlayer_GetPlayNext_Response,
CPlayer_GetPostedStatus_Request, CPlayer_GetPostedStatus_Response,
CPlayer_GetPrivacySettings_Request, CPlayer_GetPrivacySettings_Response,
CPlayer_GetProfileBackground_Request, CPlayer_GetProfileBackground_Response,
CPlayer_GetProfileCustomization_Request, CPlayer_GetProfileCustomization_Response,
CPlayer_GetProfileItemsEquipped_Request, CPlayer_GetProfileItemsEquipped_Response,
CPlayer_GetProfileItemsOwned_Request, CPlayer_GetProfileItemsOwned_Response,
CPlayer_GetProfileThemesAvailable_Request, CPlayer_GetProfileThemesAvailable_Response,
CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Request, CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Response,
CPlayer_GetPurchasedProfileCustomizations_Request, CPlayer_GetPurchasedProfileCustomizations_Response,
CPlayer_GetRecentPlaytimeSessionsForChild_Request, CPlayer_GetRecentPlaytimeSessionsForChild_Response,
CPlayer_GetSteamDeckKeyboardSkin_Request, CPlayer_GetSteamDeckKeyboardSkin_Response,
CPlayer_GetTextFilterWords_Request, CPlayer_GetTextFilterWords_Response,
CPlayer_GetTimeSSAAccepted_Request, CPlayer_GetTimeSSAAccepted_Response,
CPlayer_GetTopAchievementsForGames_Request, CPlayer_GetTopAchievementsForGames_Response,
CPlayer_IgnoreFriend_Request, CPlayer_IgnoreFriend_Response,
CPlayer_PostStatusToFriends_Request, CPlayer_PostStatusToFriends_Response,
CPlayer_RecordDisconnectedPlaytime_Request, CPlayer_RecordDisconnectedPlaytime_Response,
CPlayer_RemoveFriend_Request, CPlayer_RemoveFriend_Response,
CPlayer_SetAnimatedAvatar_Request, CPlayer_SetAnimatedAvatar_Response,
CPlayer_SetAvatarFrame_Request, CPlayer_SetAvatarFrame_Response,
CPlayer_SetCommunityPreferences_Request, CPlayer_SetCommunityPreferences_Response,
CPlayer_SetEquippedProfileItemFlags_Request, CPlayer_SetEquippedProfileItemFlags_Response,
CPlayer_SetFavoriteBadge_Request, CPlayer_SetFavoriteBadge_Response,
CPlayer_SetMiniProfileBackground_Request, CPlayer_SetMiniProfileBackground_Response,
CPlayer_SetPerFriendPreferences_Request, CPlayer_SetPerFriendPreferences_Response,
CPlayer_SetProfileBackground_Request, CPlayer_SetProfileBackground_Response,
CPlayer_SetProfilePreferences_Request, CPlayer_SetProfilePreferences_Response,
CPlayer_SetProfileTheme_Request, CPlayer_SetProfileTheme_Response,
CPlayer_SetSteamDeckKeyboardSkin_Request, CPlayer_SetSteamDeckKeyboardSkin_Response,
CPlayer_UpdateSteamAnnouncementLastRead_Request, CPlayer_UpdateSteamAnnouncementLastRead_Response,
CSteamDeckCompatibility_SetFeedback_Request, CSteamDeckCompatibility_SetFeedback_Response,
CSteamDeckCompatibility_ShouldPrompt_Request, CSteamDeckCompatibility_ShouldPrompt_Response,
CStore_DeleteReservationPositionMessage_Request, CStore_DeleteReservationPositionMessage_Response,
CStore_GetAllReservationPositionMessages_Request, CStore_GetAllReservationPositionMessages_Response,
CStore_GetDiscoveryQueue_Request, CStore_GetDiscoveryQueue_Response,
CStore_GetDiscoveryQueueSettings_Request, CStore_GetDiscoveryQueueSettings_Response,
CStore_GetDiscoveryQueueSkippedApps_Request, CStore_GetDiscoveryQueueSkippedApps_Response,
CStore_GetLocalizedNameForTags_Request, CStore_GetLocalizedNameForTags_Response,
CStore_GetMostPopularTags_Request, CStore_GetMostPopularTags_Response,
CStore_GetStorePreferences_Request, CStore_GetStorePreferences_Response,
CStore_GetTagList_Request, CStore_GetTagList_Response,
CStore_GetTrendingAppsAmongFriends_Request, CStore_GetTrendingAppsAmongFriends_Response,
CStore_GetUserGameInterestState_Request, CStore_GetUserGameInterestState_Response,
CStore_RegisterCDKey_Request, CStore_RegisterCDKey_Response,
CStore_ReportApp_Request, CStore_ReportApp_Response,
CStore_SetReservationPositionMessage_Request, CStore_SetReservationPositionMessage_Response,
CStore_SkipDiscoveryQueueItem_Request, CStore_SkipDiscoveryQueueItem_Response,
CStore_UpdatePackageReservations_Request, CStore_UpdatePackageReservations_Response,
CStoreBrowse_GetDLCForApps_Request, CStoreBrowse_GetDLCForApps_Response,
CStoreBrowse_GetDLCForAppsSolr_Request, CStoreBrowse_GetDLCForAppsSolr_Response,
CStoreBrowse_GetHardwareItems_Request, CStoreBrowse_GetHardwareItems_Response,
CStoreBrowse_GetStoreCategories_Request, CStoreBrowse_GetStoreCategories_Response,
CStoreBrowse_GetItems_Request, CStoreBrowse_GetItems_Response
}  from "../../../proto";

import {
  AllRTypeDict,
  ServiceMethodDict,
  SteamAPITypeName,
  SteamAPIRequestTypeName,
  SteamAPIResponseTypeName
} from "../type";

 
type InferSteamStdReqOrRespAccountPrivateAppsType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'AccountPrivateApps' = 'AccountPrivateApps'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPrivateAppList'> ? CAccountPrivateApps_GetPrivateAppList_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPrivateAppList'> ? CAccountPrivateApps_GetPrivateAppList_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ToggleAppPrivacy'> ? CAccountPrivateApps_ToggleAppPrivacy_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ToggleAppPrivacy'> ? CAccountPrivateApps_ToggleAppPrivacy_Response
: never


type InferSteamStdReqOrRespAuthenticationType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'Authentication' = 'Authentication'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'AccessToken_GenerateForApp'> ? CAuthentication_AccessToken_GenerateForApp_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'AccessToken_GenerateForApp'> ? CAuthentication_AccessToken_GenerateForApp_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'BeginAuthSessionViaCredentials'> ? CAuthentication_BeginAuthSessionViaCredentials_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'BeginAuthSessionViaCredentials'> ? CAuthentication_BeginAuthSessionViaCredentials_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'BeginAuthSessionViaQR'> ? CAuthentication_BeginAuthSessionViaQR_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'BeginAuthSessionViaQR'> ? CAuthentication_BeginAuthSessionViaQR_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAuthSessionInfo'> ? CAuthentication_GetAuthSessionInfo_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAuthSessionInfo'> ? CAuthentication_GetAuthSessionInfo_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAuthSessionsForAccount'> ? CAuthentication_GetAuthSessionsForAccount_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAuthSessionsForAccount'> ? CAuthentication_GetAuthSessionsForAccount_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPasswordRSAPublicKey'> ? CAuthentication_GetPasswordRSAPublicKey_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPasswordRSAPublicKey'> ? CAuthentication_GetPasswordRSAPublicKey_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'MigrateMobileSession'> ? CAuthentication_MigrateMobileSession_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'MigrateMobileSession'> ? CAuthentication_MigrateMobileSession_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'PollAuthSessionStatus'> ? CAuthentication_PollAuthSessionStatus_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'PollAuthSessionStatus'> ? CAuthentication_PollAuthSessionStatus_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RefreshToken_Enumerate'> ? CAuthentication_RefreshToken_Enumerate_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RefreshToken_Enumerate'> ? CAuthentication_RefreshToken_Enumerate_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RefreshToken_Revoke'> ? CAuthentication_RefreshToken_Revoke_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RefreshToken_Revoke'> ? CAuthentication_RefreshToken_Revoke_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'Token_Revoke'> ? CAuthentication_Token_Revoke_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'Token_Revoke'> ? CAuthentication_Token_Revoke_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UpdateAuthSessionWithMobileConfirmation'> ? CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UpdateAuthSessionWithMobileConfirmation'> ? CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UpdateAuthSessionWithSteamGuardCode'> ? CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UpdateAuthSessionWithSteamGuardCode'> ? CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
: never


type InferSteamStdReqOrRespClientCommType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'ClientComm' = 'ClientComm'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'EnableOrDisableDownloads'> ? CClientComm_EnableOrDisableDownloads_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'EnableOrDisableDownloads'> ? CClientComm_EnableOrDisableDownloads_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAllClientLogonInfo'> ? CClientComm_GetAllClientLogonInfo_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAllClientLogonInfo'> ? CClientComm_GetAllClientLogonInfo_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetClientAppList'> ? CClientComm_GetClientAppList_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetClientAppList'> ? CClientComm_GetClientAppList_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetClientInfo'> ? CClientComm_GetClientInfo_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetClientInfo'> ? CClientComm_GetClientInfo_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetClientLogonInfo'> ? CClientComm_GetClientLogonInfo_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetClientLogonInfo'> ? CClientComm_GetClientLogonInfo_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'InstallClientApp'> ? CClientComm_InstallClientApp_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'InstallClientApp'> ? CClientComm_InstallClientApp_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'LaunchClientApp'> ? CClientComm_LaunchClientApp_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'LaunchClientApp'> ? CClientComm_LaunchClientApp_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetClientAppUpdateState'> ? CClientComm_SetClientAppUpdateState_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetClientAppUpdateState'> ? CClientComm_SetClientAppUpdateState_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UninstallClientApp'> ? CClientComm_UninstallClientApp_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UninstallClientApp'> ? CClientComm_UninstallClientApp_Response
: never


type InferSteamStdReqOrRespFamilyGroupsType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'FamilyGroups' = 'FamilyGroups'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'CancelFamilyGroupInvite'> ? CFamilyGroups_CancelFamilyGroupInvite_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'CancelFamilyGroupInvite'> ? CFamilyGroups_CancelFamilyGroupInvite_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ClearCooldownSkip'> ? CFamilyGroups_ClearCooldownSkip_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ClearCooldownSkip'> ? CFamilyGroups_ClearCooldownSkip_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ConfirmInviteToFamilyGroup'> ? CFamilyGroups_ConfirmInviteToFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ConfirmInviteToFamilyGroup'> ? CFamilyGroups_ConfirmInviteToFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ConfirmJoinFamilyGroup'> ? CFamilyGroups_ConfirmJoinFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ConfirmJoinFamilyGroup'> ? CFamilyGroups_ConfirmJoinFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'CreateFamilyGroup'> ? CFamilyGroups_CreateFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'CreateFamilyGroup'> ? CFamilyGroups_CreateFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'DeleteFamilyGroup'> ? CFamilyGroups_DeleteFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'DeleteFamilyGroup'> ? CFamilyGroups_DeleteFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ForceAcceptInvite'> ? CFamilyGroups_ForceAcceptInvite_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ForceAcceptInvite'> ? CFamilyGroups_ForceAcceptInvite_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetChangeLog'> ? CFamilyGroups_GetChangeLog_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetChangeLog'> ? CFamilyGroups_GetChangeLog_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetFamilyGroup'> ? CFamilyGroups_GetFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetFamilyGroup'> ? CFamilyGroups_GetFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetFamilyGroupForUser'> ? CFamilyGroups_GetFamilyGroupForUser_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetFamilyGroupForUser'> ? CFamilyGroups_GetFamilyGroupForUser_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetInviteCheckResults'> ? CFamilyGroups_GetInviteCheckResults_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetInviteCheckResults'> ? CFamilyGroups_GetInviteCheckResults_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPlaytimeSummary'> ? CFamilyGroups_GetPlaytimeSummary_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPlaytimeSummary'> ? CFamilyGroups_GetPlaytimeSummary_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPreferredLenders'> ? CFamilyGroups_GetPreferredLenders_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPreferredLenders'> ? CFamilyGroups_GetPreferredLenders_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPurchaseRequests'> ? CFamilyGroups_GetPurchaseRequests_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPurchaseRequests'> ? CFamilyGroups_GetPurchaseRequests_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetSharedLibraryApps'> ? CFamilyGroups_GetSharedLibraryApps_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetSharedLibraryApps'> ? CFamilyGroups_GetSharedLibraryApps_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetUsersSharingDevice'> ? CFamilyGroups_GetUsersSharingDevice_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetUsersSharingDevice'> ? CFamilyGroups_GetUsersSharingDevice_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'InviteToFamilyGroup'> ? CFamilyGroups_InviteToFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'InviteToFamilyGroup'> ? CFamilyGroups_InviteToFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'JoinFamilyGroup'> ? CFamilyGroups_JoinFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'JoinFamilyGroup'> ? CFamilyGroups_JoinFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ModifyFamilyGroupDetails'> ? CFamilyGroups_ModifyFamilyGroupDetails_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ModifyFamilyGroupDetails'> ? CFamilyGroups_ModifyFamilyGroupDetails_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RemoveFromFamilyGroup'> ? CFamilyGroups_RemoveFromFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RemoveFromFamilyGroup'> ? CFamilyGroups_RemoveFromFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RequestPurchase'> ? CFamilyGroups_RequestPurchase_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RequestPurchase'> ? CFamilyGroups_RequestPurchase_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ResendInvitationToFamilyGroup'> ? CFamilyGroups_ResendInvitationToFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ResendInvitationToFamilyGroup'> ? CFamilyGroups_ResendInvitationToFamilyGroup_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RespondToRequestedPurchase'> ? CFamilyGroups_RespondToRequestedPurchase_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RespondToRequestedPurchase'> ? CFamilyGroups_RespondToRequestedPurchase_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetFamilyCooldownOverrides'> ? CFamilyGroups_SetFamilyCooldownOverrides_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetFamilyCooldownOverrides'> ? CFamilyGroups_SetFamilyCooldownOverrides_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetPreferredLender'> ? CFamilyGroups_SetPreferredLender_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetPreferredLender'> ? CFamilyGroups_SetPreferredLender_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UndeleteFamilyGroup'> ? CFamilyGroups_UndeleteFamilyGroup_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UndeleteFamilyGroup'> ? CFamilyGroups_UndeleteFamilyGroup_Response
: never


type InferSteamStdReqOrRespPlayerType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'Player' = 'Player'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'AcceptSSA'> ? CPlayer_AcceptSSA_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'AcceptSSA'> ? CPlayer_AcceptSSA_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'AddFriend'> ? CPlayer_AddFriend_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'AddFriend'> ? CPlayer_AddFriend_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'DeletePostedStatus'> ? CPlayer_DeletePostedStatus_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'DeletePostedStatus'> ? CPlayer_DeletePostedStatus_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAchievementsProgress'> ? CPlayer_GetAchievementsProgress_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAchievementsProgress'> ? CPlayer_GetAchievementsProgress_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAnimatedAvatar'> ? CPlayer_GetAnimatedAvatar_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAnimatedAvatar'> ? CPlayer_GetAnimatedAvatar_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAvatarFrame'> ? CPlayer_GetAvatarFrame_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAvatarFrame'> ? CPlayer_GetAvatarFrame_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetCommunityBadgeProgress'> ? CPlayer_GetCommunityBadgeProgress_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetCommunityBadgeProgress'> ? CPlayer_GetCommunityBadgeProgress_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetCommunityPreferences'> ? CPlayer_GetCommunityPreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetCommunityPreferences'> ? CPlayer_GetCommunityPreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDurationControl'> ? CPlayer_GetDurationControl_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDurationControl'> ? CPlayer_GetDurationControl_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetEmoticonList'> ? CPlayer_GetEmoticonList_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetEmoticonList'> ? CPlayer_GetEmoticonList_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetFavoriteBadge'> ? CPlayer_GetFavoriteBadge_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetFavoriteBadge'> ? CPlayer_GetFavoriteBadge_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetFriendsAppsActivity'> ? CPlayer_GetFriendsAppsActivity_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetFriendsAppsActivity'> ? CPlayer_GetFriendsAppsActivity_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetFriendsGameplayInfo'> ? CPlayer_GetFriendsGameplayInfo_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetFriendsGameplayInfo'> ? CPlayer_GetFriendsGameplayInfo_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetGameAchievements'> ? CPlayer_GetGameAchievements_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetGameAchievements'> ? CPlayer_GetGameAchievements_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetGameBadgeLevels'> ? CPlayer_GetGameBadgeLevels_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetGameBadgeLevels'> ? CPlayer_GetGameBadgeLevels_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetLastPlayedTimes'> ? CPlayer_GetLastPlayedTimes_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetLastPlayedTimes'> ? CPlayer_GetLastPlayedTimes_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetMiniProfileBackground'> ? CPlayer_GetMiniProfileBackground_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetMiniProfileBackground'> ? CPlayer_GetMiniProfileBackground_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetMutualFriendsForIncomingInvites'> ? CPlayer_GetMutualFriendsForIncomingInvites_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetMutualFriendsForIncomingInvites'> ? CPlayer_GetMutualFriendsForIncomingInvites_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetNewSteamAnnouncementState'> ? CPlayer_GetNewSteamAnnouncementState_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetNewSteamAnnouncementState'> ? CPlayer_GetNewSteamAnnouncementState_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetNicknameList'> ? CPlayer_GetNicknameList_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetNicknameList'> ? CPlayer_GetNicknameList_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetOwnedGames'> ? CPlayer_GetOwnedGames_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetOwnedGames'> ? CPlayer_GetOwnedGames_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPerFriendPreferences'> ? CPlayer_GetPerFriendPreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPerFriendPreferences'> ? CPlayer_GetPerFriendPreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPlayerLinkDetails'> ? CPlayer_GetPlayerLinkDetails_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPlayerLinkDetails'> ? CPlayer_GetPlayerLinkDetails_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPlayNext'> ? CPlayer_GetPlayNext_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPlayNext'> ? CPlayer_GetPlayNext_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPostedStatus'> ? CPlayer_GetPostedStatus_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPostedStatus'> ? CPlayer_GetPostedStatus_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPrivacySettings'> ? CPlayer_GetPrivacySettings_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPrivacySettings'> ? CPlayer_GetPrivacySettings_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetProfileBackground'> ? CPlayer_GetProfileBackground_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetProfileBackground'> ? CPlayer_GetProfileBackground_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetProfileCustomization'> ? CPlayer_GetProfileCustomization_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetProfileCustomization'> ? CPlayer_GetProfileCustomization_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetProfileItemsEquipped'> ? CPlayer_GetProfileItemsEquipped_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetProfileItemsEquipped'> ? CPlayer_GetProfileItemsEquipped_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetProfileItemsOwned'> ? CPlayer_GetProfileItemsOwned_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetProfileItemsOwned'> ? CPlayer_GetProfileItemsOwned_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetProfileThemesAvailable'> ? CPlayer_GetProfileThemesAvailable_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetProfileThemesAvailable'> ? CPlayer_GetProfileThemesAvailable_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPurchasedAndUpgradedProfileCustomizations'> ? CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPurchasedAndUpgradedProfileCustomizations'> ? CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetPurchasedProfileCustomizations'> ? CPlayer_GetPurchasedProfileCustomizations_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetPurchasedProfileCustomizations'> ? CPlayer_GetPurchasedProfileCustomizations_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetRecentPlaytimeSessionsForChild'> ? CPlayer_GetRecentPlaytimeSessionsForChild_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetRecentPlaytimeSessionsForChild'> ? CPlayer_GetRecentPlaytimeSessionsForChild_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetSteamDeckKeyboardSkin'> ? CPlayer_GetSteamDeckKeyboardSkin_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetSteamDeckKeyboardSkin'> ? CPlayer_GetSteamDeckKeyboardSkin_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetTextFilterWords'> ? CPlayer_GetTextFilterWords_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetTextFilterWords'> ? CPlayer_GetTextFilterWords_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetTimeSSAAccepted'> ? CPlayer_GetTimeSSAAccepted_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetTimeSSAAccepted'> ? CPlayer_GetTimeSSAAccepted_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetTopAchievementsForGames'> ? CPlayer_GetTopAchievementsForGames_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetTopAchievementsForGames'> ? CPlayer_GetTopAchievementsForGames_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'IgnoreFriend'> ? CPlayer_IgnoreFriend_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'IgnoreFriend'> ? CPlayer_IgnoreFriend_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'PostStatusToFriends'> ? CPlayer_PostStatusToFriends_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'PostStatusToFriends'> ? CPlayer_PostStatusToFriends_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RecordDisconnectedPlaytime'> ? CPlayer_RecordDisconnectedPlaytime_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RecordDisconnectedPlaytime'> ? CPlayer_RecordDisconnectedPlaytime_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RemoveFriend'> ? CPlayer_RemoveFriend_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RemoveFriend'> ? CPlayer_RemoveFriend_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetAnimatedAvatar'> ? CPlayer_SetAnimatedAvatar_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetAnimatedAvatar'> ? CPlayer_SetAnimatedAvatar_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetAvatarFrame'> ? CPlayer_SetAvatarFrame_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetAvatarFrame'> ? CPlayer_SetAvatarFrame_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetCommunityPreferences'> ? CPlayer_SetCommunityPreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetCommunityPreferences'> ? CPlayer_SetCommunityPreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetEquippedProfileItemFlags'> ? CPlayer_SetEquippedProfileItemFlags_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetEquippedProfileItemFlags'> ? CPlayer_SetEquippedProfileItemFlags_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetFavoriteBadge'> ? CPlayer_SetFavoriteBadge_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetFavoriteBadge'> ? CPlayer_SetFavoriteBadge_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetMiniProfileBackground'> ? CPlayer_SetMiniProfileBackground_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetMiniProfileBackground'> ? CPlayer_SetMiniProfileBackground_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetPerFriendPreferences'> ? CPlayer_SetPerFriendPreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetPerFriendPreferences'> ? CPlayer_SetPerFriendPreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetProfileBackground'> ? CPlayer_SetProfileBackground_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetProfileBackground'> ? CPlayer_SetProfileBackground_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetProfilePreferences'> ? CPlayer_SetProfilePreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetProfilePreferences'> ? CPlayer_SetProfilePreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetProfileTheme'> ? CPlayer_SetProfileTheme_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetProfileTheme'> ? CPlayer_SetProfileTheme_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetSteamDeckKeyboardSkin'> ? CPlayer_SetSteamDeckKeyboardSkin_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetSteamDeckKeyboardSkin'> ? CPlayer_SetSteamDeckKeyboardSkin_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UpdateSteamAnnouncementLastRead'> ? CPlayer_UpdateSteamAnnouncementLastRead_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UpdateSteamAnnouncementLastRead'> ? CPlayer_UpdateSteamAnnouncementLastRead_Response
: never


type InferSteamStdReqOrRespSteamDeckCompatibilityType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'SteamDeckCompatibility' = 'SteamDeckCompatibility'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetFeedback'> ? CSteamDeckCompatibility_SetFeedback_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetFeedback'> ? CSteamDeckCompatibility_SetFeedback_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ShouldPrompt'> ? CSteamDeckCompatibility_ShouldPrompt_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ShouldPrompt'> ? CSteamDeckCompatibility_ShouldPrompt_Response
: never


type InferSteamStdReqOrRespStoreType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'Store' = 'Store'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'DeleteReservationPositionMessage'> ? CStore_DeleteReservationPositionMessage_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'DeleteReservationPositionMessage'> ? CStore_DeleteReservationPositionMessage_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetAllReservationPositionMessages'> ? CStore_GetAllReservationPositionMessages_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetAllReservationPositionMessages'> ? CStore_GetAllReservationPositionMessages_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDiscoveryQueue'> ? CStore_GetDiscoveryQueue_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDiscoveryQueue'> ? CStore_GetDiscoveryQueue_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDiscoveryQueueSettings'> ? CStore_GetDiscoveryQueueSettings_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDiscoveryQueueSettings'> ? CStore_GetDiscoveryQueueSettings_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDiscoveryQueueSkippedApps'> ? CStore_GetDiscoveryQueueSkippedApps_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDiscoveryQueueSkippedApps'> ? CStore_GetDiscoveryQueueSkippedApps_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetLocalizedNameForTags'> ? CStore_GetLocalizedNameForTags_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetLocalizedNameForTags'> ? CStore_GetLocalizedNameForTags_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetMostPopularTags'> ? CStore_GetMostPopularTags_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetMostPopularTags'> ? CStore_GetMostPopularTags_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetStorePreferences'> ? CStore_GetStorePreferences_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetStorePreferences'> ? CStore_GetStorePreferences_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetTagList'> ? CStore_GetTagList_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetTagList'> ? CStore_GetTagList_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetTrendingAppsAmongFriends'> ? CStore_GetTrendingAppsAmongFriends_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetTrendingAppsAmongFriends'> ? CStore_GetTrendingAppsAmongFriends_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetUserGameInterestState'> ? CStore_GetUserGameInterestState_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetUserGameInterestState'> ? CStore_GetUserGameInterestState_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'RegisterCDKey'> ? CStore_RegisterCDKey_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'RegisterCDKey'> ? CStore_RegisterCDKey_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'ReportApp'> ? CStore_ReportApp_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'ReportApp'> ? CStore_ReportApp_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SetReservationPositionMessage'> ? CStore_SetReservationPositionMessage_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SetReservationPositionMessage'> ? CStore_SetReservationPositionMessage_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'SkipDiscoveryQueueItem'> ? CStore_SkipDiscoveryQueueItem_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'SkipDiscoveryQueueItem'> ? CStore_SkipDiscoveryQueueItem_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'UpdatePackageReservations'> ? CStore_UpdatePackageReservations_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'UpdatePackageReservations'> ? CStore_UpdatePackageReservations_Response
: never


type InferSteamStdReqOrRespStoreBrowseType<T extends ServiceMethodDict<S>, Type extends 'Request'|'Response', S extends 'StoreBrowse' = 'StoreBrowse'> = T extends never ? never
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDLCForApps'> ? CStoreBrowse_GetDLCForApps_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDLCForApps'> ? CStoreBrowse_GetDLCForApps_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetDLCForAppsSolr'> ? CStoreBrowse_GetDLCForAppsSolr_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetDLCForAppsSolr'> ? CStoreBrowse_GetDLCForAppsSolr_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetHardwareItems'> ? CStoreBrowse_GetHardwareItems_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetHardwareItems'> ? CStoreBrowse_GetHardwareItems_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetStoreCategories'> ? CStoreBrowse_GetStoreCategories_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetStoreCategories'> ? CStoreBrowse_GetStoreCategories_Response
: SteamAPITypeName<S, T, Type> extends SteamAPIRequestTypeName<S, 'GetItems'> ? CStoreBrowse_GetItems_Request
: SteamAPITypeName<S, T, Type> extends SteamAPIResponseTypeName<S, 'GetItems'> ? CStoreBrowse_GetItems_Response
: never


export type InferSteamStdReqOrRespTypeFromString<T extends AllRTypeDict> =  T extends `C${infer S}_${infer M}_${'Request' | 'Response'}` ?
 T extends `C${S}_${M}_${infer Type}` ?
    Type extends 'Request' | 'Response' ?
    S extends never ? never
    : M extends ServiceMethodDict<'FamilyGroups'> ? InferSteamStdReqOrRespFamilyGroupsType<M, Type>
    : M extends ServiceMethodDict<'Player'> ? InferSteamStdReqOrRespPlayerType<M, Type>
    : M extends ServiceMethodDict<'AccountPrivateApps'> ? InferSteamStdReqOrRespAccountPrivateAppsType<M, Type>
    : M extends ServiceMethodDict<'Authentication'> ? InferSteamStdReqOrRespAuthenticationType<M, Type>
    : M extends ServiceMethodDict<'ClientComm'> ? InferSteamStdReqOrRespClientCommType<M, Type>
    : M extends ServiceMethodDict<'Store'> ? InferSteamStdReqOrRespStoreType<M, Type>
    : M extends ServiceMethodDict<'StoreBrowse'> ? InferSteamStdReqOrRespStoreBrowseType<M, Type>
    : M extends ServiceMethodDict<'SteamDeckCompatibility'> ? InferSteamStdReqOrRespSteamDeckCompatibilityType<M, Type>
    :never
  : never
  : never
  : never

