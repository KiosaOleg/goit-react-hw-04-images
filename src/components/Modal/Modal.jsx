import { Component } from 'react';
import { createPortal } from 'react-dom';
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') this.props.closeModal();
  };

  handleBackdrop = event => {
    if (event.target === event.currentTarget) this.props.closeModal();
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleBackdrop}>
        <div className="Modal">{children}</div>
      </div>,
      modalRoot
    );
  }
}
