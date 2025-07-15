import { useRef, useEffect } from "react";
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.css";
import "videojs-contrib-quality-levels";
import "videojs-http-source-selector";

interface VideoPlayerProps {
  options: VideoJsPlayerOptions;
  onReady?: (player: VideoJsPlayer) => void;
}
declare module "video.js" {
  interface VideoJsPlayer {
    httpSourceSelector?: (options: { default: string }) => void;
  }
}

export const VideoPlayer = ({ options, onReady }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null); // changed to match actual usage
  const playerRef = useRef<VideoJsPlayer | null>(null);

  useEffect(() => {
    // Only initialize player once
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement("video-js");
      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(
        videoElement,
        options,
        function () {
          videojs.log("player is ready");
          onReady?.(player);
        }
      ));

      player.ready(() => {
        if (typeof player.httpSourceSelector === "function")
          player.httpSourceSelector({
            default: "auto",
          });
      });
      playerRef.current = player;
    } else if (playerRef.current) {
      const player = playerRef.current;
      player.autoplay(options.autoplay ?? false);
      player.src(options.sources ?? []);
    }
  }, [options, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
