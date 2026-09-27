# AI_NOTES.md

## How I Used AI

I used ChatGPT (GPT-5.6) throughout the development of this project.

I did not use AI to generate the entire application in one go. I mostly used it like a development partner: I would implement a part of the project, run it, share the error or code when something was not working, and then use the suggestions to decide what to change.

I used AI mainly for:

- Understanding the Discord HTTP Interactions flow
- Deciding how to structure the Node/Express backend
- Writing and improving parts of the backend
- Debugging MongoDB, Express, Discord API, and deployment issues
- Reviewing security-related parts such as Discord signature verification and JWT authentication
- Building the React admin dashboard
- Preparing the README and project documentation

The actual setup, configuration, testing, deployment, and final decisions were done by me.

---

## How the Work Was Split

I would roughly describe the split as:

**Me:** around 60%

**AI:** around 40%

AI helped me move faster, especially when I was stuck on an implementation or unfamiliar API behavior. I was still responsible for deciding what to use, putting the pieces together, running the application, checking the results, and fixing things that did not work.

A typical workflow was:

1. I decided what feature I wanted to build.
2. I implemented the first version.
3. I ran it locally or against the deployed service.
4. If I got an error, I shared the relevant code/error with AI.
5. AI suggested possible causes and fixes.
6. I tested those suggestions.
7. If the suggestion did not work, I went back and investigated the actual issue.

This was especially useful because several problems only became obvious when testing the real Discord, MongoDB, Render, and Vercel environments.

---

## Decisions I Made Myself

### 1. I chose MongoDB

I decided to use MongoDB instead of PostgreSQL.

The assignment mainly needed to store Discord interactions and display them in an admin dashboard. The data was relatively simple, and I was already comfortable working with Node.js and MongoDB.

I used Mongoose and created an `Interaction` model with fields such as:

- Discord interaction ID
- command name
- Discord user ID
- username
- report/input text
- status
- error message
- timestamps

I also made `discordInteractionId` unique because the same Discord interaction should not be processed multiple times.

---

### 2. I chose a simple Express backend structure

I decided to keep the backend separated into:

- routes
- controllers
- services
- models
- middleware
- config

I specifically kept `server.js` as the entry point rather than introducing another application entry file.

The idea was to keep Discord-specific logic separate from database logic and admin-dashboard logic.

For example, Discord communication is handled separately in `discord.service.js`, while database-related interaction processing is handled in `interaction.service.js`.

---

### 3. I chose to deploy the frontend and backend separately

I deployed:

- React/Vite frontend → Vercel
- Node/Express backend → Render
- Database → MongoDB Atlas

I chose this because it was straightforward to deploy and allowed me to keep the Discord bot token, MongoDB connection string, and other secrets entirely on the backend.

The frontend only receives the backend API URL through `VITE_API_URL`.

---

## The Hardest Problem I Ran Into

The most frustrating part of the project was not actually writing the slash commands. It was getting the complete Discord → backend → database → Discord flow working correctly.

Initially, I was thinking about the Discord interaction almost like a normal REST API request.

For `/report`, the backend needed to:

1. Receive the Discord interaction.
2. Verify the Discord signature.
3. Read the report text.
4. Save it to MongoDB.
5. Send a message to another Discord channel.
6. Respond to the original Discord command.

While debugging this, I had to understand that Discord has specific requirements around interaction requests, including signature verification and the response time allowed for an interaction.

AI helped me identify these requirements, but I still had to test them against the real Discord application.

One thing I also learned during this process was that logging the complete Discord interaction object is a bad idea. At one point I was logging the interaction while debugging, which could expose sensitive interaction information in server logs. I changed the logging to only include useful information such as the command name and error messages.

---

## A Real Deployment Problem

Another issue that took time was MongoDB connectivity after deploying the backend.

The application worked locally, but when I deployed the backend to Render, the backend initially could not connect to MongoDB Atlas.

The problem was not with the Mongoose code itself. MongoDB Atlas was blocking the Render server because of its network access configuration.

I found this by checking the Render deployment logs and then checking MongoDB Atlas Network Access.

After allowing the deployed backend to connect, the Render service successfully connected to MongoDB.

This was a good example of something that was difficult to diagnose from code alone. The application code looked fine, but the deployment environment was preventing the connection.

---

## Another Issue: CORS

After deploying the frontend to Vercel, the dashboard could not initially communicate with the backend correctly.

Locally, the frontend was running on:

`http://localhost:5173`

but the deployed frontend was:

`https://discord-command-bot.vercel.app`

I updated the backend CORS configuration and the Render `FRONTEND_URL` environment variable to use the deployed frontend URL.

After redeploying, the dashboard was able to communicate with the backend correctly.

---

## What AI Got Wrong / Where I Had to Correct It

AI was useful, but it was not always correct on the first attempt.

A recurring pattern was that some suggested solutions were technically reasonable but did not exactly match the code I already had.

For example, during the project I sometimes received suggestions involving different file names, different service functions, or a slightly different project structure than the one I had already created.

Instead of copying the suggestion directly, I had to adapt it to my existing code.

I also had cases where an implementation looked correct but did not work once I actually ran it. I would then provide the actual error/output back to AI and iterate on it.

That was probably the biggest lesson for me:

**AI was useful for generating possible solutions, but running and testing the application was what told me whether those solutions were actually correct.**

---

## What I Would Improve With More Time

If I had more time, I would improve the project in a few areas.

### Better Discord interaction handling

I would make the interaction processing more robust around Discord's response-time requirements, using deferred responses/follow-ups where necessary.

### Better retry handling

If sending a report to the second Discord channel fails temporarily, I would add a retry mechanism or queue instead of relying on a single API request.

### Automated tests

Most of my testing for this take-home was manual and end-to-end.

I would add automated tests for:

- Discord signature verification
- invalid signatures
- duplicate interaction IDs
- `/status`
- `/report`
- admin login
- protected admin APIs

### More dashboard features

The current dashboard focuses on the requirements of the assignment. With more time, I would add:

- pagination
- filtering
- date-based filtering
- better error visualization
- more detailed command statistics

---

## What I Learned From Using AI

The biggest benefit of using AI was that it reduced the time I spent stuck on unfamiliar parts of the stack.

For example, I had to work with:

- Discord HTTP interactions
- Ed25519 signature verification
- Discord REST APIs
- MongoDB Atlas
- Render deployment
- Vercel deployment
- JWT authentication
- React/Vite

Instead of spending a long time searching for an answer every time I got stuck, I could describe the problem and get several possible approaches quickly.

However, I found that the important part was still understanding and testing the suggested solution.

I didn't treat AI output as automatically correct. I used it as a second pair of eyes and then verified the result by running the application.

---

## Example of How I Used AI

A typical interaction was along the lines of:

> "This is my current Discord interaction service. `/report` is being received and stored in MongoDB, but I also need to send the report to another Discord channel. How should I structure this without putting the Discord API call directly inside the controller?"

I would then take the suggested approach, adapt it to my existing project structure, run it, and fix any issues that appeared.

This was more useful to me than asking AI to generate the entire project because I could understand what each part was doing and keep control over the implementation.

---

## Final Reflection

AI played a significant role in helping me complete the project, but the development was iterative.

I built the application feature by feature, tested it, encountered errors, and used AI to help investigate them.

The final application was manually configured and tested across Discord, MongoDB Atlas, Render, and Vercel.

The main thing I learned is that using AI effectively is not just about generating code. It is about being able to explain a problem clearly, evaluate the proposed solution, test it against the real system, and make the final engineering decision yourself.
