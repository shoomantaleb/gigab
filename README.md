# GigaB: Boost fitness motivation and community engagement. 


<img width="844" alt="New GigaB image" src="https://github.com/shoomantaleb/gigab/assets/129248303/c1f9b9e0-2ed7-4be5-9ff0-12426b6020e2">

GigaB is a workout web app powered by Firebase, ReactJS, and Node.js. Seamlessly track workouts, connect with friends, and stay motivated.


# Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Authors](#authors)

 <a name="features">  </a> 
### Features
- Exercise Tracking: This app allows users to build a workout plan by tracking various exercises and the sets, reps, and weight completed. Exercises are tracked via a calendar where the user can look at past completed workouts and plan future workouts.
- Exercise Suggestions: When naming an exercise users are automatically prompted with various common exercises. By selecting the exercise bank users can see common exercises, what muscles they target, and a live image and description of how to do the exercise.
- Timer: Workouts page has a built in timer for rest time between workouts
- Friends and Leaderboard: Users can search for and follow friends via the friends page. Friends can view each others streak, which measures how many consecutive days one has logged exercises, via a leaderboard.
- Weight Graph: On the profile page we've implemented a graph that allows users to track their weight across time. 

<a name="technologies"> </a>
###  Technologies 
- Javascript <img src="https://github.com/shoomantaleb/gigab/assets/129248303/e815d6f9-d9c0-4223-b33d-acceb414d34c" alt= "Javscript Logo" width = "25">

- Node.js <img src="https://github.com/shoomantaleb/gigab/assets/129248303/9c731510-06d7-4987-b02d-b924584687bd" alt = "NodeJS Logo" width = "25">

  
- React.js <img src="https://github.com/shoomantaleb/gigab/assets/129248303/3b3d63ae-2e7a-4aa2-a364-885aca6c1a6b" alt = "React Logo" width ="25">

- Firebase <img src="https://github.com/shoomantaleb/gigab/assets/129248303/6b8a12d7-b5f9-48a8-867c-87039099c035" alt="Firebase Logo" width="25">

 <a name="setup"> </a> 
### Setup
In order to run a local instance of GigaB, first clone or download a copy of this repository. 

```shell
 git clone https://github.com/shoomantaleb/gigab.git
```

To set up the necessary dependencies run the following in a bash shell: 

```shell
 cd gigab
 npm install
```
Running:
```shell
chmod +x run.sh
./run.sh
```
This will prompt you to enter the api key, type the api key and press enter

The application will be available on http://localhost:3000, which should appear in your browser automatically.

 <a name="authors">  </a> 
### Authors

GigaB was made as a project for CS 35L taught by Professor Paul Eggert at UCLA in Winter 2024. Made by: Caleb Lee, Cheryl Lim, Justin Nguyen, Omar Taleb, Shaun Staudinger, & Zachary Fischer,   



