import React, { useCallback, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useRouter, withRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { getJwtToken, logOut, updateUserInfo } from '../auth';
import { Stack, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { CaretDown } from 'phosphor-react';
import useDeviceDetect from '../hooks/useDeviceDetect';
import Link from 'next/link';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMutation, useQuery, useReactiveVar } from '@apollo/client';
import { userVar } from '../../apollo/store';
import { Logout } from '@mui/icons-material';
import { REACT_APP_API_URL } from '../config';
import HeaderFilter from './homepage/HeaderFilter';
import { NotificationDto } from '../types/notification/notification';
import { GET_NOTIFICATIONS } from '../../apollo/user/query';
import { T } from '../types/common';
import { NotificationUpdate } from '../types/notification/notification.update';
import { NotificationStatus } from '../enums/notification.enum';
import { NextPage } from 'next';
import { UPDATE_NOTIFICATION } from '../../apollo/user/mutation';


const Top : NextPage = ({ initialValues, ...props }: any) => {
	const device = useDeviceDetect();
	const user = useReactiveVar(userVar);
	const { t, i18n } = useTranslation('common');
	const router = useRouter();
	const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
	const [lang, setLang] = useState<string | null>('en');
	const drop = Boolean(anchorEl2);
	const [colorChange, setColorChange] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const [bgColor, setBgColor] = useState<boolean>(false);
	const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
	const logoutOpen = Boolean(logoutAnchor);

	// Notification state
	const [notificationAnchorEl, setNotificationAnchorEl] = useState<HTMLElement | null>(null);
	const [notifications, setNotifications] = useState<NotificationDto[]>([]);
	const notificationOpen = Boolean(notificationAnchorEl);
	const [updateData, setUpdateData] = useState<NotificationUpdate>(initialValues);

	const [hasNewNotifications, setHasNewNotifications] = useState(false);
	
	// Apollo useQuery hook for notifications

	const [updateNotification] = useMutation(UPDATE_NOTIFICATION);
	const {
		loading: notificationsLoading,
		data: notificationsData,
		error: notificationsError,
		refetch: refetchNotifications,
	} = useQuery(GET_NOTIFICATIONS, {
		fetchPolicy: 'cache-and-network',
		variables: { input: { page: 1, limit: 100, search: { receiverId: '' } } },
		skip: !notificationOpen,
		notifyOnNetworkStatusChange: true,
		onCompleted: (data) => {
			if (data?.getNotifications?.list) {
				console.log('Notifications data:', data.getNotifications.list);
				setNotifications(data?.getNotifications?.list);
			}
		},
	});
	useEffect(() => {
		if (notificationsData) {
		  console.log('Fetched notifications:', notificationsData.getNotifications.list);
		}
	  }, [notificationsData]);

	  useEffect(() => {
		if (notificationsData?.getNotifications?.list) {
		  setNotifications(notificationsData.getNotifications.list);
		  notificationsData.getNotifications.list.forEach((notification: { _id: any; }) => {
			console.log('Notification _id:', notification._id); // Check if _id is present
		  });
		}
	  }, [notificationsData]);
	useEffect(() => {
		if (!notificationOpen) {
			refetchNotifications();
		}
	}, [notificationOpen, refetchNotifications]);

	useEffect(() => {
		if (localStorage.getItem('locale') === null) {
			localStorage.setItem('locale', 'en');
			setLang('en');
		} else {
			setLang(localStorage.getItem('locale'));
		}
	}, [router]);

	useEffect(() => {
		switch (router.pathname) {
			case '/book/detail':
				setBgColor(true);
				break;
			default:
				break;
		}
	}, [router]);

	useEffect(() => {
		const jwt = getJwtToken();
		if (jwt) updateUserInfo(jwt);
	}, []);

	const langClick = (e: React.MouseEvent<HTMLElement>) => {
		setAnchorEl2(e.currentTarget);
	};

	const langClose = () => {
		setAnchorEl2(null);
	};

	const langChoice = useCallback(
		async (e: React.MouseEvent<HTMLElement>) => {
			setLang(e.currentTarget.id);
			localStorage.setItem('locale', e.currentTarget.id);
			setAnchorEl2(null);
			await router.push(router.asPath, router.asPath, { locale: e.currentTarget.id });
		},
		[router],
	);

	const changeNavbarColor = () => {
		if (window.scrollY >= 50) {
			setColorChange(true);
		} else {
			setColorChange(false);
		}
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleHover = (event: React.MouseEvent<HTMLElement>) => {
		if (anchorEl !== event.currentTarget) {
			setAnchorEl(event.currentTarget);
		} else {
			setAnchorEl(null);
		}
	};

	const handleNotificationClick = (event: React.MouseEvent<SVGSVGElement>) => {
		setNotificationAnchorEl(event.currentTarget as unknown as HTMLElement);
	};


	const handleMenuItemClick = (notification: NotificationDto) => {
		console.log('Notification:', notification); // Check if _id is present
		if (notification.articleId) {
			router.push(`/community/detail?id=${notification.articleId}`);
		} else if (notification.bookId) {
			router.push(`/book/detail?id=${notification.bookId}`);
		}
	
		if (!notification._id) {
			console.error('Notification _id is missing');
			return;
		}
	
		const updatedNotification: NotificationUpdate = {
			_id: notification._id, 
			notificationStatus: NotificationStatus.READ,
		};
	
		updateNotificationHandler(updatedNotification);
	};
	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
	};

	const updateNotificationHandler = async (updateData: NotificationUpdate) => {
		try {
			console.log('+updateData: ', updateData);
			await updateNotification({
				variables: {
					input: updateData,
				},
			});


			await refetchNotifications;
		} catch (err: any) {
			console.error('Update failed, skipping refetch.');
		}
	};
    const StyledMenu = styled((props: MenuProps) => (
		<Menu
			elevation={0}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			{...props}
		/>
	))(({ theme }) => ({
		'& .MuiPaper-root': {
			top: '109px',
			borderRadius: 6,
			marginTop: theme.spacing(1),
			minWidth: 160,
			color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
			boxShadow:
				'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
			'& .MuiMenu-list': {
				padding: '4px 0',
			},
			'& .MuiMenuItem-root': {
				'& .MuiSvgIcon-root': {
					fontSize: 18,
					color: theme.palette.text.secondary,
					marginRight: theme.spacing(1.5),
				},
				'&:active': {
					backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
				},
			},
		},
	}));

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', changeNavbarColor);
	}

	if (device == 'mobile') {
		return (
			<Stack className={'top'}>
				<Link href={'/'}>
					<div>{t('Home')}</div>
				</Link>
				<Link href={'/book'}>
					<div>{t('Books')}</div>
				</Link>
				<Link href={'/agent'}>
					<div> {t('Publishers')} </div>
				</Link>
				<Link href={'/community?articleCategory=FREE'}>
					<div> {t('Community')} </div>
				</Link>
				<Link href={'/cs'}>
					<div> {t('CS')} </div>
				</Link>
			</Stack>
		);
	} else {
		return (
			<Stack className={'navbar'}>
				<Stack className={`navbar-main ${colorChange ? 'transparent' : ''} ${bgColor ? 'transparent' : ''}`}>
					<Stack className={'container'}>
					<Box component={'div'} className={'logo-box'} style={{ overflow: 'visible' }}>
					<Link href={'/'}>
						<img
						src="/img/logo/logo.png"
						alt="Logo"
						style={{
							marginTop: '10px',
							width: '70px',
							height: '70px',
							borderRadius: '50%',
							objectFit: 'cover',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
						}}
						/>
						<span className="span1" style={{
						marginLeft: '10px',
						fontFamily: 'Papyrus',
						fontSize: '32px',
						fontWeight: 800,
						color: 'gold',
						}}>
						JK&Books
						</span>
					</Link>
					<HeaderFilter />
					</Box>

						<Box component={'div'} className={'user-box'}>
							{user?._id ? (
								<>
									<div
										className={'login-user'}
										onClick={(event: React.MouseEvent<HTMLElement>) => setLogoutAnchor(event.currentTarget)}
									>
										<img
											src={
												user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'
											}
											alt=""
										/>
									</div>

									<Menu
										id="basic-menu"
										anchorEl={logoutAnchor}
										open={logoutOpen}
										onClose={() => {
											setLogoutAnchor(null);
										}}
										sx={{ mt: '5px' }}
									>
										<MenuItem onClick={() => logOut()}>
											<Logout fontSize="small" style={{ color: 'blue', marginRight: '10px' }} />
											Logout
										</MenuItem>
									</Menu>
								</>
							) : (
								<Link href={'/account/join'}>
									<div className={'join-box'}>
										<AccountCircleOutlinedIcon />
										<span>
											{t('Login')} / {t('Register')}
										</span>
									</div>
								</Link>
							)}


							<div className={'lan-box'}>
								{user?._id && (
								<div style={{ position: 'relative', display: 'inline-block' }}>
								<NotificationsOutlinedIcon onClick={handleNotificationClick} />
								{hasNewNotifications && (
									<div
										style={{
											position: 'absolute',
											top: 0,
											right: 0,
											width: '10px',
											height: '10px',
											borderRadius: '50%',
											backgroundColor: '#42a5f5', 
										}}
									/>
								)}
										<Menu
											anchorEl={notificationAnchorEl}
											open={Boolean(notificationAnchorEl)}
											onClose={handleNotificationClose}
											PaperProps={{
												style: {
													padding:"20px",
													marginTop: '60px',
													minHeight: '400px',
													minWidth: '400px',
													maxHeight: '400px',
													width: '400px',
													whiteSpace: 'normal',
													wordWrap: 'break-word',
													borderRadius: '22px',
													background: '#E8F6F3',
												},
											}}
										>
											{' '}
											{/* <strong>Notification</strong> */}
											{!notificationsLoading && (!notifications || notifications.length === 0) && (
												<MenuItem style={{ margin: 100 }}>No notifications available</MenuItem>
											)}
											{notificationsLoading && <MenuItem>Loading...</MenuItem>}
											{notifications &&
												notifications.map((notification) => {
													const isRead = notification.notificationStatus === NotificationStatus.READ;
													const isNew = notification.notificationStatus === NotificationStatus.WAIT;
													const parseDescription = (desc:any) => {
														const parts = desc.split(/(\*\*[^*]+\*\*)/); 
														return parts.map((part:any, index:number) => {
															if (part.startsWith('**') && part.endsWith('**')) {
																return <strong key={index}>{part.slice(2, -2)}</strong>; 
															} else {
																return <span key={index}>{part}</span>;
															}
														});
													};
													return (
														<MenuItem
															key={notification._id}
															onClick={() => handleMenuItemClick(notification)}
															style={{
																whiteSpace: 'normal',
																wordWrap: 'break-word',
																backgroundColor: isRead ? 'lightgray' : 'white',
																borderRadius:20,
																padding:"20px",
																margin:15,
																
															
															}}
														>
														   <div >
                                            {isNew && (
                                                <div
                                                    style={{
                                                        width: '10px',
                                                        height: '10px',
                                                        borderRadius: '50%',
                                                        backgroundColor: '#42a5f5', 
                                                        marginRight: '20px',

                                                    }}
                                                />
                                            )}
                                            <div>
                                                <strong>{notification.notificationTitle}</strong>
												<p>{parseDescription(notification.notificationDesc)}</p>
                                            </div>
                                        </div>
                                    </MenuItem>
													);
												})}
										</Menu>
									</div>
								)}
								<Button
									disableRipple
									className="btn-lang"
									onClick={langClick}
									endIcon={<CaretDown size={14} color="#616161" weight="fill" />}
								>
									<Box component={'div'} className={'flag'}>
										{lang !== null ? (
											<img src={`/img/flag/lang${lang}.png`} alt={'usaFlag'} />
										) : (
											<img src={`/img/flag/langen.png`} alt={'usaFlag'} />
										)}
									</Box>
								</Button>

								<StyledMenu anchorEl={anchorEl2} open={drop} onClose={langClose} sx={{ position: 'absolute' }}>
									<MenuItem disableRipple onClick={langChoice} id="en">
										<img
											className="img-flag"
											src={'/img/flag/langen.png'}
											onClick={langChoice}
											id="en"
											alt={'usaFlag'}
										/>
										{t('English')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="kr">
										<img
											className="img-flag"
											src={'/img/flag/langkr.png'}
											onClick={langChoice}
											id="kr"
											alt={'koreanFlag'}
										/>
										{t('Korean')}
									</MenuItem>
									<MenuItem disableRipple onClick={langChoice} id="ru">
										<img
											className="img-flag"
											src={'/img/flag/langru.png'}
											onClick={langChoice}
											id="ru"
											alt={'russiaFlag'}
										/>
										{t('Russian')}
									</MenuItem>
								</StyledMenu>
							</div>
						</Box>
					</Stack>
					<Stack>
					<Box component={'div'} className={'router-box'}>
						<Link href={'/'}>
							<div className={router.pathname === '/' ? 'active' : ''}>{t('Home')}</div>
						</Link>
						<Link href={'/book'}>
							<div className={router.pathname === '/book' ? 'active' : ''}>{t('All Books')}</div>
						</Link>
						<Link href={'/agent'}>
							<div className={router.pathname === '/agent' ? 'active' : ''}>{t('Publishers')}</div>
						</Link>
						<Link href={'/community?articleCategory=FREE'}>
							<div className={router.pathname.startsWith('/community') ? 'active' : ''}>{t('Blog')}</div>
						</Link>
						{user?._id && (
							<Link href={'/mypage'}>
							<div className={router.pathname === '/mypage' ? 'active' : ''}>{t('My Profile')}</div>
							</Link>
						)}
						<Link href={'/cs'}>
							<div className={router.pathname === '/cs' ? 'active' : ''}>{t('Contact Us')}</div>
						</Link>
						</Box>
					</Stack>
				</Stack>
			</Stack>
		);
	}
};

export default withRouter(Top);
