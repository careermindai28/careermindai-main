export function setPdfWatermark(enabled: boolean) {
  if (typeof document === "undefined") return;

  if (enabled) {
    document.documentElement.style.setProperty(
      "--pdf-watermark",
      `"CareerMindAI"`
    );
  } else {
    document.documentElement.style.setProperty(
      "--pdf-watermark",
      `""`
    );
  }
}
