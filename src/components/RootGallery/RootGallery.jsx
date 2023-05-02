import { useEffect, useState } from 'react';

import { Wrapper } from './RootGallery.styled';

import { SearchBar } from 'components/SearchBar';
import { ImageGallery } from 'components/ImageGallery';
import { Modal } from 'components/Modal';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { FetchData } from 'api';

export const RootGallery = () => {
  const [searchQuerry, setSearchQuerry] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchQuerry) return;

    setIsLoader(true);
    setError('');
    const getData = async () => {
      try {
        const { hits, totalHits } = await FetchData(searchQuerry, page);
        if (!totalHits) {
          return alert('No images found');
        }
        const images = hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        setImages(prev => [...prev, ...images]);
        setTotalHits(totalHits);
      } catch (error) {
        setError('Something went worng. Please reload the webpage!');
      } finally {
        setIsLoader(false);
      }
    };
    getData();
  }, [searchQuerry, page]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };
  const toggleModal = (largeImageURL = '') => {
    setLargeImageURL(largeImageURL);
    setShowModal(!showModal);
  };

  const handleSubmit = querry => {
    setSearchQuerry(querry);
    setPage(1);
    setImages([]);
    setTotalHits(0);
  };

  return (
    <>
      <SearchBar handleOnSubmit={handleSubmit} />

      <Wrapper>
        {images.length !== 0 && (
          <ImageGallery handleClickOnImage={toggleModal} images={images} />
        )}

        {isLoader && <Loader />}

        {showModal && (
          <Modal largeImageURL={largeImageURL} toggleModal={toggleModal} />
        )}
        {error && <div>{error}</div>}
        {totalHits !== images.length && !isLoader && (
          <Button title="LoadMore" handleLoadMoreBtn={loadMore} />
        )}
      </Wrapper>
    </>
  );
};
