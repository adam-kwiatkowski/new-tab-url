function saveOptions(e) {
  e.preventDefault();

  const url = document.querySelector("#url").value;
  const overrideMode =
    document.querySelector('input[name="override_mode"]:checked')?.value ||
    "iframe";

  browser.storage.sync
    .set({
      url,
      override_mode: overrideMode,
    })
    .then(() => {
      const checkmark = document.querySelector("#save-success");
      checkmark.classList.add("visible");

      setTimeout(() => {
        checkmark.classList.remove("visible");
      }, 1000);
    });
}

function restoreOptions() {
  function setCurrentChoice(result) {
    document.querySelector("#url").value = result.url || "";
    const mode = result.override_mode || "iframe";
    const radio = document.querySelector(
      `input[name="override_mode"][value="${mode}"]`
    );
    if (radio) radio.checked = true;
  }

  function onError(error) {
    console.error(`Error restoring options: ${error}`);
  }

  const getting = browser.storage.sync.get(["url", "override_mode"]);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("#iframe").addEventListener("change", saveOptions);
document.querySelector("#redirect").addEventListener("change", saveOptions);