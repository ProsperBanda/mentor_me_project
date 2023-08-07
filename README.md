MENTOR_ME

- MENTOR_ME is a mentoring website that aims to foster supportive environment where mentees can receive personalized guidance, mentorship, and career advice from senior college students/experienced professionals who are passionate about nurturing the next generation of talent.

USER ROLES

- A mentee is a college student that is in need of career guidance and advice on how to navigate the career. Looking for a personalized experience and a space where the student can ask questions about oportunities, how to navigate campus, how to navigate college life.

- A mentor is a college student(sophomore, junior, senior, grad, phd student) or faculty(professors) who are passionate about giving back and helping to nurture the next generation.

USER PERSONAS
(a). Mentee

- I am Priscilla, a college student majoring in Computer Science. I am in my second year and I am passionate about software development. I am eager to gain insights and guidance from seniors in the same field on how I can successfully navigate the road as I pursue my goals. I want to find a mentor who can provide career advice, help me to set goals, and offer parctical tips to enhance my skills and leverage all the opportunites available to me e.g internships, scholarships e.t.c

(b). Mentor

- I am Sam, a senior Computer Science major. I have interned with two tech companies thus far. I am a recipient of a lot of scholarships.I have experince in developing web-applications and leading different organizations on campus. I would like to share my knowledge and expertise with underclassmen students on my campus to help them excel in their careers and navigate college smoothly. I believe mentoring is a great way to give back to the community and contribute to the growth of future talent. I am finding it hard to find mentees who are curious to learn and ensuring effective communication to build a strong mentor-mentee relationship.

USER STORIES

- As a mentee, I want to create a profile highlighting my academic background, career interests, and goals.
- As a mentee, I want to search and browse mentors based on specific criteria such as major and expertise.
- As a mentee, I want to send mentorship requests to mentors I am interested in, explaining my goals and expectations.
- As a mentee, I want to communicate directly with my chosen mentor through messaging or video conferencing tools.
- As a mentee, I want to collaborate with my mentor to set goals and track my progress towards career development.
- As a mentee, I want access to a resource library with educational materials and resources related to my career interests.

- As a mentor, I want to create a comprehensive profile highlighting my professional background, experience, and expertise.
- As a mentor, I want to review and accept mentorship requests from interested mentees based on their goals and interests.
- As a mentor, I want to communicate directly with my mentees through messaging or video conferencing tools.
- As a mentor, I want to collaborate with mentees to set realistic goals and provide ongoing feedback for their career development.
- As a mentor, I want to share additional resources, recommended readings, or industry insights with my mentees.
- As a mentor, I want to inspire and motivate my mentees, providing guidance and support in their career journey.

<a name="readme-top"></a>

<!-- ABOUT THE PROJECT -->

Mentor_Me is an innovative web application designed to nurture peer mentorship among college students, with a keen focus on career growth and development.

[![Product Recording][product-screenshot]](https://example.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Overview:

- Mentor Me is a comprehensive web-based platform designed to bolster peer mentorship among college students. Its core functionality lies in its ability to create and strengthen connections, subsequently aiding in enhancing career progression through mentorship. This platform not only allows users to find and connect with potential mentors but also provides a seamless communication medium. Both mentors and mentees can create detailed profiles, offering insight into their academic background, interests, and career aspirations. Mentees can send mentorship requests to prospective mentors. These requests contain details about the mentee's objectives and reasons for seeking mentorship. Mentors receive these requests and have the flexibility to accept or decline based on compatibility and availability. Once a mentor-mentee pairing is successfully established, both parties can initiate conversations through the built-in chat functionality. This chat system facilitates real-time communication, ensuring that mentorship guidance is just a click away. Incorporated ChatEngine.io to manage and streamline chat functionalities. This API is responsible for delivering a robust, efficient, and scalable chat experience, enabling users to communicate without any lags or glitches. I also used Socket.io. This technology, focused on bidirectional event-based communication, integrated to manage real-time websockets. It ensures instantaneous data transfer, making the chat experience and sending notifications seamless. I used Emailjs for the notification system, and it allows the application to send email notifications to users. This includes notifications for mentorship requests, responses, and other related alerts, ensuring that users are kept abreast of any new developments in their mentorship journey.

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

Any reflections go here

<p align="right">(<a href="#readme-top">back to top</a>)</p>
