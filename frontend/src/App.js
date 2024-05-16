import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from './components/Layout';
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductPage';
import CategoryPage from './pages/CategoryPage';
import BrandPage from './pages/BrandPage';
import CustomerPage from './pages/CustomerPage';
import SupplierPage from './pages/SupplierPage';
import TagPage from './pages/TagPage';
import TaxPage from './pages/TaxPage';
import VariantPage from './pages/VariantPage';
import OrderPage from './pages/OrderPage';
import ProductForm from './components/ProductForm';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure } from "@chakra-ui/react";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/products" component={ProductPage} />
            <Route exact path="/categories" component={CategoryPage} />
            <Route exact path="/brands" component={BrandPage} />
            <Route exact path="/customers" component={CustomerPage} />
            <Route exact path="/suppliers" component={SupplierPage} />
            <Route exact path="/tags" component={TagPage} />
            <Route exact path="/taxes" component={TaxPage} />
            <Route exact path="/variants" component={VariantPage} />
            <Route exact path="/orders" component={OrderPage} />
          </Switch>
          <Route path="/products/add">
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ProductForm onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Route>
          <Route path="/products/edit/:id">
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <ProductForm onClose={onClose} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </Route>
        </Layout>
      </Router>
    </ChakraProvider>
  );
};

export default App;
