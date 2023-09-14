import { useEffect } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export const Modal = ({imageValue, backdropClick, toggleModal}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown)
    
    return () => {
    window.removeEventListener('keydown', handleKeydown)
    }
}, [])
  
const handleKeydown = e => {
    if (e.code === 'Escape') {
        backdropClick()
      }
  }
  
  
  return (
    <Overlay onClick={() => backdropClick()}>
    <ModalWindow>
        <img src={imageValue} alt="img" />
    </ModalWindow>
    </Overlay> 
        )
    }