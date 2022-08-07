## Sample Queries:

```

query getrestaurant($iid: Int = 1) {
  restaurant(id: $iid) {
    name
    description
  }
}

query getrestaurants {
  restaurants {
    name
    description
  }
}

mutation deleterestaurant($iid: Int = 1) {
  deleterestaurant(id: $iid) {
    ok
  }
}

mutation setrestaurant($iinput: restaurantInput = {name: "Guy Fieri's Tequila Cocina", description: "Guy Fieri’s Tequila Cocina will be open daily for lunch and dinner, offering a menu with delicious interpretations of Latin street food with a focus on rich and bold flavors that put a unique twist on traditional dishes."}) {
  setrestaurant(input: $iinput) {
    name
    description
  }
}

mutation editrestaurant($iid: Int = 2, $iinput: restaurantInput = {name: "Trejo's Tacos", description: "Hollywood’s baddest good guy shares 75 recipes that make Trejo’s Tacos the Los Angeles go-to for award-winning tacos, donuts, and more."}) {
  editrestaurant(id: $iid, input: $iinput) {
    name
  }
}


```
