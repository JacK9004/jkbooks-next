import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Stack, Tab, Typography, Button, Pagination } from '@mui/material';
import CommunityCard from '../../libs/components/common/CommunityCard';
import useDeviceDetect from '../../libs/hooks/useDeviceDetect';
import withLayoutBasic from '../../libs/components/layout/LayoutBasic';
import { BoardArticle } from '../../libs/types/board-article/board-article';
import { T } from '../../libs/types/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { BoardArticlesInquiry } from '../../libs/types/board-article/board-article.input';
import { BoardArticleCategory } from '../../libs/enums/board-article.enum';
import { useMutation, useQuery } from '@apollo/client';
import { LIKE_TARGET_BOARD_ARTICLE } from '../../apollo/user/mutation';
import { GET_BOARD_ARTICLES } from '../../apollo/user/query';
import { Messages } from '../../libs/config';
import { sweetMixinErrorAlert, sweetTopSmallSuccessAlert } from '../../libs/sweetAlert';

export const getStaticProps = async ({ locale }: any) => ({
	props: {
		...(await serverSideTranslations(locale, ['common'])),
	},
});

const Community: NextPage = ({ initialInput, ...props }: T) => {
	const device = useDeviceDetect();
	const router = useRouter();
	const { query } = router;
	const articleCategory = query?.articleCategory as string;
	const [searchCommunity, setSearchCommunity] = useState<BoardArticlesInquiry>(initialInput);
	const [boardArticles, setBoardArticles] = useState<BoardArticle[]>([]);
	const [totalCount, setTotalCount] = useState<number>(0);
	if (articleCategory) initialInput.search.articleCategory = articleCategory;

	/** APOLLO REQUESTS **/
	const [likeTargetBoardArticle] = useMutation(LIKE_TARGET_BOARD_ARTICLE);
	const {
		loading: boardArticlesLoading,
		data: boardArticlesData,
		error: getBoardArticlesError,
		refetch: boardArticlesRefetch,
	} = useQuery(GET_BOARD_ARTICLES, {
		fetchPolicy: 'cache-and-network',
		variables: { input: searchCommunity },
		notifyOnNetworkStatusChange: true,
		onCompleted: (data: T) => {
			setBoardArticles(data?.getBoardArticles?.list);
			setTotalCount(data?.getBoardArticles?.metaCounter[0]?.total);
		},
	});

	/** LIFECYCLES **/
	useEffect(() => {
		if (!query?.articleCategory)
			router.push(
				{
					pathname: router.pathname,
					query: { articleCategory: 'REVIEWS' },
				},
				router.pathname,
				{ shallow: true },
			);
	}, []);

	/** HANDLERS **/
	const likeArticleHandler = async (e: any, user: any, id: string) => {
		try {
			e.stopPropagation();
			if (!id) return;
			if (!user._id) throw new Error(Messages.error2);
			await likeTargetBoardArticle({ variables: { input: id } });
			await boardArticlesRefetch({ input: searchCommunity });
			await sweetTopSmallSuccessAlert('success', 800);
		} catch (err: any) {
			console.log('Error, likeArticleHandler:', err.message);
			sweetMixinErrorAlert(err.message).then();
		}
	};
	const tabChangeHandler = async (e: T, value: string) => {
		setSearchCommunity({ ...searchCommunity, page: 1, search: { articleCategory: value as BoardArticleCategory } });
		await router.push(
			{
				pathname: '/community',
				query: { articleCategory: value },
			},
			router.pathname,
			{ shallow: true },
		);
	};

	const paginationHandler = (e: T, value: number) => {
		setSearchCommunity({ ...searchCommunity, page: value });
	};

	if (device === 'mobile') {
		return <h1>BLOG PAGE MOBILE</h1>;
	} else {
		return (
			<div id="community-list-page">
				<div className="container">
					<TabContext value={searchCommunity.search.articleCategory}>
						<Stack className="main-box" direction="column" spacing={2}>
							<Stack className="tabs-container" direction="row" spacing={2}>
							<Stack className="left-config" spacing={3}>
									<Stack className="image-info" direction="row" spacing={2}>
										<img src="/img/logo/logo.png" alt="Community Logo" />
										<Stack className="community-name">
											<Typography className="name">Blog</Typography>
										</Stack>
									</Stack>
								</Stack>
								<TabList
									aria-label="lab API tabs example"
									TabIndicatorProps={{ style: { display: 'none' } }}
									onChange={tabChangeHandler}
								>
									<Tab
										value="REVIEWS"
										label="Reviews"
										className={`tab-button ${searchCommunity.search.articleCategory === 'REVIEWS' ? 'active' : ''}`}
									/>
									<Tab
										value="INTERVIEWS"
										label="Interviews"
										className={`tab-button ${searchCommunity.search.articleCategory === 'INTERVIEWS' ? 'active' : ''}`}
									/>
									<Tab
										value="NEWS"
										label="News"
										className={`tab-button ${searchCommunity.search.articleCategory === 'NEWS' ? 'active' : ''}`}
									/>
									<Tab
										value="EVENTS"
										label="Events"
										className={`tab-button ${searchCommunity.search.articleCategory === 'EVENTS' ? 'active' : ''}`}
									/>
								</TabList>
							</Stack>

							<Stack className="content-box" direction="row" spacing={3}>
							
								<Stack className="right-config" direction="column" spacing={3}>
									<Stack className="panel-config">
										<Stack className="title-box" direction="row" justifyContent="space-between" alignItems="center">
											<Stack className="left" spacing={1}>
												<Typography className="title">{searchCommunity.search.articleCategory} BOARD</Typography>
												<Typography className="sub-title">
													Express your opinions freely here without content restrictions
												</Typography>
											</Stack>
											<Button
												onClick={() =>
													router.push({
														pathname: '/mypage',
														query: { category: 'writeArticle' },
													})
												}
												className="right"
											>
												Write
											</Button>
										</Stack>
										
										<Stack className="list-box" direction="row" spacing={2} flexWrap="wrap">
											{totalCount ? (
												boardArticles.map((boardArticle: BoardArticle) => (
													<CommunityCard
														boardArticle={boardArticle}
														key={boardArticle._id}
														likeArticleHandler={likeArticleHandler}
													/>
												))
											) : (
												<Stack className="no-data" direction="row" alignItems="center" spacing={1}>
													<img src="/img/icons/icoAlert.svg" alt="No Articles" />
													<p>No Article found!</p>
												</Stack>
											)}
										</Stack>
									</Stack>
								</Stack>
							</Stack>
						</Stack>
					</TabContext>

					{totalCount > 0 && (
						<Stack className="pagination-config" direction="row" alignItems="center" justifyContent="center" spacing={2}>
							<Pagination
								count={Math.ceil(totalCount / searchCommunity.limit)}
								page={searchCommunity.page}
								shape="circular"
								color="primary"
								onChange={paginationHandler}
							/>
							<Typography>
								Total {totalCount} article{totalCount > 1 ? 's' : ''} available
							</Typography>
						</Stack>
					)}
				</div>
			</div>
		);
	}
};

Community.defaultProps = {
	initialInput: {
		page: 1,
		limit: 6,
		sort: 'createdAt',
		direction: 'ASC',
		search: {
			articleCategory: 'REVIEWS',
		},
	},
};

export default withLayoutBasic(Community);
