import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import Link from 'next/link';
import { formatterStr } from '../../utils';
import { REACT_APP_API_URL } from '../../config';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Book } from '../../types/book/book';

interface BookCardType {
	book: Book;
	likeBookHandler?: any;
	myFavorites?: boolean;
	recentlyVisited?: boolean;
}

const BookCard = (props: BookCardType) => {
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
			<Stack className="card-config">
				<Stack className="top">
					<Link
						href={{
							pathname: '/book/detail',
							query: { id: book?._id },
						}}
					>
						<img src={imagePath} alt="" />
					</Link>
					{book && book?.bookRank > 0 && (
						<Box component={'div'} className={'top-badge'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<Typography>TOP</Typography>
						</Box>
					)}
					<Box component={'div'} className={'price-box'}>
						<Typography>${formatterStr(book?.bookPrice)}</Typography>
					</Box>
				</Stack>
				<Stack className="bottom">
					<Stack className="name-address">
						<Stack className="name">
							<Link
								href={{
									pathname: '/book/detail',
									query: { id: book?._id },
								}}
							>
								<Typography>{book.bookTitle}</Typography>
							</Link>
						</Stack>
						<Stack className="address">
							<Typography>
								{book.bookAuthor}, {book.bookCollection}
							</Typography>
						</Stack>
					</Stack>
					<Stack className="options">
						{/* <Stack className="option">
							<img src="/img/icons/bed.svg" alt="" /> <Typography>{property.propertyBeds} bed</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/room.svg" alt="" /> <Typography>{property.propertyRooms} room</Typography>
						</Stack>
						<Stack className="option">
							<img src="/img/icons/expand.svg" alt="" /> <Typography>{property.propertySquare} m2</Typography>
						</Stack> */}
					</Stack>
					<Stack className="divider"></Stack>
					<Stack className="type-buttons">
						<Stack className="type">
							<Typography
								sx={{ fontWeight: 500, fontSize: '13px' }}
								className={book.bookRent ? '' : 'disabled-type'}
							>
								Rent
							</Typography>

						</Stack>
						{!recentlyVisited && (
							<Stack className="buttons">
								<IconButton color={'default'}>
									<RemoveRedEyeIcon />
								</IconButton>
								<Typography className="view-cnt">{book?.bookViews}</Typography>
								<IconButton color={'default'} onClick={() => likeBookHandler(user, book?._id)}>
									{myFavorites ? (
										<FavoriteIcon color="primary" />
									) : book?.meLiked && book?.meLiked[0]?.myFavorite ? (
										<FavoriteIcon color="primary" />
									) : (
										<FavoriteBorderIcon />
									)}
								</IconButton>
								<Typography className="view-cnt">{book?.bookLikes}</Typography>
							</Stack>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default BookCard;
