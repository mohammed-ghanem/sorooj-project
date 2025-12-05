// utils/fixLightGalleryYouTube.ts
export default function fixLightGalleryYouTube(): void {
  if (typeof window === "undefined") return;

  const applyFix = () => {
    // query specifically for iframe elements so TS infers the correct type
    const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[src*="youtube"]');
    iframes.forEach((iframe) => {
      try {
        // add referrerpolicy if missing
        if (!iframe.getAttribute("referrerpolicy")) {
          iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
        }

        // ensure allow attribute includes youtube permissions
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );

        // Normalize to youtube-nocookie embed if needed
        const src = iframe.src || iframe.getAttribute("src") || "";
        if (
          (src.includes("youtube.com/watch") || (src.includes("youtube.com") && !src.includes("/embed/")))
        ) {
          // try to extract ID from query param v= or fallback to last path segment
          const m = src.match(/[?&]v=([^&]+)/);
          const id = m ? m[1] : src.split("/").pop()?.split("?")[0] || "";
          if (id) {
            iframe.src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
          }
        }
        // mark as fixed to avoid repeated work
        (iframe as any).dataset?.lgRefFix || ((iframe as any).dataset = { lgRefFix: "1" });
      } catch {
        // silent fail
      }
    });
  };

  // run once immediately in case iframes already present
  applyFix();

  // observe additions
  const observer = new MutationObserver(() => applyFix());
  observer.observe(document.body, { childList: true, subtree: true });

  // Optional: expose observer to window so it can be disconnected if needed
  (window as any).__fixLightGalleryYouTubeObserver = observer;
}
