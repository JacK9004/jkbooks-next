import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { REACT_APP_API_URL } from '../../config';
import { formatterStr } from '../../utils';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Book } from '../../types/book/book';

interface BookBigCardProps {
	book: Book;
}

const BookBigCard = (props: BookBigCardProps) => {
	const { book } = props;
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
					{book?.bookRank && book?.bookRank >= 50 && (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					)}

					<div className={'price'}>${formatterStr(book?.bookPrice)}</div>
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book?.bookTitle}</strong>
					<p className={'desc'}>{book?.bookAuthor}</p>
					{/* <div className={'options'}>
						<div>
							<img src="/img/icons/bed.svg" alt="" />
							<span>{book?.propertyBeds} bed</span>
						</div>
						<div>
							<img src="/img/icons/room.svg" alt="" />
							<span>{property?.propertyRooms} rooms</span>
						</div>
						<div>
							<img src="/img/icons/expand.svg" alt="" />
							<span>{property?.propertySquare} m2</span>
						</div>
					</div> */}
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div>
							{book?.bookRent ? <p>Rent</p> : <span>Rent</span>}
							{book?.bookAuthor ? <p>Author</p> : <span>Author</span>}
						</div>
						<div className="buttons-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{book?.bookViews}</Typography>
							<IconButton
								color={'default'}
								onClick={(e) => {
									e.stopPropagation();
								}}
							>
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

export default BookBigCard;
