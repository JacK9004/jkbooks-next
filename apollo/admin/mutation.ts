import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const UPDATE_MEMBER_BY_ADMIN = gql`
	mutation UpdateMemberByAdmin($input: MemberUpdate!) {
		updateMemberByAdmin(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberBooks
			memberArticles
			memberFollowers
			memberFollowings
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        BOOK       *
 *************************/

export const UPDATE_BOOK_BY_ADMIN = gql`
	mutation UpdateBookByAdmin($input: BookUpdate!) {
		updateBookByAdmin(input: $input) {
			_id
			bookType
			bookStatus
			bookCollection
			ageCategory
			bookTitle
			bookAuthor
			bookPrice
			bookDate
			bookISBN
			bookPages
			bookLanguages
			bookViews
			bookLikes
			bookComments
			bookRank
			bookImages
			bookDesc
			bookRent
			memberId
			soldAt
			deletedAt
			discontinuedAt
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOOK_BY_ADMIN = gql`
	mutation RemoveBookByAdmin($input: String!) {
		removeBookByAdmin(bookId: $input) {
			_id
			bookType
			bookStatus
			bookCollection
			ageCategory
			bookTitle
			bookAuthor
			bookPrice
			bookDate
			bookISBN
			bookPages
			bookLanguages
			bookViews
			bookLikes
			bookComments
			bookRank
			bookImages
			bookDesc
			bookRent
			memberId
			soldAt
			deletedAt
			discontinuedAt
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const UPDATE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation UpdateBoardArticleByAdmin($input: BoardArticleUpdate!) {
		updateBoardArticleByAdmin(input: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleComments
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_BOARD_ARTICLE_BY_ADMIN = gql`
	mutation RemoveBoardArticleByAdmin($input: String!) {
		removeBoardArticleByAdmin(articleId: $input) {
			_id
			articleCategory
			articleStatus
			articleTitle
			articleContent
			articleImage
			articleViews
			articleLikes
			articleComments
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         COMMENT        *
 *************************/

export const REMOVE_COMMENT_BY_ADMIN = gql`
	mutation RemoveCommentByAdmin($input: String!) {
		removeCommentByAdmin(commentId: $input) {
			_id
			commentStatus
			commentGroup
			commentContent
			commentRefId
			memberId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *         SUPPORT        *
 *************************/

export const CREATE_FAQ_BY_ADMIN = gql`
	mutation CreateFaqByAdmin($input: FaqInput!) {
		createFaqByAdmin(input: $input) {
			_id
			faqCategory
			faqStatus
			faqTitle
			faqContent
			faqViews
			memberId
			createdAt
			updatedAt
		}
	}
`;
export const UPDATE_FAQ_BY_ADMIN = gql`
	mutation UpdateFaqByAdmin($input: FaqUpdate!) {
		updateFaqByAdmin(faqId: $input) {
			_id
			faqCategory
			faqStatus
			faqTitle
			faqContent
			faqViews
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_FAQ_BY_ADMIN = gql`
	mutation RemoveFaqByAdmin($input: String!) {
		removeFaqByAdmin(faqId: $input) {
			_id
			faqCategory
			faqStatus
			faqTitle
			faqContent
			faqViews
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const CREATE_NOTICE_BY_ADMIN = gql`
	mutation CreateNoticeByAdmin($input: NoticeInput!) {
		createNoticeByAdmin(input: $input) {
			_id
			noticeCategory
			noticeStatus
			noticeTitle
			noticeContent
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const UPDATE_NOTICE_BY_ADMIN = gql`
	mutation UpdateNoticeByAdmin($input: NoticeUpdate!) {
		updateNoticeByAdmin(noticeId: $input) {
			_id
			noticeCategory
			noticeStatus
			noticeTitle
			noticeContent
			memberId
			createdAt
			updatedAt
		}
	}
`;

export const REMOVE_NOTICE_BY_ADMIN = gql`mutation RemoveNoticeByAdmin($input:String!) {
    removeNoticeByAdmin(noticeId: $input) {
        _id
        noticeCategory
        noticeStatus
        noticeTitle
        noticeContent
        memberId
        createdAt
        updatedAt
    }
}
`
