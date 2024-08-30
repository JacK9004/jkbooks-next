import numeral from 'numeral';
import { sweetMixinErrorAlert } from './sweetAlert';
import dayjs from 'dayjs';

export const formatterStr = (value: number | undefined): string => {
	return numeral(value).format('0,0') != '0' ? numeral(value).format('0,0') : '';
};

export const likeTargetBookHandler = async (likeTargetBook: any, id: string) => {
	try {
		await likeTargetBook({
			variables: {
				input: id,
			},
		});
	} catch (err: any) {
		console.log('ERROR, likeTargetBookHandler:', err.message);
		sweetMixinErrorAlert(err.message).then();
	}
};

export const likeTargetBoardArticleHandler = async (likeTargetBoardArticle: any, id: string) => {
	try {
		await likeTargetBoardArticle({
			variables: {
				input: id,
			},
		});
	} catch (err: any) {
		console.log('ERROR, likeTargetBoardArticleHandler:', err.message);
		sweetMixinErrorAlert(err.message).then();
	}
};

export const likeTargetMemberHandler = async (likeTargetMember: any, id: string) => {
	try {
		await likeTargetMember({
			variables: {
				input: id,
			},
		});
	} catch (err: any) {
		console.log('ERROR, likeTargetMemberHandler:', err.message);
		sweetMixinErrorAlert(err.message).then();
	}
};

export const formatDate = (date: string) => {
	return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};