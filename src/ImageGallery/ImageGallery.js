import React, {useState, useEffect} from 'react';
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

function ImageGallery() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState(Status.IDLE);
    const [searchQueryResult, setSearchQueryResult] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [modalImgUrl, setModalImgUrl] = useState(null);
    const [total, setTotal] = useState(null);
    const [error, setError] = useState(null);



    useEffect(() => {
        if (!searchQuery) {
            return;
        };
        
        const fetchSearchQuery = () => {
            apiSearchService
                .fetchSearchQuery(searchQuery, page)
                .then(searchQueryResult => {
                    setSearchQueryResult(prevState => [...prevState, ...searchQueryResult.hits]);
                    setStatus(Status.RESOLVED);
                    setTotal(searchQueryResult.total);
                })
                .catch(error => {
                    setError(error);
                    setStatus(Status.REJECTED);
                })
                .finally(() => window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                }));
            
        };

        fetchSearchQuery();
        setStatus(Status.PENDING);

    }, [searchQuery,page]);    



    const handleFormSubmit = searchQuery => {
        setSearchQuery(searchQuery);
        setPage(1);
        setSearchQueryResult([]);
    };    

    const toggleModal = () => {
        setShowModal(!showModal);
    };
    
    const handleImgURL = modalImgUrl => {
        setModalImgUrl(modalImgUrl)
    };

    const handleImgClick = event => {
        if (event.currentTarget === event.target) {
            const largeImageURL = event.target.dataset.source;
            handleImgURL(largeImageURL);
            toggleModal();
        };
          
    };
    
      const onLoadMore = () => {
          setPage((prevState) => prevState + 1);
  };
    
    return (
            <div >
                < Searchbar onSubmit={handleFormSubmit} />

                {status === 'pending' && <Loader className={styles.Loader} type="Circles" color="#3f51b5" height={100} width={100} timeout={5000} />}

                <div >
                    {status === 'resolved' && searchQueryResult.length > 0 &&
                        <div >
                            <ul className={styles.ImageGallery}>
                                {searchQueryResult.map(img => (
                                    <ImageGalleryItem onClick={handleImgClick} key={img.id} img={img} />
                                ))}
                            </ul>

                            {total > (page - 1) * 12 && (<Button onClick={onLoadMore} />)}
               
                            {showModal && <Modal onClose={toggleModal} url={modalImgUrl} />}

                        </div>}
                </div>
                
                {status === 'resolved' && !searchQueryResult.length &&
                    <p className={styles.ErrorQuery}>No match found. Please check your query!</p>}
                
                {status === 'rejected' && <p className={styles.ErrorQuery}>{error.message}</p>}
                           

            </div>
            
        );
        
};



export default ImageGallery;