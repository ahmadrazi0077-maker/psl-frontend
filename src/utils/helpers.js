// Format date
export const formatDate = (date, format = 'PPP') => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Format time
export const formatTime = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate strike rate
export const calculateStrikeRate = (runs, balls) => {
  if (!balls || balls === 0) return 0;
  return ((runs / balls) * 100).toFixed(2);
};

// Calculate economy rate
export const calculateEconomy = (runs, overs) => {
  if (!overs || overs === 0) return 0;
  return (runs / overs).toFixed(2);
};

// Calculate batting average
export const calculateBattingAverage = (runs, innings) => {
  if (!innings || innings === 0) return 0;
  return (runs / innings).toFixed(2);
};

// Calculate bowling average
export const calculateBowlingAverage = (runs, wickets) => {
  if (!wickets || wickets === 0) return 0;
  return (runs / wickets).toFixed(2);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Generate random ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Debounce function
export const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Local storage helpers
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};

// Cookie helpers
export const cookies = {
  set: (name, value, days = 7) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  },
  get: (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  },
  remove: (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};

// URL helpers
export const urlParams = {
  get: (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },
  set: (params) => {
    const urlParams = new URLSearchParams(window.location.search);
    Object.keys(params).forEach(key => {
      if (params[key]) {
        urlParams.set(key, params[key]);
      } else {
        urlParams.delete(key);
      }
    });
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  },
  remove: (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(param);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, '', newUrl);
  },
};