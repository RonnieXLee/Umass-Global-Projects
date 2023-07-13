import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import DogList from "./DogList";
import FilterDogDetails from "./FilterDogDetails";

import whiskey from "./images/whiskey.jpg";
import tubby from "./images/tubby.jpg";
import duke from "./images/duke.jpg";
import perry from "./images/perry.jpg";

function App({ dogs }) {
  return (
    <div>
      <BrowserRouter>
        <NavBar dogs={dogs} />
        <div className="container">
          <Routes>
            <Route path="/dogs" element={<DogList dogs={dogs} />} />
            <Route path="/dogs/:name" element={<FilterDogDetails dogs={dogs} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export const dogs = [
  {
    name: "Whiskey",
    age: 6,
    src: whiskey,
    facts: [
      "Whiskey loves playing fetch.",
      "Whiskey can do tricks like roll over and shake hands.",
      "Whiskey enjoys long walks in the park."
    ]
  },
  {
    name: "Duke",
    age: 4,
    src: duke,
    facts: [
      "Duke is an excellent swimmer.",
      "Duke knows how to sit, stay, and lie down on command.",
      "Duke is always up for a game of frisbee."
    ]
  },
  {
    name: "Perry",
    age: 6,
    src: perry,
    facts: [
      "Perry loves to chase squirrels.",
      "Perry is very friendly with other dogs at the dog park.",
      "Perry enjoys sunbathing in the backyard."
    ]
  },
  {
    name: "Tubby",
    age: 3,
    src: tubby,
    facts: [
      "Tubby is a great snuggler.",
      "Tubby loves to learn new tricks and commands.",
      "Tubby is always excited for treat time."
    ]
  }
];

App.defaultProps = { dogs };

export default App;
