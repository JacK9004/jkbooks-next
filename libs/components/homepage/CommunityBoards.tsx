import React from 'react';
import { Stack, Typography } from '@mui/material';

const categoriesData = [
  { 
    title: 'Biography', 
    imageSrc: '/img/community/category1.webp', 
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["BIOGRAPHY"]}}',
    subcategories: ['Historical Biographies', 'Military Biographies', 'Modern Biographies', 'Sports Biographies', 'United States Biographies'] 
  },
  { 
    title: "Children's Books", 
    imageSrc: '/img/community/children.webp', 
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["CHILDREN"]}}',
    subcategories: ["Children's Animal Books", "Children's Humor Books", "Children's Sci-Fi & Fantasy Books", 'Classic Children\'s Books'] 
  },
  { 
    title: 'Fiction', 
    imageSrc: '/img/community/category2.jpg', 
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["FICTION"]}}',
    subcategories: ['Classic Books', 'Contemporary Fiction Books', 'Foreign Language Fiction Books', 'Genre Fiction Books', 'History & Criticism Books'] 
  },
  { 
    title: 'Mystery', 
    imageSrc: '/img/community/mystery.jpg', 
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["MYSTERY"]}}',
    subcategories: ['Crime', 'Mysteries & Detectives', 'Mystery', 'Suspense', 'Thrillers'] 
  },
  { 
    title: 'Non-Fiction', 
    imageSrc: '/img/community/category4.webp', 
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["NON_FICTION"]}}',
    subcategories: ['Astrology Books', 'History of Religion Books', 'Inspirational Books', 'New Age Books'] 
  },
  { 
    title: 'Romance', 
    imageSrc: '/img/community/Romance.png',
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["ROMANCE"]}}',
    subcategories: ['Contemporary Romance Books', 'Romantic Fantasy Books', 'Romantic Historical Books', 'Romantic Mystery Books', 'Romantic Sci-Fi Books'] 
  },
  { 
    title: 'Science Fiction & Fantasy', 
    imageSrc: '/img/community/science.jpg',
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["SCIENCE_FICTION_FANTASY"]}}',
    subcategories: ['Action & Adventure Books', 'Coming of Age Sci-Fi Books', 'Historical Sci-Fi Books', 'Sci-Fi Horror Books', 'Sci-Fi Humor Books'] 
  },
  { 
    title: 'History', 
    imageSrc: '/img/community/history.jpg',
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["HISTORY"]}}',
    subcategories: ['Military History Books', 'Modern History Books', 'Religious History Books', 'United States History Books', 'World History Books'] 
  },
  { 
    title: 'Teen & Young Adult', 
    imageSrc: '/img/community/teen.jpg',
    link: '/book?input={"page":1,"limit":9,"sort":"createdAt","direction":"DESC","search":{"pricesRange":{"start":0,"end":100},"collectionList":["TEEN_YOUNG_ADULT"]}}',
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
            <a href={category.link} key={index} style={{ textDecoration: 'none' }}>
              <Stack className="category">
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
            </a>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ShopByCategory;
