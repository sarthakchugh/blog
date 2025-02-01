
# Sarthak's Blog - A Platform for Tech Enthusiasts ✍️💻

Sarthak's Blog is a modern web application designed for tech enthusiasts to share and explore insightful articles. Built using the MERN stack, it offers an interactive and user-friendly blogging experience.




## Features

- Create and publish new posts
- Read and explore existing posts
- Search and filter posts by categories or keywords
- Save and favorite posts for later
- Add comments to engage in discussions


## Tech Stack

**Client:** React, TailwindCSS, React TanStack Query, React Router

**Server:** Node, Express

**Database:** MongoDB, Mongoose (ODM)

**Image Management:** ImageKit

**Authentication:** Clerk




## Screenshots

![Landing Page](https://github.com/user-attachments/assets/b4001889-2e60-4515-b243-fb34a50621bc)

Welcome to my blog! You can view the featured posts, recent posts, browse categories, search for posts and a lot more.

---

![All Posts](https://github.com/user-attachments/assets/1db26359-cd7a-40be-9a35-67bf02c6b48e)

See all the posts posted on the platform.

---

![Filters](https://github.com/user-attachments/assets/10696fa5-f74f-4487-a29f-455d531c7c57)

Filter for the posts related to a specific technology, by date or by trending.

---

![Search](https://github.com/user-attachments/assets/6080800e-0bc2-4e20-8fc9-d4626a7f825a)

Search for posts using keywords.

---

![Single Post](https://github.com/user-attachments/assets/1204c002-189d-4fd1-8c20-233e0a2e73d1)

Read through intuitive posts posted by tech enthusiasts around the world.

---


![Clerk Auth](https://github.com/user-attachments/assets/5825d9b7-d511-4ff8-8748-cd6d45790565)

Log in using Clerk which manages OAuth enabling you to sign in instantly without using passwords.

---

![Create Post](https://github.com/user-attachments/assets/2c97f881-d751-4cbc-bb22-d68c9c3b0fa9)

Create a new post to share your ideas and knowledge with the world.

---

![Post Actions](https://github.com/user-attachments/assets/1e56f176-1c86-4b41-be60-aa583753515f)

Save posts or delete them if you're the owner. As an admin you can feature posts to be listed on the landing page.

---

![Comments](https://github.com/user-attachments/assets/50a9a1a8-2330-4d32-b6b3-6fd83feeb097)

Engage with the world in the comments box.





## Run Locally

Clone the project

```bash
  git clone https://github.com/sarthakchugh/blog.git  
```

Before following the next steps, please check the [environment variables](#environment-variables) required to run the project.

Go to the project directory

```bash
  cd blog
```

Go to the server directory

```bash
  cd server
```

Install server dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

In a new terminal, navigate to the client directory

```bash
  cd client
```
Install server dependencies

```bash
  npm install
```
Start the client

```bash
  npm run dev
```
Navigate to the link in the terminal (http://localhost:5173)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file in the server directory:

To use Mongo DB - 
`MONGODB_URI`

To link to client -
`CLIENT_URL`

To use Clerk - 
`CLERK_WEBHOOK_SECRET`
`CLERK_PUBLISHABLE_KEY`
`CLERK_SECRET_KEY`

To use ImageKit - 
`IMAGEKIT_URL_ENDPOINT`
`IMAGEKIT_PUBLIC_KEY`
`IMAGEKIT_PRIVATE_KEY`

Add the following environment variables to your .env file in the client directory:

To link to server -
`VITE_API_URL`

To use Clerk - 
`VITE_CLERK_PUBLISHABLE_KEY`

To use ImageKit - 
`VITE_IMAGEKIT_URL_ENDPOINT`
`VITE_IMAGEKIT_PUBLIC_KEY`









## Feedback

If you liked this project, please star it on Github. If you have any feedback, please reach out to me at sar.chugh@gmail.com. 

