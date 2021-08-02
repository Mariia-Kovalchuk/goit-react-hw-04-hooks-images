import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
      return createPortal(
          <div className={style.Overlay} onClick={this.handleBackdropClick}>
              <div className={style.Modal}>
                  <img className={style.Img} src={this.props.url} alt=""  />
              </div>
          </div>,
          modalRoot,
      );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired

}


