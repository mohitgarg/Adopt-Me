import React from "react";
import { ANIMALS } from "petfinder-client";
import { Consumer } from "./SearchContext";

interface Props {
  search: () => void
}

class SearchBox extends React.Component<Props> {
 // public handleFormSubmit = (event:React.ChangeEvent<HTMLInputElement>) => {
 //    event.preventDefault();
 //    this.props.search();
 //  };
 public render() {
   return (
      <Consumer>
        {context => (
          <div className="search-params">
            <form>
              <label htmlFor="location">
                <input
                  onChange={context.handleLocationChange}
                  id="location"
                  value={context.location}
                  placeholder="Location"
                />
              </label>
              <label htmlFor="animal">
                Animal
                <select
                  id="animal"
                  value={context.animal}
                  onChange={context.handleAnimalChange}
                  onBlur={context.handleAnimalChange}
                >
                  <option />
                  {ANIMALS.map(animal => (
                    <option key={animal} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor={"breed"}>
                Breed
                <select
                  id={"breed"}
                  value={context.breed}
                  onChange={context.handleBreedChange}
                  onBlur={context.handleBreedChange}
                  disabled={!context.breeds.length}
                >
                  <option />
                  {context.breeds.map(breed => (
                    <option key={breed} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={this.props.search}>Submit</button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default SearchBox;
