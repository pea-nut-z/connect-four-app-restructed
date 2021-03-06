## A Connect Four browser game app

[Link to app](https://peanutz-connect-four.herokuapp.com/)

### Context

This app uses React hooks and WebSockets. It authenticates the user, tracks wins and number of games you have played. It offers the options of playing in single or multiplayer mode.  
In single player mode, you are playing against Peanutbot (AI player). In multiplayer mode, a game starts when two players are connected. The third player connected to multiplayer mode will get an alert that the server is full but they can play in single player mode.

### To get started

You can either sign up for an account or use a pre-existing account below for a test drive. Pre-existing accounts may have been used by others so the scores may not start from zero.

```
Email: test1@gmail.com
Email: test2@gmail.com
Email: test3@gmail.com

Password for all accounts : 123456
```

### Potential future features

1. User experience - add a link to redirect the user to login page after they reset their password on a different window
2. Chat

### Road blocks

The coverage report for functional tests does not have source mapping because tests are ran using the build of React app.
