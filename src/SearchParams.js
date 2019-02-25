import React from "react";
import SearchBox from "./SearchBox";
import { navigate } from "@reach/router";

class SearchParams extends React.Component {
  handleSubmitNavigate() {
    navigate("/");
  }
  render() {
    return (
      <div className={"search-route"}>
        <SearchBox search={this.handleSubmitNavigate} />
      </div>
    );
  }
}

export default SearchParams;
