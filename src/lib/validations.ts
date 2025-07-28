// Validation Schemas using Zod
import { z } from 'zod';
import { VALIDATION } from './constants';

// Base schemas
const emailSchema = z.string().email('Email inválido');
const passwordSchema = z
  .string()
  .min(VALIDATION.PASSWORD.MIN_LENGTH, `Senha deve ter pelo menos ${VALIDATION.PASSWORD.MIN_LENGTH} caracteres`)
  .max(VALIDATION.PASSWORD.MAX_LENGTH, `Senha deve ter no máximo ${VALIDATION.PASSWORD.MAX_LENGTH} caracteres`);

const usernameSchema = z
  .string()
  .min(VALIDATION.USERNAME.MIN_LENGTH, `Nome de usuário deve ter pelo menos ${VALIDATION.USERNAME.MIN_LENGTH} caracteres`)
  .max(VALIDATION.USERNAME.MAX_LENGTH, `Nome de usuário deve ter no máximo ${VALIDATION.USERNAME.MAX_LENGTH} caracteres`)
  .regex(VALIDATION.USERNAME.PATTERN, 'Nome de usuário pode conter apenas letras, números, _ e -');

// Auth schemas
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Senha é obrigatória'),
});

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  username: usernameSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

// Profile schemas
export const updateProfileSchema = z.object({
  username: usernameSchema.optional(),
  avatar_url: z.string().url('URL inválida').optional().or(z.literal('')),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Senha atual é obrigatória'),
  newPassword: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Senhas não coincidem',
  path: ['confirmPassword'],
});

// Pool schemas
export const scoringRulesSchema = z.object({
  exact_score: z.number().min(0, 'Pontuação deve ser positiva').max(10, 'Pontuação máxima é 10'),
  correct_winner: z.number().min(0, 'Pontuação deve ser positiva').max(10, 'Pontuação máxima é 10'),
  correct_draw: z.number().min(0, 'Pontuação deve ser positiva').max(10, 'Pontuação máxima é 10'),
});

export const createPoolSchema = z.object({
  name: z
    .string()
    .min(VALIDATION.POOL_NAME.MIN_LENGTH, `Nome deve ter pelo menos ${VALIDATION.POOL_NAME.MIN_LENGTH} caracteres`)
    .max(VALIDATION.POOL_NAME.MAX_LENGTH, `Nome deve ter no máximo ${VALIDATION.POOL_NAME.MAX_LENGTH} caracteres`),
  description: z
    .string()
    .max(VALIDATION.POOL_DESCRIPTION.MAX_LENGTH, `Descrição deve ter no máximo ${VALIDATION.POOL_DESCRIPTION.MAX_LENGTH} caracteres`)
    .optional(),
  max_participants: z
    .number()
    .min(2, 'Mínimo de 2 participantes')
    .max(1000, 'Máximo de 1000 participantes')
    .optional(),
  prize_amount: z
    .number()
    .min(0, 'Valor do prêmio deve ser positivo')
    .max(999999.99, 'Valor do prêmio muito alto')
    .optional(),
  scoring_rules: scoringRulesSchema,
  start_date: z.string().datetime('Data de início inválida').optional(),
  end_date: z.string().datetime('Data de fim inválida').optional(),
}).refine((data) => {
  if (data.start_date && data.end_date) {
    return new Date(data.start_date) < new Date(data.end_date);
  }
  return true;
}, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['end_date'],
});

export const updatePoolSchema = createPoolSchema.partial().extend({
  status: z.enum(['draft', 'open', 'active', 'finished']).optional(),
});

export const joinPoolSchema = z.object({
  invite_code: z.string().length(8, 'Código de convite deve ter 8 caracteres'),
});

// Match schemas
export const createMatchSchema = z.object({
  pool_id: z.string().uuid('ID do bolão inválido'),
  home_team: z
    .string()
    .min(VALIDATION.TEAM_NAME.MIN_LENGTH, `Nome do time deve ter pelo menos ${VALIDATION.TEAM_NAME.MIN_LENGTH} caracteres`)
    .max(VALIDATION.TEAM_NAME.MAX_LENGTH, `Nome do time deve ter no máximo ${VALIDATION.TEAM_NAME.MAX_LENGTH} caracteres`),
  away_team: z
    .string()
    .min(VALIDATION.TEAM_NAME.MIN_LENGTH, `Nome do time deve ter pelo menos ${VALIDATION.TEAM_NAME.MIN_LENGTH} caracteres`)
    .max(VALIDATION.TEAM_NAME.MAX_LENGTH, `Nome do time deve ter no máximo ${VALIDATION.TEAM_NAME.MAX_LENGTH} caracteres`),
  match_date: z.string().datetime('Data da partida inválida'),
}).refine((data) => data.home_team !== data.away_team, {
  message: 'Times devem ser diferentes',
  path: ['away_team'],
});

export const updateMatchSchema = createMatchSchema.partial().extend({
  home_score: z.number().min(0, 'Placar deve ser positivo').max(50, 'Placar muito alto').optional(),
  away_score: z.number().min(0, 'Placar deve ser positivo').max(50, 'Placar muito alto').optional(),
  status: z.enum(['scheduled', 'live', 'finished', 'cancelled']).optional(),
});

// Bet schemas
export const createBetSchema = z.object({
  match_id: z.string().uuid('ID da partida inválido'),
  home_score_prediction: z.number().min(0, 'Placar deve ser positivo').max(50, 'Placar muito alto'),
  away_score_prediction: z.number().min(0, 'Placar deve ser positivo').max(50, 'Placar muito alto'),
});

export const updateBetSchema = createBetSchema.partial();

// Poll schemas
export const createPollSchema = z.object({
  title: z
    .string()
    .min(VALIDATION.POLL_TITLE.MIN_LENGTH, `Título deve ter pelo menos ${VALIDATION.POLL_TITLE.MIN_LENGTH} caracteres`)
    .max(VALIDATION.POLL_TITLE.MAX_LENGTH, `Título deve ter no máximo ${VALIDATION.POLL_TITLE.MAX_LENGTH} caracteres`),
  description: z.string().max(500, 'Descrição deve ter no máximo 500 caracteres').optional(),
  options: z
    .array(
      z.string()
        .min(VALIDATION.POLL_OPTION.MIN_LENGTH, `Opção deve ter pelo menos ${VALIDATION.POLL_OPTION.MIN_LENGTH} caractere`)
        .max(VALIDATION.POLL_OPTION.MAX_LENGTH, `Opção deve ter no máximo ${VALIDATION.POLL_OPTION.MAX_LENGTH} caracteres`)
    )
    .min(2, 'Enquete deve ter pelo menos 2 opções')
    .max(VALIDATION.POLL_OPTION.MAX_OPTIONS, `Enquete pode ter no máximo ${VALIDATION.POLL_OPTION.MAX_OPTIONS} opções`),
  start_date: z.string().datetime('Data de início inválida').optional(),
  end_date: z.string().datetime('Data de fim inválida').optional(),
}).refine((data) => {
  if (data.start_date && data.end_date) {
    return new Date(data.start_date) < new Date(data.end_date);
  }
  return true;
}, {
  message: 'Data de fim deve ser posterior à data de início',
  path: ['end_date'],
});

export const updatePollSchema = createPollSchema.partial().extend({
  status: z.enum(['draft', 'open', 'closed']).optional(),
});

export const votePollSchema = z.object({
  poll_id: z.string().uuid('ID da enquete inválido'),
  option_id: z.string().uuid('ID da opção inválido'),
});

// Search and filter schemas
export const poolFiltersSchema = z.object({
  status: z.array(z.enum(['draft', 'open', 'active', 'finished'])).optional(),
  creator_id: z.string().uuid().optional(),
  participant_id: z.string().uuid().optional(),
  search: z.string().optional(),
  category: z.string().optional(),
});

export const matchFiltersSchema = z.object({
  pool_id: z.string().uuid().optional(),
  status: z.array(z.enum(['scheduled', 'live', 'finished', 'cancelled'])).optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
  team: z.string().optional(),
});

export const betFiltersSchema = z.object({
  user_id: z.string().uuid().optional(),
  pool_id: z.string().uuid().optional(),
  match_id: z.string().uuid().optional(),
  date_from: z.string().datetime().optional(),
  date_to: z.string().datetime().optional(),
});

// Pagination schema
export const paginationSchema = z.object({
  page: z.number().min(1, 'Página deve ser maior que 0').default(1),
  limit: z.number().min(1, 'Limite deve ser maior que 0').max(100, 'Limite máximo é 100').default(10),
  sort_by: z.string().optional(),
  sort_order: z.enum(['asc', 'desc']).default('desc'),
});

// File upload schema
export const fileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Arquivo deve ter no máximo 5MB')
    .refine(
      (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
      'Apenas imagens JPEG, PNG e WebP são permitidas'
    ),
});

// Admin schemas
export const updateUserRoleSchema = z.object({
  user_id: z.string().uuid('ID do usuário inválido'),
  role: z.enum(['admin', 'participant']),
});

export const systemSettingsSchema = z.object({
  maintenance_mode: z.boolean().default(false),
  registration_enabled: z.boolean().default(true),
  max_pools_per_user: z.number().min(1).max(100).default(10),
  default_scoring_rules: scoringRulesSchema,
  notification_settings: z.object({
    email_enabled: z.boolean().default(true),
    push_enabled: z.boolean().default(true),
    sms_enabled: z.boolean().default(false),
  }),
});

// Notification settings schema
export const notificationSettingsSchema = z.object({
  bet_reminders: z.boolean().default(true),
  result_updates: z.boolean().default(true),
  pool_invites: z.boolean().default(true),
  ranking_changes: z.boolean().default(true),
  email_notifications: z.boolean().default(false),
  push_notifications: z.boolean().default(true),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome muito longo'),
  email: emailSchema,
  subject: z.string().min(5, 'Assunto deve ter pelo menos 5 caracteres').max(200, 'Assunto muito longo'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres').max(1000, 'Mensagem muito longa'),
});

// Bulk operations schemas
export const bulkDeleteSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Selecione pelo menos um item'),
});

export const bulkUpdateStatusSchema = z.object({
  ids: z.array(z.string().uuid()).min(1, 'Selecione pelo menos um item'),
  status: z.string().min(1, 'Status é obrigatório'),
});

// Export types for TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type CreatePoolInput = z.infer<typeof createPoolSchema>;
export type UpdatePoolInput = z.infer<typeof updatePoolSchema>;
export type JoinPoolInput = z.infer<typeof joinPoolSchema>;
export type CreateMatchInput = z.infer<typeof createMatchSchema>;
export type UpdateMatchInput = z.infer<typeof updateMatchSchema>;
export type CreateBetInput = z.infer<typeof createBetSchema>;
export type UpdateBetInput = z.infer<typeof updateBetSchema>;
export type CreatePollInput = z.infer<typeof createPollSchema>;
export type UpdatePollInput = z.infer<typeof updatePollSchema>;
export type VotePollInput = z.infer<typeof votePollSchema>;
export type PoolFiltersInput = z.infer<typeof poolFiltersSchema>;
export type MatchFiltersInput = z.infer<typeof matchFiltersSchema>;
export type BetFiltersInput = z.infer<typeof betFiltersSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;
export type FileUploadInput = z.infer<typeof fileUploadSchema>;
export type UpdateUserRoleInput = z.infer<typeof updateUserRoleSchema>;
export type SystemSettingsInput = z.infer<typeof systemSettingsSchema>;
export type NotificationSettingsInput = z.infer<typeof notificationSettingsSchema>;
export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type BulkDeleteInput = z.infer<typeof bulkDeleteSchema>;
export type BulkUpdateStatusInput = z.infer<typeof bulkUpdateStatusSchema>;