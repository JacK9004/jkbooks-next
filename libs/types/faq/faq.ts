import { Member } from '../member/member';
import { FaqCategory, FaqStatus } from '../../enums/faq.enum';
import { TotalCounter } from '../property/property';

export interface Faq {
	_id: string;
	faqCategory: FaqCategory;
	faqStatus: FaqStatus;
	faqTitle: string;
	question: string;
	answer: string;
	faqContent: string;
	faqViews: number;
	memberId: string;
	createdAt: string;
	updatedAt: string;
	/** from aggregation **/
	memberData?: Member;
}

export interface Faqs {
	list: Faq[];
	metaCounter: TotalCounter[];
}
