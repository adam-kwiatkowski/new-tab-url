function overrideNewTab(result) {
  const mode = result.override_mode || "iframe";
  const url = result.url || "/options/index.html";

  switch (mode) {
    case "iframe":
      document.querySelector("#content").src = url;
      break;
    case "redirect":
      window.location.replace(url);
      break;
    default:
      console.error("Invalid override mode");
  }
}

function onError(error) {
  console.error(`Error: ${error}`);
}

let getting = browser.storage.sync.get(["url", "override_mode"]);
getting.then(overrideNewTab, onError);
