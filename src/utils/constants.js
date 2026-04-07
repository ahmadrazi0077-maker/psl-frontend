// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  MATCHES: {
    LIVE: '/matches/live',
    UPCOMING: '/matches/upcoming',
    PAST: '/matches/past',
    DETAILS: '/matches/:id',
    STANDINGS: '/standings',
  },
  TEAMS: {
    ALL: '/teams',
    DETAILS: '/teams/:id',
    PLAYERS: '/teams/:id/players',
  },
  PLAYERS: {
    ALL: '/players',
    DETAILS: '/players/:id',
    STATS: '/players/:id/stats',
    TOP: '/players/top/:category',
  },
  NEWS: {
    ALL: '/news',
    DETAILS: '/news/:id',
  },
};

// Player Roles
export const PLAYER_ROLES = {
  BATSMAN: 'Batsman',
  BOWLER: 'Bowler',
  ALL_ROUNDER: 'All-rounder',
  WICKET_KEEPER: 'Wicket Keeper',
};

// Match Status
export const MATCH_STATUS = {
  UPCOMING: 'upcoming',
  LIVE: 'live',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

// PSL Teams
export const PSL_TEAMS = [
  { id: 1, name: 'Karachi Kings', code: 'KK', color: '#FDB813' },
  { id: 2, name: 'Lahore Qalandars', code: 'LQ', color: '#B20000' },
  { id: 3, name: 'Islamabad United', code: 'IU', color: '#FF6600' },
  { id: 4, name: 'Peshawar Zalmi', code: 'PZ', color: '#FFC000' },
  { id: 5, name: 'Quetta Gladiators', code: 'QG', color: '#800080' },
  { id: 6, name: 'Multan Sultans', code: 'MS', color: '#FFD700' },
];

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  LIMITS: [10, 20, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'PPP', // Jan 1, 2024
  API: 'yyyy-MM-dd',
  TIME: 'hh:mm a',
  FULL: 'PPP p',
};