import { AgeCategory, BookCollection, BookLanguage, BookStatus, BookType } from '../../enums/book.enum';
import { Direction } from '../../enums/common.enum';

export interface BookInput {
    bookType: BookType;
	bookCollection: BookCollection;
	ageCategory?: AgeCategory;
	bookTitle: string;
	bookAuthor: string;
	bookPrice: number;
	bookDate: string;
    bookISBN: string;
    bookPages: number;
	bookLanguages: BookLanguage[];
    bookDesc?: string;
    bookImages: string[];
    bookRent?: boolean;
    memberId?: string;
    discontinuedAt?: Date;
}

interface BISearch {
	memberId?: string;
	collectionList?: BookCollection[];
	titleList?: String[];
	authorList?: String[];
	typeList?: BookType[];
	languageList?: BookLanguage[];
	ageList?: AgeCategory[];
	pricesRange?: PricesRange;
	periodsRange?: PeriodsRange;
	options?: string[];
	text?: string;
}

export interface BooksInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: BISearch;
}

interface ABISearch {
	bookStatus?: BookStatus;
}

export interface AgentBooksInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ABISearch;
}

interface ALBISearch {
	bookStatus?: BookStatus;
	bookCollectionList?: BookCollection[];
}

export interface AllBooksInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALBISearch;
}

interface PricesRange {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
