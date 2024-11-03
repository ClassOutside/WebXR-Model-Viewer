import React, { useState, useCallback, useEffect } from "react";
import ReactDOM from "react-dom/client";
import ReceiveTextFromUnity from "./ReceiveTextFromUnityButton";
import UnityLoader from "./UnityLoader";
import SentTextToUnityButton from "./SentTextToUnityButton";
import SpawnObjectButton from "./SpawnObjectButton";
import config from "../appConfig";

const App = () => {
  const [iframeWindow, setIframeWindow] = useState(null);

  const backendURL = `${config.backendIPAddress}:${config.backendPort}`;

  const handleIframeLoad = useCallback(
    (iframeWindow) => {
      setIframeWindow(iframeWindow);
      if (backendURL) setUnityBackendURL(iframeWindow);
    },
    [backendURL]
  );

  const setUnityBackendURL = (iframeWindow) => {
    console.log("Setting Unity Backend URL");
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
      {iframeWindow && <ReceiveTextFromUnity iframeWindow={iframeWindow} />}
      {iframeWindow && <SentTextToUnityButton iframeWindow={iframeWindow} />}
      {iframeWindow && <SpawnObjectButton iframeWindow={iframeWindow} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
