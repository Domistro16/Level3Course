import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  Web3AuthProvider,
  type Web3AuthContextConfig,
} from "@web3auth/modal/react";
import { WagmiProvider } from "@web3auth/modal/react/wagmi";

function BootStrap() {
  const queryClient = new QueryClient();

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

  if (!synced) {
    return (
      <iframe
        ref={iframeRef}
        src="https://auth.level3labs.fun/"
        style={{ display: "none" }}
        title="session-sync"
      />
    );
  }

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
