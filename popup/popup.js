document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("reminderForm");
    const statusMessage = document.getElementById("statusMessage");
  
    // Load saved settings when popup opens
    chrome.storage.sync.get(["interval", "difficulty"], (data) => {
      document.getElementById("interval").value = data.interval || "daily";
      document.getElementById("difficulty").value = data.difficulty || "easy";
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const interval = document.getElementById("interval").value;
      const difficulty = document.getElementById("difficulty").value;
  
      // Save settings to storage
      chrome.storage.sync.set({ interval, difficulty }, () => {
        statusMessage.textContent = "Reminder set successfully!";
        statusMessage.style.color = "#28a745";
        setTimeout(() => {
          statusMessage.textContent = "";
        }, 2000);
      });
    });
  });
  