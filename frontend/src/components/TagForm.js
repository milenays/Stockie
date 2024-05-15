import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react';
import { addTag, updateTag } from '../api/tagApi';

const TagForm = ({ isOpen, onClose, tag, setTags }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name || '',
      });
    } else {
      setFormData({
        name: '',
      });
    }
  }, [tag]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (tag) {
        await updateTag(tag._id, formData);
        setTags((prevTags) =>
          prevTags.map((t) => (t._id === tag._id ? { ...t, ...formData } : t))
        );
      } else {
        const newTag = await addTag(formData);
        setTags((prevTags) => [...prevTags, newTag]);
      }
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{tag ? 'Edit Tag' : 'Add Tag'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {tag ? 'Update Tag' : 'Add Tag'}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TagForm;
