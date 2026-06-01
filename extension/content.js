(function () {
  const APP_ORIGIN =
    document.documentElement.dataset.promptpilotOrigin || "https://promptpilot-production-a994.up.railway.app";

  if (document.getElementById("promptpilot-fab")) return;

  const fab = document.createElement("button");
  fab.id = "promptpilot-fab";
  fab.type = "button";
  fab.title = "Optimiser avec PromptPilot";
  fab.textContent = "✦ PromptPilot";
  fab.addEventListener("click", () => {
    const draft = getDraftFromPage();
    const url = new URL("/improve", APP_ORIGIN);
    if (draft) url.searchParams.set("q", draft.slice(0, 4000));
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  });
  document.body.appendChild(fab);

  function getDraftFromPage() {
    const selectors = [
      "#prompt-textarea",
      "textarea[placeholder*='Message']",
      "div[contenteditable='true']",
      "textarea",
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const text =
        el.tagName === "TEXTAREA" || el.tagName === "INPUT"
          ? el.value
          : el.innerText;
      if (text && text.trim().length > 20) return text.trim();
    }
    return "";
  }
})();
