import React, { Component } from "react";
import pf, { PetResponse, PetMedia } from "petfinder-client";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { RouteComponentProps, navigate } from "@reach/router";

if (!process.env.API_KEY || !process.env.API_SECRET) {
  throw new Error("No API Key or Secret Exist");
}

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Details extends Component<RouteComponentProps<{ id: string }>> {
  public state = {
    loading: true,
    showModal: false,
    name: "",
    animal: "",
    location: "",
    description: "",
    media: {} as PetMedia,
    breed: ""
  };

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });
  public componentDidMount() {
    if (this.props.id) {
      petfinder.pet
        .get({
          output: "full",
          id: this.props.id
        })
        .then((data: PetResponse) => {
          if (!data.petfinder.pet) {
            navigate("/");
            return;
          }
          let breed;
          if (Array.isArray(data.petfinder.pet.breeds.breed)) {
            breed = data.petfinder.pet.breeds.breed.join(", ");
          } else {
            breed = data.petfinder.pet.breeds.breed;
          }
          this.setState({
            name: data.petfinder.pet.name,
            animal: data.petfinder.pet.animal,
            location: `${data.petfinder.pet.contact.city}, ${
              data.petfinder.pet.contact.state
            }`,
            description: data.petfinder.pet.description,
            media: data.petfinder.pet.media,
            breed,
            loading: false
          });
        })
        .catch(err => this.setState({ error: err }));
    }
  }

  public render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>;
    }

    const {
      animal,
      breed,
      location,
      description,
      media,
      showModal
    } = this.state;

    return (
      <div className="details">
        <div>
          <Carousel media={media} />
          <h1>{name}</h1>
          <h2>{`${animal} — ${breed} — ${location}`}</h2>
          <button onClick={this.toggleModal}>{`Adopt ${name}`}</button>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <h1>Would you like to adopt {name} ? </h1>
              <div className={"buttons"}>
                <button onClick={this.toggleModal}>Yes</button>
                <button onClick={this.toggleModal}>Hell YES!</button>
              </div>
              <small>(This is an experimental feature)</small>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Details;
