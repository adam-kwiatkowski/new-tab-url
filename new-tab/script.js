function setContentUrl(result) {
  document.querySelector("#content").src = result.url || "/options/index.html";
}

function onError(error) {
  console.log(`Error: ${error}`);
}

let getting = browser.storage.sync.get("url");
getting.then(setContentUrl, onError);
