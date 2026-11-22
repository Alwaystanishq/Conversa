# Conversa design system

This file locks the shared web design established by the Hallmark full redesign.

## Direction

Conversa is a small community wall, not a social-media dashboard. The interface uses the Paste-up theme in its black-wall variant: dark board, light copy sheets, toner type, and one fluorescent yellow sheet for the primary action. The pasted conversation is the signature.

## Tokens

All colour, type, spacing, motion, and elevation values live in `Web/src/tokens.css`. Components consume roles rather than literal values. League Gothic is reserved for large poster headings and the wordmark. Newsreader carries body text, controls, labels, metadata, and app content.

## Layout

- Public pages use the capped Hallmark container and a slab navigation bar.
- The landing page leads with the conversation wall, then changes material between the toner statement, joining rows, fluorescent close, and colophon.
- Signed-in screens use one compact top bar because there are four destinations. The working surface stays centred, with optional quick-link sheets on wide screens.
- Mobile navigation becomes a four-item bottom bar. Content never scrolls sideways.

## Components

- Primary actions are fluorescent sheets with a hard toner offset.
- Secondary actions are copy-paper controls with the same physical response.
- Posts, profile summaries, editor surfaces, and empty states are copy sheets. Avoid nested sheets.
- Lists and search results use ruled rows before cards.
- Avatars are circular and typographic until real profile images exist.

## Rules

- Keep the application dark.
- Use no gradients, glows, glass, decorative status dots, eyebrow labels, or accented words in headings.
- Use one fluorescent sheet per screen for the main action or current task.
- Preserve visible focus, active, disabled, loading, error, empty, and full states already supported by the application.
- Keep copy short, direct, and specific to posting, following, and conversation.
