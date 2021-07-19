import React, { useContext } from 'react'
import styled from 'styled-components'
import Context from 'setup/context'
import Loader from 'pageComponents/_common/loader'
import Select from 'react-select'
import { FormikStyleLabel } from 'pageComponents/_common/formik/input_v2'

const Center = styled.div`
    width: 400px;
    display: flex;
    justify-content: center;
`

const WrapSelect = styled.div`
    margin-left: -5px;
    margin-top: 2px;
`
const SelectStyle = {
    control: (provided) => ({
        ...provided,
        borderRadius: '1px',
        border: '1px solid #e1e1e1',
        marginTop: '-4px',
        padding: '0px 10px'
    }),
}

const theme = (theme) => ({
    ...theme,
    spacing: {
        ...theme.spacing,
        controlHeight: 30,
        baseUnit: 0,
    }
})

export default function OrderSelect(props) {
    const { orderNumber, setOrderNumber } = props

    const context = useContext(Context)

    const loading = context.getOrdersState.loading

    const orderOptions = context?.ordersCache?.filter(o => o.status === 'Open').map(o => {
        return (
            { label: o.orderNumber, value: o.orderNumber }
        )
    })

    return (
        <div>
            {loading ?
                (
                    <Center>
                        <Loader />
                    </Center>
                ) : (
                    <FormikStyleLabel label='Order Number'>
                        <WrapSelect>
                            <Select
                                name="billing.cardType"
                                value={orderNumber}
                                onChange={setOrderNumber}
                                options={orderOptions}
                                isSearchable={true}
                                width='400px'
                                styles={SelectStyle}
                                theme={theme}
                                isDisabled={loading}
                            />
                        </WrapSelect>
                    </FormikStyleLabel>
                )
            }
        </div>
    )
}