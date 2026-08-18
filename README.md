# Frontend Mentor - Typing Speed Test solution

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
    - [Test Controls](#test-controls)
    - [Typing Experience](#typing-experience)
    - [Result & Progress](#results--progress)
    - [UI & Responsiveness](#ui--responsiveness)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

#### Test Controls

- Start a test by clicking the start button or by clicking the passage and typing
- Select a difficulty level (Easy, Medium, Hard) for passages of varying complexity
- Switch between "Timed (60s)" mode and "Passage" mode (timer counts up, no limit)
- Restart at any time to get a new random passage from the selected difficulty

#### Typing Experience

- See real-time WPM, accuracy, and time stats while typing
- See visual feedback showing correct characters (green), errors (red/underlined), and cursor position
- Correct mistakes with backspace (original errors still count against accuracy)

#### Results & Progress

- View results showing WPM, accuracy, and characters (correct/incorrect) after completing a test
- See a "Baseline Established!" message on their first test, setting their personal best
- See a "High Score Smashed!" celebration with confetti when beating their personal best
- Have their personal best persist across sessions via localStorage

#### UI & Responsiveness

- View the optimal layout depending on their device's screen size
- See hover and focus states for all interactive elements

### Screenshots

![Idle state Screen](/screenshots/idle.png)
![Running state Screen](/screenshots/running.png)
![Finished state Screen](/screenshots/finished.png)

### Links

- Solution URL: [GitHub Repository](https://github.com/FerdinandoGeografo/typing-speed-test)
- Live Site URL: [Typing Speed Test](https://typing-speed-test-fg.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - For styles

### What I learned

This challenge let me take a step forward in the React ecosystem, practicing component organization and state management on a slightly more complex flow than usual.

**State Management**:
I used the Context API together with `useReducer` to get clearer state transitions, since many pieces of state update together in response to the same "events" during the typing test (e.g. starting the test, a keystroke, timer ticking, ...).

Rather than pulling in React Router for what is really just two screens, I kept navigation entirely state-driven: the UI switches between the test screen and the results screen based on a single `status` field in the reducer (`idle`, `running`, `finished`), which felt more honest to how simple the actual navigation logic is.

**Re-renders and derived state**:
I spent real time thinking about when and why components re-render, and how to keep state updates and UI updates in sync without redundant work.
A concrete example: I initially tracked `correctChars` as accumulated state in the reducer, then realized it could be fully derived from `input` and the `passage` text instead - while `errors` genuinely has to stay as state, since a corrected mistake (via backspace) still counts against accuracy even though the character is no longer visible anywhere in the current state.
Working through cases like this helped me build a clearer mental model of "derived vs accumulated" state. Most calculations around timing, WPM, accuracy, and character comparison ended up in standalone utility functions rather than inline in component, which kept the UI components closer to presentational type and easier to reason about independently of the state logic.

**Capturing input accessibly**:
For the typing experience itself, I used a visually hidden but screen-reader-accessible text input to capture keystrokes, comparing them character by character against the passage randomly selected (based on the chosen difficulty) when the test is idle.

**Styling**:
Tailwind made handling styles and tablet/mobile responsiveness much smoother, and let me stay close to the provided design across breakpoints.

**Confetti**:
For the "new personal best" celebration I used `react-confetti`, a package I hadn't worked with before. Configuring its shape, color, and physics options let me match the confetti burst to the original SVG pattern provided with the challenge instead of using its default look.

### AI Collaboration

I used Claude throughout this challenge as a way to practice working with AI tools deliberately, rather than just to get code faster.
My approach was centered on brainstorming valid strategies within the React ecosystem and verifying that what I had implemented was actually correct - not copy-pasting blindly, but treating the AI as a assistant that helps refine ideas and code I had already thought through myself.
I find this the right way to use these tools when the goal is genuinely learning a technology: the value comes from understanding _why_ a suggestion works, not from the suggestion itself.

## Author

- Frontend Mentor - [@FerdinandoGeografo](https://www.frontendmentor.io/profile/FerdinandoGeografo)
- LinkedIn - [@FerdinandoGeografo](https://www.linkedin.com/in/ferdinandogeografo/)
- GitHub - [@FerdinandoGeografo](https://github.com/FerdinandoGeografo/)
