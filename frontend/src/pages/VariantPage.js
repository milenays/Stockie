import React, { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import VariantList from '../components/VariantList';
import VariantForm from '../components/VariantForm';
import { getVariants, deleteVariant } from '../api/variantApi';

const VariantPage = () => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const data = await getVariants();
        setVariants(data);
      } catch (error) {
        console.error('Error fetching variants:', error);
      }
    };

    fetchVariants();
  }, []);

  const handleAdd = () => {
    setSelectedVariant(null);
    onOpen();
  };

  const handleEdit = (variant) => {
    setSelectedVariant(variant);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteVariant(id);
      setVariants((prevVariants) => prevVariants.filter((variant) => variant._id !== id));
    } catch (error) {
      console.error('Error deleting variant:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="blue" mb={4}>
        Add Variant
      </Button>
      <VariantList variants={variants} onEdit={handleEdit} onDelete={handleDelete} />
      <VariantForm isOpen={isOpen} onClose={onClose} variant={selectedVariant} setVariants={setVariants} />
    </div>
  );
};

export default VariantPage;
