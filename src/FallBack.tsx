import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import CoursesLandingPage from "@/pages/CoursesLandingPage";
import CourseListPage from "@/pages/CourseListPage";
import CourseDetailPage from "@/pages/CourseDetailPage";
import LessonPlayer from "@/pages/LessonPage";
import FallBackNavbar from "./components/NavbarCopy";
import { WagmiProvider } from "wagmi";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { bscTestnet } from "wagmi/chains";
function Fallback() {
  const queryClient = new QueryClient();
  const config = getDefaultConfig({
    appName: "Level3Labs",
    projectId: 'YOUR_PROJECT_ID',
    chains: [bscTestnet],
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>
          <RainbowKitProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-background overflow-x-hidden font-gilroy subtle-bg-pattern">
                <FallBackNavbar />
                <main className="pt-20">
                  {/* Add padding-top to main to avoid content being hidden by fixed navbar */}

                  <Routes>
                    <Route path="/" element={<CoursesLandingPage />} />
                    <Route path="/courses/all" element={<CourseListPage />} />
                    <Route
                      path="/courses/:courseId"
                      element={<CourseDetailPage />}
                    />
                    <Route
                      path="/courses/lesson/:courseId/:id"
                      element={<LessonPlayer />}
                    />
                  </Routes>
                </main>
                <Footer />
                <Toaster />
              </div>
            </BrowserRouter>
          </RainbowKitProvider>
        </WagmiProvider>
      </QueryClientProvider>
    </>
  );
}

export default Fallback;
