// Main Types Export
export * from './database';

// UI and Component Types
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
}

export interface PaginationProps {
  page: number;
  limit: number;
  total: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

// Form Validation Types
export interface FormFieldError {
  message: string;
  type: string;
}

export interface FormErrors {
  [key: string]: FormFieldError | undefined;
}

// Modal and Dialog Types
export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ConfirmDialogProps extends ModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'destructive';
}

// Toast and Notification Types
export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant: 'default' | 'destructive' | 'success' | 'warning';
  duration?: number;
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  disabled?: boolean;
  external?: boolean;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

// Table Types
export interface TableColumn<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  pagination?: PaginationProps;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  onSort?: (key: string, order: 'asc' | 'desc') => void;
}

// Chart and Statistics Types
export interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface TimeSeriesDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface ChartProps {
  data: ChartDataPoint[] | TimeSeriesDataPoint[];
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}

// Search and Filter Types
export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterProps {
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
  title?: string;
  multiple?: boolean;
}

// File Upload Types
export interface FileUploadProps {
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  onUpload: (files: File[]) => void;
  loading?: boolean;
  error?: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Date and Time Types
export interface DateRange {
  from: Date;
  to: Date;
}

export interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

// Responsive Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveValue<T> {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  '2xl'?: T;
}

// Animation Types
export interface AnimationProps {
  duration?: number;
  delay?: number;
  easing?: string;
}

// Accessibility Types
export interface A11yProps {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  role?: string;
  tabIndex?: number;
}

// Event Handler Types
export type EventHandler<T = Event> = (event: T) => void;
export type ChangeHandler<T = string> = (value: T) => void;
export type SubmitHandler<T = Record<string, any>> = (data: T) => void;

// API Types
export interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

export interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string>;
}

// Cache Types
export interface CacheConfig {
  ttl: number;
  maxSize: number;
  strategy: 'lru' | 'fifo';
}

// WebSocket Types
export interface WebSocketMessage {
  type: string;
  payload: any;
  timestamp: number;
}

export interface WebSocketConfig {
  url: string;
  reconnectAttempts: number;
  reconnectDelay: number;
}

// Performance Types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage: number;
}

// Error Boundary Types
export interface ErrorInfo {
  componentStack: string;
  errorBoundary?: string;
  eventId?: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Context Types
export interface AuthContextType {
  user: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  updateProfile: (data: UpdateProfileForm) => Promise<void>;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

// Hook Types
export interface UseQueryOptions<T> {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  refetchOnMount?: boolean;
  staleTime?: number;
  cacheTime?: number;
  retry?: number;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseMutationOptions<T, V> {
  onSuccess?: (data: T, variables: V) => void;
  onError?: (error: Error, variables: V) => void;
  onSettled?: (data: T | undefined, error: Error | null, variables: V) => void;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Generic Types
export type ID = string | number;
export type Timestamp = string | Date;
export type JSONValue = string | number | boolean | null | JSONObject | JSONArray;
export type JSONObject = { [key: string]: JSONValue };
export type JSONArray = JSONValue[];

// Constants Types
export const POOL_STATUS_LABELS: Record<PoolStatus, string> = {
  draft: 'Rascunho',
  open: 'Aberto',
  active: 'Ativo',
  finished: 'Finalizado',
};

export const MATCH_STATUS_LABELS: Record<MatchStatus, string> = {
  scheduled: 'Agendado',
  live: 'Ao Vivo',
  finished: 'Finalizado',
  cancelled: 'Cancelado',
};

export const POLL_STATUS_LABELS: Record<PollStatus, string> = {
  draft: 'Rascunho',
  open: 'Aberta',
  closed: 'Fechada',
};

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  bet_reminder: 'Lembrete de Palpite',
  result_update: 'Atualização de Resultado',
  pool_invite: 'Convite para Bolão',
  ranking_change: 'Mudança no Ranking',
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  bet_placed: 'Palpite Realizado',
  pool_joined: 'Entrou no Bolão',
  poll_voted: 'Votou na Enquete',
  ranking_improved: 'Subiu no Ranking',
};