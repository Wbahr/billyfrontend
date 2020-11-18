import {useRef, useEffect} from 'react'
import XLSX from "xlsx"
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export const getRidOf__typename = ({__typename, editors, items, ...rest}) => (
	{ ...rest, editors: editors.map(({__typename, ...rest1}) => rest1), items: items.map(({__typename, ...rest2}) => rest2) }
)

export const getCsvFormattedData = (data, columns, ignoreCols) => {
	const filterCols = ({accessor}) => !ignoreCols.includes(accessor)
	return [
		columns.filter(filterCols).map(({Header}) => Header),
		...data.map(d => columns.filter(filterCols).map(({accessor}) => d[accessor]))
	]
}

export const exportToExcel = (data, columns, name, ignoreCols=[]) => {
	const excelFormat = getCsvFormattedData(data, columns, ignoreCols)
	const worksheet = XLSX.utils.aoa_to_sheet(excelFormat)
	const workBook = XLSX.utils.book_new();
	XLSX.utils.book_append_sheet(workBook, worksheet, name);
	XLSX.writeFile(workBook, `${name}.xlsx`)
}

export const exportToPdf = (data, columns, name, ignoreCols=[]) => {
	const filterCols = ({accessor}) => !ignoreCols.includes(accessor)
	const pdfFormat = {
		head: [columns.filter(filterCols).map(({Header}) => Header)],
		body: data.map(d => columns.filter(filterCols).map(({accessor}) => d[accessor]))
	}
	const doc = new jsPDF()
	doc.autoTable(pdfFormat)
	doc.save(`${name}.pdf`)
}

export const getImagePath = path => {
	return path
		? '//' + path
		: 'https://www.airlinehyd.com/images/no-image.jpg';
}

const ImageTypes = {
	Original: 0,
	Large: 1,
	Zoom: 2,
	Thumbnail: 3,
}
const MediaType_Image = 0;

const getTypeImage = (itemDetails, type) => itemDetails?.image?.filter(i => i.itemMediaType === type
	&& i.mediaType === MediaType_Image && i.sequence === 1)?.[0]

export const getThumbnailImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Large)?.path);

export const getLargeImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Large)?.path);

export const getOriginalImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Original)?.path);

export const buildSearchString = ({
 searchTerm,
 sortType='relevancy',
 nonweb='false',
 innerSearchTerms,
 parentCategory,
 childCategory,
 brands,
 resultPage='1',
	...attributes
}) => {
	return convertObjectToSearchQuery({searchTerm, sortType, nonweb, innerSearchTerms, parentCategory,
		childCategory, brands, resultPage, ...attributes})
}

const convertObjectToSearchQuery = object => {
	return `/search?${Object.keys(object).filter(key => object[key]).map(key => {
		return `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`
	}).join('&')}`
}

export const logout = () => {
	const keysToRemove = ['userInfo', 'apiToken', 'shoppingCartToken', 'imperInfo']
	keysToRemove.forEach(key => localStorage.removeItem(key))
}

export const useDidUpdateEffect = (create, deps) => {
	const didMountRef = useRef(false);
	
	useEffect(() => {
		if (didMountRef.current)
			create();
		else
			didMountRef.current = true;
	}, deps);
}

export function onWindowResize(callback) {
	window.addEventListener('resize', callback)
	return () => window.removeEventListener('resize', callback)
}