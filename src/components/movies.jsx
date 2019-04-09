import React, { Component } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { getMovies, deleteMovie } from "./../services/movieService";

import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";

import { getGenres } from "../services/genreService";
import ListGroup from "./common/listGroup";
import MovieTable from "./moviesTable";
import _ from "lodash";
import SearchBox from "./common/searchbox";

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

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies: movies, genres: genres });
  }

  handleDelete = async movie => {
    const origialMovies = this.state.movies;

    const movies = origialMovies.filter(item => item._id !== movie._id);
    this.setState({ movies: movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This post has already been deleted.");

        this.setState({ movies: origialMovies });
      }
    }
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

  handleTextChange = query => {
    this.setState({
      searchQuery: query,
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
      searchQuery,
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

            <SearchBox
              value={searchQuery}
              onTextChange={this.handleTextChange}
            />

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
