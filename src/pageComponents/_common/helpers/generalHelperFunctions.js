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
	const pathSplit = path && path.split('\\')
	return path
		? 'https://www.airlinehyd.com/images/items/' + pathSplit[pathSplit.length - 1].slice(0, -5) + 'l.jpg'
		: 'https://www.airlinehyd.com/images/no-image.jpg'
}