import style from './Button.module.css';
import PropTypes from 'prop-types';


const Button = ({ onClick }) => {
    return (
        <button type="button" className={style.Button} onClick={onClick} > Load More
        </button>
        
    );
}

export default Button

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
}