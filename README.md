# Smart Bookmark App

A premium, real-time bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## Features

- **Google Authentication**: Secure sign-in with Google via Supabase Auth.
- **Liked Bookmarks**: Mark your favorite links with a heart icon.
- **Smart Filtering**: Toggle between "All Bookmarks" and "Favorites".
- **Real-time Sync**: Changes update instantly across devices.
- **Strict Monochrome UI**: A distraction-free, black-and-white aesthetic designed for focus.
- **Auto Favicons**: Automatically fetches favicons for your bookmarked URLs.

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Backend/Auth/DB**: Supabase
- **Icons**: Lucide React

## Setup & Local Development

1.  **Clone the repository**:
    ```bash
    git clone <repo-url>
    cd <repo-name>
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env.local` file in the root directory with your Supabase credentials:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your-project-url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    ```

4.  **Database Setup**:
    Run the SQL script found in `supabase/schema.sql` in your Supabase SQL Editor to create the table and policies.

5.  **Run the development server**:
    ```bash
    npm run dev
    ```

## Deployment for Vercel

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
4.  Deploy!

## Challenges & Solutions

- **Real-time Implementation**: 
  - *Challenge*: Ensuring the list updates without page refresh upon adding/deleting/liking.
  - *Solution*: precise state management with the `BookmarkList` using Supabase's Realtime subscription.

- **Private Data Security**:
  - *Challenge*: Preventing users from seeing others' bookmarks.
  - *Solution*: Implemented stringent Row Level Security (RLS) policies in Supabase to enforce ownership at the database level.
