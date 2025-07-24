import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesLandingPage from "@/pages/CoursesLandingPage";
import CourseListPage from "@/pages/CourseListPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";
import LessonPlayer from "@/pages/LessonPage";
import { useWeb3Auth } from "@web3auth/modal/react";
function App() {
  const { status, isConnected } = useWeb3Auth();

  useEffect(() => {
    console.log("Web3Auth status:", status);
    console.log("isConnected:", isConnected);
  }, [status, isConnected]);

  useEffect(() => {
    console.log("Web3Auth status:", status);
    console.log("isConnected:", isConnected);
  }, [status, isConnected]);
  useEffect(() => {
    const AUTH_ORIGIN = "https://auth.level3labs.fun";

    // Create or reuse iframe
    let iframe = document.getElementById(
      "auth-sync-iframe"
    ) as HTMLIFrameElement;
    if (!iframe) {
      iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.id = "auth-sync-iframe";
      iframe.src = AUTH_ORIGIN;
      document.body.appendChild(iframe);
    }

    // Sync function
    const syncLocalStorage = () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            type: "SET_SESSION",
            object: Object.fromEntries(Object.entries(localStorage)),
          }),
          AUTH_ORIGIN
        );
      }
    };

    // When iframe loads
    iframe.onload = () => {
      if (isConnected) {
        syncLocalStorage();
      }
    };

    // Re-sync every 10 seconds
    const interval = setInterval(() => {
      if (isConnected) {
        syncLocalStorage();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isConnected]);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-background overflow-x-hidden font-gilroy subtle-bg-pattern">
        <Navbar />
        <main className="pt-20">
          {/* Add padding-top to main to avoid content being hidden by fixed navbar */}

          <Routes>
            <Route path="/" element={<CoursesLandingPage />} />
            <Route path="/courses/all" element={<CourseListPage />} />
            <Route path="/courses/:courseId" element={<CourseDetailPage />} />
            <Route
              path="/courses/lesson/:courseId/:id"
              element={<LessonPlayer />}
            />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </>
  );
}

export default App;
