import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({imageValue, backdropClick}) => {

  useEffect(() => {
  const handleKeydown = e => {
    if (e.code === 'Escape') {
        backdropClick()
      }
    }

    window.addEventListener('keydown', handleKeydown)
    
    return () => {
    window.removeEventListener('keydown', handleKeydown)
    }
}, [backdropClick])
  

  return (
    <Overlay onClick={() => backdropClick()}>
    <ModalWindow>
        <img src={imageValue} alt="img" />
    </ModalWindow>
    </Overlay> 
        )
    }