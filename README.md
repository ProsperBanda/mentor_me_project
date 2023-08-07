<a name="readme-top"></a>

<!-- ABOUT THE PROJECT -->

## About the Project

- Mentor_Me is an innovative web application designed to nurture peer mentorship among college students, with a keen focus on career growth and development.

[![Product Recording][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Overview:

- Mentor Me is a comprehensive web-based platform designed to bolster peer mentorship among college students. Its core functionality lies in its ability to create and strengthen connections, subsequently aiding in enhancing career progression through mentorship. This platform not only allows users to find and connect with potential mentors but also provides a seamless communication medium. Both mentors and mentees can create detailed profiles, offering insight into their academic background, interests, and career aspirations. Mentees can send mentorship requests to prospective mentors. These requests contain details about the mentee's objectives and reasons for seeking mentorship. Mentors receive these requests and have the flexibility to accept or decline based on compatibility and availability. Once a mentor-mentee pairing is successfully established, both parties can initiate conversations through the built-in chat functionality. This chat system facilitates real-time communication, ensuring that mentorship guidance is just a click away. Incorporated ChatEngine.io to manage and streamline chat functionalities. This API is responsible for delivering a robust, efficient, and scalable chat experience, enabling users to communicate without any lags or glitches. I also used Socket.io. This technology, focused on bidirectional event-based communication, integrated to manage real-time websockets. It ensures instantaneous data transfer, making the chat experience and sending notifications seamless. I used Emailjs for the notification system, and it allows the application to send email notifications to users. This includes notifications for mentorship requests, responses, and other related alerts, ensuring that users are kept abreast of any new developments in their mentorship journey.

<!-- Getting Started -->

## Getting Started

**React**

1. Install the required packages in the React App.
   `npm install react react-dom react-router-dom`

**PostgreSQL**

1. After installing Homebrew, install PostgreSQL by running `brew install postgresql` in the terminal
2. Create a database, user, and password.
   `psql postgresql`
3. Once you are in the PostgreSQL console, creaye a new database with the following SQL command:
   `CREATE DATABASE mydatabase`

- replace "mydatabase" with the name of your database.

4. Now, create a new user and give it a password:
   `CREATE USER myuser WITH ENCRYPTED PASSWORD 'mypassword';`

- Replace "myuser" with the username you want to use, and 'mypassword' with your desired password.

5. Now, give the new user access to the database you created:
   `GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;`

- Again, replace "mydatabase" and "myuser" with your database name and username, respectively.

**Tableplus**

- Download and install TablePlus from [here](https://tableplus.com/download)

**Express**

1. Install the required packages in the Express App.
   `npm install bcrypt connect-session-sequelize cors express express-session morgan pg pg-hstore sequelize`

<!-- USER STORIES -->

## User Stories

- [ ] A user can create an account and log into their account.
- [ ] User can complete their profile as a mentor or mentee. As they complete the profile, the process should have an autocomplete functionality
- [ ] Mentees can send mentorship requests to mentors.
- [ ] Mentors can accept or decline the list of mentorship requests
- [ ] Notifications
  - [ ] A mentee receives a browser push notification when their request was accepted or declined
  - [ ] A mentor receives a browser push notification when they receive a request from a mentee
  - [ ] A matched mentee<>mentor pairing receives a browser push notification when the other party logs in
  - [ ] Inside the dashboard, user can see their notifications under the notification section
  - [ ] Fail-state handling: If the browser does not support notifications, or the user did not give permissions, or the other party is offline, send the notifications via email instead.
- [ ] Connected mentors and mentees should be able to chat directly through the chat.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LEARNINGS -->

## Learnings

- Mastered the integration of external libraries and APIs, such as socket.io, Emailjs, and ChatEngine.io, to enhance the functionality of the Mentor_Me web app.
- Acquired hands-on experience in implementing websockets to enable real-time push notifications, ensuring seamless communication between mentors and mentees.
- Used diagnostic tools like console logs, Postman, and Table Plus to trace data flow, identify anomalies, and fix bugs, enhancing the reliability and performance of the application.
- Developed intuitive dashboards for mentors and mentees, ensuring easy access to vital information, streamlining the mentorship request process and promoting user engagement.
- Successfully delivered on multiple user stories, enhancing the overall functionality of the Mentor_Me application. This included creating accounts, viewing profiles, sending and receiving mentorship requests, and introducing autocomplete functionalities.
- Implemented a versatile notification system that employed browser push notifications and integrated fallbacks using email to ensure consistent user communication.
- Worked harmoniously with a team, leveraging the support of my manager and peer mentors to achieve my project goals.
- Embraced unfamiliar technologies and libraries, committing extra time to master them, underscoring a commitment to lifelong learning and personal growth.
- Maintained clear communication channels when discussing project modifications, presenting bugs, or sharing progress updates.
- Navigated complex project tasks within a constrained timeframe, striking a balance between adhering to original plans and making necessary adjustments.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
