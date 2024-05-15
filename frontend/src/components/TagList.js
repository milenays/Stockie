import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import TagForm from './TagForm';
import { deleteTag } from '../api/tagApi';

const TagList = ({ tags = [], setTags }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTag, setSelectedTag] = React.useState(null);

  const handleEdit = (tag) => {
    setSelectedTag(tag);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTag(id);
      setTags((prevTags) => prevTags.filter((tag) => tag._id !== id));
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  return (
    <>
      <Button onClick={() => { setSelectedTag(null); onOpen(); }} colorScheme="blue" mb={4}>
        Add Tag
      </Button>
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
                <Button onClick={() => handleEdit(tag)} colorScheme="teal" size="sm" mr={2}>Edit</Button>
                <Button onClick={() => handleDelete(tag._id)} colorScheme="red" size="sm">Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <TagForm
        isOpen={isOpen}
        onClose={onClose}
        tag={selectedTag}
        setTags={setTags}
      />
    </>
  );
};

export default TagList;
