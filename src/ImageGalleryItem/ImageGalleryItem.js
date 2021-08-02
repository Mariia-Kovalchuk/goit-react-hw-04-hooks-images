import style from './ImageGalleryItem.module.css'
import PropTypes from 'prop-types';



export default function ImageGalleryItem({ img: { webformatURL, largeImageURL }, onClick}) {
  return (
   <li className={style.ImageGalleryItem}>
  <img src={webformatURL} alt="" className={style.ImageGalleryItemImage} onClick={onClick} data-source={largeImageURL} />
</li>
  );
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  img: PropTypes.object.isRequired
  
}