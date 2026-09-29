const saveButton = document.querySelector("#save");
const loadButton = document.querySelector("#load");
const status = document.querySelector("#status");

function isWebUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

saveButton.addEventListener("click", async () => {
  saveButton.disabled = true;
  try {
    const tabs = await browser.tabs.query({});
    const urls = tabs.map((tab) => tab.url).filter((url) => url && isWebUrl(url));
    if (urls.length === 0) {
      status.textContent = "No web tabs were found to save.";
      return;
    }

    const blob = new Blob([`${urls.join("\n")}\n`], { type: "text/plain;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = `firefox-tabs-${new Date().toISOString().slice(0, 10)}.txt`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    status.textContent = `Saved ${urls.length} link${urls.length === 1 ? "" : "s"}.`;
  } catch (error) {
    status.textContent = `Could not save links: ${error.message}`;
  } finally {
    saveButton.disabled = false;
  }
});

loadButton.addEventListener("click", async () => {
  try {
    await browser.tabs.create({ url: browser.runtime.getURL("loader.html") });
  } catch (error) {
    status.textContent = `Could not open the file loader: ${error.message}`;
  }
});
