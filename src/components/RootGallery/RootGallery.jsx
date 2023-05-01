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

// export class RootGallery extends Component {
//   state = {
//     searchQuerry: '',
//     page: 1,
//     images: [],
//     totalHits: 0,
//     largeImageURL: '',
//     showModal: false,
//     isLoader: false,
//     error: '',
//   };

//   componentDidUpdate(_, prevState) {
//     const { searchQuerry, page } = this.state;
//     if (searchQuerry !== prevState.searchQuerry || page !== prevState.page) {
//       this.fetchImages();
//     }
//   }

//   async fetchImages() {
//     const { searchQuerry, page } = this.state;

//     this.setState({ isLoader: true, error: '' });

//     try {
//       const { hits, totalHits } = await FetchData(searchQuerry, page);

//       if (!totalHits) {
//         return alert('No images found');
//       }
// const images = hits.map(({ id, webformatURL, largeImageURL }) => ({
//   id,
//   webformatURL,
//   largeImageURL,
// }));
// this.setState(prev => {
//   return {
//     images: [...prev.images, ...images],
//     totalHits,
//   };
// });
// } catch (error) {
//       this.setState({
//         error: 'Something went worng. Please reload the webpage!',
//       });
//     } finally {
//       this.setState({ isLoader: false });
//     }
//   }

//   loadMore = () => {
//     this.setState(prev => ({
//       page: prev.page + 1,
//     }));
//   };

//   toggleModal = (largeImageURL = '') => {
//     this.setState(({ showModal }) => {
//       return { showModal: !showModal, largeImageURL };
//     });
//   };

//   handleSubmit = querry => {
//     this.setState({ searchQuerry: querry, page: 1, images: [], totalHits: 0 });
//   };

//   render() {
//     const { images, totalHits, isLoader, showModal, largeImageURL, error } =
//       this.state;

// return (
//   <>
//     <SearchBar handleSubmit={this.handleSubmit} />

//     <Wrapper>
//       {images.length !== 0 && (
//         <ImageGallery
//           handleClickOnImage={this.toggleModal}
//           images={images}
//         />
//       )}

//       {isLoader && <Loader />}

//       {showModal && (
//         <Modal
//           largeImageURL={largeImageURL}
//           toggleModal={this.toggleModal}
//         />
//       )}
//       {error && <div>{error}</div>}
//       {totalHits !== images.length && !isLoader && (
//         <Button title="LoadMore" handleLoadMoreBtn={this.loadMore} />
//       )}
//     </Wrapper>
//   </>
// );
//   }
// }
