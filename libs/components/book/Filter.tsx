import React, { useCallback, useEffect, useState } from 'react';
import {
	Stack,
	Typography,
	Checkbox,
	Button,
	OutlinedInput,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Tooltip,
	IconButton,
} from '@mui/material';
import useDeviceDetect from '../../hooks/useDeviceDetect';
import { useRouter } from 'next/router';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import { BooksInquiry } from '../../types/book/book.input';
import { AgeCategory, BookCollection, BookLanguage, BookType } from '../../enums/book.enum';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: '200px',
		},
	},
};

interface FilterType {
	searchFilter: BooksInquiry;
	setSearchFilter: any;
	initialInput: BooksInquiry;
}

const Filter = (props: FilterType) => {
	const { searchFilter, setSearchFilter, initialInput } = props;
	const device = useDeviceDetect();
	const router = useRouter();
	const [bookCollection, setBookCollection] = useState<BookCollection[]>(Object.values(BookCollection));
	const [bookType, setBookType] = useState<BookType[]>(Object.values(BookType));
	const [searchText, setSearchText] = useState<string>('');
	const [showMore, setShowMore] = useState<boolean>(false);
	

		/** LIFECYCLES **/
		useEffect(() => {
			if (searchFilter?.search?.collectionList?.length == 0) {
				delete searchFilter.search.collectionList;
				setShowMore(false);
				router
					.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					)
					.then();
			}
	
			if (searchFilter?.search?.typeList?.length == 0) {
				delete searchFilter.search.typeList;
				router
					.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					)
					.then();
			}
	
			if (searchFilter?.search?.ageList?.length == 0) {
				delete searchFilter.search.ageList;
				router
					.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					)
					.then();
			}
	
			// if (searchFilter?.search?.options?.length == 0) {
			// 	delete searchFilter.search.options;
			// 	router
			// 		.push(
			// 			`/book?input=${JSON.stringify({
			// 				...searchFilter,
			// 				search: {
			// 					...searchFilter.search,
			// 				},
			// 			})}`,
			// 			`/book?input=${JSON.stringify({
			// 				...searchFilter,
			// 				search: {
			// 					...searchFilter.search,
			// 				},
			// 			})}`,
			// 			{ scroll: false },
			// 		)
			// 		.then();
			// }
	
			if (searchFilter?.search?.languageList?.length == 0) {
				delete searchFilter.search.languageList;
				router
					.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
							},
						})}`,
						{ scroll: false },
					)
					.then();
			}
	
			if (searchFilter?.search?.collectionList) setShowMore(true);
		}, [searchFilter]);

	/** HANDLERS **/
	const bookCollectionSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, collectionList: [...(searchFilter?.search?.collectionList || []), value] },
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, collectionList: [...(searchFilter?.search?.collectionList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.collectionList?.includes(value)) {
					await router.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								collectionList: searchFilter?.search?.collectionList?.filter((item: string) => item !== value),
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								collectionList: searchFilter?.search?.collectionList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('bookCollectionSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, bookCollectionSelectHandler:', err);
			}
		},
		[searchFilter],
	);
	
	const bookTypeSelectHandler = useCallback(
		async (e: any) => {
			try {
				const isChecked = e.target.checked;
				const value = e.target.value;
				if (isChecked) {
					await router.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: { ...searchFilter.search, typeList: [...(searchFilter?.search?.typeList || []), value] },
						})}`,
						{ scroll: false },
					);
				} else if (searchFilter?.search?.typeList?.includes(value)) {
					await router.push(
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						`/book?input=${JSON.stringify({
							...searchFilter,
							search: {
								...searchFilter.search,
								typeList: searchFilter?.search?.typeList?.filter((item: string) => item !== value),
							},
						})}`,
						{ scroll: false },
					);
				}

				if (searchFilter?.search?.typeList?.length == 0) {
					alert('error');
				}

				console.log('bookTypeSelectHandler:', e.target.value);
			} catch (err: any) {
				console.log('ERROR, bookTypeSelectHandler:', err);
			}
		},
		[searchFilter],
	);

	const languageSelectHandler = useCallback(
		async (languageType: BookLanguage| null) => {
		 try {
		  let newSearchFilter = { ...searchFilter };
	  
		  if (languageType !== null) {
		   if (searchFilter?.search?.languageList?.includes(languageType)) {
			newSearchFilter = {
			 ...searchFilter,
			 search: {
			  ...searchFilter.search,
			  languageList: searchFilter?.search?.languageList?.filter((item: BookLanguage) => item !== languageType),
			 },
			};
		   } else {
			newSearchFilter = {
			 ...searchFilter,
			 search: {
			  ...searchFilter.search,
			  languageList: [...(searchFilter?.search?.languageList || []), languageType],
			 },
			};
		   }
		  } else {
		   delete newSearchFilter.search.languageList;
		  }
	  
		  setSearchFilter(newSearchFilter);
	  
		  await router.push(`/book?input=${JSON.stringify(newSearchFilter)}`, undefined, { scroll: false });
	  
		  console.log('booklanguageSelectHandler:', languageType);
		 } catch (err: any) {
		  console.log('ERROR, languageSelectHandler:', err);
		 }
		},
		[searchFilter],
	   );

	   const ageSelectHandler = useCallback(
		async (ageType: AgeCategory| null) => {
		 try {
		  let newSearchFilter = { ...searchFilter };
	  
		  if (ageType !== null) {
		   if (searchFilter?.search?.ageList?.includes(ageType)) {
			newSearchFilter = {
			 ...searchFilter,
			 search: {
			  ...searchFilter.search,
			  ageList: searchFilter?.search?.ageList?.filter((item: AgeCategory) => item !== ageType),
			 },
			};
		   } else {
			newSearchFilter = {
			 ...searchFilter,
			 search: {
			  ...searchFilter.search,
			  ageList: [...(searchFilter?.search?.ageList || []), ageType],
			 },
			};
		   }
		  } else {
		   delete newSearchFilter.search.ageList;
		  }
	  
		  setSearchFilter(newSearchFilter);
	  
		  await router.push(`/book?input=${JSON.stringify(newSearchFilter)}`, undefined, { scroll: false });
	  
		  console.log('ageSelectHandler:', ageType);
		 } catch (err: any) {
		  console.log('ERROR, ageSelectHandler:', err);
		 }
		},
		[searchFilter],
	   );
	  

	// const bookOptionSelectHandler = useCallback(
	// 	async (e: any) => {
	// 		try {
	// 			const isChecked = e.target.checked;
	// 			const value = e.target.value;
	// 			if (isChecked) {
	// 				await router.push(
	// 					`/book?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
	// 					})}`,
	// 					`/book?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: { ...searchFilter.search, options: [...(searchFilter?.search?.options || []), value] },
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			} else if (searchFilter?.search?.options?.includes(value)) {
	// 				await router.push(
	// 					`/book?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							options: searchFilter?.search?.options?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					`/book?input=${JSON.stringify({
	// 						...searchFilter,
	// 						search: {
	// 							...searchFilter.search,
	// 							options: searchFilter?.search?.options?.filter((item: string) => item !== value),
	// 						},
	// 					})}`,
	// 					{ scroll: false },
	// 				);
	// 			}

	// 			console.log('bookOptionSelectHandler:', e.target.value);
	// 		} catch (err: any) {
	// 			console.log('ERROR, bookOptionSelectHandler:', err);
	// 		}
	// 	},
	// 	[searchFilter],
	// );

	const bookPriceHandler = useCallback(
		async (value: number, type: string) => {
			if (type == 'start') {
				await router.push(
					`/book?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					`/book?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, start: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			} else {
				await router.push(
					`/book?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					`/book?input=${JSON.stringify({
						...searchFilter,
						search: {
							...searchFilter.search,
							pricesRange: { ...searchFilter.search.pricesRange, end: value * 1 },
						},
					})}`,
					{ scroll: false },
				);
			}
		},
		[searchFilter],
	);

	const refreshHandler = async () => {
		try {
			setSearchText('');
			await router.push(
				`/book?input=${JSON.stringify(initialInput)}`,
				`/book?input=${JSON.stringify(initialInput)}`,
				{ scroll: false },
			);
		} catch (err: any) {
			console.log('ERROR, refreshHandler:', err);
		}
	};

	if (device === 'mobile') {
		return <div>BOOKS FILTER</div>;
	} else {
		return (
			<Stack className={'filter-main'}>
				<Stack className={'find-your-home'} mb={'40px'}>
					<Typography className={'title-main'}>Find Your Book</Typography>
					<Stack className={'input-box'}>	
					{/* <img src={'/img/icons/search_icon.png'} alt={''} /> */}
						<OutlinedInput 
							value={searchText}
							type={'text'}
							className={'search-input'}
							placeholder={'What are you looking for?'}
							onChange={(e: any) => setSearchText(e.target.value)}
							onKeyDown={(event: any) => {
								if (event.key == 'Enter') {
									setSearchFilter({
										...searchFilter,
										search: { ...searchFilter.search, text: searchText },
									});
								}
							}}
							endAdornment={
								<>
									<CancelRoundedIcon
										onClick={() => {
											setSearchText('');
											setSearchFilter({
												...searchFilter,
												search: { ...searchFilter.search, text: '' },
											});
										}}
									/>
								</>
							}
						/>
				
						<Tooltip title="Reset">
							<IconButton onClick={refreshHandler}>
								<RefreshIcon />
							</IconButton>
						</Tooltip>
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<Typography className={'title'}>Book Types</Typography>
					{bookType.map((type: string) => (
						<Stack className={'input-box'} key={type}>
							<Checkbox
								id={type}
								className="property-checkbox"
								color="default"
								size="small"
								value={type}
								onChange={bookTypeSelectHandler}
								checked={(searchFilter?.search?.typeList || []).includes(type as BookType)}
							/>
							<label style={{ cursor: 'pointer' }}>
								<Typography className="property_type">{type}</Typography>
							</label>
						</Stack>
					))}
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
					<p className={'title'} style={{ textShadow: '0px 3px 4px #b9b9b9' }}>
						Book Categories
					</p>
					<Stack
						className={`property-location`}
						style={{ height: showMore ? '350px' : '115px' }}
						onMouseEnter={() => setShowMore(true)}
						onMouseLeave={() => {
							if (!searchFilter?.search?.collectionList) {
								setShowMore(false);
							}
						}}
					>
						{bookCollection.map((collection: string) => {
							return (
								<Stack className={'input-box'} key={collection}>
									<Checkbox
										id={collection}
										className="property-checkbox"
										color="default"
										size="small"
										value={collection}
										checked={(searchFilter?.search?.collectionList || []).includes(collection as BookCollection)}
										onChange={bookCollectionSelectHandler}
									/>
									<label htmlFor={collection} style={{ cursor: 'pointer' }}>
										<Typography className="property-type">{collection}</Typography>
									</label>
								</Stack>
							);
						})}
					</Stack>
				</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
				<Typography className={'title'}>Kids Books</Typography>
				<Stack className="button-group">
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_0_2) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_0_2)}
					>
						0-2
					</Button>
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_2_PLUS) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_2_PLUS)}
					>
						2+
					</Button>
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_3_PLUS) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_3_PLUS)}
					>
						3+
					</Button>
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_4_PLUS) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_4_PLUS)}
					>
						4+
					</Button>
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_6_PLUS) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_6_PLUS)}
					>
						6+
					</Button>
					<Button
						className={searchFilter?.search?.ageList?.includes(AgeCategory.AGE_8_PLUS) ? 'active' : ''}
						onClick={() => ageSelectHandler(AgeCategory.AGE_8_PLUS)}
					>
						8+
					</Button>
 		 		</Stack>

				<Stack className={'find-your-home'} mb={'30px'}>
				<Typography className={'title'}>Language</Typography>
				<Stack className="button-group1">
				<Button
					className={searchFilter?.search?.languageList?.includes(BookLanguage.ENGLISH) ? 'active' : ''}
					onClick={() => languageSelectHandler(BookLanguage.ENGLISH)}
				>
					ENGLISH
				</Button>
				<Button
					className={searchFilter?.search?.languageList?.includes(BookLanguage.KOREAN) ? 'active' : ''}
					onClick={() => languageSelectHandler(BookLanguage.KOREAN)}
				>
					KOREAN
				</Button>
				<Button
					className={searchFilter?.search?.languageList?.includes(BookLanguage.RUSSIAN) ? 'active' : ''}
					onClick={() => languageSelectHandler(BookLanguage.RUSSIAN)}
				>
					RUSSIAN
				</Button>
				<Button
					className={searchFilter?.search?.languageList?.includes(BookLanguage.UZBEK) ? 'active' : ''}
					onClick={() => languageSelectHandler(BookLanguage.UZBEK)}
				>
					UZBEK
				</Button>
    		 </Stack>			
    </Stack>
				
				<Stack className={'find-your-home'}>
					<Typography className={'title'}>Price Range</Typography>
					<Stack className="square-year-input">
						<input
							type="number"
							placeholder="$ min"
							min={0}
							value={searchFilter?.search?.pricesRange?.start ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									bookPriceHandler(e.target.value, 'start');
								}
							}}
						/>
						<div className="central-divider"></div>
						<input
							type="number"
							placeholder="$ max"
							value={searchFilter?.search?.pricesRange?.end ?? 0}
							onChange={(e: any) => {
								if (e.target.value >= 0) {
									bookPriceHandler(e.target.value, 'end');
								}
							}}
						/>
					</Stack>
				</Stack>
			</Stack>
			</Stack>
		);
	}
};

export default Filter;
