document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reminderForm');
    const emailGroup = document.getElementById('emailGroup');
    const whatsappGroup = document.getElementById('whatsappGroup');
    const notificationMethod = document.getElementById('notificationMethod');
  
    // Load existing settings from storage
    chrome.storage.sync.get(['interval', 'difficulty', 'notificationMethod', 'userEmail', 'userWhatsApp'], (data) => {
      document.getElementById('interval').value = data.interval || 'daily';
      document.getElementById('difficulty').value = data.difficulty || 'medium';
      document.getElementById('notificationMethod').value = data.notificationMethod || 'browser';
      document.getElementById('userEmail').value = data.userEmail || '';
      document.getElementById('userWhatsApp').value = data.userWhatsApp || '';
      
      // Show/hide input fields based on notification method
      updateVisibility(data.notificationMethod);
    });
  
    // Show/hide input fields based on notification method
    notificationMethod.addEventListener('change', (e) => {
      updateVisibility(e.target.value);
    });
  
    function updateVisibility(method) {
      emailGroup.style.display = method === 'email' ? 'block' : 'none';
      whatsappGroup.style.display = method === 'whatsapp' ? 'block' : 'none';
    }
  
    // Handle form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const interval = document.getElementById('interval').value;
      const difficulty = document.getElementById('difficulty').value;
      const method = notificationMethod.value;
      const userEmail = document.getElementById('userEmail').value;
      const userWhatsApp = document.getElementById('userWhatsApp').value;
  
      // Save settings to storage
      chrome.storage.sync.set({ interval, difficulty, notificationMethod: method, userEmail, userWhatsApp }, () => {
        const message = document.getElementById('message');
        message.textContent = 'Settings saved successfully!';
        setTimeout(() => {
          message.textContent = '';
        }, 3000);
      });
    });
  });
  