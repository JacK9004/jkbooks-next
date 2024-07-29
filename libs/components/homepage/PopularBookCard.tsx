import React from 'react';
import { Stack, Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { REACT_APP_API_URL, topBookRank } from '../../config';
import { useRouter } from 'next/router';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import { Book } from '../../types/book/book';

interface PopularBookCardProps {
	book: Book;
}

const PopularBookCard = (props: PopularBookCardProps) => {
	const { book } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const user = useReactiveVar(userVar);

	/** HANDLERS **/

	if (device === 'mobile') {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${book?.bookImages[0]})` }}
				>
					{book && book?.bookRank >= topBookRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<p className={'desc'}>{book.bookAuthor}</p>
					<Divider sx={{ mt: '15px', mb: '17px' }} />
					<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{book?.bookViews}</Typography>
							<div className={'price'}>${book.bookPrice}</div>
						</div>
					</div>
				</Box>
			</Stack>
		);
	} else {
		return (
			<Stack className="popular-card-box">
				<Box
					component={'div'}
					className={'card-img'}
					style={{ backgroundImage: `url(${REACT_APP_API_URL}/${book?.bookImages[0]})` }}
				>
					{book && book?.bookRank >= topBookRank ? (
						<div className={'status'}>
							<img src="/img/icons/electricity.svg" alt="" />
							<span>top</span>
						</div>
					) : (
						''
					)}
				</Box>
				<Box component={'div'} className={'info'}>
					<strong className={'title'}>{book.bookTitle}</strong>
					<p className={'auth'}>{book.bookAuthor}</p>
						<div className={'bott'}>
						<div className="view-like-box">
							<IconButton color={'default'}>
								<RemoveRedEyeIcon />
							</IconButton>
							<Typography className="view-cnt">{book?.bookViews}</Typography>
									<div className={'price'}>${book.bookPrice}</div>
						</div>
					</div>
				</Box>
			</Stack>
		);
	}
};

export default PopularBookCard;
