import ReactDOM from "react-dom/client";
import { Buffer } from "buffer";
import process from "process";
window.Buffer = Buffer;
window.process = process;
import App from "@/App";
import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { web3AuthOptions } from "@/web3auth";

function BootStrap() {
  const queryClient = new QueryClient();

  const [Web3AuthComponents, setWeb3AuthComponents] = useState<{
    Web3AuthProvider: any;
    WagmiProvider: any;
  } | null>(null);
  const [synced, setSynced] = useState(false);
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
        setSynced(true); // <— now we know storage is ready
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

  useEffect(() => {
    if (synced) {
      console.log("Starting dynamic import...");
      import("@web3auth/modal/react")
        .then((mod) => {
          import("@web3auth/modal/react/wagmi").then((wagmiMod) => {
            setWeb3AuthComponents({
              Web3AuthProvider: mod.Web3AuthProvider,
              WagmiProvider: wagmiMod.WagmiProvider,
            });
          });
        })
        .catch((err) => {
          console.error("Dynamic import failed:", err);
        });
    }
  }, [synced]);

  if (!synced || !Web3AuthComponents) {
    return (
      <iframe
        ref={iframeRef}
        src="https://auth.level3labs.fun/"
        style={{ display: "none" }}
        title="session-sync"
      />
    );
  }

  const { Web3AuthProvider, WagmiProvider } = Web3AuthComponents;

  const web3authContextConfig: any = {
    web3AuthOptions: web3AuthOptions,
  };
  return (
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
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BootStrap />
  </React.StrictMode>
);
