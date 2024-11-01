document.addEventListener('DOMContentLoaded', () => {
    const frequencySelect = document.getElementById('frequency');
    const difficultySelect = document.getElementById('difficulty');
    const setReminderButton = document.getElementById('setReminder');

    // Load saved settings
    chrome.storage.sync.get(['reminderFrequency', 'preferredDifficulty'], (data) => {
        if (data.reminderFrequency) {
            frequencySelect.value = data.reminderFrequency;
        }
        if (data.preferredDifficulty) {
            difficultySelect.value = data.preferredDifficulty;
        }
    });

    // Set reminder button click event
    setReminderButton.addEventListener('click', () => {
        const reminderFrequency = frequencySelect.value;
        const preferredDifficulty = difficultySelect.value;

        // Save the settings
        chrome.storage.sync.set({ reminderFrequency, preferredDifficulty }, () => {
            alert('Settings saved successfully!');
        });
    });
});
