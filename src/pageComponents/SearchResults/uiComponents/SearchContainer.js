import React, { useContext, useEffect, useMemo, useState } from 'react'
import AddedModal from './addedModal'
import LocationsModal from './locationsModal'
import DetailsModal from './detailsModal'
import styled from 'styled-components'
import Context from '../../../config/context'
import { useDidUpdateEffect } from '../../_common/helpers/generalHelperFunctions'
import { useLazyQuery } from '@apollo/client'
import { GET_ITEMS_BY_ID } from '../../../config/providerGQL'
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
  const { searchState, resultSize=DEFAULT_RESULT_SIZE, history, children } = props
  const { results, totalResults, isSearching } = searchState
	
  const [showAddedToCartModal, setShowAddedToCartModal] = useState(false)
  const [locationsModalItem, setLocationsModalItem] = useState(null)
  const [detailsModalInvMastUid, setDetailsModalItem] = useState(0)
  const [ottoFindPart, setOttoFindPart] = useState(false)
  const [itemDetails, setItemDetails] = useState([])
  const [drawerOpen, setDrawerOpen] = useState(window.innerWidth > 750)
	
  const { getItemAvailabilities, itemAvailabilities, getItemPrices, impersonatedCompanyInfo } = useContext(Context)
	
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
		
    const itemsWithoutDetails = (accum, result) => {
      return !itemDetails.some(details => details.invMastUid === result.invMastUid) ? [...accum, result.invMastUid] : accum
    }
    const invMastUids = results.reduce(itemsWithoutDetails, [])
    getItemDetails({ variables: { invMastUids } })
		
    const itemsWithoutAvailabilities = result => !itemAvailabilities.some(avail => avail.invMastUid === result.invMastUid)
    getItemAvailabilities(results.filter(itemsWithoutAvailabilities))
  }, [results])
	
  const [getItemDetails] = useLazyQuery(GET_ITEMS_BY_ID, {
    fetchPolicy: 'no-cache',
    onCompleted: ({ itemDetailsBatch, customerPartNumbersBatch }) => {
      const mergedDetails = itemDetailsBatch.map(details => ({
        ...details,
        customerPartNumbers: customerPartNumbersBatch
          .filter(({ invMastUid }) => details.invMastUid === invMastUid)
          .map(part => ({ partNumber: part.customerPartNumber, partId: part.id }))
      }))
      setItemDetails([...itemDetails, ...mergedDetails])
    }
  })
	
  const handleShowLocationsModal = (invMastUid) => setLocationsModalItem(invMastUid)
	
  const handleHideLocationsModal = () => setLocationsModalItem(null)
	
  const handleShowDetailsModal = (invMastUid) => setDetailsModalItem(invMastUid)
	
  const handleHideDetailsModal = () => setDetailsModalItem(0)
	
  const handleAddedToCart = () => setShowAddedToCartModal(true)
	
  const handleAddedToCartModal = () => setShowAddedToCartModal(false)
	
  const itemSearchResults = useMemo(() => results.map(result => (
    <ItemResult
      key={result.invMastUid}
      result={result}
      details={itemDetails.find(detail => detail.invMastUid === result.invMastUid) || {}}
      history={history}
      toggleDetailsModal={handleShowDetailsModal}
      toggleLocationsModal={handleShowLocationsModal}
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
			
      <LocationsModal
        open={!!locationsModalItem}
        hideLocationsModal={handleHideLocationsModal}
        invMastUid={locationsModalItem}
      />
			
      <DetailsModal
        hideDetailsModal={handleHideDetailsModal}
        invMastUid={detailsModalInvMastUid}
        history={history}
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