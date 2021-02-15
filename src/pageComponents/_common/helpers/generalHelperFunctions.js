import { useRef, useEffect, useState } from 'react'

export const getRidOf__typename = ({ __typename, editors, items, ...rest }) => (
    { ...rest, editors: editors.map(({ __typename, ...rest1 }) => rest1), items: items.map(({ __typename, ...rest2 }) => rest2) }
)

export const distinct = (obj, idx, self) => self.findIndex(ele => !Object.keys(obj).find(key => ele[key] !== obj[key])) === idx

export const getCsvFormattedData = (data, columns, ignoreCols) => {
    const filterCols = ({ accessor }) => !ignoreCols.includes(accessor)
    return [
        columns.filter(filterCols).map(({ Header }) => Header),
        ...data.map(d => columns.filter(filterCols).map(({ accessor }) => d[accessor]))
    ]
}

export const exportToExcel = (data, columns, name, ignoreCols=[]) => {
    import('xlsx').then(XLSX => {
        const excelFormat = getCsvFormattedData(data, columns, ignoreCols)
        const worksheet = XLSX.utils.aoa_to_sheet(excelFormat)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, worksheet, name)
        XLSX.writeFile(workBook, `${name}.xlsx`)
    })
}

export const exportToPdf = (data, columns, name, ignoreCols=[]) => {
    import('jspdf').then(jsPDF => {
        import('jspdf-autotable').then(() => {
            const filterCols = ({ accessor }) => !ignoreCols.includes(accessor)
            const pdfFormat = {
                head: [columns.filter(filterCols).map(({ Header }) => Header)],
                body: data.map(d => columns.filter(filterCols).map(({ accessor }) => d[accessor]))
            }
            const doc = new jsPDF()
            doc.autoTable(pdfFormat)
            doc.save(`${name}.pdf`)
        })
    })
}

export const getImagePath = path => {
    return path
        ? '//' + path
        : 'https://www.airlinehyd.com/images/no-image.jpg'
}

const ImageTypes = {
    Original: 0,
    Large: 1,
    Zoom: 2,
    Thumbnail: 3,
}
const MediaType_Image = 0

const firstMatchingImageType = type => i => i.itemMediaType === type && i.mediaType === MediaType_Image && i.sequence === 1
const firstImage = i => i.mediaType === MediaType_Image && i.sequence === 1

const getTypeImage = (itemDetails, type) => {
    return itemDetails?.itemMedia?.find(firstMatchingImageType(type)) || itemDetails?.itemMedia?.find(firstImage)
}

//TODO: Change this back to ImageTypes.Thumbnail once the thumbnail images are loaded properly
//John changed this to ImageTypes.Large because the thumbnail images weren't loading.
export const getThumbnailImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Large)?.path)

export const getLargeImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Large)?.path)

export const getOriginalImagePath = itemDetails => getImagePath(getTypeImage(itemDetails, ImageTypes.Original)?.path)

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
    return convertObjectToSearchQuery({ searchTerm, sortType, nonweb, innerSearchTerms, parentCategory,
        childCategory, brands, resultPage, ...attributes })
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

export const useDidUpdateEffect = (create, deps) => { //Does not trigger on mount, only on successive re-renders
    const didMountRef = useRef(false)

    useEffect(() => {
        if (didMountRef.current)
            create()
        else
            didMountRef.current = true
    }, deps)
}

export function onWindowResize(callback) {
    window.addEventListener('resize', callback)
    return () => window.removeEventListener('resize', callback)
}

export const getAvailabilityMessage = (quantity, availability, leadTimeDays) => {
    return quantity > (availability || 0)
        ? (
            (leadTimeDays || 0)
                ? `Lead time ${availability?.leadTimeDays || 25} days`
                : 'Call Airline Hydraulics Co. for lead time'
        )
        : ''
}

export const useDebounceValue = (value, time = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedValue(value), time)
        return () => clearTimeout(timeout)
    }, [value, time])

    return debouncedValue
}

export const cleanSearchState = ({ searchState: { brands, attributes, parentCategories, childCategories } }) => {
    const removeTypeName = ({ __typename, ...rest }) => rest
    return {
        brands: brands?.map(removeTypeName) || [],
        attributes: attributes?.map(({ __typename, features, ...rest }) => ({ ...rest, features: features.map(removeTypeName) })) || [],
        parentCategories: parentCategories?.map(removeTypeName) || [],
        childCategories: childCategories?.map(removeTypeName) || []
    }
}

export const evaluate = (object, key) => key.split('.').reduce((accum, curVal) => accum && accum[curVal], object)

export function scrollHorizontal(element, change, duration) {
    const start = element.scrollLeft
    let currentTime = 0
    const increment = 20

    const animateScroll = () => {
        currentTime += increment
        element.scrollLeft = Math.easeInOutQuad(currentTime, start, change, duration)
        if (currentTime < duration) {
            setTimeout(animateScroll, increment)
        }
    }
    animateScroll()
}

export const cartHasZeroPricedItem = (cart, itemPrices) => {
    if (cart?.length || !itemPrices?.length){
        return false
    }

    return (cart || []).some(cartItem => {
        const itemPrice = itemPrices?.find(price => price.invMastUid === cartItem.frecno)

        return itemPrice?.unitPrice === 0
    })
}

//t = current time
//s = start value
//c = change in value
//d = duration
Math.easeInOutQuad = (t, s, c, d) => {
    t /= d/2
    if (t < 1) return c/2 * t * t + s
    t--
    return -c/2 * (t * (t-2) - 1) + s
}
