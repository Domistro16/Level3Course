import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { type Web3AuthContextConfig } from "@web3auth/modal/react";
import Fallback from "./FallBack";

const Web3AuthProvider = React.lazy(() =>
  import("@web3auth/modal/react").then((mod) => ({
    default: mod.Web3AuthProvider,
  }))
);
const WagmiProvider = React.lazy(() =>
  import("@web3auth/modal/react/wagmi").then((mod) => ({
    default: mod.WagmiProvider,
  }))
);

function BootStrap() {
  const queryClient = new QueryClient();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      console.log(e.data);
      if (e.origin !== "https://auth.level3labs.fun") return;
      const msg = JSON.parse(e.data);
      if (msg.type === "SESSION_DATA") {
        Object.entries(msg.payload).forEach(([k, v]) => {
          if (typeof v === "string") localStorage.setItem(k, v);
        });
      }
    }
    window.addEventListener("message", onMessage);

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.onload = () => {
        console.log(iframe);
        iframe.contentWindow?.postMessage(
          JSON.stringify({ type: "GET_SESSION" }),
          "https://auth.level3labs.fun"
        );
      };
    }

    return () => window.removeEventListener("message", onMessage);
  }, []);

  const web3authContextConfig: Web3AuthContextConfig = {
    web3AuthOptions: {
      clientId: import.meta.env.CLIENT_ID || import.meta.env.VITE_CLIENT_ID,
      web3AuthNetwork: "sapphire_devnet",
      defaultChainId: "0x61",
      uiConfig: {
        mode: "dark",
        defaultLanguage: "en",
        theme: {
          primary: "#768729",
        },
      },
    },
  };
  return (
    <>
      <iframe
        ref={iframeRef}
        src="https://auth.level3labs.fun/"
        style={{ display: "none" }}
        title="session-sync"
      />
      <React.Suspense fallback={<Fallback />}>
        <Web3AuthProvider config={web3authContextConfig}>
          <QueryClientProvider client={queryClient}>
            <WagmiProvider>
              <RainbowKitProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </RainbowKitProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </Web3AuthProvider>
      </React.Suspense>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BootStrap />
  </React.StrictMode>
);
