// Function to replace ad elements with custom content
function replaceAds() {
  const adSelectors = [
    ".ad", ".ads", ".advertisement", ".banner", "[id*='ad']", "[class*='ad']"
  ];

  // Fetch user preferences from Chrome storage
  chrome.storage.sync.get(["quotesEnabled", "remindersEnabled"], (data) => {
    adSelectors.forEach(selector => {
      const adElements = document.querySelectorAll(selector);
      adElements.forEach(ad => {
        // Clear the ad content
        ad.innerHTML = "";

        // Add motivational quotes if enabled
        if (data.quotesEnabled) {
          const quote = getMotivationalQuote();
          ad.appendChild(createWidget("Motivational Quote", quote));
        }

        // Add activity reminders if enabled
        // if (data.remindersEnabled) {
          const reminder = getActivityReminder();
          ad.appendChild(createWidget("Activity Reminder", reminder));
        // }
      });
    });
  });
}

// Function to generate a motivational quote
function getMotivationalQuote() {
  return "The only limit to our realization of tomorrow is our doubts of today.";
}

// Function to generate an activity reminder
function getActivityReminder() {
  return "Have you done your burpees today?";
}

// Function to create a widget container
function createWidget(title, content) {
  const widget = document.createElement("div");
  widget.style.padding = "10px";
  widget.style.border = "1px solid #ccc";
  widget.style.background = "#f9f9f9";
  widget.style.marginBottom = "10px";

  const widgetTitle = document.createElement("h3");
  widgetTitle.textContent = title;
  widget.appendChild(widgetTitle);

  const widgetContent = document.createElement("p");
  widgetContent.textContent = content;
  widget.appendChild(widgetContent);

  return widget;
}

// Run the function when the page loads
replaceAds();

// Observe DOM changes to handle dynamically loaded ads
const observer = new MutationObserver(replaceAds);
observer.observe(document.body, { childList: true, subtree: true });