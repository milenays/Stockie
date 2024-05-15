import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { deleteBrand } from '../api/brandApi';

const BrandList = ({ brands, setBrands, onOpen, setSelectedBrand }) => {
  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteBrand(id);
      setBrands((prevBrands) => prevBrands.filter((brand) => brand._id !== id));
    } catch (error) {
      console.error('Error deleting brand:', error);
    }
  };

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {brands.map((brand) => (
          <Tr key={brand._id}>
            <Td>{brand.name}</Td>
            <Td>
              <IconButton
                icon={<EditIcon />}
                onClick={() => handleEdit(brand)}
                mr={2}
              />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => handleDelete(brand._id)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BrandList;
