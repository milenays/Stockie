import React, { useState, useEffect } from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import BrandList from '../components/BrandList';
import BrandForm from '../components/BrandForm';
import { getBrands } from '../api/brandApi';

const BrandPage = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBrands = async () => {
      const data = await getBrands();
      setBrands(data);
    };

    fetchBrands();
  }, []);

  const handleAddBrand = () => {
    setSelectedBrand(null);
    onOpen();
  };

  return (
    <Box>
      <Button onClick={handleAddBrand} colorScheme="teal" mb={4}>
        Add Brand
      </Button>
      <BrandList brands={brands} setBrands={setBrands} onOpen={onOpen} setSelectedBrand={setSelectedBrand} />
      <BrandForm isOpen={isOpen} onClose={onClose} brand={selectedBrand} setBrands={setBrands} />
    </Box>
  );
};

export default BrandPage;
