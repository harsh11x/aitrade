# Flutter Conversion Prompt

**Role:** Expert Senior Flutter Architect with design expertise.

**Task:** Port the existing Next.js/React "Trading Platform" to a high-performance, visually stunning Flutter mobile application for iOS and Android.

## 1. Project Overview
The source project is a specific "Premium Trading Platform" currently built with:
- **Frontend:** Next.js, React, Tailwind CSS, Radix UI.
- **Current Aesthetic:** Dark/Glassmorphism design with neon accents (`index.css` global styles).
- **Key Features:** Authentication (Supabase/Firebase), Real-time Trading Dashboard, Wallet Integration (Razorpay), Portfolio Analysis, and AI Chat features.

## 2. Technical Goals for Flutter
We want to rebuild this from scratch in Flutter, maintaining the exact visual fidelity and premium feel.

### Tech Stack Definition
- **State Management:** **Riverpod** (using `flutter_riverpod` and `@riverpod` codegen) for robust state handling.
- **Navigation:** **GoRouter** for handling deep links and complex flows.
- **Backend Integration:**
  - `supabase_flutter` for Auth and Database.
  - `razorpay_flutter` for Payment Gateway.
- **UI Components:**
  - Custom Widgets to replicate Shadcn/Radix UI feel.
  - **Charts:** `fl_chart` or `candlesticks` package for the trading graphs.
  - **Icons:** `lucide_icons` package to match the React Lucide icons.
- **Architecture:** Feature-first Clean Architecture (`lib/src/features/...`).

## 3. Design Requirements
The React app uses CSS for "Glassmorphism" (blur effects, translucent backgrounds). In Flutter, you must implement this using:
- `BackdropFilter` with `ImageFilter.blur`.
- `Container` with `BoxDecoration` (gradient colors, borders with alpha).
- Custom `ThemeData` that matches the dark colors defined in `globals.css`.

## 4. Work Instructions
Please generate the following:

1.  **Project Structure:** A complete directory tree `lib/` structure following best practices.
2.  **Dependencies:** The content for `pubspec.yaml` including all packages mentioned above.
3.  **Theming:** A `theme.dart` file that replicates the color palette (CSS variables from the source) into a Flutter `ThemeData` object.
4.  **Core Screens (Code):**
    -   **Authentication:** `LoginScreen` and `SignupScreen` (replicating `app/login/page.tsx`).
    -   **Dashboard:** Main `HomeScreen` with a Bottom Navigation Bar and the Trading Chart widget.
    -   **Glass Component:** A reusable `GlassContainer` widget to replace the CSS class logic.

5.  **AI Trading & GUI Specifics (Crucial):**
    The app features a sophisticated "AI Trading" interface (`TradingModes` component) that MUST be replicated with high fidelity:
    -   **Three Modes:** Manual, Semi (AI Assisted), and Auto (Full Bot).
    -   **Auto Mode UI:**
        -   **Status Indicator:** A pulsing green dot for "SYSTEM ONLINE" and red for offline.
        -   **Visuals:** Use a "High-Tech Command Center" aesthetic.
        -   **Terminal:** A scrollable "Console" window (black background, monospaced font) that logs system events (e.g., "SCALP: Secured profits..", "VOLATILITY: High.."). It must support text commands like `/status` via a text input field.
        -   **Configuration:** Input fields for "Max Profit %", "Stop Loss %", and a Slider for Leverage.
    -   **Semi Mode UI:**
        -   Display AI suggestions (TP/SL) in a transparent `GlassCard`.
        -   "Execute Strategy" action button.
    -   **Manual Mode UI:**
        -   Professional order entry form with a custom Slider for leverage (1x to 100x).
        -   Large, distinct "Buy/Long" (Green) and "Sell/Short" (Red) buttons with icons.

## 5. Context
(If you are pasting this into a new chat, paste the content of `package.json`, `app/layout.tsx`, `app/globals.css`, and `app/page.tsx` here to give the AI context on libraries and styles.)
