import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CoursesLandingPage from "@/pages/CoursesLandingPage";
import CourseListPage from "@/pages/CourseListPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import ScrollToTop from "@/components/ScrollToTop";
import CreatorDomainSection from "@/components/CreatorDomainSection";
import { useWeb3Auth } from "@web3auth/modal/react";
import { useEffect, useRef } from "react";

function App() {
  const { status } = useWeb3Auth();

  const { isConnected } = useWeb3Auth();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Check if the user is already connected
    if (isConnected) {
      const iframe = iframeRef.current;
      if (iframe) {
        iframe.onload = () => {
          iframe.contentWindow?.postMessage(
            JSON.stringify({ type: "SET_SESSION", object: localStorage }),
            "https://auth.level3labs.fun"
          );
        };
      }
    }
  }, [isConnected]);

  return (
    <>
      <iframe
        ref={iframeRef}
        src="https://auth.level3labs.fun/"
        style={{ display: "none" }}
        title="session-sync"
      />
      <ScrollToTop />
      {status == "connecting" || status == "not_ready" ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-16 h-16 border-2 border-yellow-300 border-t-yellow-500 rounded-full animate-spin" />
        </div>
      ) : (
        <div className="min-h-screen bg-background overflow-x-hidden font-gilroy subtle-bg-pattern">
          <Navbar />
          <main className="pt-20">
            {/* Add padding-top to main to avoid content being hidden by fixed navbar */}

            <Routes>
              <Route path="/" element={<CoursesLandingPage />} />
              <Route path="/courses/all" element={<CourseListPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route
                path="/mint-creator-domain"
                element={<CreatorDomainSection isPage={true} />}
              />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      )}
    </>
  );
}

export default App;
