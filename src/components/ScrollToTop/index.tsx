"use client";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [editorFullscreen, setEditorFullscreen] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleEditorFullscreen = (e: Event) => {
      setEditorFullscreen(
        (e as CustomEvent<{ fullscreen: boolean }>).detail.fullscreen,
      );
    };

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("editor-fullscreen-change", handleEditorFullscreen);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener(
        "editor-fullscreen-change",
        handleEditorFullscreen,
      );
    };
  }, []);

  return (
    <div className="fixed right-8 bottom-8 z-99">
      {isVisible && !editorFullscreen && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="bg-primary/80 hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white shadow-md transition duration-300 ease-in-out"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
        </div>
      )}
    </div>
  );
}
