const fileInput = document.querySelector("#file");
const status = document.querySelector("#status");

function isWebUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

fileInput.addEventListener("change", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  fileInput.disabled = true;
  try {
    const lines = (await file.text()).split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const urls = lines.filter(isWebUrl);
    const rejected = lines.length - urls.length;
    if (urls.length === 0) {
      status.textContent = "No valid HTTP or HTTPS links were found in the file.";
      return;
    }

    for (const url of urls) {
      await browser.tabs.create({ url, active: false });
    }
    status.textContent = `Opened ${urls.length} tab${urls.length === 1 ? "" : "s"}${rejected ? `; skipped ${rejected} invalid line${rejected === 1 ? "" : "s"}` : ""}.`;
  } catch (error) {
    status.textContent = `Could not load links: ${error.message}`;
    fileInput.disabled = false;
  }
});
