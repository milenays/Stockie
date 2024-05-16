import React, { useState, useEffect } from 'react';
import { getTags, addTag, updateTag, deleteTag } from '../api/tagApi';
import TagForm from '../components/TagForm';
import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    const data = await getTags();
    setTags(data);
  };

  const handleAdd = () => {
    setSelectedTag(null);
    onOpen();
  };

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    onOpen();
  };

  const handleDelete = async (id) => {
    await deleteTag(id);
    fetchTags();
  };

  const handleSubmit = async (values) => {
    if (selectedTag) {
      await updateTag(selectedTag._id, values);
    } else {
      await addTag(values);
    }
    fetchTags();
    onClose();
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="teal" mb={4}>Add Tag</Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {tags.map((tag) => (
            <Tr key={tag._id}>
              <Td>{tag.name}</Td>
              <Td>
                <Button colorScheme="teal" onClick={() => handleEdit(tag)}>Edit</Button>
                <Button colorScheme="red" onClick={() => handleDelete(tag._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedTag ? 'Edit Tag' : 'Add Tag'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TagForm tag={selectedTag} onSubmit={handleSubmit} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default TagsPage;
