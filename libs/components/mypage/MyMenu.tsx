import React from 'react';
import { useRouter } from 'next/router';
import { Stack, Typography, Box, List, ListItem } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import Link from 'next/link';
import { useReactiveVar } from '@apollo/client';
import { userVar } from '../../../apollo/store';
import IconButton from '@mui/material/IconButton';
import { REACT_APP_API_URL } from '../../config';
import { logOut } from '../../auth';
import { sweetConfirmAlert } from '../../sweetAlert';

const MyMenu = () => {
	const device = useDeviceDetect();
	const router = useRouter();
	const pathname = router.query.category ?? 'myProfile';
	const category: any = router.query?.category ?? 'myProfile';
	const user = useReactiveVar(userVar);

	/** HANDLERS **/
	const logoutHandler = async () => {
		try {
			if (await sweetConfirmAlert('Do you want to logout?')) logOut();
		} catch (err: any) {
			console.log('ERROR, logoutHandler:', err.message);
		}
	};

	 if (device === 'mobile') {
        return <div>MY MENU</div>;
    }

    // Define the menu items with conditional rendering based on user role
    const menuItems = [
        { category: 'addProperty', text: 'Add Book', icon: '/img/icons/newTab.svg', activeIcon: '/img/icons/whiteTab.svg', roles: ['PUBLISHER'] },
        { category: 'myProperties', text: 'My Books', icon: '/img/icons/home.svg', activeIcon: '/img/icons/homeWhite.svg', roles: ['PUBLISHER'] },
        { category: 'recentlyVisited', text: 'Recently Visited', icon: '/img/icons/search.svg', activeIcon: '/img/icons/searchWhite.svg', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
        { category: 'myFavorites', text: 'My Favorites', icon: '/img/icons/like.svg', activeIcon: '/img/icons/likeWhite.svg', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
        { category: 'followers', text: 'My Followers', icon: '/img/icons/followers.png', activeIcon: '/img/icons/followers.png', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
        { category: 'followings', text: 'Following', icon: '/img/icons/followings.png', activeIcon: '/img/icons/followings.png', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
        { category: 'myArticles', text: 'Articles', icon: '/img/icons/discovery.svg', activeIcon: '/img/icons/discoveryWhite.svg', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
        { category: 'writeArticle', text: 'Write Article', icon: '/img/icons/newTab.svg', activeIcon: '/img/icons/whiteTab.svg', roles: ['USER', 'PUBLISHER', 'ADMIN'] },
    ];

    return (
        <Stack direction="row" width="100%" spacing={2} className="pcWrap">
            {/* Left Side: Profile Image */}
            <Stack
                direction="column"
                spacing={1}
                sx={{
                    width: '150px',
                    padding: '16px',
                    backgroundColor: '#f5f5f5',
                    borderRight: '1px solid #ddd',
                }}
                className="leftConfig"
            >
                <Box
                    component="div"
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        mb: 2,
                    }}
                    className="profile"
                >
                    <div className="profileImg">
                        <img
                            src={user?.memberImage ? `${REACT_APP_API_URL}/${user?.memberImage}` : '/img/profile/defaultUser.svg'}
                            alt="Profile"
                            style={{ borderRadius: '50%', width: '80px', height: '80px' }}
                        />
                    </div>
                </Box>
                <Typography variant="h6" align="center" sx={{ marginBottom: '8px' }} className="userName">
                    {user?.memberNick}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }} className="userPhone">
                    <img src="/img/icons/call.svg" alt="phone" style={{ marginRight: '4px' }} />
                    <Typography variant="body2">{user?.memberPhone}</Typography>
                </Box>
                {/* Centered List */}
                <Stack spacing={1} sx={{ alignItems: 'center' }}>
                    <List sx={{ textAlign: 'center' }}>
                        <ListItem sx={{ padding: 0 }}>
                            <Link href="/_admin/users" target="_blank" style={{ textDecoration: 'none' }}>
                                <Typography variant="subtitle2" color={user?.memberType === 'AGENT' ? 'primary' : 'inherit'}>
                                    {user?.memberType}
                                </Typography>
                            </Link>
                        </ListItem>
                    </List>
                </Stack>
            </Stack>

            {/* Right Side: Menu and Buttons */}
            <Stack direction="column" spacing={2} sx={{ flex: 1, padding: '10px' }}>
                {/* Top Buttons */}
                <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Link href={{ pathname: '/mypage', query: { category: 'myProfile' } }} passHref>
                        <IconButton
                            sx={{
                                borderRadius: '50%',
                                bgcolor: pathname === 'myProfile' ? '#018675' : 'transparent',
                                width: '150px',
                                height: '50px',
                                '&:hover': {
                                    bgcolor: '#018675',
                                },
                            }}
                        >
                            <Typography variant="body2" color={pathname === 'myProfile' ? 'white' : 'inherit'}>
                                My Profile
                            </Typography>
                        </IconButton>
                    </Link>
                    <IconButton
                        onClick={logoutHandler}
                        sx={{
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                            '&:hover': {
                                bgcolor: '#018675',
                            },
                        }}
                    >
                        <Typography variant="body2">Logout</Typography>
                    </IconButton>
                </Stack>

                {/* Menu Items */}
                <List sx={{ display: 'flex', flexDirection: 'row', padding: 0, gap: '0px' }}>
                    {menuItems
                        .filter((item) => item.roles.includes(user?.memberType)) // Only show items matching the user's role
                        .map(({ category: itemCategory, text, icon, activeIcon }) => (
                            <ListItem
                                key={itemCategory}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    padding: 0,
                                    borderRadius: '50%',
                                    bgcolor: category === itemCategory ? '#018675' : 'transparent',
                                    width: '130px', // Increase button width
                                    height: '50px', // Increase button height
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    '&:hover': {
                                        bgcolor: '#018675',
                                    },
                                    transition: 'background-color 0.3s ease',
                                }}
                                className="subSection"
                            >
                                <Link href={{ pathname: '/mypage', query: { category: itemCategory } }} passHref>
                                    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', height: '100%' }}>
                                        <img
                                            src={category === itemCategory ? activeIcon : icon}
                                            alt={text}
                                            style={{ width: '22px', height: '22px' }} // Increase icon size
                                        />
                                        <Typography variant="subtitle1" color={category === itemCategory ? 'white' : 'inherit'} sx={{ fontSize: '14px' }}>
                                            {text}
                                        </Typography>
                                    </Stack>
                                </Link>
                            </ListItem>
                        ))}
                </List>
            </Stack>
        </Stack>
    );
};

export default MyMenu;
