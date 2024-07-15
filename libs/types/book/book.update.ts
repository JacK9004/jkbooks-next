import { AgeCategory, BookCollection, BookLanguage, BookStatus, BookType } from '../../enums/book.enum';

export interface PropertyUpdate {
	_id: string;
    bookType?: BookType;
	bookStatus?: BookStatus;
    bookCollection?: BookCollection;
    ageCategory?: AgeCategory;
    bookTitle?: string;
    bookAuthor?: string;
    bookPrice?: number;
    bookDate?: string;
    bookISBN?: string;
    bookPages?: number;
    bookLanguages?: BookLanguage[];
    bookDesc?: string;
    bookImages?: string[];
    bookRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
    discontinuedAt?: Date;
}
