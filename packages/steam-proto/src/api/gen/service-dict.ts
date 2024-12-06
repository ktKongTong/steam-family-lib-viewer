
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
}  from "../../proto";


export const steamStdServiceRecord = {
    AccountPrivateApps: ['GetPrivateAppList', 'ToggleAppPrivacy'] as const,
    Authentication: ['AccessToken_GenerateForApp', 'BeginAuthSessionViaCredentials', 'BeginAuthSessionViaQR', 'GetAuthSessionInfo', 'GetAuthSessionsForAccount', 'GetPasswordRSAPublicKey', 'MigrateMobileSession', 'PollAuthSessionStatus', 'RefreshToken_Enumerate', 'RefreshToken_Revoke', 'Token_Revoke', 'UpdateAuthSessionWithMobileConfirmation', 'UpdateAuthSessionWithSteamGuardCode'] as const,
    ClientComm: ['EnableOrDisableDownloads', 'GetAllClientLogonInfo', 'GetClientAppList', 'GetClientInfo', 'GetClientLogonInfo', 'InstallClientApp', 'LaunchClientApp', 'SetClientAppUpdateState', 'UninstallClientApp'] as const,
    FamilyGroups: ['CancelFamilyGroupInvite', 'ClearCooldownSkip', 'ConfirmInviteToFamilyGroup', 'ConfirmJoinFamilyGroup', 'CreateFamilyGroup', 'DeleteFamilyGroup', 'ForceAcceptInvite', 'GetChangeLog', 'GetFamilyGroup', 'GetFamilyGroupForUser', 'GetInviteCheckResults', 'GetPlaytimeSummary', 'GetPreferredLenders', 'GetPurchaseRequests', 'GetSharedLibraryApps', 'GetUsersSharingDevice', 'InviteToFamilyGroup', 'JoinFamilyGroup', 'ModifyFamilyGroupDetails', 'RemoveFromFamilyGroup', 'RequestPurchase', 'ResendInvitationToFamilyGroup', 'RespondToRequestedPurchase', 'SetFamilyCooldownOverrides', 'SetPreferredLender', 'UndeleteFamilyGroup'] as const,
    Player: ['AcceptSSA', 'AddFriend', 'DeletePostedStatus', 'GetAchievementsProgress', 'GetAnimatedAvatar', 'GetAvatarFrame', 'GetCommunityBadgeProgress', 'GetCommunityPreferences', 'GetDurationControl', 'GetEmoticonList', 'GetFavoriteBadge', 'GetFriendsAppsActivity', 'GetFriendsGameplayInfo', 'GetGameAchievements', 'GetGameBadgeLevels', 'GetLastPlayedTimes', 'GetMiniProfileBackground', 'GetMutualFriendsForIncomingInvites', 'GetNewSteamAnnouncementState', 'GetNicknameList', 'GetOwnedGames', 'GetPerFriendPreferences', 'GetPlayerLinkDetails', 'GetPlayNext', 'GetPostedStatus', 'GetPrivacySettings', 'GetProfileBackground', 'GetProfileCustomization', 'GetProfileItemsEquipped', 'GetProfileItemsOwned', 'GetProfileThemesAvailable', 'GetPurchasedAndUpgradedProfileCustomizations', 'GetPurchasedProfileCustomizations', 'GetRecentPlaytimeSessionsForChild', 'GetSteamDeckKeyboardSkin', 'GetTextFilterWords', 'GetTimeSSAAccepted', 'GetTopAchievementsForGames', 'IgnoreFriend', 'PostStatusToFriends', 'RecordDisconnectedPlaytime', 'RemoveFriend', 'SetAnimatedAvatar', 'SetAvatarFrame', 'SetCommunityPreferences', 'SetEquippedProfileItemFlags', 'SetFavoriteBadge', 'SetMiniProfileBackground', 'SetPerFriendPreferences', 'SetProfileBackground', 'SetProfilePreferences', 'SetProfileTheme', 'SetSteamDeckKeyboardSkin', 'UpdateSteamAnnouncementLastRead'] as const,
    SteamDeckCompatibility: ['SetFeedback', 'ShouldPrompt'] as const,
    Store: ['DeleteReservationPositionMessage', 'GetAllReservationPositionMessages', 'GetDiscoveryQueue', 'GetDiscoveryQueueSettings', 'GetDiscoveryQueueSkippedApps', 'GetLocalizedNameForTags', 'GetMostPopularTags', 'GetStorePreferences', 'GetTagList', 'GetTrendingAppsAmongFriends', 'GetUserGameInterestState', 'RegisterCDKey', 'ReportApp', 'SetReservationPositionMessage', 'SkipDiscoveryQueueItem', 'UpdatePackageReservations'] as const,
    StoreBrowse: ['GetDLCForApps', 'GetDLCForAppsSolr', 'GetHardwareItems', 'GetStoreCategories', 'GetItems'] as const,
}


export const steamStdServiceClazzMap = {
    AccountPrivateApps: {
        
        GetPrivateAppList : {
            req: CAccountPrivateApps_GetPrivateAppList_Request,
            resp: CAccountPrivateApps_GetPrivateAppList_Response
        },

        ToggleAppPrivacy : {
            req: CAccountPrivateApps_ToggleAppPrivacy_Request,
            resp: CAccountPrivateApps_ToggleAppPrivacy_Response
        }
    },
    Authentication: {
        
        AccessToken_GenerateForApp : {
            req: CAuthentication_AccessToken_GenerateForApp_Request,
            resp: CAuthentication_AccessToken_GenerateForApp_Response
        },

        BeginAuthSessionViaCredentials : {
            req: CAuthentication_BeginAuthSessionViaCredentials_Request,
            resp: CAuthentication_BeginAuthSessionViaCredentials_Response
        },

        BeginAuthSessionViaQR : {
            req: CAuthentication_BeginAuthSessionViaQR_Request,
            resp: CAuthentication_BeginAuthSessionViaQR_Response
        },

        GetAuthSessionInfo : {
            req: CAuthentication_GetAuthSessionInfo_Request,
            resp: CAuthentication_GetAuthSessionInfo_Response
        },

        GetAuthSessionsForAccount : {
            req: CAuthentication_GetAuthSessionsForAccount_Request,
            resp: CAuthentication_GetAuthSessionsForAccount_Response
        },

        GetPasswordRSAPublicKey : {
            req: CAuthentication_GetPasswordRSAPublicKey_Request,
            resp: CAuthentication_GetPasswordRSAPublicKey_Response
        },

        MigrateMobileSession : {
            req: CAuthentication_MigrateMobileSession_Request,
            resp: CAuthentication_MigrateMobileSession_Response
        },

        PollAuthSessionStatus : {
            req: CAuthentication_PollAuthSessionStatus_Request,
            resp: CAuthentication_PollAuthSessionStatus_Response
        },

        RefreshToken_Enumerate : {
            req: CAuthentication_RefreshToken_Enumerate_Request,
            resp: CAuthentication_RefreshToken_Enumerate_Response
        },

        RefreshToken_Revoke : {
            req: CAuthentication_RefreshToken_Revoke_Request,
            resp: CAuthentication_RefreshToken_Revoke_Response
        },

        Token_Revoke : {
            req: CAuthentication_Token_Revoke_Request,
            resp: CAuthentication_Token_Revoke_Response
        },

        UpdateAuthSessionWithMobileConfirmation : {
            req: CAuthentication_UpdateAuthSessionWithMobileConfirmation_Request,
            resp: CAuthentication_UpdateAuthSessionWithMobileConfirmation_Response
        },

        UpdateAuthSessionWithSteamGuardCode : {
            req: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Request,
            resp: CAuthentication_UpdateAuthSessionWithSteamGuardCode_Response
        }
    },
    ClientComm: {
        
        EnableOrDisableDownloads : {
            req: CClientComm_EnableOrDisableDownloads_Request,
            resp: CClientComm_EnableOrDisableDownloads_Response
        },

        GetAllClientLogonInfo : {
            req: CClientComm_GetAllClientLogonInfo_Request,
            resp: CClientComm_GetAllClientLogonInfo_Response
        },

        GetClientAppList : {
            req: CClientComm_GetClientAppList_Request,
            resp: CClientComm_GetClientAppList_Response
        },

        GetClientInfo : {
            req: CClientComm_GetClientInfo_Request,
            resp: CClientComm_GetClientInfo_Response
        },

        GetClientLogonInfo : {
            req: CClientComm_GetClientLogonInfo_Request,
            resp: CClientComm_GetClientLogonInfo_Response
        },

        InstallClientApp : {
            req: CClientComm_InstallClientApp_Request,
            resp: CClientComm_InstallClientApp_Response
        },

        LaunchClientApp : {
            req: CClientComm_LaunchClientApp_Request,
            resp: CClientComm_LaunchClientApp_Response
        },

        SetClientAppUpdateState : {
            req: CClientComm_SetClientAppUpdateState_Request,
            resp: CClientComm_SetClientAppUpdateState_Response
        },

        UninstallClientApp : {
            req: CClientComm_UninstallClientApp_Request,
            resp: CClientComm_UninstallClientApp_Response
        }
    },
    FamilyGroups: {
        
        CancelFamilyGroupInvite : {
            req: CFamilyGroups_CancelFamilyGroupInvite_Request,
            resp: CFamilyGroups_CancelFamilyGroupInvite_Response
        },

        ClearCooldownSkip : {
            req: CFamilyGroups_ClearCooldownSkip_Request,
            resp: CFamilyGroups_ClearCooldownSkip_Response
        },

        ConfirmInviteToFamilyGroup : {
            req: CFamilyGroups_ConfirmInviteToFamilyGroup_Request,
            resp: CFamilyGroups_ConfirmInviteToFamilyGroup_Response
        },

        ConfirmJoinFamilyGroup : {
            req: CFamilyGroups_ConfirmJoinFamilyGroup_Request,
            resp: CFamilyGroups_ConfirmJoinFamilyGroup_Response
        },

        CreateFamilyGroup : {
            req: CFamilyGroups_CreateFamilyGroup_Request,
            resp: CFamilyGroups_CreateFamilyGroup_Response
        },

        DeleteFamilyGroup : {
            req: CFamilyGroups_DeleteFamilyGroup_Request,
            resp: CFamilyGroups_DeleteFamilyGroup_Response
        },

        ForceAcceptInvite : {
            req: CFamilyGroups_ForceAcceptInvite_Request,
            resp: CFamilyGroups_ForceAcceptInvite_Response
        },

        GetChangeLog : {
            req: CFamilyGroups_GetChangeLog_Request,
            resp: CFamilyGroups_GetChangeLog_Response
        },

        GetFamilyGroup : {
            req: CFamilyGroups_GetFamilyGroup_Request,
            resp: CFamilyGroups_GetFamilyGroup_Response
        },

        GetFamilyGroupForUser : {
            req: CFamilyGroups_GetFamilyGroupForUser_Request,
            resp: CFamilyGroups_GetFamilyGroupForUser_Response
        },

        GetInviteCheckResults : {
            req: CFamilyGroups_GetInviteCheckResults_Request,
            resp: CFamilyGroups_GetInviteCheckResults_Response
        },

        GetPlaytimeSummary : {
            req: CFamilyGroups_GetPlaytimeSummary_Request,
            resp: CFamilyGroups_GetPlaytimeSummary_Response
        },

        GetPreferredLenders : {
            req: CFamilyGroups_GetPreferredLenders_Request,
            resp: CFamilyGroups_GetPreferredLenders_Response
        },

        GetPurchaseRequests : {
            req: CFamilyGroups_GetPurchaseRequests_Request,
            resp: CFamilyGroups_GetPurchaseRequests_Response
        },

        GetSharedLibraryApps : {
            req: CFamilyGroups_GetSharedLibraryApps_Request,
            resp: CFamilyGroups_GetSharedLibraryApps_Response
        },

        GetUsersSharingDevice : {
            req: CFamilyGroups_GetUsersSharingDevice_Request,
            resp: CFamilyGroups_GetUsersSharingDevice_Response
        },

        InviteToFamilyGroup : {
            req: CFamilyGroups_InviteToFamilyGroup_Request,
            resp: CFamilyGroups_InviteToFamilyGroup_Response
        },

        JoinFamilyGroup : {
            req: CFamilyGroups_JoinFamilyGroup_Request,
            resp: CFamilyGroups_JoinFamilyGroup_Response
        },

        ModifyFamilyGroupDetails : {
            req: CFamilyGroups_ModifyFamilyGroupDetails_Request,
            resp: CFamilyGroups_ModifyFamilyGroupDetails_Response
        },

        RemoveFromFamilyGroup : {
            req: CFamilyGroups_RemoveFromFamilyGroup_Request,
            resp: CFamilyGroups_RemoveFromFamilyGroup_Response
        },

        RequestPurchase : {
            req: CFamilyGroups_RequestPurchase_Request,
            resp: CFamilyGroups_RequestPurchase_Response
        },

        ResendInvitationToFamilyGroup : {
            req: CFamilyGroups_ResendInvitationToFamilyGroup_Request,
            resp: CFamilyGroups_ResendInvitationToFamilyGroup_Response
        },

        RespondToRequestedPurchase : {
            req: CFamilyGroups_RespondToRequestedPurchase_Request,
            resp: CFamilyGroups_RespondToRequestedPurchase_Response
        },

        SetFamilyCooldownOverrides : {
            req: CFamilyGroups_SetFamilyCooldownOverrides_Request,
            resp: CFamilyGroups_SetFamilyCooldownOverrides_Response
        },

        SetPreferredLender : {
            req: CFamilyGroups_SetPreferredLender_Request,
            resp: CFamilyGroups_SetPreferredLender_Response
        },

        UndeleteFamilyGroup : {
            req: CFamilyGroups_UndeleteFamilyGroup_Request,
            resp: CFamilyGroups_UndeleteFamilyGroup_Response
        }
    },
    Player: {
        
        AcceptSSA : {
            req: CPlayer_AcceptSSA_Request,
            resp: CPlayer_AcceptSSA_Response
        },

        AddFriend : {
            req: CPlayer_AddFriend_Request,
            resp: CPlayer_AddFriend_Response
        },

        DeletePostedStatus : {
            req: CPlayer_DeletePostedStatus_Request,
            resp: CPlayer_DeletePostedStatus_Response
        },

        GetAchievementsProgress : {
            req: CPlayer_GetAchievementsProgress_Request,
            resp: CPlayer_GetAchievementsProgress_Response
        },

        GetAnimatedAvatar : {
            req: CPlayer_GetAnimatedAvatar_Request,
            resp: CPlayer_GetAnimatedAvatar_Response
        },

        GetAvatarFrame : {
            req: CPlayer_GetAvatarFrame_Request,
            resp: CPlayer_GetAvatarFrame_Response
        },

        GetCommunityBadgeProgress : {
            req: CPlayer_GetCommunityBadgeProgress_Request,
            resp: CPlayer_GetCommunityBadgeProgress_Response
        },

        GetCommunityPreferences : {
            req: CPlayer_GetCommunityPreferences_Request,
            resp: CPlayer_GetCommunityPreferences_Response
        },

        GetDurationControl : {
            req: CPlayer_GetDurationControl_Request,
            resp: CPlayer_GetDurationControl_Response
        },

        GetEmoticonList : {
            req: CPlayer_GetEmoticonList_Request,
            resp: CPlayer_GetEmoticonList_Response
        },

        GetFavoriteBadge : {
            req: CPlayer_GetFavoriteBadge_Request,
            resp: CPlayer_GetFavoriteBadge_Response
        },

        GetFriendsAppsActivity : {
            req: CPlayer_GetFriendsAppsActivity_Request,
            resp: CPlayer_GetFriendsAppsActivity_Response
        },

        GetFriendsGameplayInfo : {
            req: CPlayer_GetFriendsGameplayInfo_Request,
            resp: CPlayer_GetFriendsGameplayInfo_Response
        },

        GetGameAchievements : {
            req: CPlayer_GetGameAchievements_Request,
            resp: CPlayer_GetGameAchievements_Response
        },

        GetGameBadgeLevels : {
            req: CPlayer_GetGameBadgeLevels_Request,
            resp: CPlayer_GetGameBadgeLevels_Response
        },

        GetLastPlayedTimes : {
            req: CPlayer_GetLastPlayedTimes_Request,
            resp: CPlayer_GetLastPlayedTimes_Response
        },

        GetMiniProfileBackground : {
            req: CPlayer_GetMiniProfileBackground_Request,
            resp: CPlayer_GetMiniProfileBackground_Response
        },

        GetMutualFriendsForIncomingInvites : {
            req: CPlayer_GetMutualFriendsForIncomingInvites_Request,
            resp: CPlayer_GetMutualFriendsForIncomingInvites_Response
        },

        GetNewSteamAnnouncementState : {
            req: CPlayer_GetNewSteamAnnouncementState_Request,
            resp: CPlayer_GetNewSteamAnnouncementState_Response
        },

        GetNicknameList : {
            req: CPlayer_GetNicknameList_Request,
            resp: CPlayer_GetNicknameList_Response
        },

        GetOwnedGames : {
            req: CPlayer_GetOwnedGames_Request,
            resp: CPlayer_GetOwnedGames_Response
        },

        GetPerFriendPreferences : {
            req: CPlayer_GetPerFriendPreferences_Request,
            resp: CPlayer_GetPerFriendPreferences_Response
        },

        GetPlayerLinkDetails : {
            req: CPlayer_GetPlayerLinkDetails_Request,
            resp: CPlayer_GetPlayerLinkDetails_Response
        },

        GetPlayNext : {
            req: CPlayer_GetPlayNext_Request,
            resp: CPlayer_GetPlayNext_Response
        },

        GetPostedStatus : {
            req: CPlayer_GetPostedStatus_Request,
            resp: CPlayer_GetPostedStatus_Response
        },

        GetPrivacySettings : {
            req: CPlayer_GetPrivacySettings_Request,
            resp: CPlayer_GetPrivacySettings_Response
        },

        GetProfileBackground : {
            req: CPlayer_GetProfileBackground_Request,
            resp: CPlayer_GetProfileBackground_Response
        },

        GetProfileCustomization : {
            req: CPlayer_GetProfileCustomization_Request,
            resp: CPlayer_GetProfileCustomization_Response
        },

        GetProfileItemsEquipped : {
            req: CPlayer_GetProfileItemsEquipped_Request,
            resp: CPlayer_GetProfileItemsEquipped_Response
        },

        GetProfileItemsOwned : {
            req: CPlayer_GetProfileItemsOwned_Request,
            resp: CPlayer_GetProfileItemsOwned_Response
        },

        GetProfileThemesAvailable : {
            req: CPlayer_GetProfileThemesAvailable_Request,
            resp: CPlayer_GetProfileThemesAvailable_Response
        },

        GetPurchasedAndUpgradedProfileCustomizations : {
            req: CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Request,
            resp: CPlayer_GetPurchasedAndUpgradedProfileCustomizations_Response
        },

        GetPurchasedProfileCustomizations : {
            req: CPlayer_GetPurchasedProfileCustomizations_Request,
            resp: CPlayer_GetPurchasedProfileCustomizations_Response
        },

        GetRecentPlaytimeSessionsForChild : {
            req: CPlayer_GetRecentPlaytimeSessionsForChild_Request,
            resp: CPlayer_GetRecentPlaytimeSessionsForChild_Response
        },

        GetSteamDeckKeyboardSkin : {
            req: CPlayer_GetSteamDeckKeyboardSkin_Request,
            resp: CPlayer_GetSteamDeckKeyboardSkin_Response
        },

        GetTextFilterWords : {
            req: CPlayer_GetTextFilterWords_Request,
            resp: CPlayer_GetTextFilterWords_Response
        },

        GetTimeSSAAccepted : {
            req: CPlayer_GetTimeSSAAccepted_Request,
            resp: CPlayer_GetTimeSSAAccepted_Response
        },

        GetTopAchievementsForGames : {
            req: CPlayer_GetTopAchievementsForGames_Request,
            resp: CPlayer_GetTopAchievementsForGames_Response
        },

        IgnoreFriend : {
            req: CPlayer_IgnoreFriend_Request,
            resp: CPlayer_IgnoreFriend_Response
        },

        PostStatusToFriends : {
            req: CPlayer_PostStatusToFriends_Request,
            resp: CPlayer_PostStatusToFriends_Response
        },

        RecordDisconnectedPlaytime : {
            req: CPlayer_RecordDisconnectedPlaytime_Request,
            resp: CPlayer_RecordDisconnectedPlaytime_Response
        },

        RemoveFriend : {
            req: CPlayer_RemoveFriend_Request,
            resp: CPlayer_RemoveFriend_Response
        },

        SetAnimatedAvatar : {
            req: CPlayer_SetAnimatedAvatar_Request,
            resp: CPlayer_SetAnimatedAvatar_Response
        },

        SetAvatarFrame : {
            req: CPlayer_SetAvatarFrame_Request,
            resp: CPlayer_SetAvatarFrame_Response
        },

        SetCommunityPreferences : {
            req: CPlayer_SetCommunityPreferences_Request,
            resp: CPlayer_SetCommunityPreferences_Response
        },

        SetEquippedProfileItemFlags : {
            req: CPlayer_SetEquippedProfileItemFlags_Request,
            resp: CPlayer_SetEquippedProfileItemFlags_Response
        },

        SetFavoriteBadge : {
            req: CPlayer_SetFavoriteBadge_Request,
            resp: CPlayer_SetFavoriteBadge_Response
        },

        SetMiniProfileBackground : {
            req: CPlayer_SetMiniProfileBackground_Request,
            resp: CPlayer_SetMiniProfileBackground_Response
        },

        SetPerFriendPreferences : {
            req: CPlayer_SetPerFriendPreferences_Request,
            resp: CPlayer_SetPerFriendPreferences_Response
        },

        SetProfileBackground : {
            req: CPlayer_SetProfileBackground_Request,
            resp: CPlayer_SetProfileBackground_Response
        },

        SetProfilePreferences : {
            req: CPlayer_SetProfilePreferences_Request,
            resp: CPlayer_SetProfilePreferences_Response
        },

        SetProfileTheme : {
            req: CPlayer_SetProfileTheme_Request,
            resp: CPlayer_SetProfileTheme_Response
        },

        SetSteamDeckKeyboardSkin : {
            req: CPlayer_SetSteamDeckKeyboardSkin_Request,
            resp: CPlayer_SetSteamDeckKeyboardSkin_Response
        },

        UpdateSteamAnnouncementLastRead : {
            req: CPlayer_UpdateSteamAnnouncementLastRead_Request,
            resp: CPlayer_UpdateSteamAnnouncementLastRead_Response
        }
    },
    SteamDeckCompatibility: {
        
        SetFeedback : {
            req: CSteamDeckCompatibility_SetFeedback_Request,
            resp: CSteamDeckCompatibility_SetFeedback_Response
        },

        ShouldPrompt : {
            req: CSteamDeckCompatibility_ShouldPrompt_Request,
            resp: CSteamDeckCompatibility_ShouldPrompt_Response
        }
    },
    Store: {
        
        DeleteReservationPositionMessage : {
            req: CStore_DeleteReservationPositionMessage_Request,
            resp: CStore_DeleteReservationPositionMessage_Response
        },

        GetAllReservationPositionMessages : {
            req: CStore_GetAllReservationPositionMessages_Request,
            resp: CStore_GetAllReservationPositionMessages_Response
        },

        GetDiscoveryQueue : {
            req: CStore_GetDiscoveryQueue_Request,
            resp: CStore_GetDiscoveryQueue_Response
        },

        GetDiscoveryQueueSettings : {
            req: CStore_GetDiscoveryQueueSettings_Request,
            resp: CStore_GetDiscoveryQueueSettings_Response
        },

        GetDiscoveryQueueSkippedApps : {
            req: CStore_GetDiscoveryQueueSkippedApps_Request,
            resp: CStore_GetDiscoveryQueueSkippedApps_Response
        },

        GetLocalizedNameForTags : {
            req: CStore_GetLocalizedNameForTags_Request,
            resp: CStore_GetLocalizedNameForTags_Response
        },

        GetMostPopularTags : {
            req: CStore_GetMostPopularTags_Request,
            resp: CStore_GetMostPopularTags_Response
        },

        GetStorePreferences : {
            req: CStore_GetStorePreferences_Request,
            resp: CStore_GetStorePreferences_Response
        },

        GetTagList : {
            req: CStore_GetTagList_Request,
            resp: CStore_GetTagList_Response
        },

        GetTrendingAppsAmongFriends : {
            req: CStore_GetTrendingAppsAmongFriends_Request,
            resp: CStore_GetTrendingAppsAmongFriends_Response
        },

        GetUserGameInterestState : {
            req: CStore_GetUserGameInterestState_Request,
            resp: CStore_GetUserGameInterestState_Response
        },

        RegisterCDKey : {
            req: CStore_RegisterCDKey_Request,
            resp: CStore_RegisterCDKey_Response
        },

        ReportApp : {
            req: CStore_ReportApp_Request,
            resp: CStore_ReportApp_Response
        },

        SetReservationPositionMessage : {
            req: CStore_SetReservationPositionMessage_Request,
            resp: CStore_SetReservationPositionMessage_Response
        },

        SkipDiscoveryQueueItem : {
            req: CStore_SkipDiscoveryQueueItem_Request,
            resp: CStore_SkipDiscoveryQueueItem_Response
        },

        UpdatePackageReservations : {
            req: CStore_UpdatePackageReservations_Request,
            resp: CStore_UpdatePackageReservations_Response
        }
    },
    StoreBrowse: {
        
        GetDLCForApps : {
            req: CStoreBrowse_GetDLCForApps_Request,
            resp: CStoreBrowse_GetDLCForApps_Response
        },

        GetDLCForAppsSolr : {
            req: CStoreBrowse_GetDLCForAppsSolr_Request,
            resp: CStoreBrowse_GetDLCForAppsSolr_Response
        },

        GetHardwareItems : {
            req: CStoreBrowse_GetHardwareItems_Request,
            resp: CStoreBrowse_GetHardwareItems_Response
        },

        GetStoreCategories : {
            req: CStoreBrowse_GetStoreCategories_Request,
            resp: CStoreBrowse_GetStoreCategories_Response
        },

        GetItems : {
            req: CStoreBrowse_GetItems_Request,
            resp: CStoreBrowse_GetItems_Response
        }
    }
} as const
            
    