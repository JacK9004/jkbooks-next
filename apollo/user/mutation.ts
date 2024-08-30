import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
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

export const LOGIN = gql`
		mutation Login($input: LoginInput!) {
		login(input: $input) {
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

export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
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

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
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
 *         BOOK        *
 *************************/

export const CREATE_BOOK = gql`
	mutation CreateBook($input: BookInput!) {
		createBook(input: $input) {
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

export const UPDATE_BOOK = gql`
	mutation UpdateBook($input: BookUpdate!) {
		updateBook(input: $input) {
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

export const LIKE_TARGET_BOOK = gql`
	mutation LikeTargetBook($input: String!) {
		likeTargetBook(bookId:$input) {
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
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
	mutation CreateBoardArticle($input: BoardArticleInput!) {
		createBoardArticle(input: $input) {
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

export const UPDATE_BOARD_ARTICLE = gql`
	mutation UpdateBoardArticle($input: BoardArticleUpdate!) {
		updateBoardArticle(input: $input) {
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

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!) {
		likeTargetBoardArticle(articleId: $input) {
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

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
		createComment(input: $input) {
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

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
		updateComment(input: $input) {
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
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input:String!) {
		subscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
		unsubscribe(input: $input) {
			_id
			followingId
			followerId
			createdAt
			updatedAt
		}
	}
`;

/**************************
 *       NOTIFICATION     *
 *************************/

export const UPDATE_NOTIFICATION = gql`
	mutation UpdateNotification($input: NotificationUpdate!) {
    updateNotification(input: $input) {
        _id
        notificationType
        notificationStatus
        notificationGroup
        notificationTitle
        notificationDesc
        authorId
        receiverId
        bookId
        articleId
       
    }
}

`;
/**************************
 *       MESSAGE     *
 *************************/

export const CREATE_MESSAGE = gql`
	mutation CreateMessage($input: MessageInput!) {
		createMessage(input: $input) {
			_id
			name
			phone
			email
			message
			bookId
			memberId
		}
	}
`;

