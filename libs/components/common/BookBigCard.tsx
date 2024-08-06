import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { REACT_APP_API_URL, topBookRank } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Book } from '../../types/book/book';

interface BookBigCardProps {
  book: Book;
  likeBookHandler?: (user: any, bookId: string) => void;
}

const BookBigCard = (props: BookBigCardProps) => {
  const { book, likeBookHandler } = props;
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();

  /** HANDLERS **/
  const goBookDetatilPage = (bookId: string) => {
    router.push(`/book/detail?id=${bookId}`);
  };

  if (device === 'mobile') {
    return <div>BOOK BIG CARD</div>;
  } else {
    return (
      <Stack className="property-big-card-box" onClick={() => goBookDetatilPage(book?._id)}>
        <Box
          component={'div'}
          className={'card-img'}
          style={{ backgroundImage: `url(${REACT_APP_API_URL}/${book?.bookImages?.[0]})` }}
        >
          {book && book?.bookRank >= topBookRank && (
            <div className={'status'}>
              <img src="/img/icons/electricity.svg" alt="" />
              <span>top</span>
            </div>
          )}
        </Box>
        <Box component={'div'} className={'info'}>
          <strong className={'title'}>{book?.bookTitle}</strong>
          <p className={'desc'}>{book?.bookAuthor}</p>
          <Divider sx={{ mt: '15px', mb: '17px' }} />
          <div className={'bott'}>
            <div className="buttons-box">
              <IconButton color={'default'}>
                <RemoveRedEyeIcon />
              </IconButton>
              <Typography className="view-cnt">{book?.bookViews}</Typography>
              <IconButton
                color={'default'}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  likeBookHandler && likeBookHandler(user, book?._id);
                }}
              >
                {book?.meLiked && book?.meLiked[0]?.myFavorite ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteIcon />
                )}
              </IconButton>
              <Typography className="view-cnt">{book?.bookLikes}</Typography>
              <Typography className="price">${formatterStr(book?.bookPrice)}</Typography>
            </div>
          </div>
        </Box>
      </Stack>
    );
  }
};

export default BookBigCard;
