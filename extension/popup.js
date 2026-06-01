const ORIGIN = "https://promptpilot-production-a994.up.railway.app";
document.getElementById("open").href = `${ORIGIN}/improve`;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab?.id) return;
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: () => {
        const el =
          document.querySelector("#prompt-textarea") ||
          document.querySelector("textarea") ||
          document.querySelector("[contenteditable='true']");
        if (!el) return "";
        return el.tagName === "TEXTAREA" || el.tagName === "INPUT"
          ? el.value
          : el.innerText;
      },
    },
    (results) => {
      const text = results?.[0]?.result?.trim?.();
      if (text && text.length > 10) {
        const u = new URL(`${ORIGIN}/improve`);
        u.searchParams.set("q", text.slice(0, 4000));
        document.getElementById("open").href = u.toString();
      }
    }
  );
});
