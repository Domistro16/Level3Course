import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { VideoJsPlayerOptions, VideoJsPlayer } from "video.js";
import { PinataSDK } from "pinata";
import { abi, Course, Deploy } from "@/constants";
import videojs from "video.js";
// This imports the functional component from the previous sample.
import { getProgress, updateProgress } from "@/hooks/progress";
import { useAccount, useReadContract } from "wagmi";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SignIn from "@/components/Login";
import { useGaslessContractWrite } from "@/lib/useWriteContractMeta";

const VideoPlayer = React.lazy(() => import("@/components/VideoPlayer"));

const LessonPlayer = () => {
  const playerRef = useRef<VideoJsPlayer | null>(null);
  const [link, setLink] = useState("");
  const { courseId, id } = useParams<string>();
  const [bool, setContinue] = useState(false);
  const [lessonIds, setLessonIds] = useState<number[]>([]);
  const [retrieved, setRetrieved] = useState(false);
  const { address } = useAccount();
  const { data: hash, writeContract, error } = useGaslessContractWrite();
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
  const { data: courses, isPending } = useReadContract({
    abi: abi,
    functionName: "getCourses",
    address: Deploy,
  }) as {
    data: Course[];
    isPending: boolean;
  };
  const navigate = useNavigate();
  const { isDisconnected } = useAccount();
  const [loggedIn, setLoggedIn] = useState(isDisconnected);
  useEffect(() => {
    const callUser = async () => {
      const progress = await getProgress(address as string, Number(courseId));
      console.log(progress);
      if (progress && Object.keys(progress).length > 0) {
        setLessonIds(progress.completedLessons);
        setRetrieved(true);
      }
    };
    callUser();
  }, [courseId, address]);

  useEffect(() => {
    if (!retrieved) return;
    if (lessonIds.length < Number(id)) {
      navigate(`/courses/${courseId}`);
    }
    console.log(lessonIds);
  }, [lessonIds, id]);

  // Update ref when state changes
  useEffect(() => {
    boolRef.current = bool;
  }, [bool]);

  useEffect(() => {
    setLink("");
    setContinue(false);
  }, [Number(id)]);

  const course = courses?.find((c) => Number(c.id) === Number(courseId));

  useEffect(() => {
    async function getVideo() {
      try {
        const lesson = course?.lessons[Number(id)];
        const data = await pinata.gateways.private.createAccessLink({
          cid: lesson?.url[0] as string,
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
  }, [Number(id), course, pinata]);

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
  const complete = async () => {
    await writeContract({
      targetABI: abi as any,
      targetAddress: Deploy,
      functionName: "updateProgress",
      functionArgs: [Number(courseId), Number(id), 100],
    });
    console.log(error);
    console.log(hash);
  };

  const next = (): void => {
    if (!course) return;

    const currentId = Number(id);
    const isNextAfterLast = currentId === course.lessons.length + 1;

    // If user just completed the last lesson and tries to go to the next one
    if (isNextAfterLast) {
      setContinue(false);
      complete().then(() => navigate(`/courses/${courseId}`));
      return;
    }

    const canAccessNext =
      (bool || lessonIds.includes(currentId)) &&
      currentId < course.lessons.length;

    if (canAccessNext) {
      navigate(`/courses/lesson/${courseId}/${currentId + 1}`);
      setContinue(false);
    } else {
      window.alert("C'mon, Don't skip a lesson");
    }
  };

  const prev = (): void => {
    navigate(`/courses/lesson/${courseId}/${Number(id) - 1}`);
    setContinue(false);
  };
  // Watch for progress

  const handlePlayerReady = useCallback((player: VideoJsPlayer) => {
    console.log("b");
    playerRef.current = player;
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
            if (!lessonIds?.includes(Number(id))) {
              setLessonIds((prev) => [...prev, Number(id)]);
              updateProgress(address as string, Number(courseId), Number(id));
            }
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
  if (!link || isPending || !courses) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-16 h-16 border-4 border-yellow-300 border-t-yellow-500 rounded-full animate-spin" />
      </div>
    );
  }
  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center crypto-pattern py-12 px-4">
        <AlertTriangle className="w-24 h-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold mb-4 primary-gradient-text">
          Course Not Found
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Oops! We couldn't find the course you're looking for.
        </p>
        <Link to="/courses/all">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-orange-400 hover:from-orange-500 hover:to-primary text-background font-semibold"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to All Courses
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full px-5 crypto-pattern mb-10 justify-center">
      <Link to={`/courses/${courseId}`}>
        <Button
          variant="ghost"
          className="text-primary hover:bg-primary/10 md:ml-20"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Course
        </Button>
      </Link>
      <h1 className="text-xl md:text-2xl font-bold primary-gradient-text text-left -mt-[240px] sm:mt-10 md:ml-20">
        {course.title}: {course.lessons[Number(id)].lessontitle} (Lesson{" "}
        {Number(id) + 1})
      </h1>
      <div className="h-[50%] md:h-[400px] w-[100%] md:w-[70%] lg:w-[70%] mx-auto mt-6 mb-40">
        <VideoPlayer options={videoJsOptions} onReady={handlePlayerReady} />
        <div className="flex justify-between mt-5">
          {Number(id) >= 1 ? (
            <button
              className="px-3 py-1 border-2 border-neutral-500 primary-gradient-text rounded-xl font-bold transition-all duration-300 delay-100 hover:border-[#FFB000]"
              onClick={() => prev()}
            >
              Back
            </button>
          ) : (
            <div /> // Empty div to maintain space if Back button is hidden
          )}
          <button
            className="px-3 py-1 border-2 border-neutral-500 primary-gradient-text rounded-xl font-bold transition-all duration-300 delay-100 hover:border-[#FFB000]"
            onClick={() => next()}
          >
            {Number(id) === course.lessons.length + 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>

      {loggedIn ? <SignIn loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> : ""}
    </div>
  );
};

export default LessonPlayer;
