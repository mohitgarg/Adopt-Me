import React from "react";
import SearchBox from "./SearchBox";
import { navigate, RouteComponentProps } from "@reach/router";

class SearchParams extends React.Component<RouteComponentProps> {
  public handleSubmitNavigate() {
    navigate("/");
  }
  public render() {
    return (
      <div className={"search-route"}>
        <SearchBox search={this.handleSubmitNavigate} />
      </div>
    );
  }
}

export default SearchParams;
