// Mock Data for IndieStream

const videosData = [
    {
        id: 1,
        title: "Street Food Tour in Old Delhi | Best Chaat & Parathas",
        thumbnail: "https://picsum.photos/320/180?random=101",
        channel: "Food Explorer India",
        channelAvatar: "https://ui-avatars.com/api/?name=Food+Explorer&background=FF9933&color=fff",
        verified: true,
        views: "2.4M",
        time: "3 days ago",
        duration: "18:45",
        category: "Food",
        description: "Join us on an incredible street food journey through the lanes of Old Delhi! From spicy chaat to crispy parathas, we try it all."
    },
    {
        id: 2,
        title: "Indian Classical Dance - Bharatanatyam Tutorial for Beginners",
        thumbnail: "https://picsum.photos/320/180?random=102",
        channel: "Cultural Arts India",
        channelAvatar: "https://ui-avatars.com/api/?name=Cultural+Arts&background=4B0082&color=fff",
        verified: true,
        views: "1.8M",
        time: "1 week ago",
        duration: "22:30",
        category: "Dance",
        description: "Learn the basics of Bharatanatyam, one of India's oldest classical dance forms. Step-by-step tutorial with explanations."
    },
    {
        id: 3,
        title: "Building a ₹10,000 Gaming PC in India - Full Build Guide",
        thumbnail: "https://picsum.photos/320/180?random=103",
        channel: "Tech Guru India",
        channelAvatar: "https://ui-avatars.com/api/?name=Tech+Guru&background=0066CC&color=fff",
        verified: true,
        views: "3.2M",
        time: "2 days ago",
        duration: "25:15",
        category: "Tech",
        description: "Complete guide to building a budget gaming PC in India. All parts available on Indian e-commerce sites."
    },
    {
        id: 4,
        title: "Traditional Indian Wedding Ceremony - Complete Rituals Explained",
        thumbnail: "https://picsum.photos/320/180?random=104",
        channel: "Indian Traditions",
        channelAvatar: "https://ui-avatars.com/api/?name=Indian+Traditions&background=FF66CC&color=fff",
        verified: false,
        views: "4.1M",
        time: "3 weeks ago",
        duration: "32:20",
        category: "Culture",
        description: "Detailed explanation of all rituals in a traditional Hindu wedding ceremony. Cultural significance explained."
    },
    {
        id: 5,
        title: "Yoga for Beginners - Morning Routine for Energy & Focus",
        thumbnail: "https://picsum.photos/320/180?random=105",
        channel: "Yoga With Anjali",
        channelAvatar: "https://ui-avatars.com/api/?name=Yoga+With+Anjali&background=138808&color=fff",
        verified: true,
        views: "1.5M",
        time: "5 days ago",
        duration: "15:40",
        category: "Health",
        description: "Start your day with this energizing yoga routine. Perfect for beginners, no equipment needed."
    },
    {
        id: 6,
        title: "Indian Startup Success Stories - From Idea to Unicorn",
        thumbnail: "https://picsum.photos/320/180?random=106",
        channel: "Business India",
        channelAvatar: "https://ui-avatars.com/api/?name=Business+India&background=FF6600&color=fff",
        verified: true,
        views: "890K",
        time: "4 days ago",
        duration: "28:50",
        category: "Business",
        description: "How Indian startups like Zomato, Paytm, and OYO became unicorns. Insights from founders."
    },
    {
        id: 7,
        title: "Learn Hindi in 30 Days - Day 1: Basic Phrases & Greetings",
        thumbnail: "https://picsum.photos/320/180?random=107",
        channel: "Language Learning Hub",
        channelAvatar: "https://ui-avatars.com/api/?name=Language+Hub&background=990099&color=fff",
        verified: false,
        views: "1.2M",
        time: "2 weeks ago",
        duration: "12:35",
        category: "Education",
        description: "Start your Hindi learning journey with basic phrases, greetings, and pronunciation guide."
    },
    {
        id: 8,
        title: "Taj Mahal Virtual Tour - History & Architecture Explained",
        thumbnail: "https://picsum.photos/320/180?random=108",
        channel: "Heritage India",
        channelAvatar: "https://ui-avatars.com/api/?name=Heritage+India&background=009999&color=fff",
        verified: true,
        views: "2.7M",
        time: "1 month ago",
        duration: "20:15",
        category: "Travel",
        description: "Virtual tour of the Taj Mahal with detailed history and architectural insights. UNESCO World Heritage site."
    },
    {
        id: 9,
        title: "Indian Street Cricket Tournament - Incredible Moments",
        thumbnail: "https://picsum.photos/320/180?random=109",
        channel: "Sports India",
        channelAvatar: "https://ui-avatars.com/api/?name=Sports+India&background=CC0000&color=fff",
        verified: true,
        views: "3.5M",
        time: "6 days ago",
        duration: "16:45",
        category: "Sports",
        description: "Best moments from the annual Mumbai street cricket tournament. Amazing catches and sixes!"
    },
    {
        id: 10,
        title: "DIY Home Decor with Indian Handicrafts - Budget Ideas",
        thumbnail: "https://picsum.photos/320/180?random=110",
        channel: "Creative Home India",
        channelAvatar: "https://ui-avatars.com/api/?name=Creative+Home&background=FF9966&color=fff",
        verified: false,
        views: "950K",
        time: "1 week ago",
        duration: "14:20",
        category: "DIY",
        description: "Transform your home with Indian handicrafts and budget-friendly decor ideas."
    },
    {
        id: 11,
        title: "Indian Classical Music - Raga Basics & Instruments",
        thumbnail: "https://picsum.photos/320/180?random=111",
        channel: "Music of India",
        channelAvatar: "https://ui-avatars.com/api/?name=Music+India&background=6600CC&color=fff",
        verified: true,
        views: "1.1M",
        time: "3 weeks ago",
        duration: "26:30",
        category: "Music",
        description: "Introduction to Indian classical music, ragas, and traditional instruments like sitar and tabla."
    },
    {
        id: 12,
        title: "Budget Travel India - 10 Destinations Under ₹5000",
        thumbnail: "https://picsum.photos/320/180?random=112",
        channel: "Backpacker India",
        channelAvatar: "https://ui-avatars.com/api/?name=Backpacker+India&background=0099CC&color=fff",
        verified: false,
        views: "2.3M",
        time: "2 days ago",
        duration: "19:55",
        category: "Travel",
        description: "Amazing travel destinations in India that won't break your bank. Complete budget breakdown included."
    }
];

const categories = [
    "All", "Music", "Gaming", "News", "Cooking", "Tech", "Comedy", 
    "Sports", "Learning", "Recently uploaded", "New to you", "Indian Cinema",
    "Documentary", "Podcast", "Fashion", "Beauty", "Automotive", "Science"
];

const creators = [
    {
        name: "Raj Sharma",
        category: "Tech Reviews",
        subscribers: "2.5M",
        verified: true
    },
    {
        name: "Priya Patel",
        category: "Food & Cooking",
        subscribers: "3.1M",
        verified: true
    },
    {
        name: "Amit Kumar",
        category: "Music Covers",
        subscribers: "1.8M",
        verified: false
    },
    {
        name: "Neha Singh",
        category: "Travel Vlogs",
        subscribers: "4.2M",
        verified: true
    }
];

// Current video being watched
let currentVideo = null;

// User preferences
let userPreferences = {
    theme: 'light',
    language: 'en',
    autoplay: true,
    subscriptions: ['Food Explorer India', 'Cultural Arts India', 'Tech Guru India']
};

// Watch history
let watchHistory = [];

// Video interactions
let videoInteractions = {
    likes: [],
    dislikes: [],
    watchLater: [],
    playlists: []
};