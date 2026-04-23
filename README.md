# Devils' Den — ASU Roommate Finder

> Finding a roommate in college shouldn't mean scrolling through WhatsApp groups, Facebook posts, and random subreddits hoping someone compatible shows up.

Devils' Den is a mobile app built for ASU students to find compatible roommates — a swipe-based matching experience that connects students based on lifestyle preferences, not just proximity.

---

## The Problem

As ASU students ourselves, we noticed that finding a roommate meant juggling scattered sources — WhatsApp groups, Facebook Marketplace, ASU Reddit threads, word of mouth. There was no singular place designed specifically for students to find someone they'd actually want to live with.

We built Devils' Den to fix that.

---

## How It Works

- Create a profile with your lifestyle preferences — cleanliness, pets, smoking, graduation year
- Swipe right on potential roommates you're interested in
- Mutual right swipes create a match
- Connect and coordinate from there

Think Tinder, but for finding your next roommate at ASU.

---

## Matching Algorithm

Compatibility is scored using a vector dot product similarity calculation across lifestyle preference categories. Each user's preferences are converted into a numerical vector and compared against other users — the closer the vectors, the higher the compatibility score. Users are ranked and served based on this score.

---

## Tech Stack

- **React Native** — cross-platform mobile app
- **Firebase Firestore** — real-time database for user data and matches
- **Firebase Auth** — user authentication with persistent sessions via AsyncStorage

---

## Contributors

This was a team capstone project at Arizona State University.

| Name | GitHub |
|---|---|
| Geethika Yadlapati (me) | [@GeethikaYadlapati](https://github.com/GeethikaYadlapati) |
| Aarya Mathreja | [@ViperFangs](https://github.com/ViperFangs) |
| Olivia Eppert | [@OliviaEppert](https://github.com/OliviaEppert) |
| Wed Batarfi | [@wbatarfi](https://github.com/wbatarfi) |
| Salih Arman Gundogan | [@killerarm23](https://github.com/killerarm23) |

---

## My Contributions

- **Designed and implemented the core matching algorithm**, converting user lifestyle preferences into numerical vectors and computing compatibility using a dot product similarity model to rank potential roommates.

- **Built the full backend logic for the matching system** using Firebase Firestore, including:
  - Real-time user filtering with `onSnapshot`
  - Efficient querying with `where` constraints and chunking to handle Firestore query limits
  - Deduplication and aggregation of user results across batched queries

- **Implemented swipe action logic for matching interactions**, including:
  - Right-swipe → sending/accepting roommate requests
  - Left-swipe → blocking or rejecting users
  - Real-time updates to user relationships (matches, requests, blocked users)

- **Owned the entire profile system (frontend + backend)**:
  - Profile creation, editing, and display flows
  - Real-time data syncing using Firestore listeners
  - Image upload pipeline using Firebase Storage (camera + gallery support)

- **Developed key UI/UX features to improve usability and responsiveness**:
  - Expandable/zoomable profile images using modal overlays
  - Async data fetching with loading states for smoother rendering
  - Refactored and standardized UI components across screens for consistency and maintainability

- **Integrated teammate-built UI with backend systems**, connecting the matching interface to live user data and interaction logic

- **Built chat enhancements**, including:
  - Async retrieval of the **last message per conversation** for chat previews
  - Efficient querying of nested Firestore collections (`chats/{chatId}/messages`)

- **Implemented authentication flows**, including secure logout handling and navigation state reset

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/GeethikaYadlapati/DevilsDen.git
cd DevilsDen

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Firebase project credentials

# Run the app
npx expo start
```

---

## Environment Variables

This project uses environment variables for Firebase configuration. Copy `.env.example` to `.env` and fill in your own Firebase project credentials.

```
API_KEY=your_api_key_here
AUTH_DOMAIN=your_auth_domain_here
PROJECT_ID=your_project_id_here
STORAGE_BUCKET=your_storage_bucket_here
MESSAGING_SENDER_ID=your_messaging_sender_id_here
APP_ID=your_app_id_here
MEASUREMENT_ID=your_measurement_id_here
```

---

> **Note:** This repository is a cleaned-up version of the original capstone project repo.