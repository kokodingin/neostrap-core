/**
 * Gets the current vertical scroll position of the window.
 * Falls back to window.scrollY if pageYOffset is not supported.
 */
const getCurrentVerticalPosition = () => window.pageYOffset || window.scrollY;

/**
 * Gets the current horizontal scroll position of the window.
 * Falls back to window.scrollX if pageXOffset is not supported.
 */
const getCurrentHorizontalPosition = () => window.pageXOffset || window.scrollX;

/**
 * Smoothly scrolls the window to the specified coordinates.
 *
 * @param {number} [top=0] - The target vertical scroll position in pixels.
 * @param {number} [left=0] - The target horizontal scroll position in pixels.
 * @param {string} [behavior='smooth'] - The scroll behavior ('auto', 'smooth', 'instant').
 *
 * @example
 * // Scroll to the top of the page smoothly
 * scrollToPosition(0);
 *
 * // Scroll to specific coordinates instantly
 * scrollToPosition(500, 200, 'instant');
 */
const scrollToPosition = (
  top = 0,
  left = 0,
  behavior = 'smooth'
) => {
  window.scrollTo({
    top,
    left,
    behavior
  });
};

/**
 * Retrieves the specified position of an element's bounding rectangle relative to the viewport.
 *
 * @param {HTMLElement | string} element - The target element or a selector string.
 * @param {string} [position='top'] - The position to retrieve from the bounding rectangle.
 * @returns {number} The specified position of the element's bounding rectangle.
 * @throws {Error} If the element is not found.
 *
 * @example
 * // Get the top position of an element
 * getElementPosition('#my-element', 'top');
 */
const getElementPosition = (
  element,
  position = 'top'
) => {
  const targetElement = 
    typeof element === 'string' ? document.querySelector(element) : element;

  if (!targetElement) {
    throw new Error('Failed to find the element!');
  }

  return targetElement.getBoundingClientRect()[position];
};

/**
 * Smoothly scrolls the window to a target element with an optional offset.
 *
 * @param {string} targetSelector - A selector string of the target HTML element to scroll to.
 * @param {number} [offset=0] - The distance in pixels to offset from the target element.
 * @throws {Error} If the target element is not found.
 *
 * @example
 * // Scroll to the element with ID 'section-1' with an 80px offset
 * scrollToElement('#section-1', 80);
 */
const scrollToElement = (
  targetSelector,
  offset = 0
) => {
  const targetElement = document.querySelector(targetSelector);

  if (!targetElement) {
    throw new Error(`Element with selector '${targetSelector}' not found`);
  }

  const targetPosition = getElementPosition(targetElement);
  const scrollPosition = targetPosition - offset;

  scrollToPosition(scrollPosition);
};

// Implementation
const elementNeedScrollToTarget = document.querySelectorAll('[data-scroll]');

elementNeedScrollToTarget.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    
    const rectNavbar = getElementPosition('#main-navbar', 'bottom') + 20;
    const scrollTarget = el.getAttribute('data-scroll');
    scrollToElement(scrollTarget, rectNavbar);
  });
});