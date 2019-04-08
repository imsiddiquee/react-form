import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "./../services/fakeGenreService";
import { getMovie } from "../services/fakeMovieService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: ""
    },
    genres: [],
    errors: {}
  };

  schema = {
    title: Joi.string()
      .required()
      .label("Movie Title"),
    genreId: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.string()
      .required()
      .label("Number In Stock"),
    dailyRentalRate: Joi.string()
      .required()
      .label("Daily Rental Rate")
  };

  doSubmit = () => {
    console.log("Submitted-");
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres: genres });

    const movieId = this.props.match.params.id;
    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  render() {
    return (
      <div>
        <h1>Movie Form</h1>

        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Movie Title")}

          <div className="form-group clikable">
            <label htmlFor="genreId">Genre</label>
            <select
              name="genreId"
              className="custom-select"
              id="genreId"
              onChange={this.handleChange}
              value={this.state.data.genreId}
            >
              <option value="" />
              {this.state.genres.map(genre => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))}
            </select>
            {/* {error && <div className="alert alert-danger">{error}</div>} */}
          </div>
          {this.renderInput("numberInStock", "Number In Stock", "number")}
          {this.renderInput("dailyRentalRate", "Daily Rental Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
