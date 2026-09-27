# AI_NOTES.md

## AI Tools Used

I used AI tools throughout the project primarily as an engineering assistant for architecture discussions, implementation guidance, debugging, security review, and documentation.

The main AI tool I used was ChatGPT (GPT-5.6). I used it interactively rather than asking it to generate the entire project at once.

My rough split was:

- **AI:** ~40–50% of implementation assistance — suggested project structure, code patterns, debugging approaches, Discord API details, security considerations, deployment troubleshooting, and documentation drafts.
- **Me:** ~50–60% — made the final architecture and technology choices, wrote/modified the code, configured Discord/Render/Vercel/MongoDB, tested the application, investigated errors, and verified that the implementation actually worked.

I treated AI-generated code as suggestions and tested the important parts locally and in production before relying on them.

---

## Key Decisions I Made

### 1. MongoDB instead of PostgreSQL

I chose MongoDB with Mongoose for interaction storage.

The main reason was simplicity and speed for this take-home project. The interaction records have a relatively straightforward document structure, and MongoDB Atlas provided an easy managed database option for the deployed Render backend.

I also added a unique index on `discordInteractionId` so that Discord interaction IDs can be used for deduplication/idempotency.

### 2. Discord HTTP Interactions instead of a traditional gateway bot

I deliberately used Discord's HTTP Interactions endpoint rather than relying on a continuously running Discord gateway client.

This matched the assignment requirement and allowed the backend to receive slash commands through a public HTTP endpoint. The backend verifies Discord's Ed25519 signature before processing requests.

The production endpoint is:

`POST /api/discord/interactions`

### 3. Separate Discord, interaction, and admin services

I kept the backend separated into controllers, services, models, middleware, and routes.

For example:

- `discord.service.js` handles communication back to Discord.
- `interaction.service.js` handles interaction processing and persistence.
- `admin.service.js` handles dashboard-related database operations.
- Middleware handles Discord signature verification and admin JWT authentication.

I chose this structure so that Discord-specific functionality would not be tightly coupled to the admin dashboard or database layer.

---

## Hardest Bug / Wrong Turn

The hardest issue was related to the Discord interaction flow and the distinction between receiving an interaction and responding to it correctly.

An early implementation treated the Discord request too much like a normal REST API request. AI guidance initially focused on returning a response after processing the command, including additional work such as storing the interaction and sending the `/report` notification to another Discord channel.

The problem was that Discord has a very short response window for interactions. If backend processing or the secondary Discord API request takes too long, Discord can consider the interaction response invalid or timed out.

I noticed this while testing the complete flow rather than assuming that a successful backend request meant the Discord interaction was fully handled.

I then separated the responsibilities more clearly:

1. Verify the Discord signature.
2. Identify the interaction/command.
3. Persist the interaction.
4. Process the command.
5. Send the appropriate Discord response.
6. Handle the secondary report notification separately.

This also made me pay more attention to failure handling instead of treating every downstream operation as if it were guaranteed to succeed.

Another important lesson from this was that AI-generated code can look correct in isolation while still being inappropriate for a platform with strict timing requirements. Testing against the real Discord interaction endpoint exposed that distinction.

---

## Security Lessons From the AI-Assisted Development

AI also helped identify several security requirements that I verified during implementation:

- Discord requests must be verified using `X-Signature-Ed25519` and `X-Signature-Timestamp`.
- The raw request body must be preserved for signature verification.
- Discord bot tokens and MongoDB credentials must remain server-side.
- Admin APIs require JWT authentication.
- Interaction IDs should be unique to prevent duplicate processing.
- Secrets must not be committed to Git.
- Production CORS should only allow the deployed frontend.
- Sensitive interaction data and tokens should not be printed in server logs.

One mistake I caught during development was overly verbose logging of Discord interaction objects. Those objects can contain sensitive interaction information, so I replaced that with limited logging such as the command name and error information.

---

## What I Would Improve With More Time

If I had more time, I would improve the system in several areas:

### 1. Stronger asynchronous Discord processing

I would implement Discord's deferred response/follow-up pattern more thoroughly so that slower operations never risk exceeding Discord's interaction response window.

### 2. Better retry and failure handling

The report mirroring currently sends a notification to a second Discord channel. I would add a small job/queue mechanism with retries and explicit delivery status so that a temporary Discord API failure cannot result in a silently lost notification.

### 3. Automated tests

I would add automated tests for:

- Discord signature verification
- expired/replayed requests
- duplicate interaction IDs
- `/status`
- `/report`
- admin authentication
- protected dashboard APIs

### 4. More production-grade authentication

For a real production application, I would avoid keeping a single admin username/password in environment variables and instead use a proper user store with password hashing, account management, and stronger session/security controls.

### 5. More dashboard functionality

I would add pagination, filtering, date ranges, command statistics, and better error/status visualization to the admin dashboard.

---

## Example AI Interaction

One of the useful prompts during development was:

> "Review this Discord interaction implementation against the Discord HTTP Interactions requirements. Check signature verification, replay protection, duplicate interactions, response timing, and failure handling. Point out anything that could fail in production."

I then used the response as a review checklist and verified the suggested changes against the actual Discord API behavior and my deployed application.

---

## Final Reflection

The most useful role for AI in this project was not simply generating code. It was acting as a second engineering perspective during architecture decisions, debugging, security review, and documentation.

The final implementation was still manually configured, tested, debugged, and deployed by me. In particular, Discord configuration, MongoDB Atlas, Render, Vercel, environment variables, slash-command registration, and end-to-end testing were verified against the actual deployed system rather than assumed to work based only on AI-generated code.
