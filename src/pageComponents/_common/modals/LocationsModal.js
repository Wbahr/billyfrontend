import React, { useContext, useEffect, useState } from 'react'
import Context from '../../../setup/context'
import AirlineModal from '../modal'
import styled from 'styled-components'
import Loader from '../loader'
import { Detail1 as SkeletonDetail } from '../../SearchResults/uiComponents/skeletonItem'
import { useLazyQuery } from '@apollo/client'
import { QUERY_STOCK_AVAILABILITY } from '../../../setup/providerGQL'

const Table = styled.table`
  margin: 0 16px;
  table-layout: fixed;
  width: 90%;
`

const TR = styled.tr`
  border-top: 1px lightgrey solid;
  border-bottom: 1px lightgrey solid;
`

const TDGrey = styled.td`
  padding: 4px 8px 4px 24px;
  font-weight: 500;
  background-color: whitesmoke;
`

const TDWhite = styled.td`
padding: 4px 24px 4px 8px;
`

const Div = styled.div`
  display: flex;
  flex-direction: column;
  p {
    text-align: center;
  }
`

const AvailabilityRow = styled.div`
	width: 100%;
	display: flex;
	color: #000;
	padding: 0 5px;
	font-size: 12px;
	font-family: Arial, sans-serif;
`

const Availability = styled.p`
	margin: 0;
	font-size: 13px;
`

const PBlue = styled.p`
	color: #328EFC;
	margin: 0;
	font-size: 13px;
	padding: 0 4px;
    &:hover {
        text-decoration: ${props => props.onClick ? 'underline' : ''};
        cursor: ${props => props.onClick ? 'pointer' : 'default'};
    }
`

export default function LocationsModal({ invMastUid, availabilityInfo, unitPrice, isParentCalculateStock }) {
    const { availability, leadTimeDays } = availabilityInfo || {}
    const { stockAvailabilities, setStockAvailabilities } = useContext(Context)
    const stockAvailability = stockAvailabilities.find(sa => sa.invMastUid === invMastUid)
    const { airlineStock, factoryStock } = stockAvailability || {}

    const [open, setOpen] = useState(false)

    const [getStockSingular, { variables: stockVariables }] = useLazyQuery(QUERY_STOCK_AVAILABILITY, {
        variables: { invMastUid },
        fetchPolicy: 'no-cache',
        onCompleted: ({ airlineStock, factoryStock }) => {
            const stockAvailability = {
                invMastUid: stockVariables.invMastUid,
                airlineStock: airlineStock || [],
                factoryStock: factoryStock || null
            }
            const duplicateInvMasUids = (sa, i, self) => self.findIndex(s => s.invMastUid === sa.invMastUid) === i
            const newStockAvailabilities = [stockAvailability, ...stockAvailabilities].filter(duplicateInvMasUids)
            setStockAvailabilities(newStockAvailabilities)
        }
    })

    //Calculate the stock information here if the information is not being retrieved elsewhere
    useEffect(() => {
        if (!stockAvailability && !isParentCalculateStock){
            getStockSingular()
        }
    }, [])

    const AirlineStockRows = () => !!airlineStock?.length && airlineStock?.map((location, idx) => {
        return !!location.quantityAvailable && (
            <TR key={idx}>
                <TDGrey>{location.locationName}</TDGrey>
                <TDWhite>{location.quantityAvailable}</TDWhite>
            </TR>
        )
    })

    const FactoryStockRows = () => !!factoryStock?.factoryAvailability && (
        <TR>
            <TDGrey>Factory Stock</TDGrey>
            <TDWhite>{factoryStock?.factoryAvailability}</TDWhite>
        </TR>
    )

    const getLocationVerbiage = () => {
        const locationsWithStock = (airlineStock || []).filter(loc => loc.quantityAvailable)
        if (locationsWithStock.length === 1 && !factoryStock?.factoryAvailability) {
            return locationsWithStock[0].locationName
        } else if (!locationsWithStock.length && factoryStock?.factoryAvailability) {
            return 'Factory Stock'
        } else  {
            return `${locationsWithStock.length + (factoryStock?.factoryAvailability ? 1 : 0)} Locations`
        }
    }

    const maxWidth = airlineStock?.length || factoryStock?.length ? 800 : 300

    return (
        <>
            <AvailabilityRow>
                <Availability>Availability:</Availability>

                {!unitPrice || !availability ? (
                    <PBlue>{leadTimeDays ? `Lead Time: ${leadTimeDays} bus. days` : 'Call for availability'}</PBlue>
                ) : !availabilityInfo ? (
                    <SkeletonDetail style={{ margin: 'auto 0' }}/>
                ) : (
                    <PBlue onClick={() => setOpen(true)}>
                        {availability} - {getLocationVerbiage()}
                    </PBlue>
                )}
            </AvailabilityRow>

            <AirlineModal open={open} onClose={() => setOpen(false)} contentStyle={{ maxWidth, borderRadius: 5, padding: 16 }}>
                {
                    !airlineStock?.length && !factoryStock?.length ? (
                        <Div>
                            <p>Searching our warehouses..</p>
                            <Loader/>
                        </Div>
                    ) : (
                        <Table>
                            <tbody>
                                <tr>
                                    <th>Location</th>
                                    <th>Quantity Available</th>
                                </tr>

                                <AirlineStockRows/>
                                <FactoryStockRows/>
                            </tbody>
                        </Table>
                    )
                }
            </AirlineModal>
        </>
    )
}
