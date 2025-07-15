import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { VideoJsPlayer, VideoJsPlayerOptions } from "video.js";
import videojs from "video.js";
import { PinataSDK } from "pinata";
import { Lesson } from "@/constants";
// This imports the functional component from the previous sample.
import VideoPlayer from "@/components/VideoPlayer";

const LessonPlayer = ({
  id,
  lessons,
  setLessonIds,
  lessonIds,
}: {
  id: number;
  lessons: Lesson[];
  setLessonIds: React.Dispatch<React.SetStateAction<number[]>>;
  lessonIds: number[];
}) => {
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const [link, setLink] = useState("");
  const [currentId, setCurrentId] = useState(id);
  const [duration, setDuration] = useState(0);
  const [bool, setContinue] = useState(false);
  const pinata = useMemo(
    () =>
      new PinataSDK({
        pinataJwt: import.meta.env.VITE_PINATA_JWT!,
        pinataGateway: "jade-obliged-caribou-149.mypinata.cloud",
      }),
    []
  );
  const boolRef = useRef(bool);
  console.log(localStorage);

  // Update ref when state changes
  useEffect(() => {
    boolRef.current = bool;
  }, [bool]);

  useEffect(() => {
    setLink("");
    setContinue(false);
  }, [currentId]);

  useEffect(() => {
    async function getVideo() {
      try {
        const lesson = lessons[currentId];
        const data = await pinata.gateways.private.createAccessLink({
          cid: lesson.url[0],
          expires: 800,
        });
        setLink((prev) => {
          if (prev !== data) return data;
          return prev;
        });
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch video:", err);
        // Optionally: set an error state here
      }
    }
    getVideo();
  }, [currentId, lessons, pinata]);

  const videoJsOptions: VideoJsPlayerOptions = useMemo(
    () => ({
      autoplay: true,
      controls: true,
      responsive: true,
      fluid: true,
      sources: link ? [{ src: link, type: "video/mp4" }] : [],
    }),
    [link]
  ); // ✅ Only updates when link changes

  const next = (): void => {
    if (bool) {
      setCurrentId(currentId + 1);
      setContinue(false);
    } else {
      window.alert("C'mon, Don't skip a lesson");
      console.log("b");
    }
  };

  // Watch for progress

  const handlePlayerReady = useCallback((player: VideoJsPlayer) => {
    console.log("b");
    playerRef.current = player;
    player.on("loadedmetadata", () => {
      setDuration(player.duration());
    });
    console.log(player.duration());
    // You can handle player events here
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
    let timer: number | null = null,
      totalTime = 0;
    let isBuffering = false;
    player.on("play", () => {
      isBuffering = false;
      startPlaying();
    });

    player.on("pause", () => {
      pausePlaying();
    });

    player.on("waiting", () => {
      isBuffering = true; // buffering starts
      videojs.log("player is buffering...");
    });

    player.on("canplay", () => {
      isBuffering = false; // buffering ended
      videojs.log("player can play");
    });

    player.on("dispose", () => {
      pausePlaying();
      videojs.log("player will dispose");
    });

    function startPlaying() {
      console.log("played");
      timer = window.setInterval(function () {
        if (!isBuffering) {
          totalTime += 1;
          if (
            player.duration() > 0 &&
            totalTime >= player.duration() / 2 &&
            !boolRef.current
          ) {
            console.log("b");
            setLessonIds((prev) => [...prev, currentId]);
            setContinue(true); // This only fires once
          }
        }
      }, 1000);
    }

    function pausePlaying() {
      console.log("stopped");
      if (timer) clearInterval(timer);
    }
  }, []);
  if (!link) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="h-[50%] md:h-[400px] w-[100%]  md:w-[70%] lg:w-[50%]">
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        <div className="flex gap-5 justify-center mt-10">
          {currentId >= 1 ? (
            <button
              className="px-3 py-1 bg-blue-500 text-white rounded-xl font-bold"
              onClick={() => setCurrentId(currentId - 1)}
            >
              Prev
            </button>
          ) : (
            ""
          )}
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded-xl font-bold"
            onClick={() => next()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonPlayer;
