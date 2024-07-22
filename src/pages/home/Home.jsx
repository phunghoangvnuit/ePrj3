import HomeSlider from "./New/slider/slider.jsx"
import Footer from "../footer/footer.jsx"
import Category from "./New/category/category.jsx";
import SearchTrends from "./New/SearchTrends/SearchTrends.jsx";
import { useState, useEffect } from 'react';
import { getAllCategories } from '../../Auth/Services/CategoryService.js';
import "slick-carousel/slick/slick.css";
const Home = () => {
  const [categories, setCategories] = useState([]);
  console.log(categories)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories(1, 200);
        if (response && response.errorCode === 200) {
          setCategories(response.content.data);
        } else {
          console.error('Failed to fetch categories');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <HomeSlider />
      <SearchTrends />
      {categories.map(category => (
        <Category
          key={category.id}
          categoryId={category.id}
          categoryName={category.name}
          checkblos={categories}
        />
      ))}
      <Footer />
    </div>
  );
};

export default Home;

