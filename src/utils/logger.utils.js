/**
 * Logger Utilities
 * Các hàm tiện ích để logging
 */

/**
 * Log levels
 */
const LOG_LEVELS = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR',
};

/**
 * Format log message
 * @param {string} level 
 * @param {string} message 
 * @param {Object} data 
 */
function formatMessage(level, message, data = null) {
  const timestamp = new Date().toISOString();
  const dataStr = data ? `\n${JSON.stringify(data, null, 2)}` : '';
  return `[${timestamp}] [${level}] ${message}${dataStr}`;
}

/**
 * Debug log
 * @param {string} message 
 * @param {Object} data 
 */
export function debug(message, data = null) {
  if (process.env.DEBUG === 'true') {
    console.log(formatMessage(LOG_LEVELS.DEBUG, message, data));
  }
}

/**
 * Info log
 * @param {string} message 
 * @param {Object} data 
 */
export function info(message, data = null) {
  console.log(formatMessage(LOG_LEVELS.INFO, message, data));
}

/**
 * Warning log
 * @param {string} message 
 * @param {Object} data 
 */
export function warn(message, data = null) {
  console.warn(formatMessage(LOG_LEVELS.WARN, message, data));
}

/**
 * Error log
 * @param {string} message 
 * @param {Error|Object} error 
 */
export function error(message, error = null) {
  const errorData = error instanceof Error ? {
    name: error.name,
    message: error.message,
    stack: error.stack,
  } : error;
  
  console.error(formatMessage(LOG_LEVELS.ERROR, message, errorData));
}

/**
 * Log test step
 * @param {string} step 
 * @param {string} description 
 */
export function logTestStep(step, description) {
  info(`Step ${step}: ${description}`);
}

export default {
  debug,
  info,
  warn,
  error,
  logTestStep,
};

