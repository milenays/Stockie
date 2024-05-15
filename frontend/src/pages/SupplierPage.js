import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SupplierList from '../components/SupplierList';
import { getSuppliers } from '../api/supplierApi';

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const suppliersData = await getSuppliers();
      setSuppliers(suppliersData);
    };
    fetchSuppliers();
  }, []);

  return (
    <Box p={5}>
      <Heading mb={5}>Suppliers</Heading>
      <SupplierList suppliers={suppliers} setSuppliers={setSuppliers} />
    </Box>
  );
};

export default SupplierPage;
