import { Menu, MenuItem, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import IconButton from '@mui/material/IconButton';
import ModeIcon from '@mui/icons-material/Mode';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatterStr } from '../../utils';
import Moment from 'react-moment';
import { useRouter } from 'next/router';
import { Book } from '../../types/book/book';
import { BookStatus } from '../../enums/book.enum';


interface BookCardProps {
	book: Book;
	deleteBookHandler?: any;
	memberPage?: boolean;
	updateBookHandler?: any;
}

export const BookCard = (props: BookCardProps) => {
	const { book, deleteBookHandler, memberPage, updateBookHandler } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	/** HANDLERS **/
	const pushEditBook = async (id: string) => {
		console.log('+pushEditBook: ', id);
		await router.push({
			pathname: '/mypage',
			query: { category: 'addBook', bookId: id },
		});
	};

	const pushBookDetail = async (id: string) => {
		if (memberPage)
			await router.push({
				pathname: '/book/detail',
				query: { id: id },
			});
		else return;
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	if (device === 'mobile') {
		return <div>MOBILE BOOK CARD</div>;
	} else
		return (
			<Stack className="property-card-box">
				<Stack className="image-box" onClick={() => pushBookDetail(book?._id)}>
					<img src={`${process.env.REACT_APP_API_URL}/${book.bookImages[0]}`} alt="" />
				</Stack>
				<Stack className="information-box" onClick={() => pushBookDetail(book?._id)}>
					<Typography className="name">{book.bookTitle}</Typography>
					<Typography className="address">{book.bookAuthor}</Typography>
					<Typography className="price">
						<strong>${formatterStr(book?.bookPrice)}</strong>/ mo
					</Typography>
				</Stack>
				<Stack className="date-box">
					<Typography className="date">
						<Moment format="DD MMMM, YYYY">{book.createdAt}</Moment>
					</Typography>
				</Stack>
				<Stack className="status-box">
					<Stack className="coloured-box" sx={{ background: '#E5F0FD' }} onClick={handleClick}>
						<Typography className="status" sx={{ color: '#3554d1' }}>
							{book.bookStatus}
						</Typography>
					</Stack>
				</Stack>
				{!memberPage && book.bookStatus !== 'SOLD_OUT' && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						PaperProps={{
							elevation: 0,
							sx: {
								width: '70px',
								mt: 1,
								ml: '10px',
								overflow: 'visible',
								filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							},
							style: {
								padding: 0,
								display: 'flex',
								justifyContent: 'center',
							},
						}}
					>
						{book.bookStatus === 'AVAILABLE' && (
							<>
								<MenuItem
									disableRipple
									onClick={() => {
										handleClose();
										updateBookHandler(BookStatus.SOLD_OUT, book?._id);
									}}
								>
									Sold
								</MenuItem>
							</>
						)}
					</Menu>
				)}

				<Stack className="views-box">
					<Typography className="views">{book.bookViews.toLocaleString()}</Typography>
				</Stack>
				{!memberPage && (
					<Stack className="action-box">
						<IconButton className="icon-button" onClick={() => pushEditBook(book._id)}>
							<ModeIcon className="buttons" />
						</IconButton>
						<IconButton className="icon-button" onClick={() => deleteBookHandler(book._id)}>
							<DeleteIcon className="buttons" />
						</IconButton>
					</Stack>
				)}
			</Stack>
		);
};
