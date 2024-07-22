import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import useDeviceDetect from '../hooks/useDeviceDetect';
import { Stack, Box } from '@mui/material';
import moment from 'moment';

const Footer = () => {
	const device = useDeviceDetect();

	if (device == 'mobile') {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logoWhite.svg" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 5794 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>Customer Service</span>
							<p>+82 10 5794 2909</p>
							<span>Support?</span>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us</p>
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'bottom'}>
							<div>
								<strong>Popular Search</strong>
								<span>Bestseller</span>
								<span>Book Low to hide</span>
							</div>
							<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
							<div>
								<strong>Book Categories</strong>
								<span>BIOGRAPHIES & MEMOIRS</span>
								<span>MYSTERY, THRILLER & SUSPENSE</span>
								<span>CHILDREN'S BOOKS</span>
								<span>HISTORY</span>
								<span>LITERATURE & FICTION</span>
								<span>SCIENCE FICTION & FANTASY</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© JK&Books - All rights reserved. JK&Books {moment().year()}</span>
				</Stack>
			</Stack>
		);
	} else {
		return (
			<Stack className={'footer-container'}>
				<Stack className={'main'}>
					<Stack className={'left'}>
						<Box component={'div'} className={'footer-box'}>
							<img src="/img/logo/logo.png" alt="" className={'logo'} />
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>total free customer care</span>
							<p>+82 10 5794 2909</p>
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<span>Customer Service</span>
							<p>+82 10 5794 2909</p>
			
						</Box>
						<Box component={'div'} className={'footer-box'}>
							<p>follow us </p>	
							<div className={'media-box'}>
								<FacebookOutlinedIcon />
								<TelegramIcon />
								<InstagramIcon />
								<TwitterIcon />
							</div>
						</Box>
					</Stack>
					<Stack className={'right'}>
						<Box component={'div'} className={'top'}>
							<strong>keep yourself up to date</strong>
							<div>
								<input type="text" placeholder={'Your Email'} />
								<span>Subscribe</span>
							</div>
						</Box>
						<Box component={'div'} className={'bottom'}>
						<div>
								<strong>Quick Links</strong>
								<span>Terms of Use</span>
								<span>Privacy Policy</span>
								<span>Pricing Plans</span>
								<span>Our Services</span>
								<span>Contact Support</span>
								<span>FAQs</span>
							</div>
						<div>
								<strong>Popular Search</strong>
								<span>Bestseller</span>
								<span>Authors</span>
								<span>Publishers</span>
								<span>ISBN search</span>
							</div>

							<div>
								<strong>Book Categories</strong>
								<span>BIOGRAPHIES & MEMOIRS</span>
								<span>MYSTERY, THRILLER</span>
								<span>CHILDREN'S BOOKS</span>
								<span>HISTORY</span>
								<span>LITERATURE & FICTION</span>
								<span>SCIENCE FICTION & FANTASY</span>
							</div>
						</Box>
					</Stack>
				</Stack>
				<Stack className={'second'}>
					<span>© Jk&Books - All rights reserved. JK&Books {moment().year()}</span>
					<span>Privacy · Terms · Sitemap</span>
				</Stack>
			</Stack>
		);
	}
};

export default Footer;
