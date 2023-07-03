import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageError from 'components/ImageError/ImageError';
import Notification from 'components/Notification/Notification';
import API from 'components/api/api';
import ButtonLoadMore from 'components/ButtonLoadMore/ButtonLoadMore';
import ImageGalleryList from 'components/ImageGalleryList/ImageGalleryList';
import SearchBar from 'components/SearchBar/SearchBar';
import { useState, useEffect } from 'react';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [error] = useState(null);
  const [status, setStatus] = useState('idle');
  const [loadBtnIsShown, setLoadBtnIsShown] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setStatus('pending');

    const fetchImages = async () => {
      try {
        const results = await API.fetchImages(inputValue, page);

        if (results.hits.length === 0) {
          setStatus('empty');
          return;
        }

        setImages(prevImages => [...prevImages, ...results.hits]);
        const remainingPages =
          Math.ceil(results.totalHits / API.perPage) - page;

        if (remainingPages > 0) {
          setLoadBtnIsShown(true);
        } else {
          setLoadBtnIsShown(false);
        }
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        toast.error('Oops... Something went wrong');
      }
    };

    fetchImages();
  }, [inputValue, page]);

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

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

      <ImageGalleryList images={images} isLoading={status === 'pending'} />
      {loadBtnIsShown && <ButtonLoadMore onClick={loadMore} />}
    </div>
  );
}
