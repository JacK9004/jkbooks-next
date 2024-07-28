import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { BooksInquiry } from '../../types/book/book.input';
import { Book } from '../../types/book/book';
import TopBookCard from './TopBookCard';
import { GET_BOOKS } from '../../../apollo/user/query';
import { useMutation, useQuery } from '@apollo/client';
import { T } from '../../types/common';
import { LIKE_TARGET_BOOK } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';


interface TopBooksProps {
	initialInput: BooksInquiry;
}

const TopBooks = (props: TopBooksProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [topBooks, setTopBooks] = useState<Book[]>([]);

	/** APOLLO REQUESTS **/
	const [likeTargetBook] = useMutation(LIKE_TARGET_BOOK);

	const {
		loading: getBooksLoading,
		data: getBooksData,
		error: getBooksError,
		refetch: getBooksRefetch,
	} = useQuery(GET_BOOKS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: initialInput },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setTopBooks(data?.getBooks?.list);
		},
	});
	/** HANDLERS **/
	const likeBookHandler = async  (user: T, id: string) => {
		try {
			if (!id) return;
			if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

			//execute likeTargetBook Mutation
			await likeTargetBook({
				variables: { input: id},
			});

			//execute getBooksRefetch
			await getBooksRefetch({ input: initialInput});

			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('ERROR, likeBookHandler:', err.message);
            sweetMixinErrorAlert(err.message).then();
			
		}
	};

	if (device === 'mobile') {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>BESTSELLER</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={15}
							modules={[Autoplay]}
						>
							{topBooks.map((book: Book) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={book?._id}>
									<TopBookCard book={book} likeBookHandler={likeBookHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'top-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>BESTSELLERS</span>
							<p>This year's top sellers</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-top-prev'} />
								<div className={'swiper-top-pagination'}></div>
								<EastIcon className={'swiper-top-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'top-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={15}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-top-next',
								prevEl: '.swiper-top-prev',
							}}
							pagination={{
								el: '.swiper-top-pagination',
							}}
						>
							{topBooks.map((book: Book) => {
								return (
									<SwiperSlide className={'top-property-slide'} key={book?._id}>
										<TopBookCard book={book} likeBookHandler={likeBookHandler} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

TopBooks.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'bookRank',
		direction: 'DESC',
		search: {},
	},
};

export default TopBooks;
