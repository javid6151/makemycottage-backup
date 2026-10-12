/**
 * galleryVideoManager.js
 * Centralized playback coordination strictly for the Gallery section.
 * Enforces single-video playback: when one video starts playing,
 * all other videos in the gallery are immediately paused.
 */

// Registry of active video card controllers: Map<id, { pause: Function, iframe: HTMLIFrameElement, sendCommand: Function }>
const galleryVideoControllers = new Map();

/**
 * Register a video card controller.
 * @param {string|number} id
 * @param {Object} controller - { pause, iframe, sendCommand }
 * @returns {Function} cleanup function to unregister
 */
export const registerGalleryVideo = (id, controller) => {
  galleryVideoControllers.set(id, controller);
  return () => {
    galleryVideoControllers.delete(id);
  };
};

/**
 * Notify that a video with `activeId` has started playing.
 * Immediately pauses all other videos in the gallery.
 * @param {string|number} activeId
 */
export const notifyVideoStartedPlaying = (activeId) => {
  galleryVideoControllers.forEach((controller, id) => {
    if (id !== activeId) {
      try {
        controller.pause();
      } catch (err) {
        // Safe fallback
      }
    }
  });

  // Global event broadcast for any modal or overlay components in the gallery
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('gallery-single-video-playing', { detail: { activeId } })
    );
  }
};

/**
 * Pause all videos in the gallery (e.g. when opening a lightbox or navigating away).
 */
export const pauseAllGalleryVideos = () => {
  galleryVideoControllers.forEach((controller) => {
    try {
      controller.pause();
    } catch (err) {
      // Safe fallback
    }
  });
};
