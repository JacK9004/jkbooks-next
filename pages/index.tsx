import { NextPage } from 'next';
import useDeviceDetect from '../libs/hooks/useDeviceDetect';
import withLayoutMain from '../libs/components/layout/LayoutHome';
import CommunityBoards from '../libs/components/homepage/CommunityBoards';
import TopAgents from '../libs/components/homepage/TopAgents';
import Events from '../libs/components/homepage/Events';
import { Stack } from '@mui/material';
import Advertisement from '../libs/components/homepage/Advertisement';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import TrendBooks from '../libs/components/homepage/TrendBooks';
import PopularBooks from '../libs/components/homepage/PopularBooks';
import TopBooks from '../libs/components/homepage/TopBooks';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Home: NextPage = () => {
	const device = useDeviceDetect();

	if (device === 'mobile') {
		return (
			<Stack className={'home-page'}>
				<TrendBooks />
				<PopularBooks />
				<Advertisement />
				<TopBooks />
				<TopAgents />
			</Stack>
		);
	} else {
		return (
			<Stack className={'home-page'}>
				<TrendBooks />
				<PopularBooks />
				<Advertisement />
				<TopBooks />
				<TopAgents />
				<Events />
				<CommunityBoards />
			</Stack>
		);
	}
};

export default withLayoutMain(Home);
