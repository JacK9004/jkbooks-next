import React, { useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Link from 'next/link';
import { BooksInquiry } from '../../types/book/book.input';
import { Book } from '../../types/book/book';
import PopularBookCard from './PopularBookCard';
import { T } from '../../types/common';
import { GET_BOOKS } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';


interface PopularBooksProps {
	initialInput: BooksInquiry;
}

const PopularBooks = (props: PopularBooksProps) => {
	const { initialInput } = props;
	const device = useDeviceDetect();
	const [popularBooks, setPopularBooks] = useState<Book[]>([]);

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
			setPopularBooks(data?.getBooks?.list);
		},
	});
	/** HANDLERS **/

	if (!popularBooks) return null;

	if (device === 'mobile') {
		return (
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<span>POPULAR BOOKS</span>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							centeredSlides={true}
							spaceBetween={25}
							modules={[Autoplay]}
						>
							{popularBooks.map((book: Book) => {
								return (
									<SwiperSlide key={book._id} className={'popular-property-slide'}>
										<PopularBookCard book={book} />
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
			<Stack className={'popular-properties'}>
				<Stack className={'container'}>
					<Stack className={'info-box'}>
						<Box component={'div'} className={'left'}>
							<span>POPULAR BOOKS</span>
							<p>Popularity is based on views</p>
						</Box>
						<Box component={'div'} className={'right'}>
							<div className={'more-box'}>
								<Link href={'/property'}>
									<span>See All Categories</span>
								</Link>
								<img src="/img/icons/rightup.svg" alt="" />
							</div>
						</Box>
					</Stack>
					<Stack className={'card-box'}>
						<Swiper
							className={'popular-property-swiper'}
							slidesPerView={'auto'}
							spaceBetween={25}
							modules={[Autoplay, Navigation, Pagination]}
							navigation={{
								nextEl: '.swiper-popular-next',
								prevEl: '.swiper-popular-prev',
							}}
							pagination={{
								el: '.swiper-popular-pagination',
							}}
						>
							{popularBooks.map((book: Book) => {
								return (
									<SwiperSlide key={book._id} className={'popular-property-slide'}>
										<PopularBookCard book={book} />
									</SwiperSlide>
								);
							})}
						</Swiper>
					</Stack>
					<Stack className={'pagination-box'}>
						<WestIcon className={'swiper-popular-prev'} />
						<div className={'swiper-popular-pagination'}></div>
						<EastIcon className={'swiper-popular-next'} />
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

PopularBooks.defaultProps = {
	initialInput: {
		page: 1,
		limit: 7,
		sort: 'bookViews',
		direction: 'DESC',
		search: {},
	},
};

export default PopularBooks;
