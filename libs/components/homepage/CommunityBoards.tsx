import React from 'react';
import { Stack, Typography } from '@mui/material';

const categoriesData = [
  { title: 'Biographies & Memoirs', imageSrc: '/img/community/event1.webp', subcategories: ['Historical Biographies', 'Military Biographies', 'Modern Biographies', 'Sports Biographies', 'United States Biographies'] },
  { title: "Children's Books", imageSrc: '/img/community/category1.jpg', subcategories: ["Children's Animal Books", "Children's Humor Books", "Children's Sci-Fi & Fantasy Books", 'Classic Children\'s Books'] },
  { title: 'Literature & Fiction', imageSrc: '/img/community/category2.jpg', subcategories: ['Classic Books', 'Contemporary Literature Books', 'Foreign Language Fiction Books', 'Genre Fiction Books', 'History & Criticism Books'] },
  { title: 'Mystery, Thriller & Suspense', imageSrc: '/img/community/category3.jpg', subcategories: ['Crime', 'Mysteries & Detectives', 'Mystery', 'Suspense', 'Thrillers'] },
  { title: 'Religion & Spirituality', imageSrc: '/img/community/category4.webp', subcategories: ['Astrology Books', 'Christian Books & Bibles', 'History of Religion Books', 'Inspirational Books', 'New Age Books'] },
  { title: 'Romance', imageSrc: '/img/categories/romance.jpg', subcategories: ['Contemporary Romance Books', 'Romantic Fantasy Books', 'Romantic Historical Books', 'Romantic Mystery Books', 'Romantic Sci-Fi Books'] },
  { title: 'Science Fiction & Fantasy', imageSrc: '/img/categories/science_fiction_fantasy.jpg', subcategories: ['Action & Adventure Books', 'Coming of Age Sci-Fi Books', 'Historical Sci-Fi Books', 'Sci-Fi Horror Books', 'Sci-Fi Humor Books'] },
  { title: 'History', imageSrc: '/img/categories/history.jpg', subcategories: ['Military History Books', 'Modern History Books', 'Religious History Books', 'United States History Books', 'World History Books'] },
  { title: 'Teen & Young Adult', imageSrc: '/img/categories/teen_young_adult.jpg', subcategories: ['Teen Fantasy Books', 'Teen Historical Fiction Books', 'Teen Hobbies Books', 'Teen Horror Books', 'Teen Sci-Fi Books'] },
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
