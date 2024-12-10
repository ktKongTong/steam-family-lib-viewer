
    import {
        CWishlist_AddToWishlist_RequestSchema,
CWishlist_GetWishlist_RequestSchema,
CWishlist_GetWishlistItemCount_RequestSchema,
CWishlist_GetWishlistItemsOnSale_RequestSchema,
CWishlist_GetWishlistSortedFiltered_RequestSchema,
CWishlist_RemoveFromWishlist_RequestSchema,
CUserNews_GetAppDetailsSpotlight_RequestSchema,
CUserNews_GetUserNews_RequestSchema,
CUserGameNotes_DeleteNote_RequestSchema,
CUserGameNotes_GetGamesWithNotes_RequestSchema,
CUserGameNotes_GetNotesForGame_RequestSchema,
CUserGameNotes_SaveNote_RequestSchema,
CUserGameActivity_GetActivity_RequestSchema,
CUserAccount_CancelLicenseForApp_RequestSchema,
CUserAccount_CreateFriendInviteToken_RequestSchema,
CUserAccount_GetAccountLinkStatus_RequestSchema,
CUserAccount_GetAvailableValveDiscountPromotions_RequestSchema,
CUserAccount_GetClientWalletDetails_RequestSchema,
CUserAccount_GetFriendInviteTokens_RequestSchema,
CUserAccount_GetUserCountry_RequestSchema,
CUserAccount_RedeemFriendInviteToken_RequestSchema,
CUserAccount_RegisterCompatTool_RequestSchema,
CUserAccount_RevokeFriendInviteToken_RequestSchema,
CUserAccount_ViewFriendInviteToken_RequestSchema,
CStore_GetUserVotes_RequestSchema,
CStore_GetVoteDefinitions_RequestSchema,
NotImplementedSchema,
CStore_SetVote_RequestSchema,
CStoreQuery_GetItemByUserCombinedTagsPriority_RequestSchema,
CStoreQuery_GetItemsByUserRecommendedTags_RequestSchema,
CStoreQuery_Query_RequestSchema,
CStoreQuery_SearchSuggestions_RequestSchema,
CStoreMarketing_GetFrontPageConfig_RequestSchema,
CStoreMarketing_GetItemsToFeature_RequestSchema,
CStoreCatalog_GetDevPageAllAppsLinked_RequestSchema,
CStoreBrowse_GetDLCForApps_RequestSchema,
CStoreBrowse_GetDLCForAppsSolr_RequestSchema,
CStoreBrowse_GetHardwareItems_RequestSchema,
CStoreBrowse_GetItems_RequestSchema,
CStoreBrowse_GetPriceStops_RequestSchema,
CStoreBrowse_GetStoreCategories_RequestSchema,
CStoreAppSimilarity_IdentifyClustersFromPlaytime_RequestSchema,
CStoreAppSimilarity_PrioritizeAppsForUser_RequestSchema,
CStore_DeleteReservationPositionMessage_RequestSchema,
CStore_GetAllReservationPositionMessages_RequestSchema,
CStore_GetDiscoveryQueue_RequestSchema,
CStore_GetDiscoveryQueueSettings_RequestSchema,
CStore_GetDiscoveryQueueSkippedApps_RequestSchema,
CStore_GetLocalizedNameForTags_RequestSchema,
CStore_GetMostPopularTags_RequestSchema,
CStore_GetStorePreferences_RequestSchema,
CStore_GetTagList_RequestSchema,
CStore_GetTrendingAppsAmongFriends_RequestSchema,
CStore_GetUserGameInterestState_RequestSchema,
CStore_GetWishlistDemoEmailStatus_RequestSchema,
CStore_QueueWishlistDemoEmailToFire_RequestSchema,
CStore_RegisterCDKey_RequestSchema,
CStore_ReportApp_RequestSchema,
CSteamDeckCompatibility_SetFeedback_RequestSchema,
CStore_SetReservationPositionMessage_RequestSchema,
CSteamDeckCompatibility_ShouldPrompt_RequestSchema,
CStore_SkipDiscoveryQueueItem_RequestSchema,
CStore_UpdatePackageReservations_RequestSchema,
CStore_StorePreferencesChanged_NotificationSchema,
CSteamNotification_GetPreferences_RequestSchema,
CSteamNotification_GetSteamNotifications_RequestSchema,
CSteamNotification_SetPreferences_RequestSchema,
CSteamNotification_NotificationsReceived_NotificationSchema,
CSteamNotification_PreferencesUpdated_NotificationSchema,
CSteamCharts_GetBestOfYearPages_RequestSchema,
CSteamCharts_GetGamesByConcurrentPlayers_RequestSchema,
CSteamCharts_GetMostPlayedGames_RequestSchema,
CSteamCharts_GetMostPlayedSteamDeckGames_RequestSchema,
CSteamCharts_GetTopReleasesPages_RequestSchema,
CSteamAwards_GetNominationRecommendations_RequestSchema,
CSteamAwards_GetNominationShareLink_RequestSchema,
CSteamAwards_GetOtherUserNominations_RequestSchema,
CSteamAwards_GetUserNominations_RequestSchema,
CSteamAwards_Nominate_RequestSchema,
CPublishing_CreatePartnerAppOptInEmail_RequestSchema,
CPublishing_GetEstimatePartnerAppOptInEmail_RequestSchema,
CPublishing_GetOptInAppealsSummaryStats_RequestSchema,
CPublishing_GetOptInEmailTracking_RequestSchema,
CPublishing_GetPartnerAppOptInEmailDefAndStats_RequestSchema,
CPublishing_GetPartnerAppOptInsIDs_RequestSchema,
CPublishing_GetPartnerPaidGivenPackageList_RequestSchema,
CPublishing_GetSinglePartnerAppOptIns_RequestSchema,
CPublishing_SendPartnerAppOptInEmailAndWait_RequestSchema,
CPublishing_SetFeaturingOnPartnerAppOptIn_RequestSchema,
CPublishing_TestFirePartnerAppOptInEmail_RequestSchema,
CPublishing_UpdatePartnerAppOptInEmail_RequestSchema,
CPublishedFile_AddAppRelationship_RequestSchema,
CPublishedFile_AddChild_RequestSchema,
CPublishedFile_AreFilesInSubscriptionList_RequestSchema,
CPublishedFile_CanSubscribe_RequestSchema,
CPublishedFile_Delete_RequestSchema,
CPublishedFile_GetAppRelationships_RequestSchema,
CPublishedFile_GetAppRelationshipsBatched_RequestSchema,
CPublishedFile_GetChangeHistory_RequestSchema,
CPublishedFile_GetChangeHistoryEntry_RequestSchema,
CPublishedFile_GetContentDescriptors_RequestSchema,
CPublishedFile_GetDetails_RequestSchema,
CPublishedFile_GetItemChanges_RequestSchema,
CPublishedFile_GetItemInfo_RequestSchema,
CPublishedFile_GetSubSectionData_RequestSchema,
CPublishedFile_GetUserFiles_RequestSchema,
CPublishedFile_GetUserVoteSummary_RequestSchema,
CPublishedFile_Publish_RequestSchema,
CPublishedFile_QueryFiles_RequestSchema,
CPublishedFile_RefreshVotingQueue_RequestSchema,
CPublishedFile_RemoveAppRelationship_RequestSchema,
CPublishedFile_RemoveChild_RequestSchema,
CPublishedFile_SetCollectionChildren_RequestSchema,
CPublishedFile_SetPlaytimeForControllerConfigs_RequestSchema,
CPublishedFile_SetSubscriptionListFromCollection_RequestSchema,
CPublishedFile_StartPlaytimeTracking_RequestSchema,
CPublishedFile_StopPlaytimeTracking_RequestSchema,
CPublishedFile_StopPlaytimeTrackingForAllAppItems_RequestSchema,
CPublishedFile_Subscribe_RequestSchema,
CPublishedFile_Unsubscribe_RequestSchema,
CPublishedFile_Update_RequestSchema,
CPublishedFile_UpdateContentDescriptors_RequestSchema,
CPublishedFile_Vote_RequestSchema,
CPublishedFile_FileDeleted_Client_NotificationSchema,
CPublishedFile_FileSubscribed_NotificationSchema,
CPublishedFile_FileUnsubscribed_NotificationSchema,
CPlaytest_GetInvites_RequestSchema,
CPlaytest_GetUserStatus_RequestSchema,
CPlaytest_RequestInvite_RequestSchema,
CPlaytest_UpdateInvites_RequestSchema,
CPlayer_AcceptSSA_RequestSchema,
CPlayer_AddFriend_RequestSchema,
CPlayer_GetLastPlayedTimes_RequestSchema,
CPlayer_DeletePostedStatus_RequestSchema,
CPlayer_GetAchievementsProgress_RequestSchema,
CPlayer_GetAnimatedAvatar_RequestSchema,
CPlayer_GetAvatarFrame_RequestSchema,
CPlayer_GetCommunityBadgeProgress_RequestSchema,
CPlayer_GetCommunityPreferences_RequestSchema,
CPlayer_GetDurationControl_RequestSchema,
CPlayer_GetEmoticonList_RequestSchema,
CPlayer_GetFavoriteBadge_RequestSchema,
CPlayer_GetFriendsAppsActivity_RequestSchema,
CPlayer_GetFriendsGameplayInfo_RequestSchema,
CPlayer_GetGameAchievements_RequestSchema,
CPlayer_GetGameBadgeLevels_RequestSchema,
CPlayer_GetMiniProfileBackground_RequestSchema,
CPlayer_GetMutualFriendsForIncomingInvites_RequestSchema,
CPlayer_GetNewSteamAnnouncementState_RequestSchema,
CPlayer_GetNicknameList_RequestSchema,
CPlayer_GetOwnedGames_RequestSchema,
CPlayer_GetPerFriendPreferences_RequestSchema,
CPlayer_GetPlayerLinkDetails_RequestSchema,
CPlayer_GetPlayNext_RequestSchema,
CPlayer_GetPostedStatus_RequestSchema,
CPlayer_GetPrivacySettings_RequestSchema,
CPlayer_GetProfileBackground_RequestSchema,
CPlayer_GetProfileCustomization_RequestSchema,
CPlayer_GetProfileItemsEquipped_RequestSchema,
CPlayer_GetProfileItemsOwned_RequestSchema,
CPlayer_GetProfileThemesAvailable_RequestSchema,
CPlayer_GetPurchasedAndUpgradedProfileCustomizations_RequestSchema,
CPlayer_GetPurchasedProfileCustomizations_RequestSchema,
CPlayer_GetRecentPlaytimeSessionsForChild_RequestSchema,
CPlayer_GetSteamDeckKeyboardSkin_RequestSchema,
CPlayer_GetTextFilterWords_RequestSchema,
CPlayer_GetTimeSSAAccepted_RequestSchema,
CPlayer_GetTopAchievementsForGames_RequestSchema,
CPlayer_IgnoreFriend_RequestSchema,
CPlayer_PostStatusToFriends_RequestSchema,
CPlayer_RecordDisconnectedPlaytime_RequestSchema,
CPlayer_RemoveFriend_RequestSchema,
CPlayer_SetAnimatedAvatar_RequestSchema,
CPlayer_SetAvatarFrame_RequestSchema,
CPlayer_SetCommunityPreferences_RequestSchema,
CPlayer_SetEquippedProfileItemFlags_RequestSchema,
CPlayer_SetFavoriteBadge_RequestSchema,
CPlayer_SetMiniProfileBackground_RequestSchema,
CPlayer_SetPerFriendPreferences_RequestSchema,
CPlayer_SetProfileBackground_RequestSchema,
CPlayer_SetProfilePreferences_RequestSchema,
CPlayer_SetProfileTheme_RequestSchema,
CPlayer_SetSteamDeckKeyboardSkin_RequestSchema,
CPlayer_UpdateSteamAnnouncementLastRead_RequestSchema,
CPlayer_CommunityPreferencesChanged_NotificationSchema,
CPlayer_FriendEquippedProfileItemsChanged_NotificationSchema,
CPlayer_FriendNicknameChanged_NotificationSchema,
CPlayer_LastPlayedTimes_NotificationSchema,
CPlayer_NewSteamAnnouncementState_NotificationSchema,
CPlayer_PerFriendPreferencesChanged_NotificationSchema,
CPlayer_PrivacySettingsChanged_NotificationSchema,
CPlayer_TextFilterWordsChanged_NotificationSchema,
CNews_ConvertHTMLToBBCode_RequestSchema,
CNews_GetBatchPublishedPartnerEvent_RequestSchema,
CNews_GetNewsFeedByRepublishClan_RequestSchema,
CNews_PreviewPartnerEvents_RequestSchema,
CNews_PublishPartnerEvent_RequestSchema,
CLoyaltyRewards_AddReaction_RequestSchema,
CLoyaltyRewards_BatchedQueryRewardItems_RequestSchema,
CLoyaltyRewards_GetActivePurchaseBonuses_RequestSchema,
CLoyaltyRewards_GetEligibleApps_RequestSchema,
CLoyaltyRewards_GetEquippedProfileItems_RequestSchema,
CLoyaltyRewards_GetPointsForSpend_RequestSchema,
CLoyaltyRewards_GetProfileCustomizationsConfig_RequestSchema,
CLoyaltyRewards_GetReactionConfig_RequestSchema,
CLoyaltyRewards_GetReactions_RequestSchema,
CLoyaltyRewards_GetReactionsSummaryForUser_RequestSchema,
CLoyaltyRewards_GetSummary_RequestSchema,
CLoyaltyRewards_QueryRewardItems_RequestSchema,
CLoyaltyRewards_RedeemPoints_RequestSchema,
CLoyaltyRewards_RedeemPointsForBadgeLevel_RequestSchema,
CLoyaltyRewards_RedeemPointsForProfileCustomization_RequestSchema,
CLoyaltyRewards_RedeemPointsForProfileCustomizationUpgrade_RequestSchema,
CLoyaltyRewards_RedeemPointsToUpgradeItem_RequestSchema,
CLoyaltyRewards_RegisterForSteamDeckRewards_RequestSchema,
CFriendsList_GetCategories_RequestSchema,
CFriendsList_GetFavorites_RequestSchema,
CFriendsList_GetFriendsList_RequestSchema,
CFriendsList_SetFavorites_RequestSchema,
CFriendsList_FavoritesChanged_NotificationSchema,
CFriendMessages_AckMessage_NotificationSchema,
CFriendsMessages_GetActiveMessageSessions_RequestSchema,
CFriendMessages_GetRecentMessages_RequestSchema,
CFriendMessages_IsInFriendsUIBeta_RequestSchema,
CFriendMessages_SendMessage_RequestSchema,
CFriendMessages_UpdateMessageReaction_RequestSchema,
CFriendMessages_IncomingMessage_NotificationSchema,
CFriendMessages_MessageReaction_NotificationSchema,
CFamilyGroups_CancelFamilyGroupInvite_RequestSchema,
CFamilyGroups_ClearCooldownSkip_RequestSchema,
CFamilyGroups_ConfirmInviteToFamilyGroup_RequestSchema,
CFamilyGroups_ConfirmJoinFamilyGroup_RequestSchema,
CFamilyGroups_CreateFamilyGroup_RequestSchema,
CFamilyGroups_DeleteFamilyGroup_RequestSchema,
CFamilyGroups_ForceAcceptInvite_RequestSchema,
CFamilyGroups_GetChangeLog_RequestSchema,
CFamilyGroups_GetFamilyGroup_RequestSchema,
CFamilyGroups_GetFamilyGroupForUser_RequestSchema,
CFamilyGroups_GetInviteCheckResults_RequestSchema,
CFamilyGroups_GetPlaytimeSummary_RequestSchema,
CFamilyGroups_GetPreferredLenders_RequestSchema,
CFamilyGroups_GetPurchaseRequests_RequestSchema,
CFamilyGroups_GetSharedLibraryApps_RequestSchema,
CFamilyGroups_GetUsersSharingDevice_RequestSchema,
CFamilyGroups_InviteToFamilyGroup_RequestSchema,
CFamilyGroups_JoinFamilyGroup_RequestSchema,
CFamilyGroups_ModifyFamilyGroupDetails_RequestSchema,
CFamilyGroups_RemoveFromFamilyGroup_RequestSchema,
CFamilyGroups_RequestPurchase_RequestSchema,
CFamilyGroups_ResendInvitationToFamilyGroup_RequestSchema,
CFamilyGroups_RespondToRequestedPurchase_RequestSchema,
CFamilyGroups_SetFamilyCooldownOverrides_RequestSchema,
CFamilyGroups_SetPreferredLender_RequestSchema,
CFamilyGroups_UndeleteFamilyGroup_RequestSchema,
CFamilyGroupsClient_GroupChanged_NotificationSchema,
CFamilyGroupsClient_InviteStatus_NotificationSchema,
CFamilyGroupsClient_NotifyRunningApps_NotificationSchema,
CEcon_ClientGetItemShopOverlayAuthURL_RequestSchema,
CEcon_GetAssetClassInfo_RequestSchema,
CEcon_GetInventoryItemsWithDescriptions_RequestSchema,
CEcon_GetTradeOfferAccessToken_RequestSchema,
CCommunity_ClearSinglePartnerEventsAppPriority_RequestSchema,
CCommunity_ClearUserPartnerEventsAppPriorities_RequestSchema,
CCommunity_DeleteCommentFromThread_RequestSchema,
CCommunity_FetchTranslationFromCrowdIn_RequestSchema,
CCommunity_GetAppRichPresenceLocalization_RequestSchema,
CCommunity_GetApps_RequestSchema,
CCommunity_GetAvatarHistory_RequestSchema,
CCommunity_GetBestEventsForUser_RequestSchema,
CCommunity_GetClanAnnouncementVoteForUser_RequestSchema,
CCommunity_GetClanCrowdInMetadata_RequestSchema,
CCommunity_GetClanEventCrowdInMetadata_RequestSchema,
CCommunity_GetCommentThread_RequestSchema,
CCommunity_GetCommentThreadRatings_RequestSchema,
CCommunity_GetUserPartnerEventNews_RequestSchema,
CCommunity_GetUserPartnerEventsAppPriorities_RequestSchema,
CCommunity_GetUserPartnerEventViewStatus_RequestSchema,
CCommunity_MarkPartnerEventsForUser_RequestSchema,
CCommunity_PartnerEventsShowLessForApp_RequestSchema,
CCommunity_PartnerEventsShowMoreForApp_RequestSchema,
CCommunity_PostCommentToThread_RequestSchema,
CCommunity_RateClanAnnouncement_RequestSchema,
CCommunity_RateCommentThread_RequestSchema,
CCloudConfigStore_Download_RequestSchema,
CCloudConfigStore_Upload_RequestSchema,
CCloudConfigStore_Change_NotificationSchema,
CCloud_ClientLogUploadRequest_NotificationSchema,
CCloud_AppCloudStateChange_NotificationSchema,
CClientComm_EnableOrDisableDownloads_RequestSchema,
CClientComm_GetAllClientLogonInfo_RequestSchema,
CClientComm_GetClientAppList_RequestSchema,
CClientComm_GetClientInfo_RequestSchema,
CClientComm_GetClientLogonInfo_RequestSchema,
CClientComm_InstallClientApp_RequestSchema,
CClientComm_LaunchClientApp_RequestSchema,
CClientComm_SetClientAppUpdateState_RequestSchema,
CClientComm_UninstallClientApp_RequestSchema,
CAuthenticationSupport_GetTokenHistory_RequestSchema,
CAuthenticationSupport_MarkTokenCompromised_RequestSchema,
CAuthenticationSupport_QueryRefreshTokenByID_RequestSchema,
CAuthenticationSupport_QueryRefreshTokensByAccount_RequestSchema,
CAuthenticationSupport_RevokeToken_RequestSchema,
CAuthentication_BeginAuthSessionViaCredentials_RequestSchema,
CAuthentication_BeginAuthSessionViaQR_RequestSchema,
CAuthentication_RefreshToken_Enumerate_RequestSchema,
CAuthentication_AccessToken_GenerateForApp_RequestSchema,
CAuthentication_GetAuthSessionInfo_RequestSchema,
CAuthentication_GetAuthSessionRiskInfo_RequestSchema,
CAuthentication_GetAuthSessionsForAccount_RequestSchema,
CAuthentication_GetPasswordRSAPublicKey_RequestSchema,
CAuthentication_MigrateMobileSession_RequestSchema,
CAuthentication_PollAuthSessionStatus_RequestSchema,
CAuthentication_RefreshToken_Revoke_RequestSchema,
CAuthentication_Token_Revoke_RequestSchema,
CAuthentication_UpdateAuthSessionWithMobileConfirmation_RequestSchema,
CAuthentication_UpdateAuthSessionWithSteamGuardCode_RequestSchema,
CAchievements_GetInfo_RequestSchema,
CAccountPrivateApps_GetPrivateAppList_RequestSchema,
CAccountPrivateApps_ToggleAppPrivacy_RequestSchema,
CAccountPrivateApsClient_NotifyPrivateAppListChanged_NotificationSchema,
CAccountPrivacy_GetCookiePreferences_RequestSchema,
CWishlist_AddToWishlist_ResponseSchema,
CWishlist_GetWishlist_ResponseSchema,
CWishlist_GetWishlistItemCount_ResponseSchema,
CWishlist_GetWishlistItemsOnSale_ResponseSchema,
CWishlist_GetWishlistSortedFiltered_ResponseSchema,
CWishlist_RemoveFromWishlist_ResponseSchema,
CUserNews_GetAppDetailsSpotlight_ResponseSchema,
CUserNews_GetUserNews_ResponseSchema,
CUserGameNotes_DeleteNote_ResponseSchema,
CUserGameNotes_GetGamesWithNotes_ResponseSchema,
CUserGameNotes_GetNotesForGame_ResponseSchema,
CUserGameNotes_SaveNote_ResponseSchema,
CUserGameActivity_GetActivity_ResponseSchema,
CUserAccount_CancelLicenseForApp_ResponseSchema,
CUserAccount_CreateFriendInviteToken_ResponseSchema,
CUserAccount_GetAccountLinkStatus_ResponseSchema,
CUserAccount_GetAvailableValveDiscountPromotions_ResponseSchema,
CUserAccount_GetWalletDetails_ResponseSchema,
CUserAccount_GetFriendInviteTokens_ResponseSchema,
CUserAccount_GetUserCountry_ResponseSchema,
CUserAccount_RedeemFriendInviteToken_ResponseSchema,
CUserAccount_RegisterCompatTool_ResponseSchema,
CUserAccount_RevokeFriendInviteToken_ResponseSchema,
CUserAccount_ViewFriendInviteToken_ResponseSchema,
CStore_GetUserVotes_ResponseSchema,
CStore_GetVoteDefinitions_ResponseSchema,
CStore_GetVoteDefinitionsForEvents_ResponseSchema,
CStore_SetVote_ResponseSchema,
CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseSchema,
CStoreQuery_GetItemsByUserRecommendedTags_ResponseSchema,
CStoreQuery_Query_ResponseSchema,
CStoreQuery_SearchSuggestions_ResponseSchema,
CStoreMarketing_GetFrontPageConfig_ResponseSchema,
CStoreMarketing_GetItemsToFeature_ResponseSchema,
CStoreCatalog_GetDevPageAllAppsLinked_ResponseSchema,
CStoreBrowse_GetDLCForApps_ResponseSchema,
CStoreBrowse_GetDLCForAppsSolr_ResponseSchema,
CStoreBrowse_GetHardwareItems_ResponseSchema,
CStoreBrowse_GetItems_ResponseSchema,
CStoreBrowse_GetPriceStops_ResponseSchema,
CStoreBrowse_GetStoreCategories_ResponseSchema,
CStoreAppSimilarity_IdentifyClustersFromPlaytime_ResponseSchema,
CStoreAppSimilarity_PrioritizeAppsForUser_ResponseSchema,
CStore_DeleteReservationPositionMessage_ResponseSchema,
CStore_GetAllReservationPositionMessages_ResponseSchema,
CStore_GetDiscoveryQueue_ResponseSchema,
CStore_GetDiscoveryQueueSettings_ResponseSchema,
CStore_GetDiscoveryQueueSkippedApps_ResponseSchema,
CStore_GetLocalizedNameForTags_ResponseSchema,
CStore_GetMostPopularTags_ResponseSchema,
CStore_GetStorePreferences_ResponseSchema,
CStore_GetTagList_ResponseSchema,
CStore_GetTrendingAppsAmongFriends_ResponseSchema,
CStore_GetUserGameInterestState_ResponseSchema,
CStore_GetWishlistDemoEmailStatus_ResponseSchema,
CStore_QueueWishlistDemoEmailToFire_ResponseSchema,
CStore_RegisterCDKey_ResponseSchema,
CStore_ReportApp_ResponseSchema,
CSteamDeckCompatibility_SetFeedback_ResponseSchema,
CStore_SetReservationPositionMessage_ResponseSchema,
CSteamDeckCompatibility_ShouldPrompt_ResponseSchema,
CStore_SkipDiscoveryQueueItem_ResponseSchema,
CStore_UpdatePackageReservations_ResponseSchema,
NoResponseSchema,
CSteamNotification_GetPreferences_ResponseSchema,
CSteamNotification_GetSteamNotifications_ResponseSchema,
CSteamNotification_SetPreferences_ResponseSchema,
CSteamCharts_GetBestOfYearPages_ResponseSchema,
CSteamCharts_GetGamesByConcurrentPlayers_ResponseSchema,
CSteamCharts_GetMostPlayedGames_ResponseSchema,
CSteamCharts_GetMostPlayedSteamDeckGames_ResponseSchema,
CSteamCharts_GetTopReleasesPages_ResponseSchema,
CSteamAwards_GetNominationRecommendations_ResponseSchema,
CSteamAwards_GetNominationShareLink_ResponseSchema,
CSteamAwards_GetUserNominations_ResponseSchema,
CSteamAwards_Nominate_ResponseSchema,
CPublishing_CreatePartnerAppOptInEmail_ResponseSchema,
CPublishing_GetEstimatePartnerAppOptInEmail_ResponseSchema,
CPublishing_GetOptInAppealsSummaryStats_ResponseSchema,
CPublishing_GetOptInEmailTracking_ResponseSchema,
CPublishing_GetPartnerAppOptInEmailDefAndStats_ResponseSchema,
CPublishing_GetPartnerAppOptInsIDs_ResponseSchema,
CPublishing_GetPartnerOptInInvites_ResponseSchema,
CPublishing_GetPartnerPaidGivenPackageList_ResponseSchema,
CPublishing_GetSinglePartnerAppOptIns_ResponseSchema,
CPublishing_SendPartnerAppOptInEmailAndWait_ResponseSchema,
CPublishing_SetFeaturingOnPartnerAppOptIn_ResponseSchema,
CPublishing_TestFirePartnerAppOptInEmail_ResponseSchema,
CPublishing_UpdatePartnerAppOptInEmail_ResponseSchema,
CPublishedFile_AddAppRelationship_ResponseSchema,
CPublishedFile_AddChild_ResponseSchema,
CPublishedFile_AreFilesInSubscriptionList_ResponseSchema,
CPublishedFile_CanSubscribe_ResponseSchema,
CPublishedFile_Delete_ResponseSchema,
CPublishedFile_GetAppRelationships_ResponseSchema,
CPublishedFile_GetAppRelationshipsBatched_ResponseSchema,
CPublishedFile_GetChangeHistory_ResponseSchema,
CPublishedFile_GetChangeHistoryEntry_ResponseSchema,
CPublishedFile_GetContentDescriptors_ResponseSchema,
CPublishedFile_GetDetails_ResponseSchema,
CPublishedFile_GetItemChanges_ResponseSchema,
CPublishedFile_GetItemInfo_ResponseSchema,
CPublishedFile_GetSubSectionData_ResponseSchema,
CPublishedFile_GetUserFiles_ResponseSchema,
CPublishedFile_GetUserVoteSummary_ResponseSchema,
CPublishedFile_Publish_ResponseSchema,
CPublishedFile_QueryFiles_ResponseSchema,
CPublishedFile_RefreshVotingQueue_ResponseSchema,
CPublishedFile_RemoveAppRelationship_ResponseSchema,
CPublishedFile_RemoveChild_ResponseSchema,
CPublishedFile_SetCollectionChildren_ResponseSchema,
CPublishedFile_SetPlaytimeForControllerConfigs_ResponseSchema,
CPublishedFile_SetSubscriptionListFromCollection_ResponseSchema,
CPublishedFile_StartPlaytimeTracking_ResponseSchema,
CPublishedFile_StopPlaytimeTracking_ResponseSchema,
CPublishedFile_StopPlaytimeTrackingForAllAppItems_ResponseSchema,
CPublishedFile_Subscribe_ResponseSchema,
CPublishedFile_Unsubscribe_ResponseSchema,
CPublishedFile_Update_ResponseSchema,
CPublishedFile_UpdateContentDescriptors_ResponseSchema,
CPublishedFile_Vote_ResponseSchema,
CPlaytest_GetInvites_ResponseSchema,
CPlaytest_GetUserStatus_ResponseSchema,
CPlaytest_RequestInvite_ResponseSchema,
CPlaytest_UpdateInvites_ResponseSchema,
CPlayer_AcceptSSA_ResponseSchema,
CPlayer_AddFriend_ResponseSchema,
CPlayer_GetLastPlayedTimes_ResponseSchema,
CPlayer_DeletePostedStatus_ResponseSchema,
CPlayer_GetAchievementsProgress_ResponseSchema,
CPlayer_GetAnimatedAvatar_ResponseSchema,
CPlayer_GetAvatarFrame_ResponseSchema,
CPlayer_GetCommunityBadgeProgress_ResponseSchema,
CPlayer_GetCommunityPreferences_ResponseSchema,
CPlayer_GetDurationControl_ResponseSchema,
CPlayer_GetEmoticonList_ResponseSchema,
CPlayer_GetFavoriteBadge_ResponseSchema,
CPlayer_GetFriendsAppsActivity_ResponseSchema,
CPlayer_GetFriendsGameplayInfo_ResponseSchema,
CPlayer_GetGameAchievements_ResponseSchema,
CPlayer_GetGameBadgeLevels_ResponseSchema,
CPlayer_GetMiniProfileBackground_ResponseSchema,
CPlayer_GetMutualFriendsForIncomingInvites_ResponseSchema,
CPlayer_GetNewSteamAnnouncementState_ResponseSchema,
CPlayer_GetNicknameList_ResponseSchema,
CPlayer_GetOwnedGames_ResponseSchema,
CPlayer_GetPerFriendPreferences_ResponseSchema,
CPlayer_GetPlayerLinkDetails_ResponseSchema,
CPlayer_GetPlayNext_ResponseSchema,
CPlayer_GetPostedStatus_ResponseSchema,
CPlayer_GetPrivacySettings_ResponseSchema,
CPlayer_GetProfileBackground_ResponseSchema,
CPlayer_GetProfileCustomization_ResponseSchema,
CPlayer_GetProfileItemsEquipped_ResponseSchema,
CPlayer_GetProfileItemsOwned_ResponseSchema,
CPlayer_GetProfileThemesAvailable_ResponseSchema,
CPlayer_GetPurchasedAndUpgradedProfileCustomizations_ResponseSchema,
CPlayer_GetPurchasedProfileCustomizations_ResponseSchema,
CPlayer_GetRecentPlaytimeSessionsForChild_ResponseSchema,
CPlayer_GetSteamDeckKeyboardSkin_ResponseSchema,
CPlayer_GetTextFilterWords_ResponseSchema,
CPlayer_GetTimeSSAAccepted_ResponseSchema,
CPlayer_GetTopAchievementsForGames_ResponseSchema,
CPlayer_IgnoreFriend_ResponseSchema,
CPlayer_PostStatusToFriends_ResponseSchema,
CPlayer_RecordDisconnectedPlaytime_ResponseSchema,
CPlayer_RemoveFriend_ResponseSchema,
CPlayer_SetAnimatedAvatar_ResponseSchema,
CPlayer_SetAvatarFrame_ResponseSchema,
CPlayer_SetCommunityPreferences_ResponseSchema,
CPlayer_SetEquippedProfileItemFlags_ResponseSchema,
CPlayer_SetFavoriteBadge_ResponseSchema,
CPlayer_SetMiniProfileBackground_ResponseSchema,
CPlayer_SetPerFriendPreferences_ResponseSchema,
CPlayer_SetProfileBackground_ResponseSchema,
CPlayer_SetProfilePreferences_ResponseSchema,
CPlayer_SetProfileTheme_ResponseSchema,
CPlayer_SetSteamDeckKeyboardSkin_ResponseSchema,
CPlayer_UpdateSteamAnnouncementLastRead_ResponseSchema,
CNews_ConvertHTMLToBBCode_ResponseSchema,
CNews_GetBatchPublishedPartnerEvent_ResponseSchema,
CNews_GetNewsFeedByRepublishClan_ResponseSchema,
CNews_PreviewPartnerEvents_ResponseSchema,
CNews_PublishPartnerEvent_ResponseSchema,
CLoyaltyRewards_AddReaction_ResponseSchema,
CLoyaltyRewards_BatchedQueryRewardItems_ResponseSchema,
CLoyaltyRewards_GetActivePurchaseBonuses_ResponseSchema,
CLoyaltyRewards_GetEligibleApps_ResponseSchema,
CLoyaltyRewards_GetEquippedProfileItems_ResponseSchema,
CLoyaltyRewards_GetPointsForSpend_ResponseSchema,
CLoyaltyRewards_GetProfileCustomizationsConfig_ResponseSchema,
CLoyaltyRewards_GetReactionConfig_ResponseSchema,
CLoyaltyRewards_GetReactions_ResponseSchema,
CLoyaltyRewards_GetReactionsSummaryForUser_ResponseSchema,
CLoyaltyRewards_GetSummary_ResponseSchema,
CLoyaltyRewards_QueryRewardItems_ResponseSchema,
CLoyaltyRewards_RedeemPoints_ResponseSchema,
CLoyaltyRewards_RedeemPointsForProfileCustomization_ResponseSchema,
CLoyaltyRewards_RedeemPointsForProfileCustomizationUpgrade_ResponseSchema,
CLoyaltyRewards_RegisterForSteamDeckRewards_ResponseSchema,
CFriendsList_GetCategories_ResponseSchema,
CFriendsList_GetFavorites_ResponseSchema,
CFriendsList_GetFriendsList_ResponseSchema,
CFriendsList_SetFavorites_ResponseSchema,
CFriendsMessages_GetActiveMessageSessions_ResponseSchema,
CFriendMessages_GetRecentMessages_ResponseSchema,
CFriendMessages_IsInFriendsUIBeta_ResponseSchema,
CFriendMessages_SendMessage_ResponseSchema,
CFriendMessages_UpdateMessageReaction_ResponseSchema,
CFamilyGroups_CancelFamilyGroupInvite_ResponseSchema,
CFamilyGroups_ClearCooldownSkip_ResponseSchema,
CFamilyGroups_ConfirmInviteToFamilyGroup_ResponseSchema,
CFamilyGroups_ConfirmJoinFamilyGroup_ResponseSchema,
CFamilyGroups_CreateFamilyGroup_ResponseSchema,
CFamilyGroups_DeleteFamilyGroup_ResponseSchema,
CFamilyGroups_ForceAcceptInvite_ResponseSchema,
CFamilyGroups_GetChangeLog_ResponseSchema,
CFamilyGroups_GetFamilyGroup_ResponseSchema,
CFamilyGroups_GetFamilyGroupForUser_ResponseSchema,
CFamilyGroups_GetInviteCheckResults_ResponseSchema,
CFamilyGroups_GetPlaytimeSummary_ResponseSchema,
CFamilyGroups_GetPreferredLenders_ResponseSchema,
CFamilyGroups_GetPurchaseRequests_ResponseSchema,
CFamilyGroups_GetSharedLibraryApps_ResponseSchema,
CFamilyGroups_GetUsersSharingDevice_ResponseSchema,
CFamilyGroups_InviteToFamilyGroup_ResponseSchema,
CFamilyGroups_JoinFamilyGroup_ResponseSchema,
CFamilyGroups_ModifyFamilyGroupDetails_ResponseSchema,
CFamilyGroups_RemoveFromFamilyGroup_ResponseSchema,
CFamilyGroups_RequestPurchase_ResponseSchema,
CFamilyGroups_ResendInvitationToFamilyGroup_ResponseSchema,
CFamilyGroups_RespondToRequestedPurchase_ResponseSchema,
CFamilyGroups_SetFamilyCooldownOverrides_ResponseSchema,
CFamilyGroups_SetPreferredLender_ResponseSchema,
CFamilyGroups_UndeleteFamilyGroup_ResponseSchema,
CEcon_ClientGetItemShopOverlayAuthURL_ResponseSchema,
CEcon_GetAssetClassInfo_ResponseSchema,
CEcon_GetInventoryItemsWithDescriptions_ResponseSchema,
CEcon_GetTradeOfferAccessToken_ResponseSchema,
CCommunity_ClearSinglePartnerEventsAppPriority_ResponseSchema,
CCommunity_ClearUserPartnerEventsAppPriorities_ResponseSchema,
CCommunity_DeleteCommentFromThread_ResponseSchema,
CCommunity_FetchTranslationFromCrowdIn_ResponseSchema,
CCommunity_GetAppRichPresenceLocalization_ResponseSchema,
CCommunity_GetApps_ResponseSchema,
CCommunity_GetAvatarHistory_ResponseSchema,
CCommunity_GetBestEventsForUser_ResponseSchema,
CCommunity_GetClanAnnouncementVoteForUser_ResponseSchema,
CCommunity_GetClanCrowdInMetadata_ResponseSchema,
CCommunity_GetClanEventCrowdInMetadata_ResponseSchema,
CCommunity_GetCommentThread_ResponseSchema,
CCommunity_GetCommentThreadRatings_ResponseSchema,
CCommunity_GetUserPartnerEventNews_ResponseSchema,
CCommunity_GetUserPartnerEventsAppPriorities_ResponseSchema,
CCommunity_GetUserPartnerEventViewStatus_ResponseSchema,
CCommunity_MarkPartnerEventsForUser_ResponseSchema,
CCommunity_PartnerEventsShowLessForApp_ResponseSchema,
CCommunity_PartnerEventsShowMoreForApp_ResponseSchema,
CCommunity_PostCommentToThread_ResponseSchema,
CCommunity_RateClanAnnouncement_ResponseSchema,
CCommunity_RateCommentThread_ResponseSchema,
CCloudConfigStore_Download_ResponseSchema,
CCloudConfigStore_Upload_ResponseSchema,
CCloud_BeginAppUploadBatch_ResponseSchema,
CCloud_BeginHTTPUpload_ResponseSchema,
CCloud_BeginUGCUpload_ResponseSchema,
CCloud_ClientBeginFileUpload_ResponseSchema,
CCloud_ClientCommitFileUpload_ResponseSchema,
CCloud_ClientDeleteFile_ResponseSchema,
CCloud_ClientFileDownload_ResponseSchema,
CCloud_ClientGetAppQuotaUsage_ResponseSchema,
CCloud_CommitHTTPUpload_ResponseSchema,
CCloud_CommitUGCUpload_ResponseSchema,
CCloud_CompleteAppUploadBatch_ResponseSchema,
CCloud_Delete_ResponseSchema,
CCloud_EnumerateUserApps_ResponseSchema,
CCloud_EnumerateUserFiles_ResponseSchema,
CCloud_GetAppFileChangelist_ResponseSchema,
CCloud_GetClientEncryptionKey_ResponseSchema,
CCloud_GetFileDetails_ResponseSchema,
CCloud_GetUploadServerInfo_ResponseSchema,
CCloud_AppSessionResume_ResponseSchema,
CCloud_AppLaunchIntent_ResponseSchema,
CCloud_AppSessionSuspend_ResponseSchema,
CClientComm_EnableOrDisableDownloads_ResponseSchema,
CClientComm_GetAllClientLogonInfo_ResponseSchema,
CClientComm_GetClientAppList_ResponseSchema,
CClientComm_GetClientInfo_ResponseSchema,
CClientComm_GetClientLogonInfo_ResponseSchema,
CClientComm_InstallClientApp_ResponseSchema,
CClientComm_LaunchClientApp_ResponseSchema,
CClientComm_SetClientAppUpdateState_ResponseSchema,
CClientComm_UninstallClientApp_ResponseSchema,
CAuthenticationSupport_GetTokenHistory_ResponseSchema,
CAuthenticationSupport_MarkTokenCompromised_ResponseSchema,
CAuthenticationSupport_QueryRefreshTokenByID_ResponseSchema,
CAuthenticationSupport_QueryRefreshTokensByAccount_ResponseSchema,
CAuthenticationSupport_RevokeToken_ResponseSchema,
CAuthentication_BeginAuthSessionViaCredentials_ResponseSchema,
CAuthentication_BeginAuthSessionViaQR_ResponseSchema,
CAuthentication_RefreshToken_Enumerate_ResponseSchema,
CAuthentication_AccessToken_GenerateForApp_ResponseSchema,
CAuthentication_GetAuthSessionInfo_ResponseSchema,
CAuthentication_GetAuthSessionRiskInfo_ResponseSchema,
CAuthentication_GetAuthSessionsForAccount_ResponseSchema,
CAuthentication_GetPasswordRSAPublicKey_ResponseSchema,
CAuthentication_MigrateMobileSession_ResponseSchema,
CAuthentication_PollAuthSessionStatus_ResponseSchema,
CAuthentication_RefreshToken_Revoke_ResponseSchema,
CAuthentication_Token_Revoke_ResponseSchema,
CAuthentication_UpdateAuthSessionWithMobileConfirmation_ResponseSchema,
CAuthentication_UpdateAuthSessionWithSteamGuardCode_ResponseSchema,
CAchievements_GetInfo_ResponseSchema,
CAccountPrivateApps_GetPrivateAppList_ResponseSchema,
CAccountPrivateApps_ToggleAppPrivacy_ResponseSchema,
CAccountPrivacy_GetCookiePreferences_ResponseSchema
    } from "./types"
    
    
        
        export const steamStdServiceClazzMap = {
            
    Wishlist: {
    
        AddToWishlist: {
            req: CWishlist_AddToWishlist_RequestSchema,
            resp: CWishlist_AddToWishlist_ResponseSchema
        }
    ,
        GetWishlist: {
            req: CWishlist_GetWishlist_RequestSchema,
            resp: CWishlist_GetWishlist_ResponseSchema
        }
    ,
        GetWishlistItemCount: {
            req: CWishlist_GetWishlistItemCount_RequestSchema,
            resp: CWishlist_GetWishlistItemCount_ResponseSchema
        }
    ,
        GetWishlistItemsOnSale: {
            req: CWishlist_GetWishlistItemsOnSale_RequestSchema,
            resp: CWishlist_GetWishlistItemsOnSale_ResponseSchema
        }
    ,
        GetWishlistSortedFiltered: {
            req: CWishlist_GetWishlistSortedFiltered_RequestSchema,
            resp: CWishlist_GetWishlistSortedFiltered_ResponseSchema
        }
    ,
        RemoveFromWishlist: {
            req: CWishlist_RemoveFromWishlist_RequestSchema,
            resp: CWishlist_RemoveFromWishlist_ResponseSchema
        }
    
    }
    ,

    UserNews: {
    
        GetAppDetailsSpotlight: {
            req: CUserNews_GetAppDetailsSpotlight_RequestSchema,
            resp: CUserNews_GetAppDetailsSpotlight_ResponseSchema
        }
    ,
        GetUserNews: {
            req: CUserNews_GetUserNews_RequestSchema,
            resp: CUserNews_GetUserNews_ResponseSchema
        }
    
    }
    ,

    UserGameNotes: {
    
        DeleteNote: {
            req: CUserGameNotes_DeleteNote_RequestSchema,
            resp: CUserGameNotes_DeleteNote_ResponseSchema
        }
    ,
        GetGamesWithNotes: {
            req: CUserGameNotes_GetGamesWithNotes_RequestSchema,
            resp: CUserGameNotes_GetGamesWithNotes_ResponseSchema
        }
    ,
        GetNotesForGame: {
            req: CUserGameNotes_GetNotesForGame_RequestSchema,
            resp: CUserGameNotes_GetNotesForGame_ResponseSchema
        }
    ,
        SaveNote: {
            req: CUserGameNotes_SaveNote_RequestSchema,
            resp: CUserGameNotes_SaveNote_ResponseSchema
        }
    
    }
    ,

    UserGameActivity: {
    
        GetActivity: {
            req: CUserGameActivity_GetActivity_RequestSchema,
            resp: CUserGameActivity_GetActivity_ResponseSchema
        }
    
    }
    ,

    UserAccount: {
    
        CancelLicenseForApp: {
            req: CUserAccount_CancelLicenseForApp_RequestSchema,
            resp: CUserAccount_CancelLicenseForApp_ResponseSchema
        }
    ,
        CreateFriendInviteToken: {
            req: CUserAccount_CreateFriendInviteToken_RequestSchema,
            resp: CUserAccount_CreateFriendInviteToken_ResponseSchema
        }
    ,
        GetAccountLinkStatus: {
            req: CUserAccount_GetAccountLinkStatus_RequestSchema,
            resp: CUserAccount_GetAccountLinkStatus_ResponseSchema
        }
    ,
        GetAvailableValveDiscountPromotions: {
            req: CUserAccount_GetAvailableValveDiscountPromotions_RequestSchema,
            resp: CUserAccount_GetAvailableValveDiscountPromotions_ResponseSchema
        }
    ,
        GetClientWalletDetails: {
            req: CUserAccount_GetClientWalletDetails_RequestSchema,
            resp: CUserAccount_GetWalletDetails_ResponseSchema
        }
    ,
        GetFriendInviteTokens: {
            req: CUserAccount_GetFriendInviteTokens_RequestSchema,
            resp: CUserAccount_GetFriendInviteTokens_ResponseSchema
        }
    ,
        GetUserCountry: {
            req: CUserAccount_GetUserCountry_RequestSchema,
            resp: CUserAccount_GetUserCountry_ResponseSchema
        }
    ,
        RedeemFriendInviteToken: {
            req: CUserAccount_RedeemFriendInviteToken_RequestSchema,
            resp: CUserAccount_RedeemFriendInviteToken_ResponseSchema
        }
    ,
        RegisterCompatTool: {
            req: CUserAccount_RegisterCompatTool_RequestSchema,
            resp: CUserAccount_RegisterCompatTool_ResponseSchema
        }
    ,
        RevokeFriendInviteToken: {
            req: CUserAccount_RevokeFriendInviteToken_RequestSchema,
            resp: CUserAccount_RevokeFriendInviteToken_ResponseSchema
        }
    ,
        ViewFriendInviteToken: {
            req: CUserAccount_ViewFriendInviteToken_RequestSchema,
            resp: CUserAccount_ViewFriendInviteToken_ResponseSchema
        }
    
    }
    ,

    StoreSales: {
    
        GetUserVotes: {
            req: CStore_GetUserVotes_RequestSchema,
            resp: CStore_GetUserVotes_ResponseSchema
        }
    ,
        GetVoteDefinitions: {
            req: CStore_GetVoteDefinitions_RequestSchema,
            resp: CStore_GetVoteDefinitions_ResponseSchema
        }
    ,
        GetVoteDefinitionsForEvents: {
            req: NotImplementedSchema,
            resp: CStore_GetVoteDefinitionsForEvents_ResponseSchema
        }
    ,
        SetVote: {
            req: CStore_SetVote_RequestSchema,
            resp: CStore_SetVote_ResponseSchema
        }
    
    }
    ,

    StoreQuery: {
    
        GetItemByUserCombinedTagsPriority: {
            req: CStoreQuery_GetItemByUserCombinedTagsPriority_RequestSchema,
            resp: CStoreQuery_GetItemByUserCombinedTagsPriority_ResponseSchema
        }
    ,
        GetItemsByUserRecommendedTags: {
            req: CStoreQuery_GetItemsByUserRecommendedTags_RequestSchema,
            resp: CStoreQuery_GetItemsByUserRecommendedTags_ResponseSchema
        }
    ,
        Query: {
            req: CStoreQuery_Query_RequestSchema,
            resp: CStoreQuery_Query_ResponseSchema
        }
    ,
        SearchSuggestions: {
            req: CStoreQuery_SearchSuggestions_RequestSchema,
            resp: CStoreQuery_SearchSuggestions_ResponseSchema
        }
    
    }
    ,

    StoreMarketing: {
    
        GetFrontPageConfig: {
            req: CStoreMarketing_GetFrontPageConfig_RequestSchema,
            resp: CStoreMarketing_GetFrontPageConfig_ResponseSchema
        }
    ,
        GetItemsToFeature: {
            req: CStoreMarketing_GetItemsToFeature_RequestSchema,
            resp: CStoreMarketing_GetItemsToFeature_ResponseSchema
        }
    
    }
    ,

    StoreCatalog: {
    
        GetDevPageAllAppsLinked: {
            req: CStoreCatalog_GetDevPageAllAppsLinked_RequestSchema,
            resp: CStoreCatalog_GetDevPageAllAppsLinked_ResponseSchema
        }
    
    }
    ,

    StoreBrowse: {
    
        GetDLCForApps: {
            req: CStoreBrowse_GetDLCForApps_RequestSchema,
            resp: CStoreBrowse_GetDLCForApps_ResponseSchema
        }
    ,
        GetDLCForAppsSolr: {
            req: CStoreBrowse_GetDLCForAppsSolr_RequestSchema,
            resp: CStoreBrowse_GetDLCForAppsSolr_ResponseSchema
        }
    ,
        GetHardwareItems: {
            req: CStoreBrowse_GetHardwareItems_RequestSchema,
            resp: CStoreBrowse_GetHardwareItems_ResponseSchema
        }
    ,
        GetItems: {
            req: CStoreBrowse_GetItems_RequestSchema,
            resp: CStoreBrowse_GetItems_ResponseSchema
        }
    ,
        GetPriceStops: {
            req: CStoreBrowse_GetPriceStops_RequestSchema,
            resp: CStoreBrowse_GetPriceStops_ResponseSchema
        }
    ,
        GetStoreCategories: {
            req: CStoreBrowse_GetStoreCategories_RequestSchema,
            resp: CStoreBrowse_GetStoreCategories_ResponseSchema
        }
    
    }
    ,

    StoreAppSimilarity: {
    
        IdentifyClustersFromPlaytime: {
            req: CStoreAppSimilarity_IdentifyClustersFromPlaytime_RequestSchema,
            resp: CStoreAppSimilarity_IdentifyClustersFromPlaytime_ResponseSchema
        }
    ,
        PrioritizeAppsForUser: {
            req: CStoreAppSimilarity_PrioritizeAppsForUser_RequestSchema,
            resp: CStoreAppSimilarity_PrioritizeAppsForUser_ResponseSchema
        }
    
    }
    ,

    Store: {
    
        DeleteReservationPositionMessage: {
            req: CStore_DeleteReservationPositionMessage_RequestSchema,
            resp: CStore_DeleteReservationPositionMessage_ResponseSchema
        }
    ,
        GetAllReservationPositionMessages: {
            req: CStore_GetAllReservationPositionMessages_RequestSchema,
            resp: CStore_GetAllReservationPositionMessages_ResponseSchema
        }
    ,
        GetDiscoveryQueue: {
            req: CStore_GetDiscoveryQueue_RequestSchema,
            resp: CStore_GetDiscoveryQueue_ResponseSchema
        }
    ,
        GetDiscoveryQueueSettings: {
            req: CStore_GetDiscoveryQueueSettings_RequestSchema,
            resp: CStore_GetDiscoveryQueueSettings_ResponseSchema
        }
    ,
        GetDiscoveryQueueSkippedApps: {
            req: CStore_GetDiscoveryQueueSkippedApps_RequestSchema,
            resp: CStore_GetDiscoveryQueueSkippedApps_ResponseSchema
        }
    ,
        GetLocalizedNameForTags: {
            req: CStore_GetLocalizedNameForTags_RequestSchema,
            resp: CStore_GetLocalizedNameForTags_ResponseSchema
        }
    ,
        GetMostPopularTags: {
            req: CStore_GetMostPopularTags_RequestSchema,
            resp: CStore_GetMostPopularTags_ResponseSchema
        }
    ,
        GetStorePreferences: {
            req: CStore_GetStorePreferences_RequestSchema,
            resp: CStore_GetStorePreferences_ResponseSchema
        }
    ,
        GetTagList: {
            req: CStore_GetTagList_RequestSchema,
            resp: CStore_GetTagList_ResponseSchema
        }
    ,
        GetTrendingAppsAmongFriends: {
            req: CStore_GetTrendingAppsAmongFriends_RequestSchema,
            resp: CStore_GetTrendingAppsAmongFriends_ResponseSchema
        }
    ,
        GetUserGameInterestState: {
            req: CStore_GetUserGameInterestState_RequestSchema,
            resp: CStore_GetUserGameInterestState_ResponseSchema
        }
    ,
        GetWishlistDemoEmailStatus: {
            req: CStore_GetWishlistDemoEmailStatus_RequestSchema,
            resp: CStore_GetWishlistDemoEmailStatus_ResponseSchema
        }
    ,
        QueueWishlistDemoEmailToFire: {
            req: CStore_QueueWishlistDemoEmailToFire_RequestSchema,
            resp: CStore_QueueWishlistDemoEmailToFire_ResponseSchema
        }
    ,
        RegisterCDKey: {
            req: CStore_RegisterCDKey_RequestSchema,
            resp: CStore_RegisterCDKey_ResponseSchema
        }
    ,
        ReportApp: {
            req: CStore_ReportApp_RequestSchema,
            resp: CStore_ReportApp_ResponseSchema
        }
    ,
        SetCompatibilityFeedback: {
            req: CSteamDeckCompatibility_SetFeedback_RequestSchema,
            resp: CSteamDeckCompatibility_SetFeedback_ResponseSchema
        }
    ,
        SetReservationPositionMessage: {
            req: CStore_SetReservationPositionMessage_RequestSchema,
            resp: CStore_SetReservationPositionMessage_ResponseSchema
        }
    ,
        ShouldPromptForCompatibilityFeedback: {
            req: CSteamDeckCompatibility_ShouldPrompt_RequestSchema,
            resp: CSteamDeckCompatibility_ShouldPrompt_ResponseSchema
        }
    ,
        SkipDiscoveryQueueItem: {
            req: CStore_SkipDiscoveryQueueItem_RequestSchema,
            resp: CStore_SkipDiscoveryQueueItem_ResponseSchema
        }
    ,
        UpdatePackageReservations: {
            req: CStore_UpdatePackageReservations_RequestSchema,
            resp: CStore_UpdatePackageReservations_ResponseSchema
        }
    
    }
    ,

    StoreClient: {
    
        NotifyStorePreferencesChanged: {
            req: CStore_StorePreferencesChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    SteamNotification: {
    
        GetPreferences: {
            req: CSteamNotification_GetPreferences_RequestSchema,
            resp: CSteamNotification_GetPreferences_ResponseSchema
        }
    ,
        GetSteamNotifications: {
            req: CSteamNotification_GetSteamNotifications_RequestSchema,
            resp: CSteamNotification_GetSteamNotifications_ResponseSchema
        }
    ,
        SetPreferences: {
            req: CSteamNotification_SetPreferences_RequestSchema,
            resp: CSteamNotification_SetPreferences_ResponseSchema
        }
    
    }
    ,

    SteamNotificationClient: {
    
        NotificationsReceived: {
            req: CSteamNotification_NotificationsReceived_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        PreferencesUpdated: {
            req: CSteamNotification_PreferencesUpdated_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    SteamCharts: {
    
        GetBestOfYearPages: {
            req: CSteamCharts_GetBestOfYearPages_RequestSchema,
            resp: CSteamCharts_GetBestOfYearPages_ResponseSchema
        }
    ,
        GetGamesByConcurrentPlayers: {
            req: CSteamCharts_GetGamesByConcurrentPlayers_RequestSchema,
            resp: CSteamCharts_GetGamesByConcurrentPlayers_ResponseSchema
        }
    ,
        GetMostPlayedGames: {
            req: CSteamCharts_GetMostPlayedGames_RequestSchema,
            resp: CSteamCharts_GetMostPlayedGames_ResponseSchema
        }
    ,
        GetMostPlayedSteamDeckGames: {
            req: CSteamCharts_GetMostPlayedSteamDeckGames_RequestSchema,
            resp: CSteamCharts_GetMostPlayedSteamDeckGames_ResponseSchema
        }
    ,
        GetTopReleasesPages: {
            req: CSteamCharts_GetTopReleasesPages_RequestSchema,
            resp: CSteamCharts_GetTopReleasesPages_ResponseSchema
        }
    
    }
    ,

    SteamAwards: {
    
        GetNominationRecommendations: {
            req: CSteamAwards_GetNominationRecommendations_RequestSchema,
            resp: CSteamAwards_GetNominationRecommendations_ResponseSchema
        }
    ,
        GetNominationShareLink: {
            req: CSteamAwards_GetNominationShareLink_RequestSchema,
            resp: CSteamAwards_GetNominationShareLink_ResponseSchema
        }
    ,
        GetOtherUserNominations: {
            req: CSteamAwards_GetOtherUserNominations_RequestSchema,
            resp: CSteamAwards_GetUserNominations_ResponseSchema
        }
    ,
        GetUserNominations: {
            req: CSteamAwards_GetUserNominations_RequestSchema,
            resp: CSteamAwards_GetUserNominations_ResponseSchema
        }
    ,
        Nominate: {
            req: CSteamAwards_Nominate_RequestSchema,
            resp: CSteamAwards_Nominate_ResponseSchema
        }
    
    }
    ,

    Publishing: {
    
        CreatePartnerAppOptInEmails: {
            req: CPublishing_CreatePartnerAppOptInEmail_RequestSchema,
            resp: CPublishing_CreatePartnerAppOptInEmail_ResponseSchema
        }
    ,
        GetEstimatePartnerAppOptInEmail: {
            req: CPublishing_GetEstimatePartnerAppOptInEmail_RequestSchema,
            resp: CPublishing_GetEstimatePartnerAppOptInEmail_ResponseSchema
        }
    ,
        GetOptInAppealsSummaryStats: {
            req: CPublishing_GetOptInAppealsSummaryStats_RequestSchema,
            resp: CPublishing_GetOptInAppealsSummaryStats_ResponseSchema
        }
    ,
        GetOptInEmailTracking: {
            req: CPublishing_GetOptInEmailTracking_RequestSchema,
            resp: CPublishing_GetOptInEmailTracking_ResponseSchema
        }
    ,
        GetPartnerAppOptInEmailDefAndStats: {
            req: CPublishing_GetPartnerAppOptInEmailDefAndStats_RequestSchema,
            resp: CPublishing_GetPartnerAppOptInEmailDefAndStats_ResponseSchema
        }
    ,
        GetPartnerAppOptInsIDs: {
            req: CPublishing_GetPartnerAppOptInsIDs_RequestSchema,
            resp: CPublishing_GetPartnerAppOptInsIDs_ResponseSchema
        }
    ,
        GetPartnerOptInInvites: {
            req: NotImplementedSchema,
            resp: CPublishing_GetPartnerOptInInvites_ResponseSchema
        }
    ,
        GetPartnerPaidGivenPackageList: {
            req: CPublishing_GetPartnerPaidGivenPackageList_RequestSchema,
            resp: CPublishing_GetPartnerPaidGivenPackageList_ResponseSchema
        }
    ,
        GetSinglePartnerAppOptIn: {
            req: CPublishing_GetSinglePartnerAppOptIns_RequestSchema,
            resp: CPublishing_GetSinglePartnerAppOptIns_ResponseSchema
        }
    ,
        SendPartnerOptInEmailAndWait: {
            req: CPublishing_SendPartnerAppOptInEmailAndWait_RequestSchema,
            resp: CPublishing_SendPartnerAppOptInEmailAndWait_ResponseSchema
        }
    ,
        SetFeaturingOnPartnerAppOptIn: {
            req: CPublishing_SetFeaturingOnPartnerAppOptIn_RequestSchema,
            resp: CPublishing_SetFeaturingOnPartnerAppOptIn_ResponseSchema
        }
    ,
        TestFirePartnerAppOptInEmail: {
            req: CPublishing_TestFirePartnerAppOptInEmail_RequestSchema,
            resp: CPublishing_TestFirePartnerAppOptInEmail_ResponseSchema
        }
    ,
        UpdatePartnerAppOptInEmails: {
            req: CPublishing_UpdatePartnerAppOptInEmail_RequestSchema,
            resp: CPublishing_UpdatePartnerAppOptInEmail_ResponseSchema
        }
    
    }
    ,

    PublishedFile: {
    
        AddAppRelationship: {
            req: CPublishedFile_AddAppRelationship_RequestSchema,
            resp: CPublishedFile_AddAppRelationship_ResponseSchema
        }
    ,
        AddChild: {
            req: CPublishedFile_AddChild_RequestSchema,
            resp: CPublishedFile_AddChild_ResponseSchema
        }
    ,
        AreFilesInSubscriptionList: {
            req: CPublishedFile_AreFilesInSubscriptionList_RequestSchema,
            resp: CPublishedFile_AreFilesInSubscriptionList_ResponseSchema
        }
    ,
        CanSubscribe: {
            req: CPublishedFile_CanSubscribe_RequestSchema,
            resp: CPublishedFile_CanSubscribe_ResponseSchema
        }
    ,
        Delete: {
            req: CPublishedFile_Delete_RequestSchema,
            resp: CPublishedFile_Delete_ResponseSchema
        }
    ,
        GetAppRelationships: {
            req: CPublishedFile_GetAppRelationships_RequestSchema,
            resp: CPublishedFile_GetAppRelationships_ResponseSchema
        }
    ,
        GetAppRelationshipsBatched: {
            req: CPublishedFile_GetAppRelationshipsBatched_RequestSchema,
            resp: CPublishedFile_GetAppRelationshipsBatched_ResponseSchema
        }
    ,
        GetChangeHistory: {
            req: CPublishedFile_GetChangeHistory_RequestSchema,
            resp: CPublishedFile_GetChangeHistory_ResponseSchema
        }
    ,
        GetChangeHistoryEntry: {
            req: CPublishedFile_GetChangeHistoryEntry_RequestSchema,
            resp: CPublishedFile_GetChangeHistoryEntry_ResponseSchema
        }
    ,
        GetContentDescriptors: {
            req: CPublishedFile_GetContentDescriptors_RequestSchema,
            resp: CPublishedFile_GetContentDescriptors_ResponseSchema
        }
    ,
        GetDetails: {
            req: CPublishedFile_GetDetails_RequestSchema,
            resp: CPublishedFile_GetDetails_ResponseSchema
        }
    ,
        GetItemChanges: {
            req: CPublishedFile_GetItemChanges_RequestSchema,
            resp: CPublishedFile_GetItemChanges_ResponseSchema
        }
    ,
        GetItemInfo: {
            req: CPublishedFile_GetItemInfo_RequestSchema,
            resp: CPublishedFile_GetItemInfo_ResponseSchema
        }
    ,
        GetSubSectionData: {
            req: CPublishedFile_GetSubSectionData_RequestSchema,
            resp: CPublishedFile_GetSubSectionData_ResponseSchema
        }
    ,
        GetUserFileCount: {
            req: CPublishedFile_GetUserFiles_RequestSchema,
            resp: CPublishedFile_GetUserFiles_ResponseSchema
        }
    ,
        GetUserFiles: {
            req: CPublishedFile_GetUserFiles_RequestSchema,
            resp: CPublishedFile_GetUserFiles_ResponseSchema
        }
    ,
        GetUserVoteSummary: {
            req: CPublishedFile_GetUserVoteSummary_RequestSchema,
            resp: CPublishedFile_GetUserVoteSummary_ResponseSchema
        }
    ,
        Publish: {
            req: CPublishedFile_Publish_RequestSchema,
            resp: CPublishedFile_Publish_ResponseSchema
        }
    ,
        QueryFiles: {
            req: CPublishedFile_QueryFiles_RequestSchema,
            resp: CPublishedFile_QueryFiles_ResponseSchema
        }
    ,
        RefreshVotingQueue: {
            req: CPublishedFile_RefreshVotingQueue_RequestSchema,
            resp: CPublishedFile_RefreshVotingQueue_ResponseSchema
        }
    ,
        RemoveAppRelationship: {
            req: CPublishedFile_RemoveAppRelationship_RequestSchema,
            resp: CPublishedFile_RemoveAppRelationship_ResponseSchema
        }
    ,
        RemoveChild: {
            req: CPublishedFile_RemoveChild_RequestSchema,
            resp: CPublishedFile_RemoveChild_ResponseSchema
        }
    ,
        SetCollectionChildren: {
            req: CPublishedFile_SetCollectionChildren_RequestSchema,
            resp: CPublishedFile_SetCollectionChildren_ResponseSchema
        }
    ,
        SetPlaytimeForControllerConfigs: {
            req: CPublishedFile_SetPlaytimeForControllerConfigs_RequestSchema,
            resp: CPublishedFile_SetPlaytimeForControllerConfigs_ResponseSchema
        }
    ,
        SetSubscriptionListFromCollection: {
            req: CPublishedFile_SetSubscriptionListFromCollection_RequestSchema,
            resp: CPublishedFile_SetSubscriptionListFromCollection_ResponseSchema
        }
    ,
        StartPlaytimeTracking: {
            req: CPublishedFile_StartPlaytimeTracking_RequestSchema,
            resp: CPublishedFile_StartPlaytimeTracking_ResponseSchema
        }
    ,
        StopPlaytimeTracking: {
            req: CPublishedFile_StopPlaytimeTracking_RequestSchema,
            resp: CPublishedFile_StopPlaytimeTracking_ResponseSchema
        }
    ,
        StopPlaytimeTrackingForAllAppItems: {
            req: CPublishedFile_StopPlaytimeTrackingForAllAppItems_RequestSchema,
            resp: CPublishedFile_StopPlaytimeTrackingForAllAppItems_ResponseSchema
        }
    ,
        Subscribe: {
            req: CPublishedFile_Subscribe_RequestSchema,
            resp: CPublishedFile_Subscribe_ResponseSchema
        }
    ,
        Unsubscribe: {
            req: CPublishedFile_Unsubscribe_RequestSchema,
            resp: CPublishedFile_Unsubscribe_ResponseSchema
        }
    ,
        Update: {
            req: CPublishedFile_Update_RequestSchema,
            resp: CPublishedFile_Update_ResponseSchema
        }
    ,
        UpdateContentDescriptors: {
            req: CPublishedFile_UpdateContentDescriptors_RequestSchema,
            resp: CPublishedFile_UpdateContentDescriptors_ResponseSchema
        }
    ,
        Vote: {
            req: CPublishedFile_Vote_RequestSchema,
            resp: CPublishedFile_Vote_ResponseSchema
        }
    
    }
    ,

    PublishedFileClient: {
    
        NotifyFileDeleted: {
            req: CPublishedFile_FileDeleted_Client_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyFileSubscribed: {
            req: CPublishedFile_FileSubscribed_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyFileUnsubscribed: {
            req: CPublishedFile_FileUnsubscribed_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    Playtest: {
    
        GetInvites: {
            req: CPlaytest_GetInvites_RequestSchema,
            resp: CPlaytest_GetInvites_ResponseSchema
        }
    ,
        GetUserStatus: {
            req: CPlaytest_GetUserStatus_RequestSchema,
            resp: CPlaytest_GetUserStatus_ResponseSchema
        }
    ,
        RequestInvite: {
            req: CPlaytest_RequestInvite_RequestSchema,
            resp: CPlaytest_RequestInvite_ResponseSchema
        }
    ,
        UpdateInvites: {
            req: CPlaytest_UpdateInvites_RequestSchema,
            resp: CPlaytest_UpdateInvites_ResponseSchema
        }
    
    }
    ,

    Player: {
    
        AcceptSSA: {
            req: CPlayer_AcceptSSA_RequestSchema,
            resp: CPlayer_AcceptSSA_ResponseSchema
        }
    ,
        AddFriend: {
            req: CPlayer_AddFriend_RequestSchema,
            resp: CPlayer_AddFriend_ResponseSchema
        }
    ,
        ClientGetLastPlayedTimes: {
            req: CPlayer_GetLastPlayedTimes_RequestSchema,
            resp: CPlayer_GetLastPlayedTimes_ResponseSchema
        }
    ,
        DeletePostedStatus: {
            req: CPlayer_DeletePostedStatus_RequestSchema,
            resp: CPlayer_DeletePostedStatus_ResponseSchema
        }
    ,
        GetAchievementsProgress: {
            req: CPlayer_GetAchievementsProgress_RequestSchema,
            resp: CPlayer_GetAchievementsProgress_ResponseSchema
        }
    ,
        GetAnimatedAvatar: {
            req: CPlayer_GetAnimatedAvatar_RequestSchema,
            resp: CPlayer_GetAnimatedAvatar_ResponseSchema
        }
    ,
        GetAvatarFrame: {
            req: CPlayer_GetAvatarFrame_RequestSchema,
            resp: CPlayer_GetAvatarFrame_ResponseSchema
        }
    ,
        GetCommunityBadgeProgress: {
            req: CPlayer_GetCommunityBadgeProgress_RequestSchema,
            resp: CPlayer_GetCommunityBadgeProgress_ResponseSchema
        }
    ,
        GetCommunityPreferences: {
            req: CPlayer_GetCommunityPreferences_RequestSchema,
            resp: CPlayer_GetCommunityPreferences_ResponseSchema
        }
    ,
        GetDurationControl: {
            req: CPlayer_GetDurationControl_RequestSchema,
            resp: CPlayer_GetDurationControl_ResponseSchema
        }
    ,
        GetEmoticonList: {
            req: CPlayer_GetEmoticonList_RequestSchema,
            resp: CPlayer_GetEmoticonList_ResponseSchema
        }
    ,
        GetFavoriteBadge: {
            req: CPlayer_GetFavoriteBadge_RequestSchema,
            resp: CPlayer_GetFavoriteBadge_ResponseSchema
        }
    ,
        GetFriendsAppsActivity: {
            req: CPlayer_GetFriendsAppsActivity_RequestSchema,
            resp: CPlayer_GetFriendsAppsActivity_ResponseSchema
        }
    ,
        GetFriendsGameplayInfo: {
            req: CPlayer_GetFriendsGameplayInfo_RequestSchema,
            resp: CPlayer_GetFriendsGameplayInfo_ResponseSchema
        }
    ,
        GetGameAchievements: {
            req: CPlayer_GetGameAchievements_RequestSchema,
            resp: CPlayer_GetGameAchievements_ResponseSchema
        }
    ,
        GetGameBadgeLevels: {
            req: CPlayer_GetGameBadgeLevels_RequestSchema,
            resp: CPlayer_GetGameBadgeLevels_ResponseSchema
        }
    ,
        GetMiniProfileBackground: {
            req: CPlayer_GetMiniProfileBackground_RequestSchema,
            resp: CPlayer_GetMiniProfileBackground_ResponseSchema
        }
    ,
        GetMutualFriendsForIncomingInvites: {
            req: CPlayer_GetMutualFriendsForIncomingInvites_RequestSchema,
            resp: CPlayer_GetMutualFriendsForIncomingInvites_ResponseSchema
        }
    ,
        GetNewSteamAnnouncementState: {
            req: CPlayer_GetNewSteamAnnouncementState_RequestSchema,
            resp: CPlayer_GetNewSteamAnnouncementState_ResponseSchema
        }
    ,
        GetNicknameList: {
            req: CPlayer_GetNicknameList_RequestSchema,
            resp: CPlayer_GetNicknameList_ResponseSchema
        }
    ,
        GetOwnedGames: {
            req: CPlayer_GetOwnedGames_RequestSchema,
            resp: CPlayer_GetOwnedGames_ResponseSchema
        }
    ,
        GetPerFriendPreferences: {
            req: CPlayer_GetPerFriendPreferences_RequestSchema,
            resp: CPlayer_GetPerFriendPreferences_ResponseSchema
        }
    ,
        GetPlayerLinkDetails: {
            req: CPlayer_GetPlayerLinkDetails_RequestSchema,
            resp: CPlayer_GetPlayerLinkDetails_ResponseSchema
        }
    ,
        GetPlayNext: {
            req: CPlayer_GetPlayNext_RequestSchema,
            resp: CPlayer_GetPlayNext_ResponseSchema
        }
    ,
        GetPostedStatus: {
            req: CPlayer_GetPostedStatus_RequestSchema,
            resp: CPlayer_GetPostedStatus_ResponseSchema
        }
    ,
        GetPrivacySettings: {
            req: CPlayer_GetPrivacySettings_RequestSchema,
            resp: CPlayer_GetPrivacySettings_ResponseSchema
        }
    ,
        GetProfileBackground: {
            req: CPlayer_GetProfileBackground_RequestSchema,
            resp: CPlayer_GetProfileBackground_ResponseSchema
        }
    ,
        GetProfileCustomization: {
            req: CPlayer_GetProfileCustomization_RequestSchema,
            resp: CPlayer_GetProfileCustomization_ResponseSchema
        }
    ,
        GetProfileItemsEquipped: {
            req: CPlayer_GetProfileItemsEquipped_RequestSchema,
            resp: CPlayer_GetProfileItemsEquipped_ResponseSchema
        }
    ,
        GetProfileItemsOwned: {
            req: CPlayer_GetProfileItemsOwned_RequestSchema,
            resp: CPlayer_GetProfileItemsOwned_ResponseSchema
        }
    ,
        GetProfileThemesAvailable: {
            req: CPlayer_GetProfileThemesAvailable_RequestSchema,
            resp: CPlayer_GetProfileThemesAvailable_ResponseSchema
        }
    ,
        GetPurchasedAndUpgradedProfileCustomizations: {
            req: CPlayer_GetPurchasedAndUpgradedProfileCustomizations_RequestSchema,
            resp: CPlayer_GetPurchasedAndUpgradedProfileCustomizations_ResponseSchema
        }
    ,
        GetPurchasedProfileCustomizations: {
            req: CPlayer_GetPurchasedProfileCustomizations_RequestSchema,
            resp: CPlayer_GetPurchasedProfileCustomizations_ResponseSchema
        }
    ,
        GetRecentPlaytimeSessionsForChild: {
            req: CPlayer_GetRecentPlaytimeSessionsForChild_RequestSchema,
            resp: CPlayer_GetRecentPlaytimeSessionsForChild_ResponseSchema
        }
    ,
        GetSteamDeckKeyboardSkin: {
            req: CPlayer_GetSteamDeckKeyboardSkin_RequestSchema,
            resp: CPlayer_GetSteamDeckKeyboardSkin_ResponseSchema
        }
    ,
        GetTextFilterWords: {
            req: CPlayer_GetTextFilterWords_RequestSchema,
            resp: CPlayer_GetTextFilterWords_ResponseSchema
        }
    ,
        GetTimeSSAAccepted: {
            req: CPlayer_GetTimeSSAAccepted_RequestSchema,
            resp: CPlayer_GetTimeSSAAccepted_ResponseSchema
        }
    ,
        GetTopAchievementsForGames: {
            req: CPlayer_GetTopAchievementsForGames_RequestSchema,
            resp: CPlayer_GetTopAchievementsForGames_ResponseSchema
        }
    ,
        IgnoreFriend: {
            req: CPlayer_IgnoreFriend_RequestSchema,
            resp: CPlayer_IgnoreFriend_ResponseSchema
        }
    ,
        PostStatusToFriends: {
            req: CPlayer_PostStatusToFriends_RequestSchema,
            resp: CPlayer_PostStatusToFriends_ResponseSchema
        }
    ,
        RecordDisconnectedPlaytime: {
            req: CPlayer_RecordDisconnectedPlaytime_RequestSchema,
            resp: CPlayer_RecordDisconnectedPlaytime_ResponseSchema
        }
    ,
        RemoveFriend: {
            req: CPlayer_RemoveFriend_RequestSchema,
            resp: CPlayer_RemoveFriend_ResponseSchema
        }
    ,
        SetAnimatedAvatar: {
            req: CPlayer_SetAnimatedAvatar_RequestSchema,
            resp: CPlayer_SetAnimatedAvatar_ResponseSchema
        }
    ,
        SetAvatarFrame: {
            req: CPlayer_SetAvatarFrame_RequestSchema,
            resp: CPlayer_SetAvatarFrame_ResponseSchema
        }
    ,
        SetCommunityPreferences: {
            req: CPlayer_SetCommunityPreferences_RequestSchema,
            resp: CPlayer_SetCommunityPreferences_ResponseSchema
        }
    ,
        SetEquippedProfileItemFlags: {
            req: CPlayer_SetEquippedProfileItemFlags_RequestSchema,
            resp: CPlayer_SetEquippedProfileItemFlags_ResponseSchema
        }
    ,
        SetFavoriteBadge: {
            req: CPlayer_SetFavoriteBadge_RequestSchema,
            resp: CPlayer_SetFavoriteBadge_ResponseSchema
        }
    ,
        SetMiniProfileBackground: {
            req: CPlayer_SetMiniProfileBackground_RequestSchema,
            resp: CPlayer_SetMiniProfileBackground_ResponseSchema
        }
    ,
        SetPerFriendPreferences: {
            req: CPlayer_SetPerFriendPreferences_RequestSchema,
            resp: CPlayer_SetPerFriendPreferences_ResponseSchema
        }
    ,
        SetProfileBackground: {
            req: CPlayer_SetProfileBackground_RequestSchema,
            resp: CPlayer_SetProfileBackground_ResponseSchema
        }
    ,
        SetProfilePreferences: {
            req: CPlayer_SetProfilePreferences_RequestSchema,
            resp: CPlayer_SetProfilePreferences_ResponseSchema
        }
    ,
        SetProfileTheme: {
            req: CPlayer_SetProfileTheme_RequestSchema,
            resp: CPlayer_SetProfileTheme_ResponseSchema
        }
    ,
        SetSteamDeckKeyboardSkin: {
            req: CPlayer_SetSteamDeckKeyboardSkin_RequestSchema,
            resp: CPlayer_SetSteamDeckKeyboardSkin_ResponseSchema
        }
    ,
        UpdateSteamAnnouncementLastRead: {
            req: CPlayer_UpdateSteamAnnouncementLastRead_RequestSchema,
            resp: CPlayer_UpdateSteamAnnouncementLastRead_ResponseSchema
        }
    
    }
    ,

    PlayerClient: {
    
        NotifyCommunityPreferencesChanged: {
            req: CPlayer_CommunityPreferencesChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyFriendEquippedProfileItemsChanged: {
            req: CPlayer_FriendEquippedProfileItemsChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyFriendNicknameChanged: {
            req: CPlayer_FriendNicknameChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyLastPlayedTimes: {
            req: CPlayer_LastPlayedTimes_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyNewSteamAnnouncementState: {
            req: CPlayer_NewSteamAnnouncementState_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyPerFriendPreferencesChanged: {
            req: CPlayer_PerFriendPreferencesChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyPrivacyPrivacySettingsChanged: {
            req: CPlayer_PrivacySettingsChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyTextFilterWordsChanged: {
            req: CPlayer_TextFilterWordsChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    News: {
    
        ConvertHTMLToBBCode: {
            req: CNews_ConvertHTMLToBBCode_RequestSchema,
            resp: CNews_ConvertHTMLToBBCode_ResponseSchema
        }
    ,
        GetBatchPublishedPartnerEvent: {
            req: CNews_GetBatchPublishedPartnerEvent_RequestSchema,
            resp: CNews_GetBatchPublishedPartnerEvent_ResponseSchema
        }
    ,
        GetNewsFeedByRepublishClan: {
            req: CNews_GetNewsFeedByRepublishClan_RequestSchema,
            resp: CNews_GetNewsFeedByRepublishClan_ResponseSchema
        }
    ,
        PreviewPartnerEvents: {
            req: CNews_PreviewPartnerEvents_RequestSchema,
            resp: CNews_PreviewPartnerEvents_ResponseSchema
        }
    ,
        PublishPartnerEvent: {
            req: CNews_PublishPartnerEvent_RequestSchema,
            resp: CNews_PublishPartnerEvent_ResponseSchema
        }
    
    }
    ,

    LoyaltyRewards: {
    
        AddReaction: {
            req: CLoyaltyRewards_AddReaction_RequestSchema,
            resp: CLoyaltyRewards_AddReaction_ResponseSchema
        }
    ,
        BatchedQueryRewardItems: {
            req: CLoyaltyRewards_BatchedQueryRewardItems_RequestSchema,
            resp: CLoyaltyRewards_BatchedQueryRewardItems_ResponseSchema
        }
    ,
        GetActivePurchaseBonuses: {
            req: CLoyaltyRewards_GetActivePurchaseBonuses_RequestSchema,
            resp: CLoyaltyRewards_GetActivePurchaseBonuses_ResponseSchema
        }
    ,
        GetEligibleApps: {
            req: CLoyaltyRewards_GetEligibleApps_RequestSchema,
            resp: CLoyaltyRewards_GetEligibleApps_ResponseSchema
        }
    ,
        GetEquippedProfileItems: {
            req: CLoyaltyRewards_GetEquippedProfileItems_RequestSchema,
            resp: CLoyaltyRewards_GetEquippedProfileItems_ResponseSchema
        }
    ,
        GetPointsForSpend: {
            req: CLoyaltyRewards_GetPointsForSpend_RequestSchema,
            resp: CLoyaltyRewards_GetPointsForSpend_ResponseSchema
        }
    ,
        GetProfileCustomizationsConfig: {
            req: CLoyaltyRewards_GetProfileCustomizationsConfig_RequestSchema,
            resp: CLoyaltyRewards_GetProfileCustomizationsConfig_ResponseSchema
        }
    ,
        GetReactionConfig: {
            req: CLoyaltyRewards_GetReactionConfig_RequestSchema,
            resp: CLoyaltyRewards_GetReactionConfig_ResponseSchema
        }
    ,
        GetReactions: {
            req: CLoyaltyRewards_GetReactions_RequestSchema,
            resp: CLoyaltyRewards_GetReactions_ResponseSchema
        }
    ,
        GetReactionsSummaryForUser: {
            req: CLoyaltyRewards_GetReactionsSummaryForUser_RequestSchema,
            resp: CLoyaltyRewards_GetReactionsSummaryForUser_ResponseSchema
        }
    ,
        GetSummary: {
            req: CLoyaltyRewards_GetSummary_RequestSchema,
            resp: CLoyaltyRewards_GetSummary_ResponseSchema
        }
    ,
        QueryRewardItems: {
            req: CLoyaltyRewards_QueryRewardItems_RequestSchema,
            resp: CLoyaltyRewards_QueryRewardItems_ResponseSchema
        }
    ,
        RedeemPoints: {
            req: CLoyaltyRewards_RedeemPoints_RequestSchema,
            resp: CLoyaltyRewards_RedeemPoints_ResponseSchema
        }
    ,
        RedeemPointsForBadgeLevel: {
            req: CLoyaltyRewards_RedeemPointsForBadgeLevel_RequestSchema,
            resp: CLoyaltyRewards_RedeemPoints_ResponseSchema
        }
    ,
        RedeemPointsForProfileCustomization: {
            req: CLoyaltyRewards_RedeemPointsForProfileCustomization_RequestSchema,
            resp: CLoyaltyRewards_RedeemPointsForProfileCustomization_ResponseSchema
        }
    ,
        RedeemPointsForProfileCustomizationUpgrade: {
            req: CLoyaltyRewards_RedeemPointsForProfileCustomizationUpgrade_RequestSchema,
            resp: CLoyaltyRewards_RedeemPointsForProfileCustomizationUpgrade_ResponseSchema
        }
    ,
        RedeemPointsToUpgradeItem: {
            req: CLoyaltyRewards_RedeemPointsToUpgradeItem_RequestSchema,
            resp: CLoyaltyRewards_RedeemPoints_ResponseSchema
        }
    ,
        RegisterForSteamDeckRewards: {
            req: CLoyaltyRewards_RegisterForSteamDeckRewards_RequestSchema,
            resp: CLoyaltyRewards_RegisterForSteamDeckRewards_ResponseSchema
        }
    
    }
    ,

    FriendsList: {
    
        GetCategories: {
            req: CFriendsList_GetCategories_RequestSchema,
            resp: CFriendsList_GetCategories_ResponseSchema
        }
    ,
        GetFavorites: {
            req: CFriendsList_GetFavorites_RequestSchema,
            resp: CFriendsList_GetFavorites_ResponseSchema
        }
    ,
        GetFriendsList: {
            req: CFriendsList_GetFriendsList_RequestSchema,
            resp: CFriendsList_GetFriendsList_ResponseSchema
        }
    ,
        SetFavorites: {
            req: CFriendsList_SetFavorites_RequestSchema,
            resp: CFriendsList_SetFavorites_ResponseSchema
        }
    
    }
    ,

    FriendsListClient: {
    
        FavoritesChanged: {
            req: CFriendsList_FavoritesChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    FriendMessages: {
    
        AckMessage: {
            req: CFriendMessages_AckMessage_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        GetActiveMessageSessions: {
            req: CFriendsMessages_GetActiveMessageSessions_RequestSchema,
            resp: CFriendsMessages_GetActiveMessageSessions_ResponseSchema
        }
    ,
        GetRecentMessages: {
            req: CFriendMessages_GetRecentMessages_RequestSchema,
            resp: CFriendMessages_GetRecentMessages_ResponseSchema
        }
    ,
        IsInFriendsUIBeta: {
            req: CFriendMessages_IsInFriendsUIBeta_RequestSchema,
            resp: CFriendMessages_IsInFriendsUIBeta_ResponseSchema
        }
    ,
        SendMessage: {
            req: CFriendMessages_SendMessage_RequestSchema,
            resp: CFriendMessages_SendMessage_ResponseSchema
        }
    ,
        UpdateMessageReaction: {
            req: CFriendMessages_UpdateMessageReaction_RequestSchema,
            resp: CFriendMessages_UpdateMessageReaction_ResponseSchema
        }
    
    }
    ,

    FriendMessagesClient: {
    
        IncomingMessage: {
            req: CFriendMessages_IncomingMessage_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        MessageReaction: {
            req: CFriendMessages_MessageReaction_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyAckMessageEcho: {
            req: CFriendMessages_AckMessage_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    FamilyGroups: {
    
        CancelFamilyGroupInvite: {
            req: CFamilyGroups_CancelFamilyGroupInvite_RequestSchema,
            resp: CFamilyGroups_CancelFamilyGroupInvite_ResponseSchema
        }
    ,
        ClearCooldownSkip: {
            req: CFamilyGroups_ClearCooldownSkip_RequestSchema,
            resp: CFamilyGroups_ClearCooldownSkip_ResponseSchema
        }
    ,
        ConfirmInviteToFamilyGroup: {
            req: CFamilyGroups_ConfirmInviteToFamilyGroup_RequestSchema,
            resp: CFamilyGroups_ConfirmInviteToFamilyGroup_ResponseSchema
        }
    ,
        ConfirmJoinFamilyGroup: {
            req: CFamilyGroups_ConfirmJoinFamilyGroup_RequestSchema,
            resp: CFamilyGroups_ConfirmJoinFamilyGroup_ResponseSchema
        }
    ,
        CreateFamilyGroup: {
            req: CFamilyGroups_CreateFamilyGroup_RequestSchema,
            resp: CFamilyGroups_CreateFamilyGroup_ResponseSchema
        }
    ,
        DeleteFamilyGroup: {
            req: CFamilyGroups_DeleteFamilyGroup_RequestSchema,
            resp: CFamilyGroups_DeleteFamilyGroup_ResponseSchema
        }
    ,
        ForceAcceptInvite: {
            req: CFamilyGroups_ForceAcceptInvite_RequestSchema,
            resp: CFamilyGroups_ForceAcceptInvite_ResponseSchema
        }
    ,
        GetChangeLog: {
            req: CFamilyGroups_GetChangeLog_RequestSchema,
            resp: CFamilyGroups_GetChangeLog_ResponseSchema
        }
    ,
        GetFamilyGroup: {
            req: CFamilyGroups_GetFamilyGroup_RequestSchema,
            resp: CFamilyGroups_GetFamilyGroup_ResponseSchema
        }
    ,
        GetFamilyGroupForUser: {
            req: CFamilyGroups_GetFamilyGroupForUser_RequestSchema,
            resp: CFamilyGroups_GetFamilyGroupForUser_ResponseSchema
        }
    ,
        GetInviteCheckResults: {
            req: CFamilyGroups_GetInviteCheckResults_RequestSchema,
            resp: CFamilyGroups_GetInviteCheckResults_ResponseSchema
        }
    ,
        GetPlaytimeSummary: {
            req: CFamilyGroups_GetPlaytimeSummary_RequestSchema,
            resp: CFamilyGroups_GetPlaytimeSummary_ResponseSchema
        }
    ,
        GetPreferredLenders: {
            req: CFamilyGroups_GetPreferredLenders_RequestSchema,
            resp: CFamilyGroups_GetPreferredLenders_ResponseSchema
        }
    ,
        GetPurchaseRequests: {
            req: CFamilyGroups_GetPurchaseRequests_RequestSchema,
            resp: CFamilyGroups_GetPurchaseRequests_ResponseSchema
        }
    ,
        GetSharedLibraryApps: {
            req: CFamilyGroups_GetSharedLibraryApps_RequestSchema,
            resp: CFamilyGroups_GetSharedLibraryApps_ResponseSchema
        }
    ,
        GetUsersSharingDevice: {
            req: CFamilyGroups_GetUsersSharingDevice_RequestSchema,
            resp: CFamilyGroups_GetUsersSharingDevice_ResponseSchema
        }
    ,
        InviteToFamilyGroup: {
            req: CFamilyGroups_InviteToFamilyGroup_RequestSchema,
            resp: CFamilyGroups_InviteToFamilyGroup_ResponseSchema
        }
    ,
        JoinFamilyGroup: {
            req: CFamilyGroups_JoinFamilyGroup_RequestSchema,
            resp: CFamilyGroups_JoinFamilyGroup_ResponseSchema
        }
    ,
        ModifyFamilyGroupDetails: {
            req: CFamilyGroups_ModifyFamilyGroupDetails_RequestSchema,
            resp: CFamilyGroups_ModifyFamilyGroupDetails_ResponseSchema
        }
    ,
        RemoveFromFamilyGroup: {
            req: CFamilyGroups_RemoveFromFamilyGroup_RequestSchema,
            resp: CFamilyGroups_RemoveFromFamilyGroup_ResponseSchema
        }
    ,
        RequestPurchase: {
            req: CFamilyGroups_RequestPurchase_RequestSchema,
            resp: CFamilyGroups_RequestPurchase_ResponseSchema
        }
    ,
        ResendInvitationToFamilyGroup: {
            req: CFamilyGroups_ResendInvitationToFamilyGroup_RequestSchema,
            resp: CFamilyGroups_ResendInvitationToFamilyGroup_ResponseSchema
        }
    ,
        RespondToRequestedPurchase: {
            req: CFamilyGroups_RespondToRequestedPurchase_RequestSchema,
            resp: CFamilyGroups_RespondToRequestedPurchase_ResponseSchema
        }
    ,
        SetFamilyCooldownOverrides: {
            req: CFamilyGroups_SetFamilyCooldownOverrides_RequestSchema,
            resp: CFamilyGroups_SetFamilyCooldownOverrides_ResponseSchema
        }
    ,
        SetPreferredLender: {
            req: CFamilyGroups_SetPreferredLender_RequestSchema,
            resp: CFamilyGroups_SetPreferredLender_ResponseSchema
        }
    ,
        UndeleteFamilyGroup: {
            req: CFamilyGroups_UndeleteFamilyGroup_RequestSchema,
            resp: CFamilyGroups_UndeleteFamilyGroup_ResponseSchema
        }
    
    }
    ,

    FamilyGroupsClient: {
    
        NotifyGroupChanged: {
            req: CFamilyGroupsClient_GroupChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyInviteStatus: {
            req: CFamilyGroupsClient_InviteStatus_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyRunningApps: {
            req: CFamilyGroupsClient_NotifyRunningApps_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    ExperimentService: {
    
        ReportProductImpressionsFromClient: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    Econ: {
    
        ClientGetItemShopOverlayAuthURL: {
            req: CEcon_ClientGetItemShopOverlayAuthURL_RequestSchema,
            resp: CEcon_ClientGetItemShopOverlayAuthURL_ResponseSchema
        }
    ,
        GetAssetClassInfo: {
            req: CEcon_GetAssetClassInfo_RequestSchema,
            resp: CEcon_GetAssetClassInfo_ResponseSchema
        }
    ,
        GetInventoryItemsWithDescriptions: {
            req: CEcon_GetInventoryItemsWithDescriptions_RequestSchema,
            resp: CEcon_GetInventoryItemsWithDescriptions_ResponseSchema
        }
    ,
        GetTradeOfferAccessToken: {
            req: CEcon_GetTradeOfferAccessToken_RequestSchema,
            resp: CEcon_GetTradeOfferAccessToken_ResponseSchema
        }
    
    }
    ,

    Community: {
    
        ClearSinglePartnerEventsAppPriority: {
            req: CCommunity_ClearSinglePartnerEventsAppPriority_RequestSchema,
            resp: CCommunity_ClearSinglePartnerEventsAppPriority_ResponseSchema
        }
    ,
        ClearUserPartnerEventsAppPriorities: {
            req: CCommunity_ClearUserPartnerEventsAppPriorities_RequestSchema,
            resp: CCommunity_ClearUserPartnerEventsAppPriorities_ResponseSchema
        }
    ,
        DeleteCommentFromThread: {
            req: CCommunity_DeleteCommentFromThread_RequestSchema,
            resp: CCommunity_DeleteCommentFromThread_ResponseSchema
        }
    ,
        FetchTranslationFromCrowdIn: {
            req: CCommunity_FetchTranslationFromCrowdIn_RequestSchema,
            resp: CCommunity_FetchTranslationFromCrowdIn_ResponseSchema
        }
    ,
        GetAppRichPresenceLocalization: {
            req: CCommunity_GetAppRichPresenceLocalization_RequestSchema,
            resp: CCommunity_GetAppRichPresenceLocalization_ResponseSchema
        }
    ,
        GetApps: {
            req: CCommunity_GetApps_RequestSchema,
            resp: CCommunity_GetApps_ResponseSchema
        }
    ,
        GetAvatarHistory: {
            req: CCommunity_GetAvatarHistory_RequestSchema,
            resp: CCommunity_GetAvatarHistory_ResponseSchema
        }
    ,
        GetBestEventsForUser: {
            req: CCommunity_GetBestEventsForUser_RequestSchema,
            resp: CCommunity_GetBestEventsForUser_ResponseSchema
        }
    ,
        GetClanAnnouncementVoteForUser: {
            req: CCommunity_GetClanAnnouncementVoteForUser_RequestSchema,
            resp: CCommunity_GetClanAnnouncementVoteForUser_ResponseSchema
        }
    ,
        GetClanCrowdInMetadata: {
            req: CCommunity_GetClanCrowdInMetadata_RequestSchema,
            resp: CCommunity_GetClanCrowdInMetadata_ResponseSchema
        }
    ,
        GetClanEventCrowdInMetadata: {
            req: CCommunity_GetClanEventCrowdInMetadata_RequestSchema,
            resp: CCommunity_GetClanEventCrowdInMetadata_ResponseSchema
        }
    ,
        GetCommentThread: {
            req: CCommunity_GetCommentThread_RequestSchema,
            resp: CCommunity_GetCommentThread_ResponseSchema
        }
    ,
        GetCommentThreadRatings: {
            req: CCommunity_GetCommentThreadRatings_RequestSchema,
            resp: CCommunity_GetCommentThreadRatings_ResponseSchema
        }
    ,
        GetUserPartnerEventNews: {
            req: CCommunity_GetUserPartnerEventNews_RequestSchema,
            resp: CCommunity_GetUserPartnerEventNews_ResponseSchema
        }
    ,
        GetUserPartnerEventsAppPriorities: {
            req: CCommunity_GetUserPartnerEventsAppPriorities_RequestSchema,
            resp: CCommunity_GetUserPartnerEventsAppPriorities_ResponseSchema
        }
    ,
        GetUserPartnerEventViewStatus: {
            req: CCommunity_GetUserPartnerEventViewStatus_RequestSchema,
            resp: CCommunity_GetUserPartnerEventViewStatus_ResponseSchema
        }
    ,
        MarkPartnerEventsForUser: {
            req: CCommunity_MarkPartnerEventsForUser_RequestSchema,
            resp: CCommunity_MarkPartnerEventsForUser_ResponseSchema
        }
    ,
        PartnerEventsShowLessForApp: {
            req: CCommunity_PartnerEventsShowLessForApp_RequestSchema,
            resp: CCommunity_PartnerEventsShowLessForApp_ResponseSchema
        }
    ,
        PartnerEventsShowMoreForApp: {
            req: CCommunity_PartnerEventsShowMoreForApp_RequestSchema,
            resp: CCommunity_PartnerEventsShowMoreForApp_ResponseSchema
        }
    ,
        PostCommentToThread: {
            req: CCommunity_PostCommentToThread_RequestSchema,
            resp: CCommunity_PostCommentToThread_ResponseSchema
        }
    ,
        RateClanAnnouncement: {
            req: CCommunity_RateClanAnnouncement_RequestSchema,
            resp: CCommunity_RateClanAnnouncement_ResponseSchema
        }
    ,
        RateCommentThread: {
            req: CCommunity_RateCommentThread_RequestSchema,
            resp: CCommunity_RateCommentThread_ResponseSchema
        }
    
    }
    ,

    CloudConfigStore: {
    
        Download: {
            req: CCloudConfigStore_Download_RequestSchema,
            resp: CCloudConfigStore_Download_ResponseSchema
        }
    ,
        Upload: {
            req: CCloudConfigStore_Upload_RequestSchema,
            resp: CCloudConfigStore_Upload_ResponseSchema
        }
    
    }
    ,

    CloudConfigStoreClient: {
    
        NotifyChange: {
            req: CCloudConfigStore_Change_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    Cloud: {
    
        BeginAppUploadBatch: {
            req: NotImplementedSchema,
            resp: CCloud_BeginAppUploadBatch_ResponseSchema
        }
    ,
        BeginHTTPUpload: {
            req: NotImplementedSchema,
            resp: CCloud_BeginHTTPUpload_ResponseSchema
        }
    ,
        BeginUGCUpload: {
            req: NotImplementedSchema,
            resp: CCloud_BeginUGCUpload_ResponseSchema
        }
    ,
        CDNReport: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        ClientBeginFileUpload: {
            req: NotImplementedSchema,
            resp: CCloud_ClientBeginFileUpload_ResponseSchema
        }
    ,
        ClientCommitFileUpload: {
            req: NotImplementedSchema,
            resp: CCloud_ClientCommitFileUpload_ResponseSchema
        }
    ,
        ClientConflictResolution: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        ClientDeleteFile: {
            req: NotImplementedSchema,
            resp: CCloud_ClientDeleteFile_ResponseSchema
        }
    ,
        ClientFileDownload: {
            req: NotImplementedSchema,
            resp: CCloud_ClientFileDownload_ResponseSchema
        }
    ,
        ClientGetAppQuotaUsage: {
            req: NotImplementedSchema,
            resp: CCloud_ClientGetAppQuotaUsage_ResponseSchema
        }
    ,
        ClientLogUploadCheck: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        ClientLogUploadComplete: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        CommitHTTPUpload: {
            req: NotImplementedSchema,
            resp: CCloud_CommitHTTPUpload_ResponseSchema
        }
    ,
        CommitUGCUpload: {
            req: NotImplementedSchema,
            resp: CCloud_CommitUGCUpload_ResponseSchema
        }
    ,
        CompleteAppUploadBatch: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        CompleteAppUploadBatchBlocking: {
            req: NotImplementedSchema,
            resp: CCloud_CompleteAppUploadBatch_ResponseSchema
        }
    ,
        Delete: {
            req: NotImplementedSchema,
            resp: CCloud_Delete_ResponseSchema
        }
    ,
        EnumerateUserApps: {
            req: NotImplementedSchema,
            resp: CCloud_EnumerateUserApps_ResponseSchema
        }
    ,
        EnumerateUserFiles: {
            req: NotImplementedSchema,
            resp: CCloud_EnumerateUserFiles_ResponseSchema
        }
    ,
        ExternalStorageTransferReport: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        GetAppFileChangelist: {
            req: NotImplementedSchema,
            resp: CCloud_GetAppFileChangelist_ResponseSchema
        }
    ,
        GetClientEncryptionKey: {
            req: NotImplementedSchema,
            resp: CCloud_GetClientEncryptionKey_ResponseSchema
        }
    ,
        GetFileDetails: {
            req: NotImplementedSchema,
            resp: CCloud_GetFileDetails_ResponseSchema
        }
    ,
        GetUploadServerInfo: {
            req: NotImplementedSchema,
            resp: CCloud_GetUploadServerInfo_ResponseSchema
        }
    ,
        ResumeAppSession: {
            req: NotImplementedSchema,
            resp: CCloud_AppSessionResume_ResponseSchema
        }
    ,
        SignalAppExitSyncDone: {
            req: NotImplementedSchema,
            resp: NoResponseSchema
        }
    ,
        SignalAppLaunchIntent: {
            req: NotImplementedSchema,
            resp: CCloud_AppLaunchIntent_ResponseSchema
        }
    ,
        SuspendAppSession: {
            req: NotImplementedSchema,
            resp: CCloud_AppSessionSuspend_ResponseSchema
        }
    
    }
    ,

    CloudClient: {
    
        ClientLogUploadRequest: {
            req: CCloud_ClientLogUploadRequest_NotificationSchema,
            resp: NoResponseSchema
        }
    ,
        NotifyAppStateChange: {
            req: CCloud_AppCloudStateChange_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    ClientComm: {
    
        EnableOrDisableDownloads: {
            req: CClientComm_EnableOrDisableDownloads_RequestSchema,
            resp: CClientComm_EnableOrDisableDownloads_ResponseSchema
        }
    ,
        GetAllClientLogonInfo: {
            req: CClientComm_GetAllClientLogonInfo_RequestSchema,
            resp: CClientComm_GetAllClientLogonInfo_ResponseSchema
        }
    ,
        GetClientAppList: {
            req: CClientComm_GetClientAppList_RequestSchema,
            resp: CClientComm_GetClientAppList_ResponseSchema
        }
    ,
        GetClientInfo: {
            req: CClientComm_GetClientInfo_RequestSchema,
            resp: CClientComm_GetClientInfo_ResponseSchema
        }
    ,
        GetClientLogonInfo: {
            req: CClientComm_GetClientLogonInfo_RequestSchema,
            resp: CClientComm_GetClientLogonInfo_ResponseSchema
        }
    ,
        InstallClientApp: {
            req: CClientComm_InstallClientApp_RequestSchema,
            resp: CClientComm_InstallClientApp_ResponseSchema
        }
    ,
        LaunchClientApp: {
            req: CClientComm_LaunchClientApp_RequestSchema,
            resp: CClientComm_LaunchClientApp_ResponseSchema
        }
    ,
        SetClientAppUpdateState: {
            req: CClientComm_SetClientAppUpdateState_RequestSchema,
            resp: CClientComm_SetClientAppUpdateState_ResponseSchema
        }
    ,
        UninstallClientApp: {
            req: CClientComm_UninstallClientApp_RequestSchema,
            resp: CClientComm_UninstallClientApp_ResponseSchema
        }
    
    }
    ,

    AuthenticationSupport: {
    
        GetTokenHistory: {
            req: CAuthenticationSupport_GetTokenHistory_RequestSchema,
            resp: CAuthenticationSupport_GetTokenHistory_ResponseSchema
        }
    ,
        MarkTokenCompromised: {
            req: CAuthenticationSupport_MarkTokenCompromised_RequestSchema,
            resp: CAuthenticationSupport_MarkTokenCompromised_ResponseSchema
        }
    ,
        QueryRefreshTokenByID: {
            req: CAuthenticationSupport_QueryRefreshTokenByID_RequestSchema,
            resp: CAuthenticationSupport_QueryRefreshTokenByID_ResponseSchema
        }
    ,
        QueryRefreshTokensByAccount: {
            req: CAuthenticationSupport_QueryRefreshTokensByAccount_RequestSchema,
            resp: CAuthenticationSupport_QueryRefreshTokensByAccount_ResponseSchema
        }
    ,
        RevokeToken: {
            req: CAuthenticationSupport_RevokeToken_RequestSchema,
            resp: CAuthenticationSupport_RevokeToken_ResponseSchema
        }
    
    }
    ,

    Authentication: {
    
        BeginAuthSessionViaCredentials: {
            req: CAuthentication_BeginAuthSessionViaCredentials_RequestSchema,
            resp: CAuthentication_BeginAuthSessionViaCredentials_ResponseSchema
        }
    ,
        BeginAuthSessionViaQR: {
            req: CAuthentication_BeginAuthSessionViaQR_RequestSchema,
            resp: CAuthentication_BeginAuthSessionViaQR_ResponseSchema
        }
    ,
        EnumerateTokens: {
            req: CAuthentication_RefreshToken_Enumerate_RequestSchema,
            resp: CAuthentication_RefreshToken_Enumerate_ResponseSchema
        }
    ,
        GenerateAccessTokenForApp: {
            req: CAuthentication_AccessToken_GenerateForApp_RequestSchema,
            resp: CAuthentication_AccessToken_GenerateForApp_ResponseSchema
        }
    ,
        GetAuthSessionInfo: {
            req: CAuthentication_GetAuthSessionInfo_RequestSchema,
            resp: CAuthentication_GetAuthSessionInfo_ResponseSchema
        }
    ,
        GetAuthSessionRiskInfo: {
            req: CAuthentication_GetAuthSessionRiskInfo_RequestSchema,
            resp: CAuthentication_GetAuthSessionRiskInfo_ResponseSchema
        }
    ,
        GetAuthSessionsForAccount: {
            req: CAuthentication_GetAuthSessionsForAccount_RequestSchema,
            resp: CAuthentication_GetAuthSessionsForAccount_ResponseSchema
        }
    ,
        GetPasswordRSAPublicKey: {
            req: CAuthentication_GetPasswordRSAPublicKey_RequestSchema,
            resp: CAuthentication_GetPasswordRSAPublicKey_ResponseSchema
        }
    ,
        MigrateMobileSession: {
            req: CAuthentication_MigrateMobileSession_RequestSchema,
            resp: CAuthentication_MigrateMobileSession_ResponseSchema
        }
    ,
        PollAuthSessionStatus: {
            req: CAuthentication_PollAuthSessionStatus_RequestSchema,
            resp: CAuthentication_PollAuthSessionStatus_ResponseSchema
        }
    ,
        RevokeRefreshToken: {
            req: CAuthentication_RefreshToken_Revoke_RequestSchema,
            resp: CAuthentication_RefreshToken_Revoke_ResponseSchema
        }
    ,
        RevokeToken: {
            req: CAuthentication_Token_Revoke_RequestSchema,
            resp: CAuthentication_Token_Revoke_ResponseSchema
        }
    ,
        UpdateAuthSessionWithMobileConfirmation: {
            req: CAuthentication_UpdateAuthSessionWithMobileConfirmation_RequestSchema,
            resp: CAuthentication_UpdateAuthSessionWithMobileConfirmation_ResponseSchema
        }
    ,
        UpdateAuthSessionWithSteamGuardCode: {
            req: CAuthentication_UpdateAuthSessionWithSteamGuardCode_RequestSchema,
            resp: CAuthentication_UpdateAuthSessionWithSteamGuardCode_ResponseSchema
        }
    
    }
    ,

    Achievements: {
    
        GetInfo: {
            req: CAchievements_GetInfo_RequestSchema,
            resp: CAchievements_GetInfo_ResponseSchema
        }
    
    }
    ,

    AccountPrivateApps: {
    
        GetPrivateAppList: {
            req: CAccountPrivateApps_GetPrivateAppList_RequestSchema,
            resp: CAccountPrivateApps_GetPrivateAppList_ResponseSchema
        }
    ,
        ToggleAppPrivacy: {
            req: CAccountPrivateApps_ToggleAppPrivacy_RequestSchema,
            resp: CAccountPrivateApps_ToggleAppPrivacy_ResponseSchema
        }
    
    }
    ,

    AccountPrivateAppsClient: {
    
        NotifyPrivateAppListChanged: {
            req: CAccountPrivateApsClient_NotifyPrivateAppListChanged_NotificationSchema,
            resp: NoResponseSchema
        }
    
    }
    ,

    AccountPrivacy: {
    
        GetCookiePreferences: {
            req: CAccountPrivacy_GetCookiePreferences_RequestSchema,
            resp: CAccountPrivacy_GetCookiePreferences_ResponseSchema
        }
    
    }
    
        } as const
    
    
    
    export const steamStdServiceRecord = {
        Wishlist: ['AddToWishlist', 'GetWishlist', 'GetWishlistItemCount', 'GetWishlistItemsOnSale', 'GetWishlistSortedFiltered', 'RemoveFromWishlist'] as const,
UserNews: ['GetAppDetailsSpotlight', 'GetUserNews'] as const,
UserGameNotes: ['DeleteNote', 'GetGamesWithNotes', 'GetNotesForGame', 'SaveNote'] as const,
UserGameActivity: ['GetActivity'] as const,
UserAccount: ['CancelLicenseForApp', 'CreateFriendInviteToken', 'GetAccountLinkStatus', 'GetAvailableValveDiscountPromotions', 'GetClientWalletDetails', 'GetFriendInviteTokens', 'GetUserCountry', 'RedeemFriendInviteToken', 'RegisterCompatTool', 'RevokeFriendInviteToken', 'ViewFriendInviteToken'] as const,
StoreSales: ['GetUserVotes', 'GetVoteDefinitions', 'GetVoteDefinitionsForEvents', 'SetVote'] as const,
StoreQuery: ['GetItemByUserCombinedTagsPriority', 'GetItemsByUserRecommendedTags', 'Query', 'SearchSuggestions'] as const,
StoreMarketing: ['GetFrontPageConfig', 'GetItemsToFeature'] as const,
StoreCatalog: ['GetDevPageAllAppsLinked'] as const,
StoreBrowse: ['GetDLCForApps', 'GetDLCForAppsSolr', 'GetHardwareItems', 'GetItems', 'GetPriceStops', 'GetStoreCategories'] as const,
StoreAppSimilarity: ['IdentifyClustersFromPlaytime', 'PrioritizeAppsForUser'] as const,
Store: ['DeleteReservationPositionMessage', 'GetAllReservationPositionMessages', 'GetDiscoveryQueue', 'GetDiscoveryQueueSettings', 'GetDiscoveryQueueSkippedApps', 'GetLocalizedNameForTags', 'GetMostPopularTags', 'GetStorePreferences', 'GetTagList', 'GetTrendingAppsAmongFriends', 'GetUserGameInterestState', 'GetWishlistDemoEmailStatus', 'QueueWishlistDemoEmailToFire', 'RegisterCDKey', 'ReportApp', 'SetCompatibilityFeedback', 'SetReservationPositionMessage', 'ShouldPromptForCompatibilityFeedback', 'SkipDiscoveryQueueItem', 'UpdatePackageReservations'] as const,
StoreClient: ['NotifyStorePreferencesChanged'] as const,
SteamNotification: ['GetPreferences', 'GetSteamNotifications', 'SetPreferences'] as const,
SteamNotificationClient: ['NotificationsReceived', 'PreferencesUpdated'] as const,
SteamCharts: ['GetBestOfYearPages', 'GetGamesByConcurrentPlayers', 'GetMostPlayedGames', 'GetMostPlayedSteamDeckGames', 'GetTopReleasesPages'] as const,
SteamAwards: ['GetNominationRecommendations', 'GetNominationShareLink', 'GetOtherUserNominations', 'GetUserNominations', 'Nominate'] as const,
Publishing: ['CreatePartnerAppOptInEmails', 'GetEstimatePartnerAppOptInEmail', 'GetOptInAppealsSummaryStats', 'GetOptInEmailTracking', 'GetPartnerAppOptInEmailDefAndStats', 'GetPartnerAppOptInsIDs', 'GetPartnerOptInInvites', 'GetPartnerPaidGivenPackageList', 'GetSinglePartnerAppOptIn', 'SendPartnerOptInEmailAndWait', 'SetFeaturingOnPartnerAppOptIn', 'TestFirePartnerAppOptInEmail', 'UpdatePartnerAppOptInEmails'] as const,
PublishedFile: ['AddAppRelationship', 'AddChild', 'AreFilesInSubscriptionList', 'CanSubscribe', 'Delete', 'GetAppRelationships', 'GetAppRelationshipsBatched', 'GetChangeHistory', 'GetChangeHistoryEntry', 'GetContentDescriptors', 'GetDetails', 'GetItemChanges', 'GetItemInfo', 'GetSubSectionData', 'GetUserFileCount', 'GetUserFiles', 'GetUserVoteSummary', 'Publish', 'QueryFiles', 'RefreshVotingQueue', 'RemoveAppRelationship', 'RemoveChild', 'SetCollectionChildren', 'SetPlaytimeForControllerConfigs', 'SetSubscriptionListFromCollection', 'StartPlaytimeTracking', 'StopPlaytimeTracking', 'StopPlaytimeTrackingForAllAppItems', 'Subscribe', 'Unsubscribe', 'Update', 'UpdateContentDescriptors', 'Vote'] as const,
PublishedFileClient: ['NotifyFileDeleted', 'NotifyFileSubscribed', 'NotifyFileUnsubscribed'] as const,
Playtest: ['GetInvites', 'GetUserStatus', 'RequestInvite', 'UpdateInvites'] as const,
Player: ['AcceptSSA', 'AddFriend', 'ClientGetLastPlayedTimes', 'DeletePostedStatus', 'GetAchievementsProgress', 'GetAnimatedAvatar', 'GetAvatarFrame', 'GetCommunityBadgeProgress', 'GetCommunityPreferences', 'GetDurationControl', 'GetEmoticonList', 'GetFavoriteBadge', 'GetFriendsAppsActivity', 'GetFriendsGameplayInfo', 'GetGameAchievements', 'GetGameBadgeLevels', 'GetMiniProfileBackground', 'GetMutualFriendsForIncomingInvites', 'GetNewSteamAnnouncementState', 'GetNicknameList', 'GetOwnedGames', 'GetPerFriendPreferences', 'GetPlayerLinkDetails', 'GetPlayNext', 'GetPostedStatus', 'GetPrivacySettings', 'GetProfileBackground', 'GetProfileCustomization', 'GetProfileItemsEquipped', 'GetProfileItemsOwned', 'GetProfileThemesAvailable', 'GetPurchasedAndUpgradedProfileCustomizations', 'GetPurchasedProfileCustomizations', 'GetRecentPlaytimeSessionsForChild', 'GetSteamDeckKeyboardSkin', 'GetTextFilterWords', 'GetTimeSSAAccepted', 'GetTopAchievementsForGames', 'IgnoreFriend', 'PostStatusToFriends', 'RecordDisconnectedPlaytime', 'RemoveFriend', 'SetAnimatedAvatar', 'SetAvatarFrame', 'SetCommunityPreferences', 'SetEquippedProfileItemFlags', 'SetFavoriteBadge', 'SetMiniProfileBackground', 'SetPerFriendPreferences', 'SetProfileBackground', 'SetProfilePreferences', 'SetProfileTheme', 'SetSteamDeckKeyboardSkin', 'UpdateSteamAnnouncementLastRead'] as const,
PlayerClient: ['NotifyCommunityPreferencesChanged', 'NotifyFriendEquippedProfileItemsChanged', 'NotifyFriendNicknameChanged', 'NotifyLastPlayedTimes', 'NotifyNewSteamAnnouncementState', 'NotifyPerFriendPreferencesChanged', 'NotifyPrivacyPrivacySettingsChanged', 'NotifyTextFilterWordsChanged'] as const,
News: ['ConvertHTMLToBBCode', 'GetBatchPublishedPartnerEvent', 'GetNewsFeedByRepublishClan', 'PreviewPartnerEvents', 'PublishPartnerEvent'] as const,
LoyaltyRewards: ['AddReaction', 'BatchedQueryRewardItems', 'GetActivePurchaseBonuses', 'GetEligibleApps', 'GetEquippedProfileItems', 'GetPointsForSpend', 'GetProfileCustomizationsConfig', 'GetReactionConfig', 'GetReactions', 'GetReactionsSummaryForUser', 'GetSummary', 'QueryRewardItems', 'RedeemPoints', 'RedeemPointsForBadgeLevel', 'RedeemPointsForProfileCustomization', 'RedeemPointsForProfileCustomizationUpgrade', 'RedeemPointsToUpgradeItem', 'RegisterForSteamDeckRewards'] as const,
FriendsList: ['GetCategories', 'GetFavorites', 'GetFriendsList', 'SetFavorites'] as const,
FriendsListClient: ['FavoritesChanged'] as const,
FriendMessages: ['AckMessage', 'GetActiveMessageSessions', 'GetRecentMessages', 'IsInFriendsUIBeta', 'SendMessage', 'UpdateMessageReaction'] as const,
FriendMessagesClient: ['IncomingMessage', 'MessageReaction', 'NotifyAckMessageEcho'] as const,
FamilyGroups: ['CancelFamilyGroupInvite', 'ClearCooldownSkip', 'ConfirmInviteToFamilyGroup', 'ConfirmJoinFamilyGroup', 'CreateFamilyGroup', 'DeleteFamilyGroup', 'ForceAcceptInvite', 'GetChangeLog', 'GetFamilyGroup', 'GetFamilyGroupForUser', 'GetInviteCheckResults', 'GetPlaytimeSummary', 'GetPreferredLenders', 'GetPurchaseRequests', 'GetSharedLibraryApps', 'GetUsersSharingDevice', 'InviteToFamilyGroup', 'JoinFamilyGroup', 'ModifyFamilyGroupDetails', 'RemoveFromFamilyGroup', 'RequestPurchase', 'ResendInvitationToFamilyGroup', 'RespondToRequestedPurchase', 'SetFamilyCooldownOverrides', 'SetPreferredLender', 'UndeleteFamilyGroup'] as const,
FamilyGroupsClient: ['NotifyGroupChanged', 'NotifyInviteStatus', 'NotifyRunningApps'] as const,
ExperimentService: ['ReportProductImpressionsFromClient'] as const,
Econ: ['ClientGetItemShopOverlayAuthURL', 'GetAssetClassInfo', 'GetInventoryItemsWithDescriptions', 'GetTradeOfferAccessToken'] as const,
Community: ['ClearSinglePartnerEventsAppPriority', 'ClearUserPartnerEventsAppPriorities', 'DeleteCommentFromThread', 'FetchTranslationFromCrowdIn', 'GetAppRichPresenceLocalization', 'GetApps', 'GetAvatarHistory', 'GetBestEventsForUser', 'GetClanAnnouncementVoteForUser', 'GetClanCrowdInMetadata', 'GetClanEventCrowdInMetadata', 'GetCommentThread', 'GetCommentThreadRatings', 'GetUserPartnerEventNews', 'GetUserPartnerEventsAppPriorities', 'GetUserPartnerEventViewStatus', 'MarkPartnerEventsForUser', 'PartnerEventsShowLessForApp', 'PartnerEventsShowMoreForApp', 'PostCommentToThread', 'RateClanAnnouncement', 'RateCommentThread'] as const,
CloudConfigStore: ['Download', 'Upload'] as const,
CloudConfigStoreClient: ['NotifyChange'] as const,
Cloud: ['BeginAppUploadBatch', 'BeginHTTPUpload', 'BeginUGCUpload', 'CDNReport', 'ClientBeginFileUpload', 'ClientCommitFileUpload', 'ClientConflictResolution', 'ClientDeleteFile', 'ClientFileDownload', 'ClientGetAppQuotaUsage', 'ClientLogUploadCheck', 'ClientLogUploadComplete', 'CommitHTTPUpload', 'CommitUGCUpload', 'CompleteAppUploadBatch', 'CompleteAppUploadBatchBlocking', 'Delete', 'EnumerateUserApps', 'EnumerateUserFiles', 'ExternalStorageTransferReport', 'GetAppFileChangelist', 'GetClientEncryptionKey', 'GetFileDetails', 'GetUploadServerInfo', 'ResumeAppSession', 'SignalAppExitSyncDone', 'SignalAppLaunchIntent', 'SuspendAppSession'] as const,
CloudClient: ['ClientLogUploadRequest', 'NotifyAppStateChange'] as const,
ClientComm: ['EnableOrDisableDownloads', 'GetAllClientLogonInfo', 'GetClientAppList', 'GetClientInfo', 'GetClientLogonInfo', 'InstallClientApp', 'LaunchClientApp', 'SetClientAppUpdateState', 'UninstallClientApp'] as const,
AuthenticationSupport: ['GetTokenHistory', 'MarkTokenCompromised', 'QueryRefreshTokenByID', 'QueryRefreshTokensByAccount', 'RevokeToken'] as const,
Authentication: ['BeginAuthSessionViaCredentials', 'BeginAuthSessionViaQR', 'EnumerateTokens', 'GenerateAccessTokenForApp', 'GetAuthSessionInfo', 'GetAuthSessionRiskInfo', 'GetAuthSessionsForAccount', 'GetPasswordRSAPublicKey', 'MigrateMobileSession', 'PollAuthSessionStatus', 'RevokeRefreshToken', 'RevokeToken', 'UpdateAuthSessionWithMobileConfirmation', 'UpdateAuthSessionWithSteamGuardCode'] as const,
Achievements: ['GetInfo'] as const,
AccountPrivateApps: ['GetPrivateAppList', 'ToggleAppPrivacy'] as const,
AccountPrivateAppsClient: ['NotifyPrivateAppListChanged'] as const,
AccountPrivacy: ['GetCookiePreferences'] as const
    } as const
    
    