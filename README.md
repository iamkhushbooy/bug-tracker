
# Bug Tracking Application

A full-featured bug tracking system developed as part of an assignment for **Swapnil Soft**. This application helps developers track, manage, and resolve bugs efficiently using a clean and modular full-stack architecture.

---

## Features

- View all reported bugs
- Add new bugs with title, description, status, severity, and assigned user
- Edit bug details
- Delete bugs
- Filter bugs by:
  - Status (Open, In Progress, Closed)
  - Priority (Low, Medium, High)
- Search bugs by title in real-time
- Responsive and clean user interface

---

## Tech Stack

- **Frontend:** Next.js 14 (App Router), React, Tailwind CSS  
- **Backend:** Next.js API Routes  
- **Database:** MongoDB with Mongoose  
- **State Management:** React Hooks (`useState`, `useEffect`)  
- **Deployment:** Vercel  

---

## Setup Instructions

Follow these steps to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/iamkhushbooy/bug-tracker.git
cd bug-tracker
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Environment Variables
Create a `.env.local` file and add the following:
```env
MONGODB_URI=your_mongodb_connection_string
```

### 4. Start the Development Server
```bash
npm run dev
```

The app will be live at:  
`http://localhost:3000`

---

## My Approach

### Overall Strategy
This app was developed with a focus on usability and clean design. I first implemented core **CRUD functionality**, then gradually added **filter**, **search**, and **modular UI components** to enhance user experience.

### Architecture Highlights

- **Frontend:** Built with the App Router in Next.js 14 for routing and API integration.
- **Backend:** Uses server actions and API routes, connected to MongoDB via Mongoose.
- **UI:** Tailwind CSS is used for responsive and minimal design.
- **Search & Filter:** Client-side real-time search and dropdown filters for priority, status and title.


## Future Enhancements

- [ ] User authentication (JWT or NextAuth)
- [ ] Role-based access (Admin, Developer, Tester)
- [ ] Comment threads per bug
- [ ] Real-time updates with Socket.IO/WebSocket
- [ ] Assign bugs to users
- [ ] Email notifications on updates
- [ ] Attach screenshots or files to bugs
- [ ] Bug history and change logs
- [ ] Export bug reports (CSV/PDF)
- [ ] Analytics dashboard

---

## Developer

**Khushboo Yadav**  
B.Tech Mechanical Engineering | Aspiring Full Stack Developer  
🔗 GitHub: [@iamkhushbooy](https://github.com/iamkhushbooy)

---

## Acknowledgements

This project was developed as an assignment for **Swapnil Soft** to demonstrate skills in full-stack development, project architecture, and clean UI design. Inspired by real-world tools like Jira, GitHub Issues, and Trello.

---

