// backend.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import {addUser, getUsers, findUserById, findUserByName, findUserByJob, removeUser } from "./services/user-service.js";

dotenv.config();


const { MONGO_CONNECTION_STRING } = process.env;

mongoose.set("debug",true);
mongoose
  .connect(MONGO_CONNECTION_STRING + "users")
  .catch((error) => console.log(error));

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

// const findUserByName = (name) => {
//   return users["users_list"].filter((user) => user["name"] === name);
// };

// const findUserByNameAndJob = (name,job) => {
//   return users["users_list"].filter((user) => user["job"] === job).filter((user) => user["name"] === name);//user["name"] === name || 
// };

// const findUserById = (id) =>
//   users["users_list"].find((user) => user["id"] === id);

// const addUser = (user) => {
//   user.id = String.fromCharCode(Math.random()*27 + 97) + String.fromCharCode(Math.random()*27 + 97) + String.fromCharCode(Math.random()*27 + 97) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10) + Math.floor(Math.random()*10);
//   users["users_list"].push(user);
//   return user;
// };

// const removeUser = (user) => {  
//   for(let i = 0; i < users["users_list"].length; i++){
//     if(user.id == users["users_list"][i].id){
//       users["users_list"].splice(i, 1);
//       break;
//     }
//   }
// };

app.use(cors());
app.use(express.json());


app.get("/",(req,res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  // res.send(users);
  const name = req.query.name;
  const job = req.query.job;
  const id = req.query._id;

  getUsers(name,job,_id).then((result) => res.send(result)).catch((err) => res.status(err).send());

  // if (name != undefined){
  //   if(job != undefined){
  //     let result = findUserByNameAndJob(name,job);
  //     result = { users_list: result };
  //     res.send(result);
  //   }
  //   else{
  //     let result = findUserByName(name);
  //     result = { users_list: result };
  //     res.send(result);
  //   }
  // }
  // else{
  //   res.send(users);
  // }

});

app.post("/users", (req,res) => {
  const userToAdd = req.body;
  addUser(userToAdd).then((result) => res.send(result)).catch((err) => res.status(err).send());
  // res.status(201).send("User successfully inserted");
});

app.delete("/users", (req,res) => {
  const userToRemove = req.body;
  removeUser(userToRemove).then((result) => res.send(result)).catch((err) => res.status(err).send());
  // res.send();
});

app.get("/users/:_id", (req, res) => {
  const id = req.params["_id"];
  findUserById(id).then((result) => res.send(result)).catch((err) => res.status(err).send());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});