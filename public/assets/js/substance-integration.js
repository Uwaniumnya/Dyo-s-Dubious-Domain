// Substance Profile Integration for Profile System
console.log('Substance integration loaded!');

// Add to profile functionality for substance pages
function addSubstanceToProfile(substanceName, category, chemicalName = '') {
  try {
    const profileKey = 'dyosDomainProfile';
    const defaultProfile = {
      username: 'Anonymous Explorer',
      bio: 'No bio set yet.',
      profilePicture: null,
      bannerImage: null,
      substancesTaken: [],
      createdAt: Date.now(),
      lastUpdated: Date.now()
    };

    // Get current profile
    let profile;
    try {
      const stored = localStorage.getItem(profileKey);
      profile = stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
    } catch (error) {
      console.error('Error loading profile:', error);
      profile = defaultProfile;
    }

    // Check if substance already exists
    if (profile.substancesTaken.some(s => s.name.toLowerCase() === substanceName.toLowerCase())) {
      showNotification('This substance is already in your profile!', 'warning');
      return false;
    }

    // Add new substance
    const newSubstance = {
      id: Date.now().toString(),
      name: substanceName,
      category: category,
      chemicalName: chemicalName,
      notes: '',
      dateAdded: Date.now()
    };

    profile.substancesTaken.push(newSubstance);
    profile.lastUpdated = Date.now();

    // Save profile
    try {
      localStorage.setItem(profileKey, JSON.stringify(profile));
      showNotification(`${substanceName} added to your profile!`, 'success');
      updateAddButton();
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      if (error.name === 'QuotaExceededError') {
        showNotification('Storage quota exceeded. Try clearing some data.', 'error');
      } else {
        showNotification('Failed to save to profile.', 'error');
      }
      return false;
    }
  } catch (error) {
    console.error('Error adding substance to profile:', error);
    showNotification('An error occurred while adding to profile.', 'error');
    return false;
  }
}

// Check if substance is already in profile
function isSubstanceInProfile(substanceName) {
  try {
    const profileKey = 'dyosDomainProfile';
    const stored = localStorage.getItem(profileKey);
    if (!stored) return false;

    const profile = JSON.parse(stored);
    return profile.substancesTaken && 
           profile.substancesTaken.some(s => s.name.toLowerCase() === substanceName.toLowerCase());
  } catch (error) {
    console.error('Error checking profile:', error);
    return false;
  }
}

// Remove substance from profile
function removeSubstanceFromProfile(substanceName) {
  try {
    const profileKey = 'dyosDomainProfile';
    const stored = localStorage.getItem(profileKey);
    if (!stored) return false;

    const profile = JSON.parse(stored);
    if (!profile.substancesTaken) return false;

    const originalLength = profile.substancesTaken.length;
    profile.substancesTaken = profile.substancesTaken.filter(
      s => s.name.toLowerCase() !== substanceName.toLowerCase()
    );

    if (profile.substancesTaken.length < originalLength) {
      profile.lastUpdated = Date.now();
      localStorage.setItem(profileKey, JSON.stringify(profile));
      showNotification(`${substanceName} removed from your profile.`, 'success');
      updateAddButton();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error removing substance from profile:', error);
    showNotification('Failed to remove from profile.', 'error');
    return false;
  }
}

// Update the add/remove button based on current state
function updateAddButton() {
  const addBtn = document.getElementById('add-to-profile-btn');
  if (!addBtn) return;

  const substanceName = addBtn.dataset.substance;
  const isInProfile = isSubstanceInProfile(substanceName);

  if (isInProfile) {
    addBtn.textContent = '✓ In Profile - Click to Remove';
    addBtn.classList.add('in-profile');
    addBtn.classList.remove('not-in-profile');
  } else {
    addBtn.textContent = '+ Add to My Profile';
    addBtn.classList.add('not-in-profile');
    addBtn.classList.remove('in-profile');
  }
}

// Show notification messages
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.profile-notification');
  if (existing) {
    existing.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `profile-notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">&times;</button>
  `;

  // Add to page
  document.body.appendChild(notification);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Initialize substance page integration
document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('add-to-profile-btn');
  if (!addBtn) return;

  // Update button state on load
  updateAddButton();

  // Add click handler
  addBtn.addEventListener('click', function() {
    const substanceName = this.dataset.substance;
    const category = this.dataset.category;
    const chemicalName = this.dataset.chemical || '';

    const isCurrentlyInProfile = isSubstanceInProfile(substanceName);

    if (isCurrentlyInProfile) {
      // Remove from profile
      if (confirm(`Remove ${substanceName} from your profile?`)) {
        removeSubstanceFromProfile(substanceName);
      }
    } else {
      // Add to profile
      addSubstanceToProfile(substanceName, category, chemicalName);
    }
  });
});