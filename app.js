// IndieStream - Main Application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Load videos
    loadVideos();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load user preferences
    loadUserPreferences();
    
    // Initialize UI
    updateUI();
}

function loadVideos() {
    const videosGrid = document.getElementById('videosGrid');
    if (!videosGrid) return;
    
    videosGrid.innerHTML = '';
    
    videosData.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
}

function createVideoCard(video) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.dataset.id = video.id;
    card.dataset.category = video.category;
    
    card.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-duration">${video.duration}</div>
        </div>
        <div class="video-info">
            <h3 class="video-title" title="${video.title}">${video.title}</h3>
            <div class="channel-info">
                <img src="${video.channelAvatar}" alt="${video.channel}" class="channel-avatar-small">
                <span class="channel-name">${video.channel}</span>
                ${video.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
            </div>
            <div class="video-stats">
                <span>${video.views} views</span>
                <span>•</span>
                <span>${video.time}</span>
            </div>
        </div>
    `;
    
    // Add click event to play video
    card.addEventListener('click', () => playVideo(video.id));
    
    return card;
}

function playVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (!video) return;
    
    currentVideo = video;
    
    // Add to watch history
    if (!watchHistory.find(v => v.id === videoId)) {
        watchHistory.unshift({
            id: videoId,
            title: video.title,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 50 videos
        if (watchHistory.length > 50) {
            watchHistory.pop();
        }
    }
    
    // Show video modal
    showVideoModal(video);
    
    // Update UI
    updateUI();
}

function showVideoModal(video) {
    const modal = document.getElementById('videoModal');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoDetails = document.getElementById('videoDetails');
    
    if (!modal || !videoPlayer || !videoDetails) return;
    
    // Create video player content
    videoPlayer.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000;">
            <div style="text-align: center;">
                <i class="fas fa-play-circle" style="font-size: 64px; color: #4B0082; margin-bottom: 20px;"></i>
                <h3 style="color: white; margin-bottom: 10px;">Now Playing: ${video.title}</h3>
                <p style="color: #aaa;">This is a demo player. In a real app, this would stream video.</p>
                <button class="action-btn" style="margin-top: 20px; background: #4B0082; color: white;" onclick="simulatePlayback()">
                    <i class="fas fa-play"></i> Simulate Playback
                </button>
            </div>
        </div>
    `;
    
    // Create video details
    videoDetails.innerHTML = `
        <h2>${video.title}</h2>
        <div class="video-meta">
            <div>
                <span>${video.views} views</span>
                <span> • </span>
                <span>${video.time}</span>
            </div>
            <div class="video-actions">
                <button class="action-btn" onclick="toggleLike(${video.id})" id="likeBtn${video.id}">
                    <i class="far fa-thumbs-up"></i> Like
                </button>
                <button class="action-btn" onclick="toggleDislike(${video.id})" id="dislikeBtn${video.id}">
                    <i class="far fa-thumbs-down"></i> Dislike
                </button>
                <button class="action-btn" onclick="addToWatchLater(${video.id})" id="watchLaterBtn${video.id}">
                    <i class="far fa-clock"></i> Watch Later
                </button>
                <button class="action-btn" onclick="shareVideo(${video.id})">
                    <i class="fas fa-share"></i> Share
                </button>
            </div>
        </div>
        <div class="video-description">
            <h4>Description</h4>
            <p>${video.description}</p>
            <p style="margin-top: 10px; color: #666; font-size: 14px;">
                <i class="fas fa-tag"></i> Category: ${video.category}
            </p>
        </div>
    `;
    
    // Update button states
    updateVideoButtons(video.id);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Close modal on ESC key
    document.addEventListener('keydown', function closeOnEsc(e) {
        if (e.key === 'Escape') {
            closeVideoModal();
            document.removeEventListener('keydown', closeOnEsc);
        }
    });
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        currentVideo = null;
    }
}

function updateVideoButtons(videoId) {
    // Update like button
    const likeBtn = document.getElementById(`likeBtn${videoId}`);
    const dislikeBtn = document.getElementById(`dislikeBtn${videoId}`);
    const watchLaterBtn = document.getElementById(`watchLaterBtn${videoId}`);
    
    if (likeBtn) {
        const isLiked = videoInteractions.likes.includes(videoId);
        likeBtn.innerHTML = isLiked ? 
            '<i class="fas fa-thumbs-up"></i> Liked' : 
            '<i class="far fa-thumbs-up"></i> Like';
        likeBtn.style.color = isLiked ? '#4B0082' : '';
    }
    
    if (dislikeBtn) {
        const isDisliked = videoInteractions.dislikes.includes(videoId);
        dislikeBtn.innerHTML = isDisliked ? 
            '<i class="fas fa-thumbs-down"></i> Disliked' : 
            '<i class="far fa-thumbs-down"></i> Dislike';
        dislikeBtn.style.color = isDisliked ? '#4B0082' : '';
    }
    
    if (watchLaterBtn) {
        const isInWatchLater = videoInteractions.watchLater.includes(videoId);
        watchLaterBtn.innerHTML = isInWatchLater ? 
            '<i class="fas fa-clock"></i> Saved' : 
            '<i class="far fa-clock"></i> Watch Later';
        watchLaterBtn.style.color = isInWatchLater ? '#4B0082' : '';
    }
}

function toggleLike(videoId) {
    const index = videoInteractions.likes.indexOf(videoId);
    if (index > -1) {
        videoInteractions.likes.splice(index, 1);
    } else {
        videoInteractions.likes.push(videoId);
        // Remove from dislikes if present
        const dislikeIndex = videoInteractions.dislikes.indexOf(videoId);
        if (dislikeIndex > -1) {
            videoInteractions.dislikes.splice(dislikeIndex, 1);
        }
    }
    updateVideoButtons(videoId);
    showToast('Like updated!', 'success');
}

function toggleDislike(videoId) {
    const index = videoInteractions.dislikes.indexOf(videoId);
    if (index > -1) {
        videoInteractions.dislikes.splice(index, 1);
    } else {
        videoInteractions.dislikes.push(videoId);
        // Remove from likes if present
        const likeIndex = videoInteractions.likes.indexOf(videoId);
        if (likeIndex > -1) {
            videoInteractions.likes.splice(likeIndex, 1);
        }
    }
    updateVideoButtons(videoId);
    showToast('Feedback saved!', 'info');
}

function addToWatchLater(videoId) {
    const index = videoInteractions.watchLater.indexOf(videoId);
    if (index > -1) {
        videoInteractions.watchLater.splice(index, 1);
        showToast('Removed from Watch Later', 'info');
    } else {
        videoInteractions.watchLater.push(videoId);
        showToast('Added to Watch Later', 'success');
    }
    updateVideoButtons(videoId);
}

function shareVideo(videoId) {
    const video = videosData.find(v => v.id === videoId);
    if (!video) return;
    
    const shareUrl = `https://indiestream.in/video/${videoId}`;
    const shareText = `Watch "${video.title}" on IndieStream - India's Video Platform`;
    
    if (navigator.share) {
        navigator.share({
            title: video.title,
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
            .then(() => showToast('Link copied to clipboard!', 'success'))
            .catch(() => prompt('Copy this link:', shareUrl));
    }
}

function filterVideos(category) {
    const videosGrid = document.getElementById('videosGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter videos
    let filteredVideos = videosData;
    
    if (category !== 'All') {
        if (category === 'Recently uploaded') {
            filteredVideos = [...videosData].sort((a, b) => {
                const timeA = parseInt(a.time);
                const timeB = parseInt(b.time);
                return timeA - timeB;
            });
        } else if (category === 'New to you') {
            filteredVideos = videosData.filter(video => 
                !watchHistory.some(history => history.id === video.id)
            );
        } else {
            filteredVideos = videosData.filter(video => 
                video.category === category
            );
        }
    }
    
    // Clear and reload videos
    videosGrid.innerHTML = '';
    filteredVideos.forEach(video => {
        const videoCard = createVideoCard(video);
        videosGrid.appendChild(videoCard);
    });
    
    showToast(`Showing ${category} videos`, 'info');
}

function searchVideos(query) {
    if (!query.trim()) return;
    
    const searchResults = videosData.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.channel.toLowerCase().includes(query.toLowerCase()) ||
        video.category.toLowerCase().includes(query.toLowerCase())
    );
    
    const videosGrid = document.getElementById('videosGrid');
    videosGrid.innerHTML = '';
    
    if (searchResults.length === 0) {
        videosGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: #ccc; margin-bottom: 20px;"></i>
                <h3>No videos found for "${query}"</h3>
                <p>Try different keywords or browse categories</p>
            </div>
        `;
    } else {
        searchResults.forEach(video => {
            const videoCard = createVideoCard(video);
            videosGrid.appendChild(videoCard);
        });
    }
    
    showToast(`Found ${searchResults.length} results for "${query}"`, 'info');
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

function toggleUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.classList.toggle('active');
        
        // Close on click outside
        document.addEventListener('click', function closeMenu(e) {
            if (!e.target.closest('#userMenuBtn') && !e.target.closest('#userMenu')) {
                userMenu.classList.remove('active');
                document.removeEventListener('click', closeMenu);
            }
        });
    }
}

function loadUserPreferences() {
    const savedPrefs = localStorage.getItem('indiestream_preferences');
    if (savedPrefs) {
        userPreferences = JSON.parse(savedPrefs);
    }
    
    // Apply theme
    if (userPreferences.theme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Apply language
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = userPreferences.language;
    }
}

function saveUserPreferences() {
    localStorage.setItem('indiestream_preferences', JSON.stringify(userPreferences));
}

function updateUI() {
    // Update subscription buttons
    updateSubscriptionButtons();
    
    // Update notifications
    updateNotifications();
}

function updateSubscriptionButtons() {
    const subscribeBtns = document.querySelectorAll('.subscribe-btn');
    subscribeBtns.forEach(btn => {
        const creatorName = btn.closest('.creator-card')?.querySelector('h4')?.textContent;
        if (creatorName && userPreferences.subscriptions.includes(creatorName)) {
            btn.textContent = 'Subscribed';
            btn.classList.add('subscribed');
        }
    });
}

function updateNotifications() {
    // Update notification count based on new uploads from subscriptions
    const notificationBadge = document.querySelector('.notification-badge');
    if (notificationBadge) {
        // Simple notification logic
        const newVideos = videosData.filter(video => 
            userPreferences.subscriptions.includes(video.channel) && 
            video.time.includes('day')
        ).length;
        
        notificationBadge.textContent = Math.min(newVideos, 9);
        notificationBadge.style.display = newVideos > 0 ? 'block' : 'none';
    }
}

function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#138808' : type === 'error' ? '#dc3545' : '#4B0082'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function simulatePlayback() {
    const videoPlayer = document.getElementById('videoPlayer');
    if (!videoPlayer) return;
    
    videoPlayer.innerHTML = `
        <div style="width: 100%; height: 100%; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <div style="width: 80%; height: 4px; background: #333; margin-bottom: 20px; border-radius: 2px;">
                <div id="progressBar" style="width: 0%; height: 100%; background: #4B0082; border-radius: 2px;"></div>
            </div>
            <h3 style="color: white; margin-bottom: 10px;">Playing: ${currentVideo?.title}</h3>
            <p style="color: #aaa; margin-bottom: 20px;">Simulated video playback</p>
            <div style="display: flex; gap: 20px;">
                <button class="action-btn" onclick="pausePlayback()" style="background: #4B0082; color: white;">
                    <i class="fas fa-pause"></i> Pause
                </button>
                <button class="action-btn" onclick="stopPlayback()" style="background: #666; color: white;">
                    <i class="fas fa-stop"></i> Stop
                </button>
            </div>
        </div>
    `;
    
    // Simulate progress
    let progress = 0;
    const progressBar = document.getElementById('progressBar');
    const interval = setInterval(() => {
        progress += 0.5;
        if (progressBar) {
            progressBar.style.width = `${Math.min(progress, 100)}%`;
        }
        if (progress >= 100) {
            clearInterval(interval);
            showToast('Video playback completed!', 'success');
            setTimeout(() => {
                videoPlayer.innerHTML = `
                    <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000;">
                        <div style="text-align: center;">
                            <i class="fas fa-check-circle" style="font-size: 64px; color: #138808; margin-bottom: 20px;"></i>
                            <h3 style="color: white; margin-bottom: 10px;">Playback Complete!</h3>
                            <p style="color: #aaa;">Thanks for watching on IndieStream</p>
                        </div>
                    </div>
                `;
            }, 1000);
        }
    }, 100);
    
    // Store interval ID for cleanup
    window.playbackInterval = interval;
}

function pausePlayback() {
    if (window.playbackInterval) {
        clearInterval(window.playbackInterval);
        showToast('Playback paused', 'info');
    }
}

function stopPlayback() {
    if (window.playbackInterval) {
        clearInterval(window.playbackInterval);
    }
    const videoPlayer = document.getElementById('videoPlayer');
    if (videoPlayer && currentVideo) {
        showVideoModal(currentVideo);
    }
}

function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleSidebar);
    }
    
    // User menu
    const userMenuBtn = document.getElementById('userMenuBtn');
    if (userMenuBtn) {
        userMenuBtn.addEventListener('click', toggleUserMenu);
    }
    
    // Close video modal
    const closeModalBtn = document.getElementById('closeModal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeVideoModal);
    }
    
    // Video modal backdrop click
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => searchVideos(searchInput.value));
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchVideos(searchInput.value);
            }
        });
    }
    
    // Category filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => filterVideos(btn.textContent));
    });
    
    // Subscribe buttons
    const subscribeBtns = document.querySelectorAll('.subscribe-btn');
    subscribeBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const creatorCard = this.closest('.creator-card');
            const creatorName = creatorCard?.querySelector('h4')?.textContent;
            
            if (creatorName) {
                const index = userPreferences.subscriptions.indexOf(creatorName);
                if (index > -1) {
                    // Unsubscribe
                    userPreferences.subscriptions.splice(index, 1);
                    this.textContent = 'Subscribe';
                    this.classList.remove('subscribed');
                    showToast(`Unsubscribed from ${creatorName}`, 'info');
                } else {
                    // Subscribe
                    userPreferences.subscriptions.push(creatorName);
                    this.textContent = 'Subscribed';
                    this.classList.add('subscribed');
                    showToast(`Subscribed to ${creatorName}`, 'success');
                }
                saveUserPreferences();
                updateNotifications();
            }
        });
    });
    
    // Voice search
    const voiceSearchBtn = document.querySelector('.voice-search-btn');
    if (voiceSearchBtn) {
        voiceSearchBtn.addEventListener('click', () => {
            showToast('Voice search coming soon! Try typing your search.', 'info');
        });
    }
    
    // Language selector
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            userPreferences.language = this.value;
            saveUserPreferences();
            showToast(`Language changed to ${this.options[this.selectedIndex].text}`, 'success');
        });
    }
}

// Initialize app
window.addEventListener('DOMContentLoaded', initApp);