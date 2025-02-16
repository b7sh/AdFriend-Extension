document.getElementById("save").addEventListener("click", () => {
  const quotesEnabled = document.getElementById("quotes").checked;
  const remindersEnabled = document.getElementById("reminders").checked;

  chrome.storage.sync.set({ quotesEnabled, remindersEnabled }, () => {
    alert("Settings saved!");
  });
});