export const faqItems = [
  {
    question: 'How is Vouch different from asking AI for design feedback?',
    answer: "AI feedback hallucinates. It says 'looks good!' when it doesn't. Vouch is deterministic — same input, same output. When Vouch says contrast is 3.8:1 and needs 4.5:1, that's not an opinion. That's a WCAG violation.",
  },
  {
    question: 'What design rules does Vouch check?',
    answer: '73 rules across 8 categories: spacing, typography, color, shadows, alignment, accessibility, touch targets, and components. Most are deterministic checks — "is this divisible by 8?" or "is contrast above 4.5:1?" Tailwind preset included; custom design tokens supported.',
  },
  {
    question: 'Does Vouch work with my framework?',
    answer: "Yes. Vouch analyzes rendered CSS in the browser, not source code. React, Vue, Svelte, vanilla HTML — whatever you're building with.",
  },
  {
    question: 'Is my code sent anywhere?',
    answer: 'No. Vouch runs entirely in your browser. Nothing leaves your machine.',
  },
  {
    question: "I'm a designer. Is Vouch useful for me?",
    answer: "Yes. Vouch catches things human eyes miss — spacing that's 1px off, colors that drifted from your tokens, shadows that break light physics. Think of it as a design spellchecker.",
  },
] as const

export const personas = [
  {
    title: 'AI-Assisted Developers',
    description: "Shipping with Cursor, Bolt, or Claude? Vouch catches what your AI can't see.",
    icon: '🤖',
  },
  {
    title: 'Developers Without Design Training',
    description: 'You make things work. Vouch makes them look right.',
    icon: '👨‍💻',
  },
  {
    title: 'Designers Who Want Validation',
    description: 'Trust but verify. Vouch is your objective second opinion.',
    icon: '🎨',
  },
] as const

export const howItWorksSteps = [
  {
    number: 1,
    title: 'Run Vouch',
    description: 'Click the extension. Instant analysis. See every spacing violation, rogue color, and broken shadow highlighted on your page.',
    image: '/images/step-1.svg',
    imageAlt: 'Vouch extension overlay showing errors highlighted on a webpage',
  },
  {
    number: 2,
    title: 'Copy to AI',
    description: 'One click exports all violations in a format Claude/Cursor understands. Specific issues. Specific fixes.',
    image: '/images/step-2.svg',
    imageAlt: 'Vouch copy/export interface showing AI-ready output',
  },
  {
    number: 3,
    title: 'Ship polished',
    description: 'Your AI fixes the issues. Run Vouch again. 1-2 cycles. Done.',
    image: '/images/step-3.svg',
    imageAlt: 'Clean page with only 3 issues remaining',
  },
] as const

export const ruleCategories = [
  { category: 'Spacing', rules: 7, catches: 'Off-grid values, inconsistent margins, inner > outer padding' },
  { category: 'Typography', rules: 12, catches: 'Wrong sizes, poor line heights, too many fonts' },
  { category: 'Color', rules: 11, catches: 'Rogue hex codes, contrast failures, muddy variations' },
  { category: 'Shadows', rules: 5, catches: 'Light-from-below, pure black shadows, wrong opacity' },
  { category: 'Alignment', rules: 21, catches: 'Near-misses, uneven gutters, visual imbalance' },
  { category: 'Accessibility', rules: 3, catches: 'Missing focus indicators, removed outlines, color-only states' },
  { category: 'Touch Targets', rules: 6, catches: 'Undersized buttons, cramped tap spacing' },
  { category: 'Components', rules: 8, catches: 'Button height variance, inconsistent inputs, missing hovers' },
] as const

export const features = [
  { title: "See what's wrong", description: 'Click any error. See expected vs. actual. No guessing.' },
  { title: 'Paste and fix', description: 'Output optimized for Claude, Cursor, ChatGPT. Your AI gets instructions, not vibes.' },
  { title: 'Tailwind out of the box', description: 'Start immediately. Or import your own design tokens.' },
] as const
