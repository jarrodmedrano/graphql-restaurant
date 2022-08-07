import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema, assertInputType } from "graphql";

// Construct a schema, using GraphQL schema language
var restaurants = [
  {
    id: 1,
    name: "WoodsHill ",
    description:
      "American cuisine, farm to table, with fresh produce every day",
    dishes: [
      {
        name: "Swordfish grill",
        price: 27,
      },
      {
        name: "Roasted Broccily ",
        price: 11,
      },
    ],
  },
  {
    id: 2,
    name: "Fiorellas",
    description:
      "Italian-American home cooked food with fresh pasta and sauces",
    dishes: [
      {
        name: "Flatbread",
        price: 14,
      },
      {
        name: "Carbonara",
        price: 18,
      },
      {
        name: "Spaghetti",
        price: 19,
      },
    ],
  },
  {
    id: 3,
    name: "Karma",
    description:
      "Malaysian-Chinese-Japanese fusion, with great bar and bartenders",
    dishes: [
      {
        name: "Dragon Roll",
        price: 12,
      },
      {
        name: "Pancake roll ",
        price: 11,
      },
      {
        name: "Cod cakes",
        price: 13,
      },
    ],
  },
];
var schema = buildSchema(`
type Query{
  restaurant(id: Int): restaurant
  restaurants: [restaurant]
},
type restaurant {
  id: Int
  name: String
  description: String
  dishes:[Dish]
}
type Dish{
  name: String
  price: Int
}
input restaurantInput{
  name: String
  description: String
}
type DeleteResponse{
  ok: Boolean!
}
type Mutation{
  setrestaurant(input: restaurantInput): restaurant
  deleterestaurant(id: Int!): DeleteResponse
  editrestaurant(id: Int!, input: restaurantInput!): restaurant
}
`);
// The root provides a resolver function for each API endpoint

var root = {
  restaurant: (arg) => restaurants[arg.id],
  restaurants: () => restaurants,
  setrestaurant: ({ input }) => {
    restaurants.push({ name: input.name, description: input.description });
    return restaurants;
  },
  deleterestaurant: ({ id }) => {
    const ok = Boolean(restaurants[id]);
    if (!restaurants[id]) {
      throw new Error("restaurant doesn't exist");
    } else {
      restaurants = restaurants.filter((item) => item.id !== id);
    }
    return { ok };
  },
  editrestaurant: ({ id, input }) => {
    restaurants.map((restaurant) => {
      if (restaurant.id === id) {
        restaurant.name = input.name;
        restaurant.description = input.description;
        return restaurant;
      }
    });
    return restaurants.filter((restaurant) => restaurant.id === id)[0];
  },
};
var app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
var port = 5500;
app.listen(5500, () => console.log("Running Graphql on Port:" + port));

export default root;
