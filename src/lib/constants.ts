// System Constants and Configuration

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  AVATAR_MAX_SIZE: 2 * 1024 * 1024, // 2MB
} as const;

// Validation Rules
export const VALIDATION = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL: false,
  },
  POOL_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  POOL_DESCRIPTION: {
    MAX_LENGTH: 500,
  },
  TEAM_NAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 50,
  },
  POLL_TITLE: {
    MIN_LENGTH: 5,
    MAX_LENGTH: 200,
  },
  POLL_OPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 100,
    MAX_OPTIONS: 10,
  },
} as const;

// Scoring Rules
export const DEFAULT_SCORING_RULES = {
  exact_score: 3,
  correct_winner: 1,
  correct_draw: 1,
} as const;

export const SCORING_PRESETS = {
  standard: {
    name: 'Padrão',
    rules: { exact_score: 3, correct_winner: 1, correct_draw: 1 },
  },
  conservative: {
    name: 'Conservador',
    rules: { exact_score: 2, correct_winner: 1, correct_draw: 1 },
  },
  aggressive: {
    name: 'Agressivo',
    rules: { exact_score: 5, correct_winner: 2, correct_draw: 2 },
  },
  simple: {
    name: 'Simples',
    rules: { exact_score: 1, correct_winner: 1, correct_draw: 1 },
  },
} as const;

// Time Limits
export const TIME_LIMITS = {
  BET_CUTOFF_MINUTES: 15, // Minutes before match start
  POOL_EDIT_CUTOFF_HOURS: 24, // Hours before pool start
  POLL_DURATION_MIN_HOURS: 1,
  POLL_DURATION_MAX_DAYS: 30,
} as const;

// Cache Configuration
export const CACHE = {
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  CACHE_TIME: 10 * 60 * 1000, // 10 minutes
  BACKGROUND_REFETCH: true,
  RETRY_ON_MOUNT: true,
} as const;

// Query Keys
export const QUERY_KEYS = {
  // Auth
  PROFILE: 'profile',
  USER_STATS: 'user-stats',
  
  // Pools
  POOLS: 'pools',
  POOL: 'pool',
  POOL_PARTICIPANTS: 'pool-participants',
  POOL_RANKING: 'pool-ranking',
  POOL_STATS: 'pool-stats',
  
  // Matches
  MATCHES: 'matches',
  MATCH: 'match',
  UPCOMING_MATCHES: 'upcoming-matches',
  
  // Bets
  BETS: 'bets',
  BET: 'bet',
  USER_BETS: 'user-bets',
  BET_HISTORY: 'bet-history',
  
  // Polls
  POLLS: 'polls',
  POLL: 'poll',
  POLL_RESULTS: 'poll-results',
  
  // Rankings
  GLOBAL_RANKING: 'global-ranking',
  POOL_RANKINGS: 'pool-rankings',
  
  // Notifications
  NOTIFICATIONS: 'notifications',
  UNREAD_COUNT: 'unread-count',
  
  // Activities
  ACTIVITIES: 'activities',
  RECENT_ACTIVITIES: 'recent-activities',
  
  // Admin
  ADMIN_STATS: 'admin-stats',
  ADMIN_USERS: 'admin-users',
  ADMIN_POOLS: 'admin-pools',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'palpita-agora-theme',
  USER_PREFERENCES: 'user-preferences',
  DRAFT_POOL: 'draft-pool',
  NOTIFICATION_SETTINGS: 'notification-settings',
} as const;

// Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  POOLS: '/pools',
  POOL_DETAIL: '/pools/:id',
  CREATE_POOL: '/pools/create',
  MATCHES: '/matches',
  MATCH_DETAIL: '/matches/:id',
  BETS: '/bets',
  POLLS: '/polls',
  POLL_DETAIL: '/polls/:id',
  RANKING: '/ranking',
  NOTIFICATIONS: '/notifications',
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_POOLS: '/admin/pools',
  ADMIN_MATCHES: '/admin/matches',
  ADMIN_SETTINGS: '/admin/settings',
  HELP: '/help',
  TERMS: '/terms',
  PRIVACY: '/privacy',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Ocorreu um erro inesperado. Tente novamente.',
  NETWORK: 'Erro de conexão. Verifique sua internet.',
  UNAUTHORIZED: 'Você não tem permissão para esta ação.',
  NOT_FOUND: 'Recurso não encontrado.',
  VALIDATION: 'Dados inválidos. Verifique os campos.',
  SERVER: 'Erro interno do servidor. Tente novamente mais tarde.',
  TIMEOUT: 'Operação expirou. Tente novamente.',
  
  // Auth specific
  INVALID_CREDENTIALS: 'Email ou senha incorretos.',
  EMAIL_ALREADY_EXISTS: 'Este email já está em uso.',
  USERNAME_ALREADY_EXISTS: 'Este nome de usuário já está em uso.',
  WEAK_PASSWORD: 'A senha deve ter pelo menos 8 caracteres.',
  
  // Pool specific
  POOL_FULL: 'Este bolão já atingiu o limite de participantes.',
  POOL_CLOSED: 'Este bolão não está mais aceitando participantes.',
  ALREADY_PARTICIPANT: 'Você já participa deste bolão.',
  
  // Bet specific
  BET_DEADLINE_PASSED: 'O prazo para palpites já passou.',
  MATCH_ALREADY_STARTED: 'Esta partida já começou.',
  INVALID_SCORE: 'Placar inválido.',
  
  // File upload
  FILE_TOO_LARGE: 'Arquivo muito grande.',
  INVALID_FILE_TYPE: 'Tipo de arquivo não suportado.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
  POOL_CREATED: 'Bolão criado com sucesso!',
  POOL_JOINED: 'Você entrou no bolão!',
  POOL_LEFT: 'Você saiu do bolão.',
  BET_PLACED: 'Palpite registrado com sucesso!',
  BET_UPDATED: 'Palpite atualizado com sucesso!',
  POLL_VOTED: 'Voto registrado com sucesso!',
  NOTIFICATION_READ: 'Notificação marcada como lida.',
  SETTINGS_SAVED: 'Configurações salvas com sucesso!',
} as const;

// Notification Settings
export const NOTIFICATION_DEFAULTS = {
  bet_reminders: true,
  result_updates: true,
  pool_invites: true,
  ranking_changes: true,
  email_notifications: false,
  push_notifications: true,
} as const;

// Theme Configuration
export const THEME_CONFIG = {
  DEFAULT: 'system' as const,
  STORAGE_KEY: 'theme',
  MEDIA_QUERY: '(prefers-color-scheme: dark)',
} as const;

// Animation Durations
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'dd/MM/yyyy',
  LONG: 'dd/MM/yyyy HH:mm',
  TIME: 'HH:mm',
  RELATIVE: 'relative',
  ISO: 'yyyy-MM-dd\'T\'HH:mm:ss.SSSxxx',
} as const;

// WebSocket Events
export const WS_EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MATCH_UPDATE: 'match_update',
  RANKING_UPDATE: 'ranking_update',
  NEW_NOTIFICATION: 'new_notification',
  POOL_UPDATE: 'pool_update',
  USER_JOINED: 'user_joined',
  USER_LEFT: 'user_left',
} as const;

// Feature Flags
export const FEATURES = {
  POLLS: true,
  NOTIFICATIONS: true,
  REAL_TIME_UPDATES: true,
  ADMIN_PANEL: true,
  ANALYTICS: true,
  SOCIAL_FEATURES: true,
  MOBILE_APP: false,
} as const;

// Rate Limiting
export const RATE_LIMITS = {
  BET_CREATION: { requests: 10, window: 60000 }, // 10 requests per minute
  POOL_CREATION: { requests: 5, window: 300000 }, // 5 requests per 5 minutes
  PROFILE_UPDATE: { requests: 3, window: 60000 }, // 3 requests per minute
  NOTIFICATION_READ: { requests: 100, window: 60000 }, // 100 requests per minute
} as const;

// SEO Configuration
export const SEO = {
  DEFAULT_TITLE: 'Palpita Agora - Sistema de Bolões',
  DEFAULT_DESCRIPTION: 'Crie e participe de bolões esportivos com seus amigos. Faça palpites, acompanhe rankings e divirta-se!',
  DEFAULT_KEYWORDS: 'bolão, palpites, esportes, futebol, apostas, ranking, competição',
  SITE_NAME: 'Palpita Agora',
  TWITTER_HANDLE: '@palpitaagora',
} as const;

// Environment Variables (with defaults)
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  SUPABASE_URL: process.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: process.env.VITE_SUPABASE_ANON_KEY || '',
  APP_URL: process.env.VITE_APP_URL || 'http://localhost:5173',
  ANALYTICS_ID: process.env.VITE_ANALYTICS_ID || '',
} as const;