import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const GET_AGENTS = gql`
	query GetAgents($input: AgentsInquiry!) {
    getAgents(input: $input) {
        list {
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
            memberBooks
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
        metaCounter {
            total
        }
    }
}

`;

export const GET_MEMBER = gql(`
 query GetMember($input: String!) {
    getMember(memberId: $input) {
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
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
        meFollowed {
            followingId
            followerId
            myFollowing
        }
    }
}

`);

/**************************
 *        BOOK        *
 *************************/

export const GET_BOOK = gql`
	query GetBook($input: String!) {
    getBook(bookId: $input) {
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
        memberData {
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
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
    }
}
`;

export const GET_BOOKS = gql`
	query GetBooks($input: BooksInquiry!) {
    getBooks(input: $input) {
        list {
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
            memberData {
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
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
        }
        metaCounter {
            total
        }
    }
}

`;

export const GET_AGENT_BOOKS = gql`
	query GetAgentBooks($input: AgentBooksInquiry!) {
    getAgentBooks(input: $input) {
        list {
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
        metaCounter {
            total
        }
    }
}
`;

export const GET_FAVORITES = gql`
	query GetFavorites($input: OrdinaryInquiry!) {
    getFavorites(input: $input) {
        list {
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
            memberData {
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
        metaCounter {
            total
        }
    }
}

`;

export const GET_VISITED = gql`
	query GetVisited($input: OrdinaryInquiry!) {
    getVisited(input: $input) {
        list {
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
            memberData {
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
        metaCounter {
            total
        }
    }
}

`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const GET_BOARD_ARTICLE = gql`
	query GetBoardArticle($input: String!) {
		getBoardArticle(articleId: $input) {
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
			memberData {
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
				memberWarnings
				memberBlocks
				memberBooks
				memberRank
				memberPoints
				memberLikes
				memberViews
				deletedAt
				createdAt
				updatedAt
			}
			meLiked {
				memberId
				likeRefId
				myFavorite
			}
		}
	}
`;

export const GET_BOARD_ARTICLES = gql`
        query GetBoardArticles($input: BoardArticlesInquiry!) {
        getBoardArticles(input: $input) {
            list {
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
                memberData {
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
                meLiked {
                    memberId
                    likeRefId
                    myFavorite
                }
            }
            metaCounter {
                total
            }
        }
    }
`;

/**************************
 *         COMMENT        *
 *************************/

export const GET_COMMENTS = gql`
	query GetComments($input: CommentsInquiry!) {
		getComments(input: $input) {
			list {
				_id
				commentStatus
				commentGroup
				commentContent
				commentRefId
				memberId
				createdAt
				updatedAt
				memberData {
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
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *         FOLLOW        *
 *************************/
export const GET_MEMBER_FOLLOWERS = gql`
	query GetMemberFollowers($input: FollowInquiry!) {
		getMemberFollowers(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followerData {
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
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

export const GET_MEMBER_FOLLOWINGS = gql`
	query GetMemberFollowings($input: FollowInquiry!) {
		getMemberFollowings(input: $input) {
			list {
				_id
				followingId
				followerId
				createdAt
				updatedAt
				followingData {
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
				meLiked {
					memberId
					likeRefId
					myFavorite
				}
				meFollowed {
					followingId
					followerId
					myFollowing
				}
			}
			metaCounter {
				total
			}
		}
	}
`;
/**************************
 *         SUPPORT        *
 *************************/

export const GET_FAQ = gql`
	query GetFaq($input: String!) {
		getFaq(faqId: $input) {
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

export const GET_FAQS = gql`
	query GetFaqs($input: FaqInquiry!) {
		getFaqs(input: $input) {
			list {
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
			metaCounter {
				total
			}
		}
	}
`;
export const GET_NOTICES = gql`
	query GetNotices($input: NoticeInquiry!) {
		getNotices(input: $input) {
			list {
				_id
				noticeCategory
				noticeStatus
				noticeTitle
				noticeContent
				memberId
				createdAt
				updatedAt
					memberData {
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
				}
			}
			metaCounter {
				total
			}
		}
	}
`;

/**************************
 *       NOTIFICATION     *
 *************************/

export const GET_NOTIFICATION = gql`
	query GetNotification($input: String!) {
		getNotification(notificationId: $input) {
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

export const GET_NOTIFICATIONS = gql`
	query GetNotifications($input: NotificationsInquiry!) {
		getNotifications(input: $input) {
			list {
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
				memberData {
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
				}
			}
			metaCounter {
				total
			}
		}
	}
`;



