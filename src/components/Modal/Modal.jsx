import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { ModalWindow, Overlay } from './Modal.Styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ largeImageURL, toggleModal }) => {
  useEffect(() => {
    const handlePressOnEsc = event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handlePressOnEsc);
    return () => {
      window.removeEventListener('keydown', handlePressOnEsc);
    };
  }, [toggleModal]);

  const handleClickOnOverlay = event => {
    if (event.currentTarget === event.target) {
      toggleModal();
    }
  };
  return createPortal(
    <Overlay onClick={handleClickOnOverlay}>
      <ModalWindow>
        <img src={largeImageURL} alt="#" />
      </ModalWindow>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handlePressOnEsc);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handlePressOnEsc);
//   }

//   handlePressOnEsc = event => {
//     if (event.code === 'Escape') {
//       this.props.toggleModal();
//     }
//   };

//   handleClickOnOverlay = event => {
//     if (event.currentTarget === event.target) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
// return createPortal(
//   <Overlay onClick={this.handleClickOnOverlay}>
//     <ModalWindow>
//       <img src={this.props.largeImageURL} alt="#" />
//     </ModalWindow>
//   </Overlay>,
//   modalRoot
// );
//   }
// }
