// Friends management system for CCCC
console.log('Friends.js loaded!');

// Helper function to get the correct site URL for redirects
function getSitePath(path) {
  const basePath = window.SITE_BASE_PATH || '/';
  // Remove leading slash from path if basePath already has one
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  return basePath + cleanPath;
}

// Helper function to get the correct backend URL
function getBackendUrl() {
  // If running locally, use local backend
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://127.0.0.1:3000';
  }
  
  // For GitHub Pages, use your production backend (HTTPS with Let's Encrypt cert)
  return 'https://vmd175967.contaboserver.net';
}

class FriendsManager {
  constructor() {
    this.friends = [];
    this.friendRequests = [];
    this.searchResults = [];
    this.init();
  }

  init() {
    // Check if we're on a user profile page
    const path = window.location.pathname;
    const userIdMatch = path.match(/^\/user\/(\d+)$/);
    
    if (userIdMatch) {
      this.viewingUserId = parseInt(userIdMatch[1]);
      this.loadPublicProfile(this.viewingUserId);
    } else if (path === '/profile' || path === '/profile/') {
      this.loadFriendsData();
    }
    
    this.setupEventListeners();
  }

  async loadFriendsData() {
    try {
      await Promise.all([
        this.loadFriends(),
        this.loadFriendRequests()
      ]);
      
      this.updateFriendsDisplay();
      this.updateRequestsDisplay();
    } catch (error) {
      console.error('Error loading friends data:', error);
    }
  }

  async loadFriends() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/friends`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.friends = await response.json();
        console.log('Loaded friends:', this.friends);
      } else {
        console.error('Failed to load friends');
        this.friends = [];
      }
    } catch (error) {
      console.error('Error loading friends:', error);
      this.friends = [];
    }
  }

  async loadFriendRequests() {
    try {
      const response = await fetch(`${getBackendUrl()}/api/friends/requests`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.friendRequests = await response.json();
        console.log('Loaded friend requests:', this.friendRequests);
      } else {
        console.error('Failed to load friend requests');
        this.friendRequests = [];
      }
    } catch (error) {
      console.error('Error loading friend requests:', error);
      this.friendRequests = [];
    }
  }

  async loadPublicProfile(userId) {
    try {
      // First check if user is authenticated
      const authResponse = await fetch(`${getBackendUrl()}/api/auth/check`, {
        credentials: 'include'
      });
      
      if (!authResponse.ok) {
        // Not authenticated, redirect to login
        window.location.href = getSitePath('login/');
        return;
      }
      
      const response = await fetch(`${getBackendUrl()}/api/users/${userId}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const profile = await response.json();
        this.displayPublicProfile(profile);
      } else {
        console.error('Failed to load public profile');
        this.showProfileError();
      }
    } catch (error) {
      console.error('Error loading public profile:', error);
      this.showProfileError();
    }
  }

  displayPublicProfile(profile) {
    // Update the page to show the public profile
    document.title = `${profile.display_name || profile.username} - CCCC Profile`;
    
    // Hide private sections and show public view
    const profileContent = document.getElementById('profile-content');
    if (profileContent) {
      profileContent.innerHTML = this.createPublicProfileHTML(profile);
      profileContent.style.display = 'block';
      
      // Setup event listeners for the public profile
      this.setupPublicProfileListeners(profile);
    }
    
    // Hide auth check
    const authCheck = document.getElementById('auth-check');
    if (authCheck) {
      authCheck.style.display = 'none';
    }
  }

  createPublicProfileHTML(profile) {
    const joinDate = new Date(profile.created_at).toLocaleDateString();
    const friendshipDate = profile.friendship_date ? 
      new Date(profile.friendship_date).toLocaleDateString() : null;
    
    return `
      <div class="public-profile-container">
        <!-- Navigation -->
        <div class="profile-navigation">
          <a href="${getSitePath('profile')}" class="btn-secondary">← Back to My Profile</a>
        </div>
        
        <!-- Profile Banner -->
        <div class="profile-banner" style="${profile.banner_url ? `background-image: url('${profile.banner_url}'); background-size: cover; background-position: center;` : 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);'}">
          <div class="banner-overlay"></div>
        </div>

        <!-- Profile Header -->
        <div class="profile-header">
          <div class="profile-avatar-container">
            <div class="profile-avatar">
              ${profile.avatar_url ? 
                `<img src="${profile.avatar_url}" alt="Profile Picture" class="avatar-img">` :
                `<svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="default-avatar">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>`
              }
            </div>
          </div>
          
          <div class="profile-info">
            <h1 class="profile-username">${profile.display_name || profile.username}</h1>
            <p class="profile-handle">@${profile.username}</p>
            <p class="profile-bio">${profile.bio || 'No bio available.'}</p>
            <p class="join-date">Joined ${joinDate}</p>
            
            <div class="profile-actions">
              ${this.createFriendshipButton(profile)}
            </div>
          </div>
        </div>

        <!-- Profile Stats -->
        <div class="profile-stats">
          <div class="stat-item">
            <span class="stat-number">${profile.substance_count || 0}</span>
            <span class="stat-label">Substances Logged</span>
          </div>
          <div class="stat-item">
            <span class="stat-number">${profile.recent_ratings ? profile.recent_ratings.length : 0}</span>
            <span class="stat-label">Recent Ratings</span>
          </div>
          ${profile.is_friend && friendshipDate ? `
            <div class="stat-item">
              <span class="stat-number">Friends</span>
              <span class="stat-label">Since ${friendshipDate}</span>
            </div>
          ` : ''}
        </div>

        <!-- Recent Activity (Public) -->
        <div class="profile-section">
          <h2>📊 Recent Activity</h2>
          <div class="activity-timeline">
            ${profile.recent_ratings && profile.recent_ratings.length > 0 ? 
              this.createPublicActivityHTML(profile.recent_ratings) :
              `<div class="empty-state">
                <div class="empty-icon">📅</div>
                <h3>No recent public activity</h3>
                <p>This user hasn't shared any recent ratings publicly.</p>
              </div>`
            }
          </div>
        </div>
      </div>
    `;
  }

  createFriendshipButton(profile) {
    if (profile.is_friend) {
      return `
        <button class="btn-secondary unfriend-btn" data-user-id="${profile.id}">
          👥 Friends
        </button>
      `;
    } else if (profile.pending_request) {
      if (profile.pending_request.sent_by_me) {
        return `<button class="btn-secondary" disabled>📤 Request Sent</button>`;
      } else {
        return `
          <div class="friend-request-actions">
            <button class="btn-primary accept-request-btn" data-request-id="${profile.pending_request.id}">
              ✅ Accept Request
            </button>
            <button class="btn-secondary decline-request-btn" data-request-id="${profile.pending_request.id}">
              ❌ Decline
            </button>
          </div>
        `;
      }
    } else {
      return `
        <button class="btn-primary add-friend-btn" data-user-id="${profile.id}">
          👋 Add Friend
        </button>
      `;
    }
  }

  createPublicActivityHTML(ratings) {
    return ratings.slice(0, 5).map(rating => {
      const date = new Date(rating.created_at);
      const timeAgo = this.getTimeAgo(date);
      
      return `
        <div class="activity-item">
          <div class="activity-icon">⭐</div>
          <div class="activity-content">
            <div class="activity-title">Rated ${rating.substance_name}</div>
            <div class="activity-details">
              <div class="stars">${this.generateStars(rating.rating || 0, 10)}</div>
              <span class="rating-text">${rating.rating}/10</span>
              <span class="activity-time">${timeAgo}</span>
            </div>
            ${rating.comment ? `
              <div class="activity-comment">
                <span class="comment-text">"${rating.comment}"</span>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  generateStars(rating, maxStars = 5) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars += '<span class="star full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      stars += '<span class="star half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars += '<span class="star empty">☆</span>';
    }
    
    return stars;
  }

  getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return date.toLocaleDateString();
  }

  showProfileError() {
    const profileContent = document.getElementById('profile-content');
    if (profileContent) {
      profileContent.innerHTML = `
        <div class="error-state">
          <div class="error-icon">❌</div>
          <h2>Profile Not Found</h2>
          <p>The user profile you're looking for doesn't exist or you don't have permission to view it.</p>
          <a href="${getSitePath('profile')}" class="btn-primary">Return to My Profile</a>
        </div>
      `;
      profileContent.style.display = 'block';
    }
    
    const authCheck = document.getElementById('auth-check');
    if (authCheck) {
      authCheck.style.display = 'none';
    }
  }

  updateFriendsDisplay() {
    const friendsSection = document.getElementById('friends-section');
    if (!friendsSection) return;

    if (this.friends.length === 0) {
      friendsSection.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">👥</div>
          <h3>No friends yet</h3>
          <p>Search for users to add as friends and start building your network!</p>
          <button class="btn-primary" id="open-search-modal">Find Friends</button>
        </div>
      `;
    } else {
      const friendsHTML = this.friends.map(friend => this.createFriendCard(friend)).join('');
      friendsSection.innerHTML = `
        <div class="friends-header">
          <h3>Your Friends (${this.friends.length})</h3>
          <button class="btn-secondary" id="open-search-modal">Find More Friends</button>
        </div>
        <div class="friends-grid">
          ${friendsHTML}
        </div>
      `;
    }

    // Add event listeners
    this.setupFriendsListeners();
  }

  createFriendCard(friend) {
    const friendshipDate = new Date(friend.friendship_date).toLocaleDateString();
    
    return `
      <div class="friend-card" data-friend-id="${friend.id}">
        <div class="friend-avatar">
          ${friend.avatar_url ? 
            `<img src="${friend.avatar_url}" alt="${friend.display_name || friend.username}" class="avatar-img">` :
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="default-avatar">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>`
          }
        </div>
        <div class="friend-info">
          <h4 class="friend-name">${friend.display_name || friend.username}</h4>
          <p class="friend-username">@${friend.username}</p>
          ${friend.bio ? `<p class="friend-bio">${friend.bio.substring(0, 100)}${friend.bio.length > 100 ? '...' : ''}</p>` : ''}
          <p class="friendship-date">Friends since ${friendshipDate}</p>
        </div>
        <div class="friend-actions">
          <button class="btn-secondary view-profile-btn" data-user-id="${friend.id}">
            View Profile
          </button>
          <button class="btn-danger remove-friend-btn" data-friend-id="${friend.id}" title="Remove friend">
            Remove
          </button>
        </div>
      </div>
    `;
  }

  updateRequestsDisplay() {
    const requestsSection = document.getElementById('friend-requests-section');
    if (!requestsSection) return;

    if (this.friendRequests.length === 0) {
      requestsSection.innerHTML = `
        <div class="requests-empty">
          <p>No pending friend requests</p>
        </div>
      `;
    } else {
      const requestsHTML = this.friendRequests.map(request => this.createRequestCard(request)).join('');
      requestsSection.innerHTML = `
        <div class="requests-header">
          <h3>Friend Requests (${this.friendRequests.length})</h3>
        </div>
        <div class="requests-list">
          ${requestsHTML}
        </div>
      `;
    }

    // Add event listeners
    this.setupRequestsListeners();
  }

  createRequestCard(request) {
    const requestDate = new Date(request.created_at).toLocaleDateString();
    
    return `
      <div class="request-card" data-request-id="${request.id}">
        <div class="request-avatar">
          ${request.avatar_url ? 
            `<img src="${request.avatar_url}" alt="${request.display_name || request.username}" class="avatar-img">` :
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="default-avatar">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>`
          }
        </div>
        <div class="request-info">
          <h4 class="request-name">${request.display_name || request.username}</h4>
          <p class="request-username">@${request.username}</p>
          <p class="request-date">Sent ${requestDate}</p>
        </div>
        <div class="request-actions">
          <button class="btn-primary accept-request-btn" data-request-id="${request.id}">
            Accept
          </button>
          <button class="btn-secondary decline-request-btn" data-request-id="${request.id}">
            Decline
          </button>
        </div>
      </div>
    `;
  }

  async searchUsers(query) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/users/search?query=${encodeURIComponent(query)}`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        this.searchResults = await response.json();
        this.updateSearchResults();
      } else {
        console.error('Failed to search users');
        this.searchResults = [];
        this.updateSearchResults();
      }
    } catch (error) {
      console.error('Error searching users:', error);
      this.searchResults = [];
      this.updateSearchResults();
    }
  }

  updateSearchResults() {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (this.searchResults.length === 0) {
      searchResults.innerHTML = `
        <div class="no-results">
          <p>No users found matching your search.</p>
        </div>
      `;
    } else {
      const resultsHTML = this.searchResults.map(user => this.createSearchResultCard(user)).join('');
      searchResults.innerHTML = `
        <div class="search-results-list">
          ${resultsHTML}
        </div>
      `;
    }

    // Add event listeners
    this.setupSearchListeners();
  }

  createSearchResultCard(user) {
    return `
      <div class="search-result-card" data-user-id="${user.id}">
        <div class="result-avatar">
          ${user.avatar_url ? 
            `<img src="${user.avatar_url}" alt="${user.display_name || user.username}" class="avatar-img">` :
            `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="default-avatar">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>`
          }
        </div>
        <div class="result-info">
          <h4 class="result-name">${user.display_name || user.username}</h4>
          <p class="result-username">@${user.username}</p>
        </div>
        <div class="result-actions">
          <button class="btn-secondary view-profile-btn" data-user-id="${user.id}">
            View Profile
          </button>
          <button class="btn-primary add-friend-btn" data-user-id="${user.id}">
            Add Friend
          </button>
        </div>
      </div>
    `;
  }

  async sendFriendRequest(userId) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/friends/request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
        credentials: 'include'
      });

      if (response.ok) {
        alert('Friend request sent successfully!');
        // Refresh search results or update button state
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to send friend request');
        return false;
      }
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Error sending friend request. Please try again.');
      return false;
    }
  }

  async respondToFriendRequest(requestId, action) {
    try {
      const response = await fetch(`${getBackendUrl()}/api/friends/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: action }),
        credentials: 'include'
      });

      if (response.ok) {
        alert(`Friend request ${action}ed successfully!`);
        await this.loadFriendsData(); // Refresh data
        return true;
      } else {
        const error = await response.json();
        alert(error.error || `Failed to ${action} friend request`);
        return false;
      }
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
      alert(`Error ${action}ing friend request. Please try again.`);
      return false;
    }
  }

  async removeFriend(friendId) {
    if (!confirm('Are you sure you want to remove this friend?')) {
      return;
    }

    try {
      const response = await fetch(`${getBackendUrl()}/api/friends/${friendId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        alert('Friend removed successfully');
        await this.loadFriendsData(); // Refresh data
        return true;
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to remove friend');
        return false;
      }
    } catch (error) {
      console.error('Error removing friend:', error);
      alert('Error removing friend. Please try again.');
      return false;
    }
  }

  setupEventListeners() {
    // Search modal listeners will be set up when the modal is opened
    document.addEventListener('click', (e) => {
      if (e.target.id === 'open-search-modal') {
        this.openSearchModal();
      }
    });
  }

  setupFriendsListeners() {
    document.querySelectorAll('.remove-friend-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const friendId = e.target.dataset.friendId;
        this.removeFriend(friendId);
      });
    });

    document.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.target.dataset.userId;
        window.location.href = getSitePath(`user/${userId}`);
      });
    });
  }

  setupRequestsListeners() {
    document.querySelectorAll('.accept-request-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const requestId = e.target.dataset.requestId;
        this.respondToFriendRequest(requestId, 'accept');
      });
    });

    document.querySelectorAll('.decline-request-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const requestId = e.target.dataset.requestId;
        this.respondToFriendRequest(requestId, 'decline');
      });
    });
  }

  setupSearchListeners() {
    document.querySelectorAll('.add-friend-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.target.dataset.userId;
        this.sendFriendRequest(userId);
      });
    });

    document.querySelectorAll('.view-profile-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.target.dataset.userId;
        window.location.href = getSitePath(`user/${userId}`);
      });
    });
  }

  setupPublicProfileListeners(profile) {
    // Add friend button
    document.querySelectorAll('.add-friend-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.target.dataset.userId;
        this.sendFriendRequest(userId);
      });
    });

    // Accept/decline request buttons
    document.querySelectorAll('.accept-request-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const requestId = e.target.dataset.requestId;
        this.respondToFriendRequest(requestId, 'accept');
      });
    });

    document.querySelectorAll('.decline-request-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const requestId = e.target.dataset.requestId;
        this.respondToFriendRequest(requestId, 'decline');
      });
    });

    // Unfriend button
    document.querySelectorAll('.unfriend-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const userId = e.target.dataset.userId;
        this.removeFriend(userId);
      });
    });
  }

  openSearchModal() {
    // Create and show search modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'search-friends-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Find Friends</h3>
          <button class="modal-close" id="close-search-modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="search-container">
            <input type="text" id="friend-search-input" placeholder="Search users by username..." autocomplete="off">
            <div id="search-results" class="search-results">
              <div class="search-instructions">
                <p>Enter a username to search for friends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Setup modal listeners
    const closeBtn = document.getElementById('close-search-modal');
    const searchInput = document.getElementById('friend-search-input');

    closeBtn.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        document.body.removeChild(modal);
      }
    });

    // Search functionality
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      const query = e.target.value.trim();
      
      if (query.length < 2) {
        document.getElementById('search-results').innerHTML = `
          <div class="search-instructions">
            <p>Enter at least 2 characters to search</p>
          </div>
        `;
        return;
      }

      searchTimeout = setTimeout(() => {
        this.searchUsers(query);
      }, 300);
    });

    // Focus the search input
    searchInput.focus();
  }
}

// Initialize friends manager
const friendsManager = new FriendsManager();