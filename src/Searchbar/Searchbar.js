import { Component } from 'react';
import styles from './Searchbar.module.css';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import PropTypes from 'prop-types';



class Searchbar extends Component{
    state = {
        searchQuery: ''
        
    };

    handleSearchQueryChange = event => {
        this.setState({ searchQuery: event.currentTarget.value.toLowerCase()})
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.searchQuery.trim() === '') {
            error({
                  text: "Please enter your search query!",
                  delay: 2000,
              });
              return
        };

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });


    }

    render() {
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.SearchFormButton}>
                        <span className={styles.SearchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={styles.SearchFormInput}
                        type="text"
                        placeholder="Search images and photos"
                        onChange={this.handleSearchQueryChange}
                        value={this.state.searchQuery}
                    />
                </form>
            </header>
        );
    }
}

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}