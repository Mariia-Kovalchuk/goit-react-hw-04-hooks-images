import React, {Component} from 'react';
import styles from './ImageGallery.module.css';
import Searchbar from '../Searchbar';
import apiSearchService from '../apiSearchService';
import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import Button from '../Button';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

class ImageGallery extends Component{

    state = {
        searchQuery: '',
        page: 1,
        status: Status.IDLE,
        searchQueryResult: [],
        showModal: false,
        modalImgUrl: null,
        total: null,
        error: null

    }
    listRef = React.createRef()

    getSnapshotBeforeUpdate(prevProps, prevState) {
    // Are we adding new items to the list?
    // Capture the scroll position so we can adjust scroll later.
    if (prevState.searchQueryResult.length < this.state.searchQueryResult.length) {
        const list = this.listRef.current;
        return list.scrollHeight - list.scrollTop;
          };
          return null;
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevSearchQuery = prevState.searchQuery;
        const nextSearchQuery = this.state.searchQuery;

        if (prevSearchQuery !== nextSearchQuery) {
            this.setState({ status: Status.PENDING});
            this.fetchSearchQuery()
        };

        if (snapshot !== null) {
            window.scrollTo({
        top: snapshot,
        behavior: 'smooth',
      });
        };
    };

    handleFormSubmit = searchQuery => {
        this.setState({ searchQuery, page:1, searchQueryResult: [] });
    };

    fetchSearchQuery = () => {
        const { searchQuery, page } = this.state;
        apiSearchService
            .fetchSearchQuery(searchQuery, page)
            .then(searchQueryResult => {
                this.setState(prevState => ({ searchQueryResult: [...prevState.searchQueryResult, ...searchQueryResult.hits], status: Status.RESOLVED, page: prevState.page+1, total: searchQueryResult.total }))
            })
            .catch(error => this.setState({ error, status: Status.REJECTED }))
    };


    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    };
    
    handleImgURL = modalImgUrl => {
        this.setState({ modalImgUrl });
    };

    handleImgClick = event => {
        if (event.currentTarget === event.target) {
            const largeImageURL = event.target.dataset.source;
            this.handleImgURL(largeImageURL)
            this.toggleModal()
        }
          
    };



    render() {
        const { searchQueryResult, status, error, modalImgUrl, showModal, total, page } = this.state;

        return (
            <div >
                < Searchbar onSubmit={this.handleFormSubmit} />

                {status === 'pending' && <Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />}

                <div ref={this.listRef}>
                    {status === 'resolved' && searchQueryResult.length > 0 &&
                        <div >
                            <ul className={styles.ImageGallery}>
                                {searchQueryResult.map(img => (
                                    <ImageGalleryItem onClick={this.handleImgClick} key={img.id} img={img} />
                                ))}
                            </ul>

                            {total > (page - 1) * 12 && (<Button onClick={this.fetchSearchQuery} />)}
               
                            {showModal && <Modal onClose={this.toggleModal} url={modalImgUrl} />}

                        </div>}
                </div>
                
                {status === 'resolved' && !searchQueryResult.length &&
                    <p className={styles.ErrorQuery}>No match found. Please check your query!</p>}
                
                {status === 'rejected' && <p className={styles.ErrorQuery}>{error.message}</p>}
                           

            </div>
            
        );
        
    };
}

export default ImageGallery;