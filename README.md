|<p>Evaluate news Article</p><p>Using Natural Language Processing (NLP)</p>||
| :- | -: |

INFO

|**About Project :**|**Author**|
| :-: | :-: |
|<p>This simple web app allow you to enter news/article URL to use Sentiment Analyzing service [(meaning cloud)](https://www.meaningcloud.com).</p><p>**Technologies used :**</p><p>- HTML</p><p>- CSS/SASS</p><p>- JavaScript ES6</p><p>- Node.js (Express)</p><p>- Webpack</p><p>- API</p><p></p>|<p>**Name** :         Ahmed Fawzy Elragal</p><p>**Email**:           <elragal30@gmail.com> </p><p>**Linked IN**:     [Ahmed Elragal](https://www.linkedin.com/in/ahmed-fawzy-elragal/)</p><p>**GitHub**:         [Ahmed Elragal](https://github.com/Ahmed-Elragal)</p><p>**Guru**:             [Ahmed Elragal](https://www.guru.com/freelancers/ahmed-fawzy-elragal)</p><p></p>|

Installation:

- Open your terminal
- Cd to Project main Folder (that contain src folder)
- Run this command npm install
- This project has server that has to be run using : npm run start
- Then run npm run build-prod
- Open [localhost:8081](http://localhost:8081)

**Note :** this steps for first time first

Features:

- Use special CSS stylesheets (Converted from SASS files)
- Use .gitignore file to exclude (node\_modules / dist) folders from git
- Use Sass functions and variables
- Using 2 different modes :
  - Development: build-dev
  - Production: build-prod
- Use Node.js server that can :
  - Test if it work by going to [test](http://localhost:8081/test)
  - Going to wrong url will redirect to error 404 page
  - ` `handle user URL and send API request
  - Receive response and send it to user
  - You must have [(meaning cloud)](https://www.meaningcloud.com/developer/account/subscriptions) Key to use this service (replace it with : ‘${process.env.application\_key}’ in server/index.js @line : 15)
  - For trial use only leave it as it is it will use hidden trail key
- There a validation of URL to ensure it is a valid URL (JavaScript and CSS)
  - VALID 	> correct sign will be shown, requirement will be hide and Submit button will be enabled
  - INVALID 	> False sign will be shown, requirement will be shown and Submit button will be disabled 
- When submitting :
  - Show loading modal to tell user that there are a processing run
  - Recheck URL validation to ensure it is valid URL
  - Send URL to server and wait to response (Asynchronously).
- If server respond correctly with result :
  - It send the necessary data only (
    - agreement
    - subjectivity
    - confidence
    - irony
    - score\_tag
    - status
- Error handler :
  - URL valid format but can’t find by meaning Cloud
  - Server not running
  - Wrong Post route
  - Error in analyzing data 
- Updating user UI with data :
  - Hide result section till data received and before user submit
  - Meter for confidence 
  - Different color for agreement/disagreement
  - Converting score\_tag from code > its state 
  - Show result section and hide loading modal
