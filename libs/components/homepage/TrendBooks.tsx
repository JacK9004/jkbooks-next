import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { T } from '../../types/common';
import { BooksInquiry } from '../../types/book/book.input';
import { GET_BOOKS } from '../../../apollo/user/query';
import { Book } from '../../types/book/book';
import { useMutation, useQuery } from '@apollo/client';
import TrendBookCard from './TrendBookCard';
import { LIKE_TARGET_BOOK } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../sweetAlert';


interface TrendBooksProps {
	initialInput: BooksInquiry;
}

const TrendBooks = (props: TrendBooksProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendBooks, setTrendBooks] = useState<Book[]>([]);

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
		setTrendBooks(data?.getBooks?.list);
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

	if (trendBooks) console.log('trendBooks:', trendBooks);
	if (!trendBooks) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Books</span>
					</Stack>
					<Stack className={'card-box'}>
						{trendBooks.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								centeredSlides={true}
								spaceBetween={15}
								modules={[Autoplay]}
							>
								{trendBooks.map((book: Book) => {
									return (
										<SwiperSlide key={book._id} className={'trend-property-slide'}>
											<TrendBookCard book={book}  likeBookHandler={likeBookHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
					</Stack>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span className={'trend-title'}>TREND BOOKS</span>
							<p>Trend books are based on likes</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'pagination-box'}>
								<WestIcon className={'swiper-trend-prev'} />
								<div className={'swiper-trend-pagination'}></div>
								<EastIcon className={'swiper-trend-next'} />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						{trendBooks.length === 0 ? (
							<Box component={'div'} className={'empty-list'}>
								Trends Empty
							</Box>
						) : (
							<Swiper
								className={'trend-property-swiper'}
								slidesPerView={'auto'}
								spaceBetween={15}
								modules={[Autoplay, Navigation, Pagination]}
								navigation={{
									nextEl: '.swiper-trend-next',
									prevEl: '.swiper-trend-prev',
								}}
								pagination={{
									el: '.swiper-trend-pagination',
								}}
							>
								{trendBooks.map((book: Book) => {
									return (
										<SwiperSlide key={book._id} className={'trend-property-slide'}>
											<TrendBookCard book={book}  likeBookHandler={likeBookHandler} />
										</SwiperSlide>
									);
								})}
							</Swiper>
						)}
						</Stack>
				</Stack>
			</Stack>
		);
	}
};

TrendBooks.defaultProps = {
	initialInput: {
		page: 1,
		limit: 8,
		sort: 'bookLikes',
		direction: 'DESC',
		search: {},
	},
};

export default TrendBooks;
