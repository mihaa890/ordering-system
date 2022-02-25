# Ordering System Application

This is an application model for managing a restaurant.
<br>
<b>Prerequisites:</b> node v14.16.1, docker v20.10.12


# Getting Started

To install the application run the following command: 
<br>
`git clone https://github.com/mihaa890/ordering-system.git` 
<br>
<hr>
To start the server run the following commands in the root path: 
<br>

`cd .\server\ `
<br>
`npm install ` and` npm run dev || npm run prod` 
<br>
In the server directory you will find a file named `config.sample.yml`, copy the file and make two of it `config.dev.yml` and `config.prod.yml`. Now you should configure both files with your own data according to this model:  
```xml
database:
  host: 'YOUR_HOST'
email:
  user: 'YOUR_EMAIL'
  pass: 'YOUR_PASSWORD'
  service: 'SERVICE'
  base_url: 127.0.0.1
  port: PORT
  token_key: 'RANDOM_STRING'
  password_reset_key: 'RANDOM_STRING'
```
Don't forget to enable less secure apps to access Gmail.
You can enable it by clicking on <a href="https://myaccount.google.com/lesssecureapps?pli=1&rapt=AEjHL4N2GVSjl3kWvjbKeLhKGltd769y0XZMsuK5wQAGWxHY-tQPE36DOr9ZposEV4PSMv3xU7XjdombAkozTqL8_Aq4EYebLA">Less secure app access</a> 

To start the client in the root path run this:
<br>
`cd .\client\`
<br>
`npm install` and` npm start`
<br>
The client will be available at: `localhost:3000`
<br>

If you want to use `Postman` first of all you need to register, then login and pass the access token in Headers. 
<br>
key:` Authorization`  value:` Bearer token` 
<br>
<br>
To start the application with docker go to root path and run the command: 
<br>
`docker-compose up --build`
<hr>
This application is a personal project and is only for learning some technologies.






