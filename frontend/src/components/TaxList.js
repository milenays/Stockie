import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';

const TaxList = ({ taxes, onEdit, onDelete }) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Rate</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {taxes.map((tax) => (
          <Tr key={tax._id}>
            <Td>{tax.name}</Td>
            <Td>{tax.rate}</Td>
            <Td>
              <Button onClick={() => onEdit(tax)}>Edit</Button>
              <Button onClick={() => onDelete(tax._id)}>Delete</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default TaxList;
