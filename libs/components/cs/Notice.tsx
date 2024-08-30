import React, { useEffect, useState } from 'react';
import { Stack, Box } from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { GET_NOTICES } from '../../../apollo/user/query';
import { useQuery } from '@apollo/client';


interface Notice {
	_id: string;
	noticeCategory: string;
	noticeStatus: string;
	noticeTitle: string;
	noticeContent: string;
	memberId: string;
	createdAt: string;
	updatedAt: string;
  }
  
  interface GetNoticesData {
	getNotices: {
	  list: Notice[];
	};
  }
  
  interface GetNoticesVars {
	input: {
		page: 1,
		limit: 5,
	};
  }
  
  const Notice = () => {
	const device = useDeviceDetect();
	const [notices, setNotices] = useState<Notice[]>([]);
	const { loading, error, data, refetch } = useQuery<GetNoticesData, GetNoticesVars>(GET_NOTICES, {
	  fetchPolicy: 'network-only',
	  variables: { input: {page: 1,
		limit: 5,} }, // Replace with actual input if needed
	  notifyOnNetworkStatusChange: true,
	  onCompleted: (data) => {
		setNotices(data?.getNotices?.list);
	  },
	});
  
	useEffect(() => {
	  if (error) {
		console.error('Error fetching notices:', error.message);
	  }
	}, [error]);
  
	if (loading) {
	  return <div>Loading...</div>;
	}
  
	if (device === 'mobile') {
	  return <div>NOTICE MOBILE</div>;
	} else {
	  return (
		<Stack className={'notice-content'}>
		  <span className={'title'}>Notice</span>
		  <Stack className={'main'}>
			<Box component={'div'} className={'top'}>
			  <span>number</span>
			  <span>title</span>
			  <span>date</span>
			</Box>
			<Stack className={'bottom'}>
			{notices.map((ele, index) => (
              <div className={`notice-card ${ele.noticeStatus === 'event' && 'event'}`} key={ele._id}>
                {ele.noticeStatus === 'event' ? <div>event</div> : <span className={'notice-number'}>{index + 1}</span>}
				  <span className={'notice-title'}>{ele.noticeTitle}</span>
				  <span className={'notice-content'}>{ele.noticeContent}</span>

				  <span className={'notice-date'}>{new Date(ele.createdAt).toLocaleDateString()}</span>
				</div>
			  ))}
			</Stack>
		  </Stack>
		</Stack>
	  );
	}
  };
  
  export default Notice;