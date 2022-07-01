import { useEffect, useState } from "react";

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};
const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowDimensions.width > 768 && windowDimensions.width <= 1024) {
    return { width: "80%", height: "auto" };
  }
  if (windowDimensions.width > 1024 && windowDimensions.width <= 1496) {
    return { width: "60%", height: "auto" };
  }

  if (windowDimensions.width > 1496) {
    return {
      width: "50%",
      height: "auto"
    };
  }

  return windowDimensions;
};
export default useWindowDimensions;
