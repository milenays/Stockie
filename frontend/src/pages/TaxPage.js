import React, { useState, useEffect } from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import TaxList from '../components/TaxList';
import TaxForm from '../components/TaxForm';
import { getTaxes, deleteTax } from '../api/taxApi';

const TaxPage = () => {
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchTaxes = async () => {
      try {
        const data = await getTaxes();
        setTaxes(data);
      } catch (error) {
        console.error('Error fetching taxes:', error);
      }
    };

    fetchTaxes();
  }, []);

  const handleAdd = () => {
    setSelectedTax(null);
    onOpen();
  };

  const handleEdit = (tax) => {
    setSelectedTax(tax);
    onOpen();
  };

  const handleDelete = async (id) => {
    try {
      await deleteTax(id);
      setTaxes((prevTaxes) => prevTaxes.filter((tax) => tax._id !== id));
    } catch (error) {
      console.error('Error deleting tax:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleAdd} colorScheme="blue" mb={4}>
        Add Tax
      </Button>
      <TaxList taxes={taxes} onEdit={handleEdit} onDelete={handleDelete} />
      <TaxForm isOpen={isOpen} onClose={onClose} tax={selectedTax} setTaxes={setTaxes} />
    </div>
  );
};

export default TaxPage;
