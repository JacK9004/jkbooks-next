import React, { useState } from 'react';
import { Stack, Box, Button } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { BooksInquiry } from '../../types/book/book.input';

const thisYear = new Date().getFullYear();

interface HeaderFilterProps {
  initialInput: BooksInquiry;
}

const HeaderFilter = (props: HeaderFilterProps) => {
  const { initialInput } = props;
  const device = useDeviceDetect();
  const { t } = useTranslation('common');
  const [searchFilter, setSearchFilter] = useState<BooksInquiry>(initialInput);
  const router = useRouter();

  /** HANDLERS **/
  const pushSearchHandler = async () => {
    try {
      const { search } = searchFilter;
      const updatedSearch = {
        ...search,
        collectionList: search?.collectionList?.length ? search.collectionList : undefined,
        typeList: search?.typeList?.length ? search.typeList : undefined,
        titleList: search?.titleList?.length ? search.titleList : undefined,
        options: search?.options?.length ? search.options : undefined,
      };

      await router.push(`/book?input=${JSON.stringify({ ...searchFilter, search: updatedSearch })}`);
    } catch (err) {
      console.error('ERROR, pushSearchHandler:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      pushSearchHandler();
    }
  };

  if (device === 'mobile') {
    return <div>HEADER FILTER MOBILE</div>;
  } else {
    return (
      <div className="header-container">
        <Stack className="search-box" direction="row" alignItems="center">
          <Box component="div" className="search-input-box">
            <input
              value={searchFilter?.search?.text ?? ''}
              type="text"
              placeholder={'Search 5 million books by title, author or keyword'}
              onChange={(e) => {
                setSearchFilter({
                  ...searchFilter,
                  search: { ...searchFilter.search, text: e.target.value },
                });
              }}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Button
            startIcon={<img src={'/img/icons/search.svg'} />}
            className="search-btn"
            onClick={pushSearchHandler}
          >
           </Button>
        </Stack>
      </div>
    );
  }
};

HeaderFilter.defaultProps = {
  initialInput: {
    page: 1,
    limit: 9,
    search: {
      pricesRange: {
        start: 0,
        end: 100,
      },
    },
  },
};

export default HeaderFilter;
