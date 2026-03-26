/**
 * Logger utility — silences debug output in production.
 *
 * Debug logging is enabled by either:
 *   - Setting localStorage.DEBUG = 'true'
 *   - Adding ?debug to the URL
 *
 * Errors (logger.error) ALWAYS print regardless of flag.
 */

const _isDebug = (() => {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('DEBUG') === 'true') return true;
    if (typeof location !== 'undefined' && location.search.includes('debug')) return true;
  } catch { /* SSR / restricted context */ }
  return false;
})();

const noop = () => {};

const logger = {
  /** Debug info — only prints when DEBUG is enabled */
  log:   _isDebug ? console.log.bind(console)  : noop,
  /** Warnings — only prints when DEBUG is enabled */
  warn:  _isDebug ? console.warn.bind(console)  : noop,
  /** Informational — only prints when DEBUG is enabled */
  info:  _isDebug ? console.info.bind(console)  : noop,
  /** Debug level — only prints when DEBUG is enabled */
  debug: _isDebug ? console.debug.bind(console) : noop,
  /** Errors — ALWAYS prints (indicates real problems) */
  error: console.error.bind(console),
};

export default logger;
