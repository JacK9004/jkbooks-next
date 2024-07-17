import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Book } from '../../types/book/book';

interface TrendBookCardProps {
	book: Book;
}

const TrendBookCard = (props: TrendBookCardProps) => {
	const { book } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="trend-card-box" key={book._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${book?.bookImages[0]})` }}
				>
					<div>${book.bookPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<p className={'desc'}>{book.bookDesc ?? 'no description'}</p>
					{/* <div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{book.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{book.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{book.propertySquare} m2</span>
						</div>
					</div> */}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						{/* <p>
							{book.propertyRent ? 'Rent' : ''} {book.propertyRent && book.propertyBarter && '/'}{' '}
							{book.propertyBarter ? 'Barter' : ''}
						</p> */}
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{book?.bookViews}</Typography>
							<IconButton color={'default'}>
								{book?.meLiked && book?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{book?.bookLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="trend-card-box" key={book._id}>
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${book?.bookImages[0]})` }}
				>
					<div>${book.bookPrice}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<p className={'desc'}>{book.bookDesc ?? 'no description'}</p>
					<div className={'options'}>
						{/* <div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{book.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{book.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{book.propertySquare} m2</span>
						</div> */}
					</div>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						{/* <p>
							{book.propertyRent ? 'Rent' : ''} {book.propertyRent && book.propertyBarter && '/'}{' '}
							{book.propertyBarter ? 'Barter' : ''}
						</p> */}
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{book?.bookViews}</Typography>
							<IconButton color={'default'}>
								{book?.meLiked && book?.meLiked[0]?.myFavorite ? (
									<FavoriteIcon style={{ color: 'red' }} />
								) : (
									<FavoriteIcon />
								)}
							</IconButton>
							<Typography className="view-cnt">{book?.bookLikes}</Typography>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TrendBookCard;
