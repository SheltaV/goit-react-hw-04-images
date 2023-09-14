import PropTypes from 'prop-types';

import { Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({src, onClick}) => {
    return ( 
  <Image src={src} alt="image" onClick={(evt) => onClick(evt)} />
    )
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired
}