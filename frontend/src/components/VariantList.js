import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const VariantList = ({ variants, onEdit, onDelete }) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Options</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {variants.map((variant) => (
          <Tr key={variant._id}>
            <Td>{variant.name}</Td>
            <Td>{Array.isArray(variant.options) ? variant.options.join(', ') : ''}</Td>
            <Td>
              <Button onClick={() => onEdit(variant)} mr={2}>
                Edit
              </Button>
              <Button onClick={() => onDelete(variant._id)} colorScheme="red">
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default VariantList;
