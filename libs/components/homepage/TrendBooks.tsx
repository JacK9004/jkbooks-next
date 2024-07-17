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
import { useQuery } from '@apollo/client';
import TrendBookCard from './TrendBookCard';


interface TrendBooksProps {
	initialInput: BooksInquiry;
}

const TrendBooks = (props: TrendBooksProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [trendBooks, setTrendBooks] = useState<Book[]>([]);

	/** APOLLO REQUESTS **/
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

	if (trendBooks) console.log('trendBooks:', trendBooks);
	if (!trendBooks) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'trend-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>Trend Properties</span>
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
											<TrendBookCard book={book} />
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
							<span>Trend Books</span>
							<p>Trend is based on likes</p>
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
											<TrendBookCard book={book} />
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
