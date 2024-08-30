import { NotificationGroup, NotificationStatus, NotificationType } from "../../enums/notification.enum";
import { TotalCounter } from "../book/book";
import { Member } from "../member/member";


export interface NotificationDto {
	_id:string
	notificationType?: NotificationType;
	notificationStatus?: NotificationStatus
	notificationGroup?: NotificationGroup;
	notificationTitle: string;
	notificationDesc?: string;
	authorId: string;
	receiverId: string;
	bookId?: string;
	articleId?: string;
	date: string | number | Date;
    
	/** from aggregation **/

	memberData?: Member[];
}

export interface Notifications {
	list: NotificationDto[];
	metaCounter: TotalCounter[];
}