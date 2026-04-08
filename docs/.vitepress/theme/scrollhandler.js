/**
 * Creates a scroll handler for VitePress navigation
 * @param {import('vitepress').Router} router - VitePress router instance
 * @returns {Function} Scroll to element function
 */
const createScrollHandler = (router) => {
  /**
   * Calculate total offset height from navigation elements
   * @returns {number} Total offset height in pixels
   */
  const calculateNavigationOffset = () => {
    const mainNav = document.querySelector(".VPNav");
    const sideNav = document.querySelector(".VPLocalNav");
    const PADDING = 24;

    return (
      (mainNav?.offsetHeight || 0) + (sideNav?.offsetHeight || 0) + PADDING
    );
  };

  /**
   * Formats and validates the hash string
   * @param {string} hash - URL hash string
   * @returns {string} Formatted hash with leading #
   */
  const formatHash = (hash) => {
    return hash.startsWith("#") ? hash : `#${hash}`;
  };

  /**
   * Calculate target scroll position
   * @param {HTMLElement} element - Target element to scroll to
   * @returns {number} Calculated scroll position
   */
  const calculateScrollPosition = (element) => {
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const offset = calculateNavigationOffset();

    return Math.max(0, elementTop - offset);
  };

  /**
   * Scrolls to a specific element on the page
   * @param {string} hash - URL hash identifying the target element
   */
  const scrollToElement = (hash) => {
    const formattedHash = formatHash(hash);
    const targetElement = document.querySelector(formattedHash);

    if (!targetElement) return;

    const targetPosition = calculateScrollPosition(targetElement);

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  /**
   * Handle route changes with hash
   */
  const handleRouteChange = (to) => {
    if (!to.hash) return;

    requestAnimationFrame(() => {
      scrollToElement(decodeURIComponent(to.hash));
    });
  };

  /**
   * Handle initial page load with hash
   */
  const handleInitialLoad = () => {
    const hash = decodeURIComponent(window.location.hash);

    if (!hash) return;

    requestAnimationFrame(() => {
      scrollToElement(hash);
    });
  };

  if (!window) return;
  // Setup event listeners
  router.onAfterRouteChanged = handleRouteChange;
  window.onload = handleInitialLoad;

  return scrollToElement;
};

export default createScrollHandler;
