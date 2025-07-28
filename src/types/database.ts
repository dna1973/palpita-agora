// Database Types - Generated from Supabase Schema

export type UserRole = 'admin' | 'participant';
export type PoolStatus = 'draft' | 'open' | 'active' | 'finished';
export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'cancelled';
export type PollStatus = 'draft' | 'open' | 'closed';
export type NotificationType = 'bet_reminder' | 'result_update' | 'pool_invite' | 'ranking_change';
export type ActivityType = 'bet_placed' | 'pool_joined' | 'poll_voted' | 'ranking_improved';

// Core Database Tables
export interface Profile {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar_url?: string;
  total_points: number;
  created_at: string;
  updated_at: string;
}

export interface Pool {
  id: string;
  name: string;
  description?: string;
  creator_id: string;
  status: PoolStatus;
  max_participants?: number;
  prize_amount?: number;
  invite_code: string;
  scoring_rules: ScoringRules;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PoolParticipant {
  id: string;
  pool_id: string;
  user_id: string;
  joined_at: string;
}

export interface Match {
  id: string;
  pool_id: string;
  home_team: string;
  away_team: string;
  match_date: string;
  home_score?: number;
  away_score?: number;
  status: MatchStatus;
  created_at: string;
  updated_at: string;
}

export interface UserBet {
  id: string;
  user_id: string;
  match_id: string;
  home_score_prediction: number;
  away_score_prediction: number;
  points_earned: number;
  created_at: string;
  updated_at: string;
}

export interface Poll {
  id: string;
  title: string;
  description?: string;
  status: PollStatus;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
}

export interface PollOption {
  id: string;
  poll_id: string;
  text: string;
  votes_count: number;
  created_at: string;
}

export interface UserPollVote {
  id: string;
  user_id: string;
  poll_id: string;
  option_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  data?: Record<string, any>;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  type: ActivityType;
  description: string;
  data?: Record<string, any>;
  created_at: string;
}

// Supporting Types
export interface ScoringRules {
  exact_score: number;
  correct_winner: number;
  correct_draw: number;
}

// Extended Types with Relations
export interface PoolWithDetails extends Pool {
  creator: Profile;
  participants: PoolParticipant[];
  matches: Match[];
  participant_count: number;
}

export interface MatchWithDetails extends Match {
  pool: Pool;
  user_bet?: UserBet;
}

export interface UserBetWithDetails extends UserBet {
  match: MatchWithDetails;
}

export interface PollWithOptions extends Poll {
  options: PollOption[];
  user_vote?: UserPollVote;
}

export interface ProfileWithStats extends Profile {
  pools_created: number;
  pools_participated: number;
  total_bets: number;
  correct_bets: number;
  accuracy_rate: number;
  current_rank?: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  total_pages: number;
}

// Form Types
export interface CreatePoolForm {
  name: string;
  description?: string;
  max_participants?: number;
  prize_amount?: number;
  scoring_rules: ScoringRules;
  start_date?: string;
  end_date?: string;
}

export interface UpdatePoolForm extends Partial<CreatePoolForm> {
  status?: PoolStatus;
}

export interface CreateMatchForm {
  pool_id: string;
  home_team: string;
  away_team: string;
  match_date: string;
}

export interface UpdateMatchForm extends Partial<CreateMatchForm> {
  home_score?: number;
  away_score?: number;
  status?: MatchStatus;
}

export interface CreateBetForm {
  match_id: string;
  home_score_prediction: number;
  away_score_prediction: number;
}

export interface UpdateBetForm extends Partial<CreateBetForm> {}

export interface CreatePollForm {
  title: string;
  description?: string;
  options: string[];
  start_date?: string;
  end_date?: string;
}

export interface UpdatePollForm extends Partial<CreatePollForm> {
  status?: PollStatus;
}

export interface UpdateProfileForm {
  username?: string;
  avatar_url?: string;
}

// Filter and Search Types
export interface PoolFilters {
  status?: PoolStatus[];
  creator_id?: string;
  participant_id?: string;
  search?: string;
  category?: string;
}

export interface MatchFilters {
  pool_id?: string;
  status?: MatchStatus[];
  date_from?: string;
  date_to?: string;
  team?: string;
}

export interface BetFilters {
  user_id?: string;
  pool_id?: string;
  match_id?: string;
  date_from?: string;
  date_to?: string;
}

export interface ActivityFilters {
  user_id?: string;
  type?: ActivityType[];
  date_from?: string;
  date_to?: string;
}

// Statistics Types
export interface UserStats {
  total_points: number;
  total_bets: number;
  correct_bets: number;
  accuracy_rate: number;
  pools_participated: number;
  pools_created: number;
  current_rank: number;
  rank_change: number;
  best_rank: number;
  points_this_week: number;
  points_this_month: number;
}

export interface PoolStats {
  total_participants: number;
  total_matches: number;
  completed_matches: number;
  total_bets: number;
  average_accuracy: number;
  top_scorer: Profile;
  most_active_user: Profile;
}

export interface SystemStats {
  total_users: number;
  total_pools: number;
  total_matches: number;
  total_bets: number;
  active_users_today: number;
  active_users_week: number;
  pools_created_today: number;
  pools_created_week: number;
}

// Ranking Types
export interface RankingEntry {
  user: Profile;
  points: number;
  rank: number;
  rank_change: number;
  total_bets: number;
  correct_bets: number;
  accuracy_rate: number;
}

export interface PoolRanking extends RankingEntry {
  pool_id: string;
}

// Notification Data Types
export interface BetReminderData {
  match_id: string;
  match_name: string;
  match_date: string;
  pool_name: string;
}

export interface ResultUpdateData {
  match_id: string;
  match_name: string;
  final_score: string;
  points_earned: number;
  rank_change?: number;
}

export interface PoolInviteData {
  pool_id: string;
  pool_name: string;
  inviter_name: string;
  invite_code: string;
}

export interface RankingChangeData {
  old_rank: number;
  new_rank: number;
  pool_id?: string;
  pool_name?: string;
}

// Activity Data Types
export interface BetPlacedData {
  match_id: string;
  match_name: string;
  prediction: string;
  pool_id: string;
  pool_name: string;
}

export interface PoolJoinedData {
  pool_id: string;
  pool_name: string;
  participant_count: number;
}

export interface PollVotedData {
  poll_id: string;
  poll_title: string;
  option_text: string;
}

export interface RankingImprovedData {
  old_rank: number;
  new_rank: number;
  points_gained: number;
  pool_id?: string;
  pool_name?: string;
}

// Error Types
export interface DatabaseError {
  code: string;
  message: string;
  details?: string;
  hint?: string;
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Utility Types
export type CreateInput<T> = Omit<T, 'id' | 'created_at' | 'updated_at'>;
export type UpdateInput<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>;

// Supabase specific types
export interface SupabaseResponse<T> {
  data: T | null;
  error: DatabaseError | null;
}

export interface SupabaseListResponse<T> {
  data: T[] | null;
  error: DatabaseError | null;
  count?: number;
}