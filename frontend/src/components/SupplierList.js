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
import SupplierForm from './SupplierForm';
import { deleteSupplier } from '../api/supplierApi';

const SupplierList = ({ suppliers = [], setSuppliers }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== id));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <>
      <Button onClick={() => { setSelectedSupplier(null); onOpen(); }} colorScheme="blue" mb={4}>
        Add Supplier
      </Button>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Address</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {suppliers.map((supplier) => (
            <Tr key={supplier._id}>
              <Td>{supplier.name}</Td>
              <Td>{supplier.email}</Td>
              <Td>{supplier.phone}</Td>
              <Td>{supplier.address}</Td>
              <Td>
                <Button onClick={() => handleEdit(supplier)} colorScheme="teal" size="sm" mr={2}>Edit</Button>
                <Button onClick={() => handleDelete(supplier._id)} colorScheme="red" size="sm">Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SupplierForm
        isOpen={isOpen}
        onClose={onClose}
        supplier={selectedSupplier}
        setSuppliers={setSuppliers}
      />
    </>
  );
};

export default SupplierList;
