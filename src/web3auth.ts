
export const web3AuthOptions: any = {
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
};
