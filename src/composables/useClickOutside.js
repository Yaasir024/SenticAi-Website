import { onBeforeUnmount, onMounted, watch } from "vue";

/**
 * Hook for handling click events occurring outside a specified element.
 * @param {Ref} elTargetRef - Reference to the target element.
 * @param {Function} clickOutsideCallback - Callback function to execute when a click outside the element occurs.
 * @param {Boolean} enableEscapeKey - Flag to enable/disable handling of the "Escape" key.
 * @param {Function} escapeKeyCallback - Callback function to execute when the "Escape" key is pressed.
 */
export function useClickOutside(
  elTargetRef,
  clickOutsideCallback,
  enableEscapeKey = false,
  escapeKeyCallback
) {
  if (!elTargetRef || !clickOutsideCallback) {
    return;
  }

  const handleEscapeKey = (event) => {
    if (event.key === "Escape" && typeof escapeKeyCallback === "function") {
      escapeKeyCallback();
    }
  };

  const handleClickOutside = (event) => {
    if (elTargetRef.value && !elTargetRef.value.contains(event.target)) {
      clickOutsideCallback();
    }
  };

  onMounted(() => {
    setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
      if (enableEscapeKey) {
        window.addEventListener("keydown", handleEscapeKey);
      }
    }, 0);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("click", handleClickOutside);
    if (enableEscapeKey) {
      window.removeEventListener("keydown", handleEscapeKey);
    }
  });
}