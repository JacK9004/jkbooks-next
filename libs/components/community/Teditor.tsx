import React, { useMemo, useRef, useState } from 'react';
import { Box, Button, FormControl, MenuItem, Stack, Typography, Select, TextField } from '@mui/material';
import { BoardArticleCategory } from '../../enums/board-article.enum';
import { Editor } from '@toast-ui/react-editor';
import { getJwtToken } from '../../auth';
import { REACT_APP_API_URL } from '../../config';
import { useRouter } from 'next/router';
import axios from 'axios';
import { T } from '../../types/common';
import '@toast-ui/editor/dist/toastui-editor.css';
import { useMutation } from '@apollo/client';
import { CREATE_BOARD_ARTICLE } from '../../../apollo/user/mutation';
import { Message } from '../../enums/common.enum';
import { sweetErrorHandling, sweetTopSuccessAlert } from '../../sweetAlert';

const TuiEditor = () => {
	const editorRef = useRef<Editor>(null),
		token = getJwtToken(),
		router = useRouter();
	const [articleCategory, setArticleCategory] = useState<BoardArticleCategory>(BoardArticleCategory.REVIEWS);

	/** APOLLO REQUESTS **/
	const [createBoardArticle] = useMutation(CREATE_BOARD_ARTICLE);

	const memoizedValues = useMemo(() => {
		const articleTitle = '',
			articleContent = '',
			articleImage = '';

		return { articleTitle, articleContent, articleImage };
	}, []);

	/** HANDLERS **/
	const uploadImage = async (image: any) => {
		try {
			const formData = new FormData();
			formData.append(
				'operations',
				JSON.stringify({
					query: `mutation ImageUploader($file: Upload!, $target: String!) {
						imageUploader(file: $file, target: $target) 
				  }`,
					variables: {
						file: null,
						target: 'article',
					},
				}),
			);
			formData.append(
				'map',
				JSON.stringify({
					'0': ['variables.file'],
				}),
			);
			formData.append('0', image);

			const response = await axios.post(`${process.env.REACT_APP_API_GRAPHQL_URL}`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'apollo-require-preflight': true,
					Authorization: `Bearer ${token}`,
				},
			});

			const responseImage = response.data.data.imageUploader;
			console.log('=responseImage: ', responseImage);
			memoizedValues.articleImage = responseImage;

			return `${REACT_APP_API_URL}/${responseImage}`;
		} catch (err) {
			console.log('Error, uploadImage:', err);
		}
	};

	const changeCategoryHandler = (e: any) => {
		setArticleCategory(e.target.value);
	};

	const articleTitleHandler = (e: T) => {
		console.log(e.target.value);
		memoizedValues.articleTitle = e.target.value;
	};

	const handleRegisterButton = async () => {
		try {
			const editor = editorRef.current;
			const articleContent = editor?.getInstance().getHTML() as string;
			memoizedValues.articleContent = articleContent;

			if (memoizedValues.articleContent === '' && memoizedValues.articleTitle === '') {
				throw new Error(Message.INSERT_ALL_INPUTS);
			}
			await createBoardArticle({
				variables: {
					input: { ...memoizedValues, articleCategory },
				},
			});

			await sweetTopSuccessAlert('Article is created successfully', 700);
			await router.push({
				pathname: 'mypage',
				query: {
					category: 'myArticles',
				},
			});
		} catch (err: any) {
			console.log(err);
			sweetErrorHandling(new Error(Message.INSERT_ALL_INPUTS)).then();
		}
	};

	const doDisabledCheck = () => {
		if (memoizedValues.articleContent === '' || memoizedValues.articleTitle === '') {
			return true;
		}
	};

	return (
		<Stack>
			<Stack
			direction="column"
			style={{
				margin: '10px auto',
				width: '1300px',
				padding: '20px',
				border: '1px solid #ccc',
				borderRadius: '8px',
				background: '#f9f9f9',
			}}
			>
			<Box
				component={'div'}
				className={'form_row'}
				style={{
				marginBottom: '20px',
				width: '100%',
				}}
			>
				<Typography style={{ color: '#7f838d', marginBottom: '10px' }} variant="h6">
				Category
				</Typography>
				<FormControl
				sx={{
					width: '100%',
					background: 'white',
					'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: '#ccc', 
					},
					'&:hover fieldset': {
						borderColor: '#ccc', 
					},
					'&.Mui-focused fieldset': {
						borderColor: '#E8F6F3',
					},
					},
					'& .MuiSelect-select:focus': {
					backgroundColor: 'transparent', 
					},
				}}
				>
				<Select
					value={articleCategory}
					onChange={changeCategoryHandler}
					displayEmpty
					inputProps={{ 'aria-label': 'Without label' }}
				>
					<MenuItem value={BoardArticleCategory.REVIEWS}>
					<span>REVIEWS</span>
					</MenuItem>
					<MenuItem value={BoardArticleCategory.INTERVIEWS}>INTERVIEWS</MenuItem>
					<MenuItem value={BoardArticleCategory.NEWS}>NEWS</MenuItem>
					<MenuItem value={BoardArticleCategory.EVENTS}>EVENTS</MenuItem>
				</Select>
				</FormControl>
			</Box>

			<Box
				component={'div'}
				className={'form_row'}
				style={{
				width: '100%',
				}}
			>
				<Typography style={{ color: '#7f838d', marginBottom: '10px' }} variant="h6">
				Title
				</Typography>
				<TextField
				onChange={articleTitleHandler}
				id="filled-basic"
				label="Type Title"
				variant="outlined"
				sx={{
					width: '100%',
					background: 'white',
					'& .MuiOutlinedInput-root': {
					'& fieldset': {
						borderColor: '#ccc', 
					},
					'&:hover fieldset': {
						borderColor: '#ccc', 
					},
					'&.Mui-focused fieldset': {
						borderColor: '#E8F6F3', 
					},
					},
				}}
				/>
			</Box>
			</Stack>

			<Editor
				initialValue={'Type here'}
				placeholder={'Type here'}
				previewStyle={'vertical'}
				height={'640px'}
				// @ts-ignore
				initialEditType={'WYSIWYG'}
				toolbarItems={[
					['heading', 'bold', 'italic', 'strike'],
					['image', 'table', 'link'],
					['ul', 'ol', 'task'],
				]}
				ref={editorRef}
				hooks={{
					addImageBlobHook: async (image: any, callback: any) => {
						const uploadedImageURL = await uploadImage(image);
						callback(uploadedImageURL);
						return false;
					},
				}}
				events={{
					load: function (param: any) {},
				}}
			/>

			<Stack direction="row" justifyContent="center">
			<Button
				variant="contained"
				sx={{ 
					backgroundColor: '#018675',
					color: 'white', // Text color
					'&:hover': {
					backgroundColor: '#016A59', // Slightly darker shade for hover effect
					},
					margin: '30px',
					width: '250px',
					height: '45px'
				}}
				onClick={handleRegisterButton}
				>
				Register
			</Button>
			</Stack>
		</Stack>
	);
};

export default TuiEditor;
