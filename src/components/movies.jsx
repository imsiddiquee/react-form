import React, { Component } from "react";
import { Link } from "react-router-dom";

import { getMovies } from "./../services/fakeMovieService";

import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";

import { getGenres } from "./../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(item => item._id !== movie._id);
    this.setState({ movies: movies });
  };
  handleLiked = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn: sortColumn });
  };

  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn
    } = this.state;

    let filtered = allMovies;

    if (searchQuery) {
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  handleSearchOnChange = e => {
    this.setState({
      searchQuery: e.currentTarget.value,
      selectedGenre: null,
      currentPage: 1
    });
  };

  render() {
    const {
      currentPage,
      pageSize,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    if (this.state.movies.length === 0)
      return <p>There are no movies in database.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            <ListGroup
              items={genres}
              selectedGenre={selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <Link to="/movieform/new" className="btn btn-primary">
              New Movies
            </Link>
            <p>Showing {totalCount} movies in database</p>

            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
                onChange={this.handleSearchOnChange}
              />
            </div>

            <MovieTable
              movies={data}
              sortColumn={sortColumn}
              onLiked={this.handleLiked}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />

            <Pagination
              itemCounts={totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
