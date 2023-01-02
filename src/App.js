import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useCallback, Component } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Gamelogo from "./Gamelogo.png"

function App() {
  const { unityProvider, requestFullscreen } = useUnityContext({
    loaderUrl:  "build/WebGL.loader.js",
    dataUrl:  "build/WebGL.data",
    frameworkUrl:  "build/WebGL.framework.js",
    codeUrl: "build/WebGL.wasm",
  });

  const [devicePixelRatio, setDevicePixelRatio] = useState(
    window.devicePixelRatio );

    const handleChangePixelRatio = useCallback(
      function () {
        // A function which will update the device pixel ratio of the Unity
        // Application to match the device pixel ratio of the browser.
        const updateDevicePixelRatio = function () {
          setDevicePixelRatio(window.devicePixelRatio);
        };
        // A media matcher which watches for changes in the device pixel ratio.
        const mediaMatcher = window.matchMedia(
          `screen and (resolution: ${devicePixelRatio}dppx)`
        );
        // Adding an event listener to the media matcher which will update the
        // device pixel ratio of the Unity Application when the device pixel
        // ratio changes.
        mediaMatcher.addEventListener("change", updateDevicePixelRatio);
        return function () {
          // Removing the event listener when the component unmounts.
          mediaMatcher.removeEventListener("change", updateDevicePixelRatio);
        };
      },
      [devicePixelRatio]
    );

    function handleClickEnterFullscreen() {
      requestFullscreen(true);
    }

    return (
      <React.Fragment>
        <Unity style={{width:"99%", heigth: "99%"}} unityProvider={unityProvider} />
   
      </React.Fragment>
    );
}

export default App;
