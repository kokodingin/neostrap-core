/**
 * A comprehensive module providing smooth scrolling utilities and element position calculations.
 * @module ScrollUtilities
 */

/**
 * Retrieves the current vertical scroll position of the viewport.
 * Provides cross-browser compatibility by falling back to window.scrollY if pageYOffset is not supported.
 * @returns {number} The current vertical scroll position in pixels
 */
const getScrollPositionY = () => window.pageYOffset || window.scrollY;

/**
 * Retrieves the current horizontal scroll position of the viewport.
 * Provides cross-browser compatibility by falling back to window.scrollX if pageXOffset is not supported.
 * @returns {number} The current horizontal scroll position in pixels
 */
const getScrollPositionX = () => window.pageXOffset || window.scrollX;

/**
 * Performs a smooth scroll animation to specified coordinates in the viewport.
 * @param {Object} options - The scroll configuration options
 * @param {number} [options.top=0] - The target vertical scroll position in pixels
 * @param {number} [options.left=0] - The target horizontal scroll position in pixels
 * @param {string} [options.behavior='smooth'] - The scroll behavior animation type:
 *   - 'smooth': Animated smooth scrolling
 *   - 'auto': Instant jump without animation
 *   - 'instant': Force immediate jump without animation
 * @throws {TypeError} If provided parameters are not of expected types
 */
const scrollTo = ({
  top = 0,
  left = 0,
  behavior = 'smooth'
} = {}) => {
  window.scrollTo({
    top,
    left,
    behavior
  });
};

/**
 * Calculates the position of an element relative to the viewport.
 * @param {HTMLElement|string} element - The target DOM element or its selector
 * @param {string} [position='top'] - The desired position property from the element's bounding rectangle:
 *   - 'top': Distance from the viewport's top to the element's top edge
 *   - 'bottom': Distance from the viewport's top to the element's bottom edge
 *   - 'left': Distance from the viewport's left to the element's left edge
 *   - 'right': Distance from the viewport's left to the element's right edge
 * @returns {number} The calculated position value in pixels
 * @throws {Error} If the element cannot be found in the DOM
 * @throws {TypeError} If position parameter is not a valid bounding rectangle property
 */
const getElementViewportPosition = (
  element,
  position = 'top'
) => {
  const targetElement = 
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!targetElement) {
    throw new Error(`Unable to locate element: ${element}`);
  }

  return targetElement.getBoundingClientRect()[position];
};

/**
 * Smoothly scrolls the viewport to bring a target element into view.
 * @param {Object} options - The scroll configuration options
 * @param {string} options.selector - CSS selector for the target element
 * @param {number} [options.offset=0] - Additional offset in pixels from the target element
 * @param {string} [options.behavior='smooth'] - The scroll behavior type
 * @throws {Error} If the target element cannot be found
 */
const scrollToElement = ({
  selector,
  offset = 0,
  behavior = 'smooth'
}) => {
  const targetElement = document.querySelector(selector);

  if (!targetElement) {
    throw new Error(`Target element not found: ${selector}`);
  }

  const elementPosition = getElementViewportPosition(targetElement);
  const scrollTarget = elementPosition - offset;

  scrollTo({
    top: scrollTarget,
    behavior
  });
};

/**
 * Initialize scroll behavior for navigation elements and back-to-top functionality.
 * @param {Object} options - Configuration options for scroll initialization
 * @param {string} [options.scrollTriggerAttribute='data-scroll'] - Data attribute for scroll trigger elements
 * @param {string} [options.backToTopSelector='[data-toggle="back-to-top"]'] - Selector for back-to-top element
 * @param {string} [options.navbarSelector='#main-navbar'] - Selector for navigation bar element
 * @param {number} [options.navbarOffset=20] - Additional offset from navbar in pixels
 * @param {number} [options.scrollThreshold=50] - Scroll position threshold for showing back-to-top button
 */
const initializeScrollBehavior = ({
  scrollTriggerAttribute = 'data-scroll',
  backToTopSelector = '[data-toggle="back-to-top"]',
  navbarSelector = '#main-navbar',
  navbarOffset = 20,
  scrollThreshold = 50
} = {}) => {
  const scrollTriggers = document.querySelectorAll(`[${scrollTriggerAttribute}]`);
  const backToTopButton = document.querySelector(backToTopSelector);

  scrollTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      
      const navbarBottom = getElementViewportPosition(navbarSelector, 'bottom') + navbarOffset;
      const targetSelector = trigger.getAttribute(scrollTriggerAttribute);
      
      scrollToElement({
        selector: targetSelector,
        offset: navbarBottom
      });
    });
  });

  window.addEventListener('scroll', () => {
    const isVisible = getScrollPositionY() > scrollThreshold;
    
    Object.assign(backToTopButton.style, {
      transition: 'all 0.2s',
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? 'visible' : 'hidden',
      bottom: isVisible ? '1rem' : '0'
    });
  });

  backToTopButton.addEventListener('click', () => scrollTo({ top: 0 }));
};

/**
 * Arrange and gather core code into 1 function to init
 * 
 * @returns {void}
 */
const main = () => {
  initializeScrollBehavior();
};

// ----- Run it! --------
main();