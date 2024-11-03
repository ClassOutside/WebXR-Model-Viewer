// UnityLoader.js
import React, { useEffect } from "react";

const UnityLoader = ({ onIframeLoad }) => {
  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = "BuildOutput/index.html";
    iframe.style.width = "960px";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";

    document.body.appendChild(iframe);

    const handleLoad = () => {
      const iframeWindow = iframe.contentWindow;

      const checkUnityInstance = setInterval(function () {
        if (
          typeof iframeWindow.unityInstance !== "undefined" &&
          iframeWindow.unityInstance !== null
        ) {
          console.log("Unity Instance Loaded:", iframeWindow.unityInstance);
          if (onIframeLoad) {
            onIframeLoad(iframeWindow);
          }
          clearInterval(checkUnityInstance);
        }
      }, 100);
    };

    iframe.addEventListener("load", handleLoad);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      document.body.removeChild(iframe);
    };
  }, [onIframeLoad]);

  return null;
};

export default UnityLoader;
