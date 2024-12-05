
export interface PlayerCommunityData {
  guide: number,
  inventory: number,
  screenshots: number,
  workshopItems: number,
  reviews: number
}
export interface PlayerStatsData {
  achievement_progress: AchievementProgress[];
  bViewingOwnProfile: boolean;
  gcpdGames: number[];
  nUserFollowedCount: number;
  nUserReviewCount: number;
  rgContentDescriptorPreferences: RgContentDescriptorPreferences;
  rgGames: RgGame[];
  rgPerfectUnownedGames: string[];
  rgRecentlyPlayedGames: RgRecentlyPlayedGame[];
  strProfileName: string;
  strSteamId: string;
  [property: string]: any;
}

export interface AchievementProgress {
  all_unlocked: number;
  appid: number;
  cache_time: number;
  percentage: string;
  total: number;
  unlocked: number;
  vetted: number | null;
  [property: string]: any;
}

export interface RgContentDescriptorPreferences {
  content_descriptors_to_exclude: ContentDescriptorsToExclude[];
  [property: string]: any;
}

export interface ContentDescriptorsToExclude {
  content_descriptorid: number;
  timestamp_added: null;
  [property: string]: any;
}

export interface RgGame {
  appid: number;
  capsule_filename: string;
  content_descriptorids: number[];
  has_community_visible_stats: number;
  has_dlc: number;
  has_leaderboards: number;
  has_market: number;
  has_workshop: number;
  img_icon_url: string;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  sort_as: string;
  [property: string]: any;
}

export interface RgRecentlyPlayedGame {
  appid: number;
  has_community_visible_stats: number;
  name: string;
  playtime_2weeks: number;
  playtime_disconnected: number;
  playtime_forever: number;
  [property: string]: any;
}
