import React, { Component } from "react";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaSearch } from "react-icons/fa";

export default class SearchBar extends Component {
  state = { inputValue: "" };

  handleNameChange = (event) => {
    this.setState({ inputValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.inputValue.trim() === "") {
      return toast.warning("Write something");
    }
    this.props.onSubmit(this.state.inputValue);


    this.setState({ inputValue: "" });
  };

  render() {
    return (
      <div className="Searchbar">
        <form className="SearchForm" action="" onSubmit={this.handleSubmit}>
          <input
            className="SearchForm-input"
            type="text"
            name="inputValue"
            value={this.state.inputValue}
            onChange={this.handleNameChange}
            placeholder="Search images and photos"
          />
          <button className="SearchForm-button" type="submit">
            <FaSearch size="2em" />
          </button>
        </form>
      </div>
    );
  }
}
