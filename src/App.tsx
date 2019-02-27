// to declare global variables coming in from the scripts you can define them
// like (global variableName) to stop eslint from throwing an error

import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import pf from "petfinder-client";
import { Provider } from "./SearchContext";
import Results from "./Results";
import Details from "./Details";
import SearchParams from "./SearchParams";
import Navbar from "./Navbar";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API Key or Secret Exist");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
interface State {
  location: string;
  animal: string;
  breed: string;
  breeds: string[];
  handleAnimalChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleBreedChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleLocationChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getBreeds: () => void;
}

class App extends React.Component<{},State> {
  constructor(props:{}) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  public handleLocationChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      location: event.target.value
    });
  };

  public handleAnimalChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(
      {
        animal: event.target.value,
        breed: ""
      },
      this.getBreeds
    );
  };

  public handleBreedChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      breed: event.target.value
    });
  };

  public getBreeds() {
    if (this.state.animal) {
      petfinder.breed.list({ animal: this.state.animal }).then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({ breeds: data.petfinder.breeds.breed });
        } else {
          this.setState({ breeds: [] });
        }
      });
    } else {
      this.setState({ breeds: [] });
    }
  }
  public render() {
    return (
      <div>
        <Navbar />
        <Provider value={this.state}>
          <Router>
            <Results path={"/"} />
            <Details path={"/details/:id"} />
            <SearchParams path={"/search-params"} />
          </Router>
        </Provider>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
