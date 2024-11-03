import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import UnityLoader from "./UnityLoader";

const App = () => {
  const [iframeWindow, setIframeWindow] = useState(null);
  const [backendURL, setBackendURL] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch("/appConfig.json");
        const config = await response.json();
        const { backendIPAddress, backendPort } = config;
        setBackendURL(`${backendIPAddress}:${backendPort}`);
      } catch (error) {
        console.error("Error fetching config:", error);
      }
    };
    fetchConfig();
  }, []);

  const handleIframeLoad = useCallback(
    (iframeWindow) => {
      setIframeWindow(iframeWindow);
      if (backendURL) setUnityBackendURL(iframeWindow);
    },
    [backendURL]
  );

  const setUnityBackendURL = (iframeWindow) => {
    if (iframeWindow && iframeWindow.unityInstance && backendURL) {
      iframeWindow.unityInstance.SendMessage(
        "ExplorerManager",
        "SetBaseURL",
        backendURL
      );
    }
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <UnityLoader onIframeLoad={handleIframeLoad} />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
