import React, { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ smallImage, largeImage, tags }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  };

  return (
    <>
      <li className="ImageGalleryItem" onClick={toggleModal}>
        <img className="ImageGalleryItem-image" src={smallImage} alt={tags} />
      </li>
      {modalIsOpen && (
        <Modal closeModal={toggleModal}>
          <img src={largeImage} alt={tags} />
          <p className="tags">{tags}</p>
        </Modal>
      )}
    </>
  );
};

export default ImageGalleryItem;
