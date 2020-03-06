import express from "express";
import graphqlHTTP from "express-graphql";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is amazeballs!");
});

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
