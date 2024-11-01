chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "leetcodeReminder") {
      handleReminder();
    }
  });
  
  function handleReminder() {
    // Load user settings
    chrome.storage.sync.get(['notificationMethod', 'userEmail', 'userWhatsApp'], (data) => {
      const { notificationMethod, userEmail, userWhatsApp } = data;
  
      switch (notificationMethod) {
        case 'browser':
          sendBrowserNotification();
          break;
        case 'email':
          sendEmailNotification(userEmail);
          break;
        case 'whatsapp':
          sendWhatsAppNotification(userWhatsApp);
          break;
        default:
          console.error('Invalid notification method selected.');
      }
    });
  }
  
  function sendBrowserNotification() {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icons/icon48.png',
      title: 'LeetCode Reminder',
      message: '🧠 Time to practice coding on LeetCode!',
      priority: 2,
    }, (notificationId) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      } else {
        console.log(`Browser notification sent: ${notificationId}`);
      }
    });
  }
  
  function sendEmailNotification(email) {
    if (!email) {
      console.error('No email address provided for notifications.');
      return;
    }
    // Call your email sending API here (e.g., using Fetch API with SendGrid or Mailgun)
    fetch('https://your-email-api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, message: 'Time to practice coding on LeetCode!' }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Email notification sent successfully.');
      } else {
        throw new Error('Email notification failed.');
      }
    })
    .catch(error => console.error('Error sending email:', error));
  }
  
  function sendWhatsAppNotification(whatsapp) {
    if (!whatsapp) {
      console.error('No WhatsApp number provided for notifications.');
      return;
    }
    // Call your WhatsApp sending API here (e.g., using Twilio)
    fetch('https://your-whatsapp-api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ whatsapp, message: 'Time to practice coding on LeetCode!' }),
    })
    .then(response => {
      if (response.ok) {
        console.log('WhatsApp notification sent successfully.');
      } else {
        throw new Error('WhatsApp notification failed.');
      }
    })
    .catch(error => console.error('Error sending WhatsApp:', error));
  }
  