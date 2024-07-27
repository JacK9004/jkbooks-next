import React from 'react';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { Stack, Button, Typography } from '@mui/material';

const Advertisement = () => {
	const device = useDeviceDetect();

	return (
		<Stack className="advertisement-section">
			<Stack className="text-content">
				<Typography variant="h2">For the Love of Reading</Typography>
				<Typography variant="body1">
					<strong>Selection</strong>
					<span>We have more than 13 million titles to choose from, from the earliest board books to the all-time classics of literature.</span>
					<strong>Purchasing Power</strong>
					<span>Used books are often treasures that are out-of-print or rare. With Wish Lists you can choose to be notified the instant we find a copy, see how often we find rare titles, and see who else is interested.</span>
					<strong>FREE Shipping & More</strong>
					<span>When you've found the books you want we'll ship qualifying orders to your door for FREE in 100% recyclable packaging. If there is no demand for a book, we will donate it to charity, or we'll recycle it.</span>
				</Typography>
				<Button variant="contained" color="primary">More About Us</Button>
			</Stack>
			<Stack className="video-content">
				<iframe
					width="417"
					height="257"
					src="https://www.youtube.com/embed/tlmIrkWPA4s"
					title="YouTube video"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</Stack>
		</Stack>
	);
};

export default Advertisement;
