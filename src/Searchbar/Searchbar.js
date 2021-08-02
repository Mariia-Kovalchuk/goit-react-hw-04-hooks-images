import { useState } from 'react';
import styles from './Searchbar.module.css';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import PropTypes from 'prop-types';



function Searchbar({onSubmit}) {
    
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchQueryChange = event => {
        setSearchQuery(event.currentTarget.value.toLowerCase())
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (searchQuery.trim() === '') {
            error({
                text: "Please enter your search query!",
                delay: 2000,
            });
            return
        };

        onSubmit(searchQuery);
        setSearchQuery('')
        
    };

    return (
        <header className={styles.Searchbar}>
            <form className={styles.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={styles.SearchFormButton}>
                    <span className={styles.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={styles.SearchFormInput}
                    type="text"
                    placeholder="Search images and photos"
                    onChange={handleSearchQueryChange}
                    value={searchQuery}
                />
            </form>
        </header>
    );
}

export default Searchbar;

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}