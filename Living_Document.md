# **Study Savior**

					

## **Team Info:**

Group 10: Sophie Peroutka, Beck Johnson, Samuel Vernick, Nat Rurka  
Git Repo: [https://github.com/Cybli/Study-Savior.git](https://github.com/Cybli/Study-Savior.git)  
Communication channels: Discord and Text

### **Jobs:**

| Sam Vernick | Beck Johnson | Sophie Peroutka | Nat Rurka |
| :---: | :---: | :---: | :---: |
| Full Stack Manager | Frontend Developer | Database Designer | Group Manager |

## **Product Description:**

### **Executive Summary:**

Study Savior is a campus-focused application designed to help students discover new study locations throughout campus. This platform provides information about study locations using user-submitted reviews and ratings. Locations are rated based on comfort, noise level, crowdedness, and vibe. These ratings are all combined to create an at-a-glance consensus on a study location, with further information being available if needed. This project hopes to encourage students to meet new people and explore campus, all while maintaining productivity.

### **Goals:**

**Core Goals**

* Study locations on campus map  
  * This will allow students to find quiet, nice spots to study on campus, especially with their groups.  
* Rating system and reviews submitted by users  
* Login and accounts for users  
* Web app with decent UI

**Reach Goals**

* Heatmap of study spots  
  * A heatmap lets students avoid very active study spots if they want to find a quiet place to study.  
* Push our locations map off campus  
* Sentiment analysis of reviews  
* Study group finder  
  * Gives students the ability to find other students in their classes to study with. This will be tied into the account system, and students will put in their class codes, and optionally, class times.

### 

### **Current Practice:**

* Finding study groups and spots is mostly done through personal communication channels right now (i.e. talking with friends, group chats).   
* Sometimes done through community message boards (i.e.  reddit, canvas, discord)  
* No common universal solution is currently in use

### **Novelty:**

Oregon State does not currently have a project like this. The closest thing we could find is the Oregon State Interactive Map, which features all the buildings on campus and allows users to find accessibility features, dining halls, events, parking, and construction zones. Although it is an interactive map of the school, it has more of an emphasis as a tool for finding utilities. Our project is solely focused on studying and academics.

### **Effects:**

**Who Benefits**

* Students seeking new study locations  
* Campus staff identifying underused or overcrowded study locations

**What difference will it make??**

* Study Savior aims to make finding study groups significantly easier and more accessible. Studying is a crucial practice in one’s academic achievement.

### **Use Cases (Functional Requirements)** 

**Beck:**   
View Details of a Study Spot

* Actor:  
  * Student/any user wanting information on a study spot  
* Triggers:  
  * Student selects a study area  
* Preconditions  
  * Study spot exists  
  * User is on the map page  
* Postconditions  
  * Useful information about the study spot is displayed  
* Steps:  
  * A study spot is selected by the user  
  * Information about the study spot is retrieved from the database  
  * Information is displayed, might include  
    * Building  
    * Star rating  
    * Noise level?  
    * Amenities?  
  * User consumes the information  
* Extensions/variations  
  * Photos provided  
  * Navigation details are provided  
* Exceptions  
  * Database fails to return information  
  * Study spot removed

**Sam:**  
Review a Study Spot

* Actor:  
  * Student reviewing a study spot  
* Trigger:  
  * Student clicks a star rating for the study location/clicks the review button (tbd)  
* Precondition  
  * Study spot exists  
  * User has opened the study spot info  
* Postcondition  
  * Review is posted and study spot score is updated  
* Steps  
  * Study spot selected by user  
  * Information is retrieved from database  
  * User selects their rating for each category of the location  
  * User submits the information  
  * Database processed and updates displayed information  
* Extensions/Variations  
  * Photos provided  
  * Navigation provided  
* Exceptions  
  * Study spot does not exist  
  * Database failed to retrieve or update information

	

**Sophie:**  
Create an account

* Actor:  
  * User attempting to create an account  
* Trigger:  
  * User clicks the create account button  
* Precondition  
  * User does not currently have an account  
  * User is not currently logged in  
* Postcondition  
  * New account is created  
* Steps  
  * User attempts to create a new account  
  * They are prompted to create a username and password  
    * Passwords are encrypted with bcrypt with salt added and stored in our database  
    * Salt and usernames are stored in database   
* Extensions/Variations  
  * Adding a profile picture  
  * Adding a profile description  
* Exceptions  
  * Username is taken  
  * Invalid username size or characters  
  * Invalid password size or characters

**Nat:**  
Create a study location

* Actors  
  * End user  
* Triggers  
  * Clicking a button  
* Preconditions  
  * Must have an account  
  * Must be logged in already  
  * A location must be selected on the map  
* Postconditions (success scenario)  
  * A new location is generated in the database, and appears shortly after for other users  
* List of steps (success scenario)  
  * Button is clicked to add a new study location  
  * (Optional:) Information for a location is input, and an image is uploaded to the Github (privileged responsibility if an image is needed)  
  * User inputs information for a review  
    * This requires functionality of Review a Study Spot use case  
  * A location object and associated review object are generated in the MySQL database  
  * The new location and its review appear soon after on other user’s pages  
  * Other users will be able to leave reviews on the new location  
* Extensions/variations of the success scenario  
  * An extension would be to allow normal users to add photos to locations, which currently we are restricted from doing by our hardware  
* Exceptions: failure conditions and scenarios  
  * Adding locations with images will be an administrator responsibility, so an unprivileged user will fail when attempting to do this

### **Non-functional Requirements**

**Beck:**

* Usability \- There will not be any more than 3 clicks to go from the map to details about a study spot  
* Performance \- The system shall display details about study spots within one second of being requested  
* Security \- Ratings, reviews, and possible check-in will be restricted to verified users.

**Sam:**

* Scalability \- It will be an easy process to add new study spots to the map and expand to further areas without breaking existing features   
* Privacy \- Individual info will not be leaked even if data is collected for a heat map feature  
* Adaptability \- Each user can choose which study locations are valuable to them and review or consume as they desire

**Sophie:**

* Adaptability \- The amount of information given to a user about a study location should be able to adapt to their needs  
* Effectiveness \- Our project should make finding study locations easier than other existing methods.  
* Integratability \- It will be designed in a modular way to allow new systems to be added and changed without breaking other systems

**Nat:**

* Efficiency \- The creation of new study locations, reviews, and accounts will take up minimal space in the database to ensure rapid access  
* Concurrency \- Multiple users will be able to access and utilize the website without any noticeable degradation to service  
* Responsibility \- The software will be designed such that its maintainers are able to respond quickly and effectively, easily completing corrective maintenance

### **External Requirements**

In addition to the requirements stated above, the course staff imposes the following requirements on your product

* The product must be robust against errors that can reasonably be expected to occur, such as invalid user input.  
* The product must have a public URL that others can use to access it.  
* You will need to provide instructions for someone else to set up a new server. Your system should be well documented to enable new developers to make enhancements.  
* The scope of the project must match the resources (number of team members) assigned.

### **Technical Approach:**

Study Savior will be built as a web-based application. The frontend will provide a clean user interface for discovering study locations, viewing ratings and reviews, and managing user accounts

The backend will handle application logic, user authentication, and communication between the relational database that will store user information and location information.

The interactive map will be integrated via external APIs

## **Risks:**

### **Scope Creep**

* **Likelihood of Occurrence:** High  
* **Impact:** High  
* **Evidence for Estimation:**  
  * Project proposal lists 4 main goals and 4 reach goals  
  * Team is all concerned about scope creep  
  * Timeline is only 10 weeks  
  * Web applications tend to accumulate features during development  
* **Steps to Reduce Likelihood (or impact):**  
  * Clear project proposal and separation of main goals and reach goals  
  * Designate one team member (Group Manager Nat) to keep track of scope  
  * Focus timeline exclusively on main goals  
* **Plan for Detecting:**  
  * Monitor weekly meetings for discussion of reach goals or new features  
  * Track GitHub commits and feature branches against approved features and scope  
  * Clear communication on expectations  
* **Mitigation Plan:**  
  * If detected, conduct meeting to reassess priorities  
  * Defer non-critical features to reach goals  
  * Reduce feature complexity instead of rushing implementation  
* **How Has the Problem Changed:** Since the requirements document, the team has developed clearer goals and defined specific use cases, which should help constrain scope. However, the team’s enthusiasm about the project suggests scope creep risk remains high.

### **Data Quality and User-Generated Content**

* **Likelihood of Occurrence:** Medium  
* **Impact:** High  
* **Evidence for Estimation:**  
  * Ratings are subjective and may vary depending on time of day or preference  
  * Low review counts can skew ratings  
  * Risk of spam, joke, or low-effort reviews  
* **Steps to Reduce Likelihood (or impact):**  
  * Display the number of reviews alongside average ratings  
  * Require login for submitting reviews  
* **Plan for Detecting:**  
  * Monitor outlier or suspicious reviews  
  * Identify locations with inconsistent rating patterns  
* **Mitigation Plan:**  
  * Adjust how average scores are displayed  
  * Allow deletion or reporting of reviews  
* **How Has the Problem Changed:** The risk has increased as plans for rating averages and review display logic has been specified 

### **Map Granularity/Detail**

* **Likelihood of Occurrence:** Medium  
* **Impact:** Medium  
* **Evidence for Estimation:**  
  * OpenStreetMap data may not have detailed information for all OSU campus buildings  
  * Multiple study locations in a single building  
  * Users rely on the map to find precise study locations so missing details will impact usability  
* **Steps to Reduce Likelihood (or impact):**  
  * Allow users to manually select study locations within buildings  
  * Check OpenStreetMap for OSU campus details  
* **Plan for Detecting:**  
  * Collect user feedback on missing or unclear map details  
  * Test the map with multiple locations with large amounts of study locations  
* **Mitigation Plan:**   
  * Zoom in feature and floor level markers  
* **How Has the Problem Changed:** The accuracy of OpenStreetMap of the OSU campus has been reviewed and approved

### **External Dependencies**

* **Likelihood of Occurrence:** Medium  
* **Impact:** High  
* **Evidence for Estimation:**  
  * Core functionality depends on OpenStreetMap and Leaflet API  
  * OSU MySQL/PHPMyAdmin access is required for database hosting  
  * Team has backup plan (Supabase/PostgreSQL) but there is a lack of comfortability.  
  * Campus map data may not be detailed enough for “subgroups” like library zones  
* **Steps to Reduce Likelihood (or impact):**  
  * Test OpenStreetMap data quality for OSU campus  
  * Confirm OSU MySQL access  
  * Read OpenStreetMaps/Leaflet documentation  
  * Familiarize one team member with Supabase just in case  
* **Plan for Detecting:**  
  * Test database and API connections  
  * Verify OSU MySQL remains accessible throughout the term  
  * Monitor Open StreetMap data updates that might effect usability  
* **Mitigation Plan:**  
  * If OpenStreetMap data is insufficient research alternatives  
  * If Leaflet doesn't workout try Google Maps API  
* **How Has the Problem Changed:** The team has confirmed that we will have OSU MySQL access

### **Security Vulnerabilities**

* **Likelihood of Occurrence: Medium \-** Low  
* **Impact:** Very High  
* **Evidence for Estimation:**  
  * Handling user passwords with bcrypt with salt  
  * Public facing web application vulnerable to common attacks  
  * No current plans for security testing  
  * Data breach would damage credibility leak user data  
* **Steps to Reduce Likelihood (or impact):**  
  * Establish an authentication library  
  * Implement input validation and sanitation on user inputs  
  * Use prepared statements for database queries  
  * Never store plaintext passwords  
* **Plan for Detecting:**  
  * Attempt basic SQL injection  
  * Check for exposed sensitive data in GitHub repository  
  * Test user authentication  
* **Mitigation Plan:**  
  * Fix any discovered vulnerabilities before public launch  
  * If break occurs take site offline, notify users and Oregon State University  
  * Review access logs to determine scope of the breach  
  * Document incident and improvements made  
* **How Has the Problem Changed:** Security requirements have become more detailed (AES-256 and salting)  
* 

## **Timeline**

**Week 4:** Project proposal and concept pitch, including problem definition and goals

* Nat: Create simple mockup of website main page user interface.  
* Sophie: Set up a GitHub repository as well as work on the project proposal  
* Beck: Create a rough initial timeline and research the current practices and effects of our project.  
* Sam: Work on proposal slides and coordinate project plan

**Week 5:** System architecture design, database design and schema

* Nat: Get a database hosted and provide access to all group members.  
* Sophie: Request access to the OSU MySQL database as well as develop relational schema  
* Beck: Rese and decide on the general tools/libraries to be used for frontend design  
* Sam: Determine technology used for map hosting on the frontend

**Week 6:** Team role assignments, risk assessment, testing plan, coding standards, and project report

* Nat: Refine website user interface design in preparation for presentation, and organize one meeting in the next week.  
* Sophie: Rese coding standards for MySQL and [Node.js](http://Node.js) as well as create a database visualization for the project report  
* Beck: Create the documentation plan and initial testing plans  
* Sam: Outline team structure and create a plan for work allocation based on role

**Week 7:** Begin core implementation, database creation, and foundational backend functionality

* Nat: Finalize program requirements and expected functionality. Organize a group meeting for the next week  
* Sophie: Implement the database on the OSU MySQL servers as well as connect it to the backend of the website using Node.js  
* Beck: Create a skeleton website that can be used to build out our intended functionality.  
* Sam: Work with Beck on creation of initial website, begin development of UX elements for interactive map

**Week 8:** Implement user accounts, develop interactive map functionality

* Nat: Go to campus and take photographs of at least 20 study locations in various buildings to prepare data for week 9\.  
* Sophie: Create logic for storing user accounts and passwords safely with salting and hashing  
* Beck: Make the components and UX elements of the user login and side panel to be populated with photos, tags, and reviews.  
* Sam: Implement Leaflet and create functional interactive map 

**Week 9:** Integrate study location data, ratings, and review submissions,

* Nat: Unit test the user accounts functionality to ensure that accounts are properly created, put into the database with hashed passwords, and logging in is successful. Gather independent feedback from 3 friends or colleagues.  
* Sophie: Take photos of study locations to add to our project as well as set up logic for rating tags and reviews  
* Beck: Flesh out the side panel to hold all the study location information.  
* Sam: Add study locations to interactive map and confirm successful integration with the backend

**Week 10:** User testing, bug fixes, UI polish, and final project release

* Nat: Prepare and organize materials for the upcoming project release. Open a new line of communication between all of the group members to ensure that we are all prepared, on schedule, and on the same page for releasing the final product.  
* Sophie: Address feedback and improve the database to support any bugfixes or potential reach goals  
* Beck:  Address feedback for the frontend and rework affected UX elements  
* Sam: Resolve linking issues and clarity errors on the frontend, assist other developers with finishing all tasks on time before final project deployment

## **Team process description**

* Specify and justify the software toolset you will use.  
  * React  
    * The React language is essential for designing web-based applications.   
  * Leaflet for accessing data from OpenStreetMap  
    * OpenStreetMap provides open source map data, and as long as a citation is provided for our usage of OpenStreetMap, it comes at no cost.  
    * Leaflet is an easy-to-use tool for adding custom nodes and points of interest to the map provided by OpenStreetMap. This software will help us scale high-density zones, such as the library, into subgroups and give our users better visualization.  
  * JS/NodeJS  
    * JS and NodeJS are both incredibly common tools in industry environments and are completely free to use. The large amount of documentation that already exists due to the aforementioned reasons also helped a lot in our decision to use these resources.  
  * MySQL  
    * MySQL is free and open source; there is also support for it through OSU with PHPMyAdmin  
    * Some members of our group have previous experience integrating OSU’s version of MySQL with websites  
* Define and justify each team member’s role: why does your team need this role filled, and why is a specific team member suited for this role?  
  * Sam  
    * Full Stack Manager  
      * Facilitating the coordination of our frontend and backend is vital to ensure the system functions as intended. I am going to be overseeing this integration, working closely with Beck on frontend work and Nat on backend integration.  
  * Beck  
    * Frontend Developer  
      * Designing and implementing the UI/UX elements of our application. This will include making the website that users will be interacting with and working with Sam and Sophie to make sure elements respond in reasonable time frames  
  * Sophie  
    * Database Designer  
      * Our database is a core component of our website, used to store reviews and location information. I have the most experience with database design and website integration  
  * Nat  
    * Group Manager  
      * The core portion of my responsibilities is organizing the group to meet up throughout the term, so we stay on track, and helping to resolve disputes between group members, if they may arise.

## **Software Architecture:**

### **Architecture Flow Diagram:**

**<img width="1920" height="1080" alt="StudySavior (2)" src="https://github.com/user-attachments/assets/09a3741f-87e4-4ece-ab9d-bc58e4f0dfa6" />**

#### **Connection Layer:**

* Our current plan is to use Node.js to connect our frontend user interface to our backend database. We chose this as it offers the right amount of functionality for our project while also keeping development simple  
  * Our alternative to Node.js is Next.js combined with Prisma. These two software combine to elaborate upon Node.js, adding a host of features for an enterprise workflow

#### **Database Architecture:**

* The database architecture we landed on is MySQL. We feel that we are the most comfortable working with this architecture and it provides everything we need for our backend database. There is also a host of support and services offered by OSU for MySQL databases  
  * The alternative we have chosen to MySQL is Supabase, running the MySQL architecture. We chose it as our backup because it offers robust tools for user authentication and password storage with intelligent salting and hashing to maintain privacy and security. The main disadvantage is its complexity and our lack of comfortability with the platform.

### **Database Entity Relationship Diagram:**

**<img width="775" height="638" alt="Screenshot 2026-02-14 165036" src="https://github.com/user-attachments/assets/a977a952-e287-44f0-88d3-a0e75990f39c" />**


## **Software design:**

### **User Interface Component (Frontend)**

**Technology:** React \+ JSX/Leaflet

**What it is:** The presentation layer that users interact with directly through their web browser.

**Responsibilities:**

* Display location information, ratings, and reviews  
* Gather user input (searches, ratings, login credentials)  
* Send requests to the backend and receive responses  
* Update the UI dynamically based on data received  
* Handle user navigation and interaction

### **Connection Component (Backend)**

**Technology:** Node.js

**What it is:** The middle layer that processes database logic and connects the frontend to the database.

**Responsibilities:**

* Handle HTTP Requests  
* Process data, calculate averages, and apply rules  
* Authentication and authorization via login  
* Execute SQL queries and handle results  
* Structure data appropriately for frontend  
* Catch and manage exceptions, return meaningful error messages

### **Database Component (Backend)**

**Technology:** MySQL

**What it is:** The data persistence layer that stores all application data in structured tables.

**Entities & Their Responsibilities:**

**Location Entity**

* Stores information about study locations (names, descriptions, buildings, coordinates)  
* Maintains pre-computed average ratings for performance  
* Provides indexing for efficient location searches

**Rating Entity**

* Stores individual user ratings and reviews  
* Links ratings to specific locations and users  
* Tracks multiple rating categories (noise, comfort, crowdedness, and vibe)

**User Entity**

* Manages user accounts and login  
* Stores usernames and securely hashed passwords with salt  
* Links users to their submitted ratings

**Database Relationships:**

* One location can have many ratings (1:N)  
* One user can submit many ratings (1:N)  
* Each rating belongs to exactly one location and one user (N:1)

## **Coding guidelines:**

* CSS  
  * [https://www.w3schools.com/html/html\_css.asp](https://www.w3schools.com/html/html_css.asp)  
    * Closely follows our ideal styling for CSS, is thorough with its coverage and consistency.  
* JavaScript  
  * [https://www.w3schools.com/js/js\_conventions.asp](https://www.w3schools.com/js/js_conventions.asp)  
    * Most of our team members are most familiar and comfortable with camelCase, and generally prefer a significant portion of this style. Consistency in our code will lead to better readability and easier maintenance of existing code.  
* MySQL  
  * [https://www.sqlstyle.guide/](https://www.sqlstyle.guide/)  
    * Closely follows our ideal styling for MySQL, is thorough with its coverage and consistency.

To enforce we will go over code before commits and have teammates review for issues during merging.

## **Process description**

### **Project schedule**

**Major Milestones:**

* M1: Design and Architecture  
* M2: Core Backend and Database Functional  
* M3: Frontend Functional Requirements Complete  
* M4: Integration and Unit Testing Working  
* M5: Final Release

| ID | Milestone | Task | Effort (Weeks) | Depends On |
| :---- | :---- | :---- | :---- | :---- |
| T1 | M1 | Design system architecture | 0.5 | \- |
| T2 | M1 | Design database schema | 0.5 | \- |
| T3 | M2 | Implement Database Structure | 0.5 | T1 |
| T4 | M2 | Implement Backend User Login | 1.0 | T1 |
| T5 | M3 | Implement Frontend User Login Calls | 1.0 | T2 |
| T6 | M3 | Implement Interactive Map | 1.0 | T3 |
| T7 | M4 | Integrate frontend with backend | 1.0 | T3, T4, T5, T6 |
| T8 | M4 | Conduct System Testing | 1.0 | T7 |
| T9 | M4 | Fix Critical Issues | 1.0 | T8 |
| T10 | M4 | Final Deploy | 0.5 | T9 |

### **Team structure**

**Top-Down Structure:**

### **Test plan & bugs**

#### **Test Automation**

We use **[Jest](https://jestjs.io/)** as our test automation framework along with [Supertest](https://www.npmjs.com/package/supertest)  HTTP route testing on our backend.

- **Jest** - JavaScript testing framework that handles unit and integration tests
- **Supertest** Allows HTTP requests to be made to our Express app without spinning up a live server

**Why Jest and Supertest?**

 **Familiarity** — Jest is the most widely used JavaScript testing framework and integrates naturally with Node.js projects
- **Zero config** — Works out of the box with no complex setup required
- **Built-in coverage** — Jest includes code coverage reporting without needing additional tools
- **Async support** — Handles async/await testing natively, which is essential for testing database queries and API routes
- **Supertest integration** — Supertest works seamlessly with Express and Jest, allowing testing without a live server


### CI Service: GitHub Actions

We use **GitHub Actions** as our CI service. The repository is hosted on GitHub at https://github.com/Cybli/Study-Savior, and GitHub Actions is configured directly within the repository

**Why GitHub Actions?**

- **Built into GitHub** — No external account or service linking required. Since the project is already on GitHub, Actions is available immediately with no setup overhead
- **Free for public repositories** — No cost for our use case
- **Simple YAML configuration** — Workflow files are straightforward and well documented
- **Large marketplace** — Thousands of pre-built actions available for common tasks

**CI Pros/Cons Matrix**

| Feature | GitHub Actions | Travis CI | CircleCI |
|---------|---------------|-----------|----------|
| GitHub integration | Native |  ood | Good |
| Free tier | Free for public repos | Limited free tier | Limited free tier |
| Setup complexity |  Low | Low |  Medium |
| Configuration format | YAML | YAML | YAML |
| Marketplace/plugins | Large | Smaller | Smaller |
| Self-hosted runners | Yes | No | Yes |
| Documentation quality | Excellent | Good | Good |
| Best for | GitHub projects | Open source | Large teams |


**Decision:** GitHub Actions was the clear choice given the project is already on GitHub, the free tier covers all our needs, and the native integration means no external service linking is required.

**Which Tests Run in a CI Build**

Every CI build runs:
- All Jest unit tests
- All route integration tests via supertest

**What Tests Run in a CI Build**

Every CI build automatically runs the full backend test suite

**What Triggers a CI Build**

A CI build is triggered automatically when:
- A **push** is made to the `main` branch
- A **pull request** is opened or updated targeting the `main` branch

This ensures all code merged into `main` has passed the test suite, and pull requests from teammates are validated before merging.

For internal bug testing we will be going through our entire application, login/logout, interacting with the map (loading new areas, zooming in/out), creating reviews, creating tags, adding photos, and adding new study areas (as admins). We will be testing all of these for previously laid out non-functional requirements such as response times, any lost data between the frontend and the database and the security of queries and passwords.

For the closed testing sessions we will give access to an early version of the product to friends on campus and ask them to use it over the period of a few days. After that period we will send all participants a google form requesting a few things from each of them. Their general impression of the app, whether they ever felt like any portion of the app was prohibitively hard to use and also if there was any feature that was too hard to access. There will also be a section for any bugs that they noticed or found.

### **Documentation plan**

Outline a plan for developing documentation that you plan to deliver with the system.

#### **Step 1: Thorough Commenting**

*  Across all areas of our application’s files we will comment our code thoroughly and in line with the coding guidelines outlined previously.  
* These comments will be made with the expectation that other members of our team will be able to comb through code they have not written and effectively glean what the purpose of each piece is/will be.


#### **Step 2: User Help Page**

 This will be a page that is easily accessible from our main site which will document the steps necessary for all common actions that users will be taking. Including, but not limited to:  
  * Account Creation/Deletion  
  * Posting new study locations  
  * Interacting with existing study locations  
    * Commenting  
    * Editing  
    * Rating  
    * Checking In(?)   
  * Utilizing the interactive map  
  * Possible Social Features (stretch goal)

#### **Step 3: Optional Pop-Ups on all pages**

* This will be a feature that will cover everything listed in the User Help Page but will be situated throughout our application as small question mark buttons next to buttons that trigger common actions.  
* They will create a small pop-up with a shortened explanation of what the action about to be taken is and a link to the help page in case more information is desired.

## **Reflection**

### **Sophie**
One of my biggest takeaways is the importance of communication and coordination between all parts of the development stack. Since our project has a database, backend, and frontend components, there were multiple instances when development on one component stalled while we waited for progress on the others.
I also found it important to coordinate and document the inputs and outputs of interacting systems so that developers working on adjacent layers can use them easily.

I also learned a lot about continuous database integration and revision. As our project grew and our end goals changed, this required significant modifications to the database. Fortunately, the database is relational and modular, accommodating such changes.
When we decided to add tags to the database, a significant change was required to accommodate that feature. I was luckily able to keep the structure of our database relatively static, so existing integration didn't break.

Communication and team coordination were pretty tricky for me on this project. If I were to do this project over again, I would have established a more rigorous meeting schedule with the team. This would have reduced procrastination and enabled us to make progress faster.
This would also have allowed each team member to hold one another more accountable for deadlines and expectations.

Overall, this project taught me a lot about working in a collaborative environment with other developers, meeting deadlines, and managing a larger project.

### **Samuel**
Our project had a lot of pieces that built upon one another, and organizing exactly when each component needed to be finished proved to be a bit difficult. If we were more rigirous with scheduling exact dates for specific componenets I likely would have felt a lot better about the overall pacing, as often I went a few days without writing code and then had to write a big burst for another teammate to start working. 

I learned a lot about Leaflet and map integration and how these API's function, and am excited to use them again in the future! I also learned a lot about frontend development as that is where I spent most of my time and I am now a lot more familiar with React and how large codebase structures look. Focusing on making components expandable and modifiable was nessecary as our scope and goals shifted throughout the develoment process.

I had a few rough patches throughout this term with illness and mental health concerns and wish I had communicated better with my team and stayed more on top of all my work. Tying back to my initial point, setting clear deadlines for specific componenets and individuals wouldve made me a lot more accountable during the development process and made me more confident in my work and timeline.

Overall I really enjoyed this project and learned a lot from my teammates. I am excited to work with similar development cycles in the future and feel much more prepared to after this experience!

### **Beck** ###
This has been one of the hardest projects that I've done in my academic career. With that said, I feel like I've also learned a lot from it. This difficulty mostly manifested in having to organize our own deadlines for large portions of the work being done. When combined with 3 other classes all pulling my attention with other, more concrete, deadlines it led to this project's work often falling to the back of my mind when hard deadlines (i.e. project milestones and deliverables) weren't present.

My main lesson, more a refresher than a new lesson, was that of the importance/necessity of effective communication in group settings. Due to the amount of work needed for this project, we would've fell heavily behind many times if we didn't all communicate fairly effectively and in a timely manner. That said, there were definitely lapses in this and we could've and should've been getting farther ahead than we did. However due to our communication we never fell more than a little behind and have been able to deliver a polished and effective product.

When I took Intro to Databases (CS340) my instructor opted to not do a final project in which we made a website that integrated with a database. Due to this, this is the first class in which I have interacted with a website architecture that integrates a database. This has been super interesting and eductaional, especially because of how widespread linking databases with websites is. While my main focus was the frontend, I did work on the backend and our server.js file a little bit, and used it's functionality extensively. Observing the way that our live website interacted with the database was incredibly enlightening and filled in a sizeable gap that I had in my knowledge.

My final lesson that I took from this project was that of the importance of strong documentation. I have never had to write or maintain documentation for a project before and having it here was an incredible resource. Especially on a project like this where multiple people are all working simultaneously on a codebase that builds off of itself very often, having documentation that explained what I was looking at and how to use at almost all times was incredibly useful. 

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>
