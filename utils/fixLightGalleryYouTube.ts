// utils/fixLightGalleryYouTube.ts
export default function fixLightGalleryYouTube(): void {
  if (typeof window === "undefined") return;
  const getOriginParam = () => encodeURIComponent(window.location.origin || window.location.href);

  const applyFixToIframe = (iframe: HTMLIFrameElement) => {
    try {
      if (!iframe) return;
      // set referrerpolicy + allow
      if (!iframe.getAttribute("referrerpolicy")) {
        iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      }
      iframe.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      );

      // ensure it's an /embed/ nocookie url and contains origin param (needed when enablejsapi=1)
      const src = iframe.getAttribute("src") || iframe.src || "";
      if (!src) return;

      // extract video id or detect embed
      let newSrc = src;

      // If src includes watch?v= or youtube.com (non-embed), normalize to nocookie embed
      if (src.includes("youtube.com/watch") || (src.includes("youtube.com") && !src.includes("/embed/"))) {
        const m = src.match(/[?&]v=([^&]+)/);
        const id = m ? m[1] : src.split("/").pop()?.split("?")[0] || "";
        if (id) newSrc = `https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`;
      }

      // If already an embed but not nocookie, switch domain
      if (newSrc.includes("youtube.com/embed") && !newSrc.includes("youtube-nocookie.com")) {
        newSrc = newSrc.replace("youtube.com/embed", "youtube-nocookie.com/embed");
      }

      // Ensure origin param present if enablejsapi=1 or if missing
      const needOrigin = !/([?&])origin=/.test(newSrc) && (/enablejsapi=1/.test(newSrc) || /youtube-nocookie.com/.test(newSrc));
      if (needOrigin) {
        newSrc += (newSrc.includes("?") ? "&" : "?") + "origin=" + getOriginParam();
      }

      // Only set if changed
      if (newSrc !== src) {
        iframe.src = newSrc;
      } else {
        // also ensure iframe.src property (some times attribute set but property not)
        iframe.src = newSrc;
      }

      // mark as fixed
      (iframe as any).dataset.lgRefFix = "1";
    } catch {
      // ignore
    }
  };

  const applyFix = (root: ParentNode = document) => {
    const iframes = (root as ParentNode).querySelectorAll?.('iframe[src*="youtube"]') || [];
    iframes.forEach((el) => {
      // TS knows this is HTMLIFrameElement because of selector generic; but cast safe
      applyFixToIframe(el as HTMLIFrameElement);
    });
  };

  // Try to observe the LightGallery container first (more targeted)
  const tryObserve = () => {
    const container =
      document.querySelector('.lg-outer') || // common LightGallery v2 container
      document.querySelector('.lg-backdrop') || // fallback
      document.body;

    // run once
    applyFix(container);

    // observe only that container
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of Array.from(m.addedNodes)) {
          if (!(node instanceof HTMLElement)) continue;
          if (node.tagName === 'IFRAME' && node.getAttribute('src')?.includes('youtube')) {
            applyFixToIframe(node as HTMLIFrameElement);
          } else {
            // check nested iframes in added nodes
            node.querySelectorAll && node.querySelectorAll('iframe[src*="youtube"]').forEach((ifr) => {
              applyFixToIframe(ifr as HTMLIFrameElement);
            });
          }
        }
      }
    });

    observer.observe(container, { childList: true, subtree: true });

    // expose for cleanup
    (window as any).__fixLightGalleryYouTubeObserver = observer;
  };

  // If LG is not initialized yet, wait a short moment for it to create .lg-outer, then attach
  if (document.querySelector('.lg-outer')) {
    tryObserve();
  } else {
    // poll briefly for gallery container to appear (LG injects it when opened)
    const poll = setInterval(() => {
      if (document.querySelector('.lg-outer')) {
        clearInterval(poll);
        tryObserve();
      }
    }, 200);
    // fallback: after 8s just observe body
    setTimeout(() => {
      if (!document.querySelector('.lg-outer')) {
        clearInterval(poll);
        tryObserve();
      }
    }, 8000);
  }
}
