import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from "./GlobalStyle";

import { fetchImages } from "../services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadButton } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    async function getImages() {
      if (!query) {
        return;
      }
      try {
        setLoading(true);
        const { hits, totalHits } = await fetchImages(query, page);
        if (totalHits === 0) {
          setShowButton(false)
          return toast.error('Cannot find any image!');
        }
        if (page === Math.ceil(totalHits / 12)) {
          setShowButton(false)
          toast.success('You reached the end of searched list');
        }
        setImages([...images, ...hits])
      }
      catch (err) {
        console.log(err)
        toast.error("Cannot find your request!")
      }
      finally {
        setLoading(false);
      }
    }
    getImages()
  }, [query, page])


  const handleBackdropClick = () => {
    setModal(false)
  }

  const submitSearch = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    }

  const loadMore = () => {
    setPage(page + 1)
  }

  const toggleModal = () => {
    modal ? setModal(false) : setModal(true)
  }

  const chooseSelected = evt => {
    setSelectedImage(evt)
  }


  return (
      <div>
        <Searchbar onSubmit={submitSearch} />
        <ImageGallery images={images} onChoose={chooseSelected} onOpen={toggleModal}/>
        {images.length > 0 && showButton && !loading && <LoadButton onLoad={loadMore} />}
        {loading && <Loader />}
        {modal && <Modal imageValue={selectedImage} backdropClick={handleBackdropClick} />}
        <GlobalStyle />
        <Toaster position="top-right" />
      </div>
    )
};
