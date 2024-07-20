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
		
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
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
				</Box>
				<Box component={'div'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<p className={'auth'}>{book.bookAuthor ?? 'no author'}</p>
					<div className={'bott'}>
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
							<div>${book.bookPrice}</div>

						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default TrendBookCard;
