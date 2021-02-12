import React, { useContext, useEffect, useMemo, useState } from 'react'
import AddedModal from './addedModal'
import styled from 'styled-components'
import Context from '../../../setup/context'
import { useDidUpdateEffect } from '../../_common/helpers/generalHelperFunctions'
import ItemResult from './itemResult'
import SkeletonItem from './skeletonItem'
import AppBarPlugin from '../plugins/AppBarPlugin'
import DrawerPlugin from '../plugins/DrawerPlugin'
import ResultSummaryPlugin from '../plugins/ResultSummaryPlugin'
import PaginationPlugin from '../plugins/PaginationPlugin'
import SortPlugin from '../plugins/SortPlugin'
import SearchTermsPlugin from '../plugins/SearchTermsPlugin'

const PLUGINS = {
    APP_BAR: AppBarPlugin,
    DRAWER: DrawerPlugin,
    RESULT_SUMMARY: ResultSummaryPlugin,
    PAGINATION: PaginationPlugin,
    SORT: SortPlugin,
    SEARCH_TERMS: SearchTermsPlugin
}

const Flex = styled.div`
	display: flex;
`

const Content = styled.div`
	flex-grow: 1;
	padding: 10px;
	overflow-x: hidden;
`

const FlexCol = styled.div`
	display: flex;
	flex-direction: column;
`

const FlexWrap = styled.div`
	display: flex;
	flex-wrap: wrap;
`

const DEFAULT_RESULT_SIZE = 24

const clonePluginAndInjectProps = (children, type, props) => {
    const findPluginType = pluginType => child => child.type === pluginType
    const foundElement = children.find(findPluginType(type))
    return foundElement ? React.cloneElement(foundElement, props) : null
}

export default (props) => {
    const { searchState, resultSize=DEFAULT_RESULT_SIZE, children } = props
    const { results, totalResults, isSearching } = searchState

    const [showAddedToCartModal, setShowAddedToCartModal] = useState(false)
    const [ottoFindPart, setOttoFindPart] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 750)

    const { userInfo, itemDetails, getItemDetails, getItemAvailabilities, itemAvailabilities, getItemPrices, impersonatedCompanyInfo, getCustomerPartNumbers } = useContext(Context)

    const childrenArray = React.Children.toArray(children)

    const AppBar = clonePluginAndInjectProps(childrenArray, PLUGINS.APP_BAR, { drawerOpen, setDrawerOpen })
    const Drawer = clonePluginAndInjectProps(childrenArray, PLUGINS.DRAWER, { drawerOpen, setDrawerOpen, isSearching })
    const Pagination = clonePluginAndInjectProps(childrenArray, PLUGINS.PAGINATION, { resultSize })
    const ResultSummary = clonePluginAndInjectProps(childrenArray, PLUGINS.RESULT_SUMMARY, { totalResults, isSearching })
    const Sort = clonePluginAndInjectProps(childrenArray, PLUGINS.SORT)
    const SearchTerms = clonePluginAndInjectProps(childrenArray, PLUGINS.SEARCH_TERMS)

    useDidUpdateEffect(() => {
        if (ottoFindPart) {
            window.drift.api?.startInteraction({ interactionId: 126679 })
        } else {
            window.drift.api?.hideChat()
        }
    }, [ottoFindPart])

    useEffect(() => {
        results.length && getItemPrices(results)
    }, [results, impersonatedCompanyInfo])

    useEffect(() => {
        if (results.length >= resultSize * 2) setOttoFindPart(true)

        const itemsWithoutDetails = results.filter(result => !itemDetails.some(detail => detail.invMastUid === result.invMastUid))
        if (itemsWithoutDetails.length) {
            getItemDetails(itemsWithoutDetails)
            getCustomerPartNumbers(itemsWithoutDetails)
        }

        const itemsWithoutAvailabilities = result => !itemAvailabilities.some(avail => avail.invMastUid === result.invMastUid)
        getItemAvailabilities(results.filter(itemsWithoutAvailabilities))
    }, [results])

    useDidUpdateEffect(() => {
        getCustomerPartNumbers(results)
    }, [userInfo])

    const handleAddedToCart = () => setShowAddedToCartModal(true)

    const handleAddedToCartModal = () => setShowAddedToCartModal(false)

    const itemSearchResults = useMemo(() => results.map(result => (
        <ItemResult
            key={result.invMastUid}
            result={result}
            details={itemDetails.find(detail => detail.invMastUid === result.invMastUid) || {}}
            addedToCart={handleAddedToCart}
        />
    )), [results, itemDetails])

    return (
        <div style={{ width: '100%' }}>
            {AppBar}

            <Flex>
                {Drawer}

                <Content>
                    <FlexCol>
                        {ResultSummary}

                        {SearchTerms}

                        {Sort}

                        {Pagination}
                    </FlexCol>

                    <FlexWrap>
                        {isSearching && <LoadingItems/>}
                        {!isSearching && itemSearchResults}
                    </FlexWrap>

                    {Pagination}
                </Content>
            </Flex>

            <AddedModal
                open={showAddedToCartModal}
                text="Added to Cart!"
                onClose={handleAddedToCartModal}
                timeout={900}
            />
        </div>
    )
}

const LoadingItems = () => (
    <>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
        <SkeletonItem/>
    </>
)
