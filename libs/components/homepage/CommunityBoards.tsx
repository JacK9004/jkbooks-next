import React from 'react';
import { Stack, Typography } from '@mui/material';

const categoriesData = [
  { 
    title: 'Biography', 
    imageSrc: '/img/community/category1.webp', 
    subcategories: ['Historical Biographies', 'Military Biographies', 'Modern Biographies', 'Sports Biographies', 'United States Biographies'] 
  },
  { 
    title: "Children's Books", 
    imageSrc: '/img/community/children.webp', 
    subcategories: ["Children's Animal Books", "Children's Humor Books", "Children's Sci-Fi & Fantasy Books", 'Classic Children\'s Books'] 
  },
  { 
    title: 'Fiction', 
    imageSrc: '/img/community/category2.jpg', 
    subcategories: ['Classic Books', 'Contemporary Fiction Books', 'Foreign Language Fiction Books', 'Genre Fiction Books', 'History & Criticism Books'] 
  },
  { 
    title: 'Mystery', 
    imageSrc: '/img/community/mystery.jpg', 
    subcategories: ['Crime', 'Mysteries & Detectives', 'Mystery', 'Suspense', 'Thrillers'] 
  },
  { 
    title: 'Non-Fiction', 
    imageSrc: '/img/community/category4.webp', 
    subcategories: ['Astrology Books', 'History of Religion Books', 'Inspirational Books', 'New Age Books'] 
  },
  { 
    title: 'Romance', 
    imageSrc: '/img/community/Romance.png',
    subcategories: ['Contemporary Romance Books', 'Romantic Fantasy Books', 'Romantic Historical Books', 'Romantic Mystery Books', 'Romantic Sci-Fi Books'] 
  },
  { 
    title: 'Science Fiction & Fantasy', 
    imageSrc: '/img/community/science.jpg',
    subcategories: ['Action & Adventure Books', 'Coming of Age Sci-Fi Books', 'Historical Sci-Fi Books', 'Sci-Fi Horror Books', 'Sci-Fi Humor Books'] 
  },
  { 
    title: 'History', 
    imageSrc: '/img/community/history.jpg',
    subcategories: ['Military History Books', 'Modern History Books', 'Religious History Books', 'United States History Books', 'World History Books'] 
  },
  { 
    title: 'Teen & Young Adult', 
    imageSrc: '/img/community/teen.jpg',
    subcategories: ['Teen Fantasy Books', 'Teen Historical Fiction Books', 'Teen Hobbies Books', 'Teen Horror Books', 'Teen Sci-Fi Books'] 
  },
];


const ShopByCategory = () => {
  return (
    <Stack className="shop-by-category">
      <Stack className="container">
        <Typography variant="h4">Shop by Category</Typography>
        <Stack className="category-grid">
          {categoriesData.map((category, index) => (
            <Stack className="category" key={index}>
              <div
                className="category-image"
                style={{ backgroundImage: `url(${category.imageSrc})` }}
              />
              <Stack className="category-details">
                <Typography variant="h5">{category.title}</Typography>
                <Stack>
                  {category.subcategories.map((subcategory, subIndex) => (
                    <Typography key={subIndex} className="subcategory">
                      {subcategory}
                    </Typography>
                  ))}
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShopByCategory;
