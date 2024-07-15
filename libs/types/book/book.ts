import { AgeCategory, BookCollection, BookStatus, BookType } from '../../enums/book.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Book {
	_id: string;
	bookType: BookType;
    bookStatus: BookStatus;
    bookCollection: BookCollection;
    ageCategory?: AgeCategory;
    bookTitle: string;
    bookAuthor: string;
    bookPrice: number;
    bookDate: string;
    bookISBN: string;
    bookPages: number;
    bookLanguages: string[];
    bookViews: number;
    bookLikes: number;
    bookComments: number;
    bookRank: number;
    bookImages: string[];
    bookDesc?: string;
    bookRent: boolean;
    memberId: string;
    soldAt?: Date;
    deletedAt?: Date;
    discontinuedAt?: Date;
    createdAt: Date;
    updatedAt: Date;

	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Books {
    list: Book[];
	
	metaCounter: TotalCounter[];
}
