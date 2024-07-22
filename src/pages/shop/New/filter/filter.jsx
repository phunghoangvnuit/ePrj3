import React, { useState, useEffect } from 'react';
import { Form, Button, Select, Slider } from 'antd';
import './filter.css';
import { getAllCategories } from "../../../../Auth/Services/CategoryService";

const { Option } = Select;

function Filter({ handleFilter }) {
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedPrice, setSelectedPrice] = useState([0, 1000]);
  const [selectedMaterials, setSelectedMaterials] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(1000);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    fetchCategories();
  }, [pageCount, pageSize]);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories(pageCount, pageSize);
      if (response && response.errorCode === 200) {
        setCategories(response.content.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleApply = () => {
    const filters = {
      cat: selectedCat,
      price: selectedPrice,
      materials: selectedMaterials,
      collection: selectedCollection,
    };
    handleFilter(filters);
  };

  const handleClear = () => {
    setSelectedCat('');
    setSelectedPrice([0, 1000]);
    setSelectedMaterials('');
    setSelectedCollection('');
    handleFilter({});
  };

  return (
    <Form className="filter-form" layout="vertical">
      <Form.Item label="Brand">
        <Select
          placeholder="Select brand"
          value={selectedCat}
          onChange={(value) => setSelectedCat(value)}
        >
          <Option value="">Select brand</Option>
          {categories.map((category) => (
            <Option key={category.id} value={category.id}>
              {category.name}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item label="Price Range">
        <Slider
          range
          min={0}
          max={1000}
          step={10}
          value={selectedPrice}
          onChange={(value) => setSelectedPrice(value)}
        />
        <div className="price-display">
          ${selectedPrice[0]} - ${selectedPrice[1]}
        </div>
      </Form.Item>
      <div className='filter-button'>
        <Button type="primary" onClick={handleApply}>
          Apply
        </Button>
        <Button type="default" onClick={handleClear} style={{ marginLeft: '8px' }}>
          Clear
        </Button>
      </div>
    </Form>
  );
}

export default Filter;

