import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazeballs!");
});

class Friend {
  constructor(id, { firstName, lastName, gender, language, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.language = language;
    this.email = email;
  }
}

const friendDatabase = {};

/*
mutation {
  createFriend(input:{
    firstName:"Scott"
    lastName:"Bromander"
    gender:"Male"
    email:"Scottbromander@gmail.com"
  }){
    id
    firstName
  }
}
*/

const root = {
  friend: () => {
    return {
      id: 123412,
      firstName: "Scott",
      lastName: "Bromander",
      gender: "Male",
      language: "English",
      email: "me@me.com"
    };
  },
  createFriend: ({ input }) => {
    let id = require("crypto")
      .randomBytes(10)
      .toString("hex");
    friendDatabase[id] = input;
    return new Friend(id, input);
  }
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(8080, () => {
  console.log("Running on Port 8080!");
});
