import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ProductForm = ({ onSubmit, initialValues, brands, categories }) => {
  const [description, setDescription] = useState(initialValues.description || '');

  return (
    <Formik
      initialValues={{ ...initialValues, description }}
      validationSchema={Yup.object({
        name: Yup.string().max(100, 'Must be 100 characters or less').required('Required'),
        barcode: Yup.string().required('Required'),
        brand: Yup.string().required('Required'),
        category: Yup.string().required('Required'),
        weight: Yup.number().required('Required'),
        price: Yup.number().required('Required'),
      })}
      onSubmit={(values) => {
        onSubmit({ ...values, description });
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div>
            <label htmlFor="name">Product Name</label>
            <Field name="name" type="text" placeholder="Product Name" />
            <div>{description.length}/100</div>
          </div>

          <div>
            <label htmlFor="barcode">Barcode</label>
            <Field name="barcode" type="text" placeholder="Barcode" />
            <button type="button" onClick={() => setFieldValue('barcode', generateRandomBarcode())}>
              Generate Barcode
            </button>
          </div>

          <div>
            <label htmlFor="brand">Brand</label>
            <Field as="select" name="brand">
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <Field as="select" name="category">
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </Field>
          </div>

          <div>
            <label htmlFor="weight">Weight</label>
            <Field name="weight" type="number" placeholder="Weight" />
          </div>

          <div>
            <label htmlFor="price">Price</label>
            <Field name="price" type="number" placeholder="Price" />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <ReactQuill
              value={description}
              onChange={(value) => setDescription(value)}
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// Rastgele barkod oluşturma fonksiyonu
const generateRandomBarcode = () => {
  const prefix = '84';
  const randomNumber = Math.floor(1000000000000 + Math.random() * 9000000000000);
  return prefix + randomNumber.toString();
};

export default ProductForm;
