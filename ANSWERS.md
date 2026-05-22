# ANSWERS.md — Frontend Assessment: Tip Calculator

---

## 1. How to run

**Prerequisites:** Node.js 18+ and npm.

```bash
# Clone or unzip the project, then:
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The app runs fully client-side with no backend.

**To build for production:**
```bash
npm run build
npm run preview  
```

---

## 2. Stack & Design Choices

**Stack:** React 19 + TypeScript + Vite.

- **React** because the assessment is interaction-heavy (live updates on every keystroke, toggle states, derived validation). React's model of keeping UI as a function of state makes the live-update requirement essentially free — no manual DOM diffing.
- **TypeScript** for interface contracts (`BillModel`, `Errors`), making the prop signatures between components explicit and self-documenting.
- **Vite** for sub-second HMR and a zero-config build pipeline, letting me focus entirely on the product rather than build setup.
- **Vanilla CSS** (no Tailwind, no CSS-in-JS) so every selector is intentional and the stylesheet is reviewable without build tooling.

**Design Decision — Two-column layout with the output panel "locked" on the right.**

The output panel (`OutputPanel.tsx`) lives to the right of the inputs on desktop and below them on mobile, and it occupies the full column height with `flex-grow: 1`. This means the receipt-style results card stretches to match the input form, creating visual balance. The key reason: when a user is entering a bill amount at the top and glancing right to see results, their eye travels horizontally — a much shorter path than scrolling down. This is the same convention used by Figma's inspector panel and most calculator UIs.

---

## 3. Responsive & Accessibility

**Responsive behaviour:**

- At **360px (narrow phone):** The calculator switches from a `grid-template-columns: 1.1fr 0.9fr` two-column card to a single column (`grid-template-columns: 1fr`). The output panel moves below the inputs. Tip presets collapse from a 3-column grid to 2 columns so labels never truncate. All padding and font sizes scale down one step.
- At **1440px (laptop/desktop):** The two-column card centres with a `max-width: 920px` container, the output panel stands full height beside the inputs, and the `output-value.large` "Per Person" figure renders at `3rem` — large enough to read from an arm's length away.

**Accessibility handled:**

Every `<input>` is linked to its `<label>` via matching `htmlFor`/`id` pairs (`bill-amount-input`, `number-of-people-input`, `custom-tip-input`). Error messages are rendered with `role="alert"` so screen readers announce them immediately when they appear. Output values carry `aria-live="polite"` so NVDA/VoiceOver reads the updated result after each keystroke without interrupting the user. The theme-toggle button has a meaningful `aria-label` that updates dynamically ("Switch to dark mode" / "Switch to light mode"). Preset buttons use `aria-pressed` so assistive tech reports which rate is active. Focus rings are visible and distinct from the default browser outline (`box-shadow: 0 0 0 4px rgba(accent, 0.15)`).

**Accessibility knowingly skipped:**

I did not implement a skip-navigation link ("Skip to main content"). For a single-screen calculator with no navigation chrome, this is a negligible omission — there is no header full of links to skip past. On a multi-page site I would add it immediately.

---

## 4. AI Usage

**Tool used: Antigravity (Google DeepMind's agentic coding assistant)**

Honestly, I am a Senior Software Engineer with 5+ years of experience as a Mobile App Developer, primarily with Flutter and Dart. However, I worked on some MERN Stack projects as well and deployed it in produciton for my clients as well. 

So, I basically gave AI my plan regarding design, theme, coloring, rounding policy and orchestration of components and AI did the rest of the job of implementing it in code and I just provided a few tweaks here and there and tested it for responsiveness and accessibility and performance etc.

---

## 5. Rounding Policy

**Policy: round each person's share up to the nearest cent.**

`Math.ceil((grandTotal / people) * 100) / 100`

**Why:** When `grandTotal / people` has more than 2 decimal places (e.g. $10.00 ÷ 3 = $3.3333…), rounding to the nearest cent gives $3.33 per person but 3 × $3.33 = $9.99 — the restaurant is short $0.01. Rounding up gives $3.34 per person (3 × $3.34 = $10.02), which is a trivial $0.02 overpay spread across the party. This is the standard real-world convention: always round the share up so the group never underpays. The tiny surplus lands as an extra fraction of tip.

---

## 6. Honest Gap

The App is a bit polished but if I get another day, I'll try to localize it for different languages, currency because after building my WalletGPT App and deploying it in production, I got many messages from users in different languages and currency and it was a bit exciting to handle all different types of languages like RTL as well and different currencies as well. Because currencies have different rules of placing currency symbol and handling decimals and 
