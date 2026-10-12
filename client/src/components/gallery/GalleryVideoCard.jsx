import React, { useRef, useEffect } from 'react';
import {
  registerGalleryVideo,
  notifyVideoStartedPlaying,
} from './galleryVideoManager';

/**
 * GalleryVideoCard Component
 * Strictly for MakeMyCottage Gallery Section.
 * - Embeds unique, standard (non-Shorts) YouTube videos.
 * - Single-active playback: strictly only ONE video can play at a time.
 *   If any video starts playing (via user click, API, or scroll),
 *   all other gallery videos are instantly paused.
 * - Plays muted by default; user can freely unmute via native YouTube controls.
 */
const GalleryVideoCard = ({
  id,
  videoId,
  title = 'MakeMyCottage Video Tour',
  className = '',
}) => {
  const containerRef = useRef(null);
  const iframeRef = useRef(null);
  const ytPlayerRef = useRef(null);
  const iframeId = `gallery-yt-frame-${id}`;

  // Helper to send postMessage commands to YouTube iframe
  const sendCommand = (func, args = '') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func, args }),
        '*'
      );
    }
  };

  // Safe pause handler combining direct YT.Player API and postMessage
  const handlePause = () => {
    try {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
        ytPlayerRef.current.pauseVideo();
      }
    } catch {
      // Fallback to postMessage
    }
    sendCommand('pauseVideo');
  };

  // Register this video card with the central Gallery Video Manager
  useEffect(() => {
    const unregister = registerGalleryVideo(id, {
      pause: handlePause,
      iframe: iframeRef.current,
      sendCommand,
    });
    return () => unregister();
  }, [id]);

  // Load YouTube IFrame API script once if not already on the page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.YT) {
      const existingScript = document.getElementById('youtube-iframe-api');
      if (!existingScript) {
        const script = document.createElement('script');
        script.id = 'youtube-iframe-api';
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      }
    }
  }, []);

  // Initialize YT.Player instance when API is available
  const setupYTPlayer = () => {
    if (typeof window === 'undefined' || !window.YT || !window.YT.Player) return;
    if (ytPlayerRef.current) return;

    try {
      ytPlayerRef.current = new window.YT.Player(iframeId, {
        events: {
          onReady: (event) => {
            // Ensure muted by default
            try {
              event.target.mute();
            } catch {
              // Ignore
            }
          },
          onStateChange: (event) => {
            // YT.PlayerState.PLAYING = 1, YT.PlayerState.BUFFERING = 3
            if (event.data === 1 || event.data === 3) {
              notifyVideoStartedPlaying(id);
            }
          },
        },
      });
    } catch {
      // Ignore if iframe not yet ready or already bound
    }
  };

  // Handle iframe load
  const handleIframeLoad = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Subscribe to postMessage state change events
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'listening' }),
        '*'
      );
      sendCommand('mute');
    }

    if (window.YT && window.YT.Player) {
      setupYTPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        setupYTPlayer();
      };
    }
  };

  // Listen for YouTube postMessage events specifically sent from THIS iframe
  useEffect(() => {
    const handleWindowMessage = (e) => {
      // Strictly verify message source comes from THIS iframe's window
      if (e.source !== iframeRef.current?.contentWindow) return;

      try {
        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
        // When this video starts playing (1) or buffering (3)
        if (data && data.event === 'onStateChange' && (data.info === 1 || data.info === 3)) {
          notifyVideoStartedPlaying(id);
        }
      } catch {
        // Ignore non-json postMessages
      }
    };

    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [id]);

  // IntersectionObserver: single-video scroll playback with automatic pausing when scrolled out
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Inform all other videos in the gallery to pause immediately
            notifyVideoStartedPlaying(id);
            sendCommand('mute');
            try {
              if (ytPlayerRef.current?.mute) ytPlayerRef.current.mute();
              if (ytPlayerRef.current?.playVideo) ytPlayerRef.current.playVideo();
            } catch {
              // Fallback
            }
            sendCommand('playVideo');
          } else {
            // Scrolled out of view: pause immediately
            handlePause();
          }
        });
      },
      {
        threshold: 0.7, // Must be prominently centered in the viewport
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [id]);

  const originParam = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <div
      ref={containerRef}
      className={`group relative rounded-2xl sm:rounded-[22px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-charcoal/25 hover:border-charcoal/50 bg-black aspect-[16/9] w-full flex items-center justify-center ${className}`}
    >
      <iframe
        id={iframeId}
        ref={iframeRef}
        onLoad={handleIframeLoad}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&mute=1&controls=1&rel=0${
          originParam ? `&origin=${encodeURIComponent(originParam)}` : ''
        }`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
};

export default GalleryVideoCard;
