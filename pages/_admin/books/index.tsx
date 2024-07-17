import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import withAdminLayout from '../../../libs/components/layout/LayoutAdmin';
import { Box, List, ListItem, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TabContext } from '@mui/lab';
import TablePagination from '@mui/material/TablePagination';
import { sweetConfirmAlert, sweetErrorHandling } from '../../../libs/sweetAlert';
import { AllBooksInquiry } from '../../../libs/types/book/book.input';
import { Book } from '../../../libs/types/book/book';
import { BookCollection, BookStatus } from '../../../libs/enums/book.enum';
import { BookUpdate } from '../../../libs/types/book/book.update';
import { BookPanelList } from '../../../libs/components/admin/books/BookList';


const AdminBooks: NextPage = ({ initialInquiry, ...props }: any) => {
	const [anchorEl, setAnchorEl] = useState<[] | HTMLElement[]>([]);
	const [booksInquiry, setBooksInquiry] = useState<AllBooksInquiry>(initialInquiry);
	const [books, setBooks] = useState<Book[]>([]);
	const [booksTotal, setBooksTotal] = useState<number>(0);
	const [value, setValue] = useState(
		booksInquiry?.search?.bookStatus ? booksInquiry?.search?.bookStatus : 'ALL',
	);
	const [searchType, setSearchType] = useState('ALL');

	/** APOLLO REQUESTS **/

	/** LIFECYCLES **/
	useEffect(() => {}, [booksInquiry]);

	/** HANDLERS **/
	const changePageHandler = async (event: unknown, newPage: number) => {
		booksInquiry.page = newPage + 1;
		setBooksInquiry({ ...booksInquiry });
	};

	const changeRowsPerPageHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
		booksInquiry.limit = parseInt(event.target.value, 10);
		booksInquiry.page = 1;
		setBooksInquiry({ ...booksInquiry });
	};

	const menuIconClickHandler = (e: any, index: number) => {
		const tempAnchor = anchorEl.slice();
		tempAnchor[index] = e.currentTarget;
		setAnchorEl(tempAnchor);
	};

	const menuIconCloseHandler = () => {
		setAnchorEl([]);
	};

	const tabChangeHandler = async (event: any, newValue: string) => {
		setValue(newValue);

		setBooksInquiry({ ...booksInquiry, page: 1, sort: 'createdAt' });

		switch (newValue) {
			case 'ACTIVE':
				setBooksInquiry({ ...booksInquiry, search: { bookStatus: BookStatus.AVAILABLE } });
				break;
			case 'SOLD':
				setBooksInquiry({ ...booksInquiry, search: { bookStatus: BookStatus.SOLD_OUT } });
				break;
			case 'DELETE':
				setBooksInquiry({ ...booksInquiry, search: { bookStatus: BookStatus.DISCONTINUED } });
				break;
			default:
				delete booksInquiry?.search?.bookStatus;
				setBooksInquiry({ ...booksInquiry });
				break;
		}
	};

	const removeBookHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to remove?')) {
			}
			menuIconCloseHandler();
		} catch (err: any) {
			sweetErrorHandling(err).then();
		}
	};

	const searchTypeHandler = async (newValue: string) => {
		try {
			setSearchType(newValue);

			if (newValue !== 'ALL') {
				setBooksInquiry({
					...booksInquiry,
					page: 1,
					sort: 'createdAt',
					search: {
						...booksInquiry.search,
						bookCollectionList: [newValue as BookCollection],
					},
				});
			} else {
				delete booksInquiry?.search?.bookCollectionList;
				setBooksInquiry({ ...booksInquiry });
			}
		} catch (err: any) {
			console.log('searchTypeHandler: ', err.message);
		}
	};

	const updateBookHandler = async (updateData: BookUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			menuIconCloseHandler();
		} catch (err: any) {
			menuIconCloseHandler();
			sweetErrorHandling(err).then();
		}
	};

	return (
		<Box component={'div'} className={'content'}>
			<Typography variant={'h2'} className={'tit'} sx={{ mb: '24px' }}>
				Book List
			</Typography>
			<Box component={'div'} className={'table-wrap'}>
				<Box component={'div'} sx={{ width: '100%', typography: 'body1' }}>
					<TabContext value={value}>
						<Box component={'div'}>
							<List className={'tab-menu'}>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'ALL')}
									value="ALL"
									className={value === 'ALL' ? 'li on' : 'li'}
								>
									All
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'ACTIVE')}
									value="ACTIVE"
									className={value === 'ACTIVE' ? 'li on' : 'li'}
								>
									Active
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'SOLD')}
									value="SOLD"
									className={value === 'SOLD' ? 'li on' : 'li'}
								>
									Sold
								</ListItem>
								<ListItem
									onClick={(e) => tabChangeHandler(e, 'DELETE')}
									value="DELETE"
									className={value === 'DELETE' ? 'li on' : 'li'}
								>
									Delete
								</ListItem>
							</List>
							<Divider />
							<Stack className={'search-area'} sx={{ m: '24px' }}>
								<Select sx={{ width: '160px', mr: '20px' }} value={searchType}>
									<MenuItem value={'ALL'} onClick={() => searchTypeHandler('ALL')}>
										ALL
									</MenuItem>
									{Object.values(BookCollection).map((collection: string) => (
										<MenuItem value={collection} onClick={() => searchTypeHandler(collection)} key={collection}>
											{collection}
										</MenuItem>
									))}
								</Select>
							</Stack>
							<Divider />
						</Box>
						<BookPanelList
							books={books}
							anchorEl={anchorEl}
							menuIconClickHandler={menuIconClickHandler}
							menuIconCloseHandler={menuIconCloseHandler}
							updateBookHandler={updateBookHandler}
							removeBookHandler={removeBookHandler}
						/>

						<TablePagination
							rowsPerPageOptions={[10, 20, 40, 60]}
							component="div"
							count={booksTotal}
							rowsPerPage={booksInquiry?.limit}
							page={booksInquiry?.page - 1}
							onPageChange={changePageHandler}
							onRowsPerPageChange={changeRowsPerPageHandler}
						/>
					</TabContext>
				</Box>
			</Box>
		</Box>
	);
};

AdminBooks.defaultProps = {
	initialInquiry: {
		page: 1,
		limit: 10,
		sort: 'createdAt',
		direction: 'DESC',
		search: {},
	},
};

export default withAdminLayout(AdminBooks);
