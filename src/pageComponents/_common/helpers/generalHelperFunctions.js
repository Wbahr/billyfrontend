import _ from 'lodash'
import XLSX from "xlsx";
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function emailIsValid (email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function requiredField(value) {
	let valid = true
	if (_.isNil(value)) {
		valid = false
	} else if (value.length === 0) {
		valid = false
	}
	return valid
}

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

const ItemMediaType_Large = 1;
const ItemMediaType_Thumbnail = 3;
const MediaType_Image = 0;

export const getThumbnailImagePath = itemDetails => {
    const resultImage = itemDetails?.image?.filter(i => i.itemMediaType === ItemMediaType_Thumbnail && i.mediaType === MediaType_Image && i.sequence === 1)?.[0];
    return getImagePath(resultImage?.path);
}

export const getLargeImagePath = itemDetails => {
    const resultImage = itemDetails?.image?.filter(i => i.itemMediaType === ItemMediaType_Large && i.mediaType === MediaType_Image && i.sequence === 1)?.[0];
    return getImagePath(resultImage?.path);
}

export const buildSearchString = (searchTerm, sortType='relevancy', searchAsCustomer='false') => {
	return `/search/?
	searchTerm=${encodeURIComponent(searchTerm)}
	&sortType=${encodeURIComponent(sortType)}
	&nonweb=${encodeURIComponent(searchAsCustomer)}
	&resultSize=24
	&resultPage=1`
}

export const logout = () => {
	const keysToRemove = ['userInfo', 'apiToken', 'shoppingCartToken', 'imperInfo']
	keysToRemove.forEach(key => localStorage.removeItem(key))
}