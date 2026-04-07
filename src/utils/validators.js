// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation (Pakistan)
export const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^(\+92|0)?3[0-9]{9}$/;
  return phoneRegex.test(phone);
};

// Password validation
export const isValidPassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return passwordRegex.test(password);
};

// Name validation
export const isValidName = (name) => {
  return name && name.trim().length >= 2 && name.trim().length <= 50;
};

// URL validation
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Number validation
export const isValidNumber = (num, min = null, max = null) => {
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
};

// Match score validation
export const validateMatchScore = (score) => {
  const errors = {};
  
  if (!isValidNumber(score.runs, 0)) {
    errors.runs = 'Invalid runs';
  }
  if (!isValidNumber(score.wickets, 0, 10)) {
    errors.wickets = 'Invalid wickets (0-10)';
  }
  if (!isValidNumber(score.overs, 0, 20)) {
    errors.overs = 'Invalid overs (0-20)';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Player stats validation
export const validatePlayerStats = (stats) => {
  const errors = {};
  
  if (!isValidNumber(stats.matches, 0)) {
    errors.matches = 'Invalid matches count';
  }
  if (!isValidNumber(stats.runs, 0)) {
    errors.runs = 'Invalid runs';
  }
  if (!isValidNumber(stats.wickets, 0)) {
    errors.wickets = 'Invalid wickets';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Form validation helper
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = data[field];
    const fieldRules = rules[field];
    
    if (fieldRules.required && (!value || value.trim() === '')) {
      errors[field] = `${field} is required`;
    }
    
    if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
      errors[field] = `${field} must be at least ${fieldRules.minLength} characters`;
    }
    
    if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
      errors[field] = `${field} must not exceed ${fieldRules.maxLength} characters`;
    }
    
    if (fieldRules.pattern && value && !fieldRules.pattern.test(value)) {
      errors[field] = fieldRules.message || `${field} is invalid`;
    }
    
    if (fieldRules.custom && !fieldRules.custom(value)) {
      errors[field] = fieldRules.message || `${field} is invalid`;
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Common validation rules
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
  },
  password: {
    required: true,
    minLength: 6,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    message: 'Password must contain at least 6 characters, one uppercase, one lowercase, and one number',
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    required: true,
    pattern: /^(\+92|0)?3[0-9]{9}$/,
    message: 'Please enter a valid Pakistani phone number',
  },
};