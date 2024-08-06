import React, { useState } from 'react';
import { NextPage } from 'next';
import { Pagination, Stack, Typography } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { T } from '../../types/common';
import { userVar } from '../../../apollo/store';
import { useRouter } from 'next/router';
import { AgentBooksInquiry } from '../../types/book/book.input';
import { Book } from '../../types/book/book';
import { BookStatus } from '../../enums/book.enum';
import { BookCard } from './BookCard';
import { UPDATE_BOOK } from '../../../apollo/user/mutation';
import { GET_AGENT_BOOKS } from '../../../apollo/user/query';
import { sweetConfirmAlert, sweetErrorHandling } from '../../sweetAlert';

const MyBooks: NextPage = ({ initialInput, ...props }: any) => {
	const device = useDeviceDetect();
	const [searchFilter, setSearchFilter] = useState<AgentBooksInquiry>(initialInput);
	const [agentBooks, setAgentBooks] = useState<Book[]>([]);
	const [total, setTotal] = useState<number>(0);
	const user = useReactiveVar(userVar);
	const router = useRouter();

	/** APOLLO REQUESTS **/
	const [updateBook] = useMutation(UPDATE_BOOK);
	const {
		loading: getAgentBooksLoading,
		data: getAgentBooksData,
		error: getAgentBooksError,
		refetch: getAgentBooksRefetch,
	} = useQuery(GET_AGENT_BOOKS, {
		fetchPolicy: 'network-only',
		variables: { input: searchFilter },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setAgentBooks(data?.getAgentBooks?.list);
			setTotal(data?.getAgentBooks?.metaCounter[0]?.total ?? 0);
		},
	});

	/** HANDLERS **/
	const paginationHandler = (e: T, value: number) => {
		setSearchFilter({ ...searchFilter, page: value });
	};

	const changeStatusHandler = (value: BookStatus) => {
		setSearchFilter({ ...searchFilter, search: { bookStatus: value } });
	};

	const deleteBookHandler = async (id: string) => {
		try {
			if (await sweetConfirmAlert('Are you sure to delete this book? ')) {
				await updateBook({
					variables: {
						input: {
							_id: id,
							bookStatus: 'DISCONTINUED',
						},
					},
				});
				await getAgentBooksRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	const updateBookHandler = async (status: string, id: string) => {
		try {
			if (await sweetConfirmAlert(`Are you sure change to ${status} status?`)) {
				await updateBook({
					variables: {
						input: {
							_id: id,
							bookStatus: status,
						},
					},
				});
				await getAgentBooksRefetch({ input: searchFilter });
			}
		} catch (err: any) {
			await sweetErrorHandling(err);
		}
	};

	if (user?.memberType !== 'PUBLISHER') {
		router.back();
	}
	if (agentBooks) console.log('agentBooks: +++', agentBooks);
	if (!agentBooks) return null;

	if (device === 'mobile') {
		return <div>JK&Books MOBILE</div>;
	} else {
		return (
			<div id="my-property-page">
				<Stack className="main-title-box">
					<Stack className="right-box">
						<Typography className="main-title">My Books</Typography>
						<Typography className="sub-title">We are glad to see you again!</Typography>
					</Stack>
				</Stack>
				<Stack className="property-list-box">
					<Stack className="tab-name-box">
						<Typography
							onClick={() => changeStatusHandler(BookStatus.AVAILABLE)}
							className={searchFilter.search.bookStatus === 'AVAILABLE' ? 'active-tab-name' : 'tab-name'}
						>
							On Sale
						</Typography>
						<Typography
							onClick={() => changeStatusHandler(BookStatus.SOLD_OUT)}
							className={searchFilter.search.bookStatus === 'SOLD_OUT' ? 'active-tab-name' : 'tab-name'}
						>
							On Sold
						</Typography>
					</Stack>
					<Stack className="list-box">
						<Stack className="listing-title-box">
							<Typography className="title-text">Listing title</Typography>
							<Typography className="title-text">Date Published</Typography>
							<Typography className="title-text">Status</Typography>
							<Typography className="title-text">View</Typography>
							{searchFilter.search.bookStatus === 'AVAILABLE' && <Typography className="title-text">Action</Typography>} 
						</Stack>

						{agentBooks?.length === 0 ? (
							<div className={'no-data'}>
								<img src="/img/icons/icoAlert.svg" alt="" />
								<p>No Book found!</p>
							</div>
						) : (
							agentBooks.map((book: Book) => {
								return (
									<BookCard
										book={book}
										deleteBookHandler={deleteBookHandler}
										updateBookHandler={updateBookHandler}
									/>
								);
							})
						)}

						{agentBooks.length !== 0 && (
							<Stack className="pagination-config">
								<Stack className="pagination-box">
									<Pagination
										count={Math.ceil(total / searchFilter.limit)}
										page={searchFilter.page}
										shape="circular"
										color="primary"
										onChange={paginationHandler}
									/>
								</Stack>
								<Stack className="total-result">
									<Typography>{total} book available</Typography>
								</Stack>
							</Stack>
						)}
					</Stack>
				</Stack>
			</div>
		);
	}
};

MyBooks.defaultProps = {
	initialInput: {
		page: 1,
		limit: 5,
		sort: 'createdAt',
		search: {
			bookStatus: 'AVAILABLE',
		},
	},
};

export default MyBooks;
