import React from 'react';
import { Stack, Typography, IconButton } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Book } from '../../types/book/book';

interface BookCardType {
  book: Book;
  likeBookHandler?: (user: any, bookId: string) => void;
  myFavorites?: boolean;
  recentlyVisited?: boolean;
}

const BookCard: React.FC<BookCardType> = (props) => {
  const { book, likeBookHandler, myFavorites, recentlyVisited } = props;
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const imagePath: string = book?.bookImages[0]
    ? `${REACT_APP_API_URL}/${book?.bookImages[0]}`
    : '/img/banner/header1.svg';

  if (device === 'mobile') {
    return <div>BOOK CARD</div>;
  } else {
    return (
      <div className="card-config">
        <div className="top">
          <Link
            href={{
              pathname: '/book/detail',
              query: { id: book?._id },
            }}
            passHref
          >
            <img src={imagePath} alt={book.bookTitle} />
          </Link>
          {book?.bookRank > 0 && (
            <div className="top-badge">
              <img src="/img/icons/electricity.svg" alt="Top Badge" />
              <Typography>TOP</Typography>
            </div>
          )}
          <div className="content">
            <div className="name-address">
              <div className="name">
                <Link
                  href={{
                    pathname: '/book/detail',
                    query: { id: book?._id },
                  }}
                  passHref
                >
                  <Typography>{book.bookTitle}</Typography>
                </Link>
              </div>
              <div className="address">
                <Typography>
                  {book.bookAuthor}, {book.bookCollection}
                </Typography>
              </div>
            </div>
            <div className="type-buttons">
              <Typography className='price-box'>${formatterStr(book?.bookPrice)}</Typography>
              {!recentlyVisited && (
                <div className="buttons">
                  <IconButton color="default">
                    <RemoveRedEyeIcon />
                  </IconButton>
                  <Typography className="view-cnt">{book?.bookViews}</Typography>
                  <IconButton color="default" onClick={() => likeBookHandler?.(user, book?._id)}>
                    {myFavorites || (book?.meLiked && book?.meLiked[0]?.myFavorite) ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </IconButton>
                  <Typography className="like-cnt">{book?.bookLikes}</Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default BookCard;
