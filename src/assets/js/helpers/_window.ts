/**
 * Gets the current vertical scroll position of the window.
 * Falls back to window.scrollY if pageYOffset is not supported.
 */
export const getCurrentVerticalPosition = (): number => window.pageYOffset || window.scrollY;

/**
 * Gets the current horizontal scroll position of the window.
 * Falls back to window.scrollX if pageXOffset is not supported.
 */
export const getCurrentHorizontalPosition = (): number => window.pageXOffset || window.scrollX;

/**
 * Smoothly scrolls the window to the specified coordinates.
 *
 * @param {number} [top=0] - The target vertical scroll position in pixels.
 * @param {number} [left=0] - The target horizontal scroll position in pixels.
 * @param {ScrollBehavior} [behavior='smooth'] - The scroll behavior ('auto', 'smooth', 'instant').
 *
 * @example
 * // Scroll to the top of the page smoothly
 * scrollToPosition(0);
 *
 * // Scroll to specific coordinates instantly
 * scrollToPosition(500, 200, 'instant');
 */
export const scrollToPosition = (
  top: number = 0,
  left: number = 0,
  behavior: ScrollBehavior = 'smooth'
): void => {
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
 * @param {'top' | 'left' | 'right' | 'bottom'} [position='top'] - The position to retrieve from the bounding rectangle.
 * @returns {number} The specified position of the element's bounding rectangle.
 * @throws {Error} If the element is not found.
 *
 * @example
 * // Get the top position of an element
 * getElementPosition('#my-element', 'top');
 */
export const getElementPosition = (
  element: HTMLElement | string,
  position: 'top' | 'left' | 'right' | 'bottom' = 'top'
): number => {
  const targetElement: HTMLElement | null =
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
export const scrollToElement = (
  targetSelector: string,
  offset: number = 0
): void => {
  const targetElement: HTMLElement | null = document.querySelector(targetSelector);

  if (!targetElement) {
    throw new Error(`Element with selector '${targetSelector}' not found`);
  }

  const targetPosition: number = getElementPosition(targetElement);
  const scrollPosition: number = targetPosition - offset;

  scrollToPosition(scrollPosition);
};
