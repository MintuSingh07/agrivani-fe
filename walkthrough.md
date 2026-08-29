# AgriVani Farmer Authentication Screens

We have updated the code for the **AgriVani** authentication screens (**Sign In** and **Sign Up**), removing all emojis and replacing them with clean, crisp SVG icons and accessible typography using the **Assistant** font family.

---

## Original Design Reference vs Implementation

````carousel
![Figma Design: AgriVani Sign In](assets/media_1787668271185.png)
<!-- slide -->
![Figma Design: AgriVani Sign Up](assets/media_1787668285046.png)
````

---

## Key Design & Typography Specifications

| Category | Specification | Farmer-Centric Rationale |
| :--- | :--- | :--- |
| **Typography Family** | **Google Fonts 'Assistant'** (`400`, `500`, `600`, `700`, `800`) | Clean, modern sans-serif with high x-height and clear numeric legibility (especially for `+91` and 10-digit mobile numbers). |
| **Header Sizing** | `26px` - `28px`, `font-weight: 800` | Slightly larger headers ensure quick cognitive recognition under bright outdoor sunlight. |
| **Field Labels & Inputs** | `14.5px` - `16px`, `font-weight: 600` / `500` | Medium-sized, high-contrast labels that avoid eyestrain. |
| **Touch Targets** | `50px` - `52px` input & button height | Generous target areas easily operable with rough-touch or one-handed usage. |
| **Palette Tokens** | Forest Green (`#2E5235`), Pale Ivory-Green (`#F8FAF3`), High-contrast borders (`#C4D9C7`) | Earthy, calm agricultural color theme with strong visual contrast. |
| **Iconography** | Clean SVGs (Globe, Lock, Keypad, Eye) | Crisp vector rendering without OS-dependent emoji variations. |
| **Multilingual Support** | 12 Languages: English, हिन्दी, मराठी, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, ગુજરાતી, राजस्थानी, தமிழ், తెలుగు, नेपाली, অসমীয়া, বাংলা | One-tap language switcher and responsive 12-language modal for regional agricultural preferences. |

---

## Deliverables Created

All code files are located in [`agrivani-auth/`](file:///D:/Downloads/agrivani-auth):

1. **[`index.html`](file:///D:/Downloads/agrivani-auth/index.html)**:
   - Standalone, interactive two-page interface with clean SVGs and no emojis.
   - Includes **Side-by-Side Dual View** and **Single Device Mode**.
   - Interactive segmented tabs, OTP verification modal, language modal, and password visibility toggles.
2. **[`style.css`](file:///D:/Downloads/agrivani-auth/style.css)**:
   - Pixel-perfect styling with Google Font `Assistant`, custom input borders, shadows, and smooth transitions.
3. **[`script.js`](file:///D:/Downloads/agrivani-auth/script.js)**:
   - Dynamic language translation engine without emojis, tab switching, input masks (10-digit mobile), OTP auto-advance, and accessible toast alerts.
4. **[`AgriVaniAuth.jsx`](file:///D:/Downloads/agrivani-auth/AgriVaniAuth.jsx)**:
   - Ready-to-use React + Tailwind CSS component with clean vector icons.
5. **[`README.md`](file:///D:/Downloads/agrivani-auth/README.md)**:
   - Complete technical documentation and design tokens guide.

---

## How to View and Test

1. Open [`index.html`](file:///D:/Downloads/agrivani-auth/index.html) in your browser.
2. Click the top presentation buttons to switch between **Side-by-Side (2 Pages)** and **Single Device**.
3. Select your preferred regional language (e.g. हिन्दी or मराठी) to see real-time UI adaptation.
4. Try clicking **Sign In with OTP** to test the 4-digit verification modal.
