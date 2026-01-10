# Backend of Youtube using JAVASCRIPT
- command 1 -- npm init
- command 2 -- git init
- command 3 -- git add .
- command 4 -- git commit -m "Add initial files for backend"
- command 5 -- git branch -M main
- command 6 -- git remote add origin [GitHub Link](https://github.com/KunduSumanDeb/youtube_clone_backend_only.git)
- command 7 -- git push -u origin main
- command 8 -- npm i -D nodemon -> "Automatically refreshes the server after saving the changes."
- We need to change the test command to dev that is present within the package.json file.
```json
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1"
},
->
"scripts": {
  "dev": "nodemon src/index.js"
}, 
```
- command 9 -- npm run dev -> this will run the index.js file.
- command 10 -- git status -> To check the files that are present in unstaged area. -> command 2/3. 3 - "Setup project files"
- command 11 -- git push
- command 12 -- npm i mongoose dotenv express
- Connected the database to my backend
- utils section added. apiError, apiResponse, asyncHandeller files added.
- Command 13 -- npm i mongoose-aggregate-paginate-v2
- Command 14 -- npm i bcrypt -> Provides encryption.
- Command 15 -- npm i jsonwebtoken -> Verify tokens sent by   clients/ Secure APIs without storing sessions on the server/ it is a bearer token
- User & Video Model Completed.
- Command 16 -- npm i cloudinary
- Command 17 -- npm i multer
- ERD - [Model Link]( https://app.eraser.io/workspace/YtPqZ1VogxGy1jzIDkzj)