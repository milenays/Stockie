import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { arrayMoveImmutable } from 'array-move';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { Box, Button, Image, Flex } from '@chakra-ui/react';
// Diğer importlar...

const ImageUploader = ({ onImagesChange }) => {
  const [images, setImages] = useState([]);

  const handleDrop = (newImages) => {
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const sortedImages = arrayMoveImmutable(images, oldIndex, newIndex);
    setImages(sortedImages);
    onImagesChange(sortedImages);
  };

  return (
    <div>
      {/* Image uploading and sorting logic... */}
    </div>
  );
};

export default ImageUploader;
