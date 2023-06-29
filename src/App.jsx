import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react';

import ImageError from 'components/ImageError/ImageError';
import Notification from 'components/Notification/Notification';
import API from 'components/api/api';
import ButtonLoadMore from 'components/ButtonLoadMore/ButtonLoadMore';
import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import SearchBar from 'components/SearchBar/SearchBar';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [isLoading, setIsLoading] = useState(true);
  const [loadBtnIsShown, setLoadBtnIsShown] = useState(false);
  // const [totalResults, setTotalResults] = useState(0);

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const getRemainingPages = totalImages => {
    return Math.ceil(totalImages / API.perPage) - page;
  };

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);
      setLoadBtnIsShown(false);

      try {
        const images = await API.fetchImages(inputValue, page);

        const remainingPages = getRemainingPages(images.totalHits);
        if (remainingPages > 0) setLoadBtnIsShown(true);

        if (images.hits.length === 0) {
          setStatus('empty');
        } else {
          setImages(prevImages => [...prevImages, ...images.hits]);
          setStatus('resolved');
          // setTotalResults(images.totalHits);
        }
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }

      setIsLoading(false);
    };

    if (inputValue !== '' && (page !== 1 || images.length === 0)) {
      fetchImages();
    }
  }, [inputValue, page, images.length]);

  // const getRemainingPages = totalImages => {
  //   return Math.ceil(totalImages / API.perPage) - page;
  // };

  return (
    <div>
      <SearchBar onSubmit={handleFormSubmit} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        theme="colored"
      />

      {status === 'empty' && (
        <Notification
          notification={
            'There are no images found for your request. Please try again'
          }
        />
      )}

      {status === 'idle' && <h1>Please, enter your request</h1>}

      {status === 'rejected' && <ImageError message={error.message} />}

      {status === 'resolved' && (
        <ImageGalleryList images={images} isLoading={isLoading} />
      )}
      {loadBtnIsShown && <ButtonLoadMore onClick={loadMore} />}
    </div>
  );
}
