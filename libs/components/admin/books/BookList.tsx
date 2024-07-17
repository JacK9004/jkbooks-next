import React from 'react';
import Link from 'next/link';
import {
	TableCell,
	TableHead,
	TableBody,
	TableRow,
	Table,
	TableContainer,
	Button,
	Menu,
	Fade,
	MenuItem,
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';

import { REACT_APP_API_URL } from '../../../config';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Book } from '../../../types/book/book';
import { BookStatus } from '../../../enums/book.enum';


interface Data {
	id: string;
	title: string;
	price: string;
	agent: string;
	collection: string;
	type: string;
	status: string;
}

type Order = 'asc' | 'desc';

interface HeadCell {
	disablePadding: boolean;
	id: keyof Data;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: true,
		disablePadding: false,
		label: 'MB ID',
	},
	{
		id: 'title',
		numeric: true,
		disablePadding: false,
		label: 'TITLE',
	},
	{
		id: 'price',
		numeric: false,
		disablePadding: false,
		label: 'PRICE',
	},
	{
		id: 'agent',
		numeric: false,
		disablePadding: false,
		label: 'AGENT',
	},
	{
		id: 'collection',
		numeric: false,
		disablePadding: false,
		label: 'COLLECTION',
	},
	{
		id: 'type',
		numeric: false,
		disablePadding: false,
		label: 'TYPE',
	},
	{
		id: 'status',
		numeric: false,
		disablePadding: false,
		label: 'STATUS',
	},
];

interface EnhancedTableProps {
	numSelected: number;
	onRequestSort: (event: React.MouseEvent<unknown>, book: keyof Data) => void;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	order: Order;
	orderBy: string;
	rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick } = props;

	return (
		<TableHead>
			<TableRow>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'left' : 'center'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface BookPanelListType {
	books: Book[];
	anchorEl: any;
	menuIconClickHandler: any;
	menuIconCloseHandler: any;
	updateBookHandler: any;
	removeBookHandler: any;
}

export const BookPanelList = (props: BookPanelListType) => {
	const {
		books,
		anchorEl,
		menuIconClickHandler,
		menuIconCloseHandler,
		updateBookHandler,
		removeBookHandler,
	} = props;

	return (
		<Stack>
			<TableContainer>
				<Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'medium'}>
					{/*@ts-ignore*/}
					<EnhancedTableHead />
					<TableBody>
						{books.length === 0 && (
							<TableRow>
								<TableCell align="center" colSpan={8}>
									<span className={'no-data'}>data not found!</span>
								</TableCell>
							</TableRow>
						)}

						{books.length !== 0 &&
							books.map((book: Book, index: number) => {
								const bookImage = `${REACT_APP_API_URL}/${book?.bookImages[0]}`;

								return (
									<TableRow hover key={book?._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
										<TableCell align="left">{book._id}</TableCell>
										<TableCell align="left" className={'name'}>
											<Stack direction={'row'}>
												<Link href={`/book/detail?id=${book?._id}`}>
													<div>
														<Avatar alt="Remy Sharp" src={bookImage} sx={{ ml: '2px', mr: '10px' }} />
													</div>
												</Link>
												<Link href={`/book/detail?id=${book?._id}`}>
													<div>{book.bookTitle}</div>
												</Link>
											</Stack>
										</TableCell>
										<TableCell align="center">{book.bookPrice}</TableCell>
										<TableCell align="center">{book.memberData?.memberNick}</TableCell>
										<TableCell align="center">{book.bookCollection}</TableCell>
										<TableCell align="center">{book.bookType}</TableCell>
										<TableCell align="center">
											{book.bookStatus === BookStatus.DISCONTINUED && (
												<Button
													variant="outlined"
													sx={{ p: '3px', border: 'none', ':hover': { border: '1px solid #000000' } }}
													onClick={() => removeBookHandler(book._id)}
												>
													<DeleteIcon fontSize="small" />
												</Button>
											)}

											{book.bookStatus === BookStatus.SOLD_OUT && (
												<Button className={'badge warning'}>{book.bookStatus}</Button>
											)}

											{book.bookStatus === BookStatus.AVAILABLE && (
												<>
													<Button onClick={(e: any) => menuIconClickHandler(e, index)} className={'badge success'}>
														{book.bookStatus}
													</Button>

													<Menu
														className={'menu-modal'}
														MenuListProps={{
															'aria-labelledby': 'fade-button',
														}}
														anchorEl={anchorEl[index]}
														open={Boolean(anchorEl[index])}
														onClose={menuIconCloseHandler}
														TransitionComponent={Fade}
														sx={{ p: 1 }}
													>
														{Object.values(BookStatus)
															.filter((ele) => ele !== book.bookStatus)
															.map((status: string) => (
																<MenuItem
																	onClick={() => updateBookHandler({ _id: book._id, bookStatus: status })}
																	key={status}
																>
																	<Typography variant={'subtitle1'} component={'span'}>
																		{status}
																	</Typography>
																</MenuItem>
															))}
													</Menu>
												</>
											)}
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
		</Stack>
	);
};
