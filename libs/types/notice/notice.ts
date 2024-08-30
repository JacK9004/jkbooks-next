
import { Member } from '../member/member';
import { NoticeCategory, NoticeStatus } from '../../enums/notice.enum';
import { TotalCounter } from '../book/book';


export interface Notice {
	_id: string;
	noticeCategory: NoticeCategory;
	noticeStatus: NoticeStatus;
	noticeTitle: string;
	noticeContent: string;
	question: string;
	answer: string;
	memberId: string;
	createdAt: string;
	updatedAt: string;
	/** from aggregation **/
	memberData?: Member;
}

export interface Notices {
	list: Notice[];
	metaCounter: TotalCounter[];
}
