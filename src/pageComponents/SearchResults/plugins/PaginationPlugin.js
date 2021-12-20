import { Pagination } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	max-width: 420px
`

const DEFAULT_RESULT_SIZE = 24

export default function PaginationPlugin({ totalResults, resultSize = DEFAULT_RESULT_SIZE, page, onPageChange }) {
    const handlePageChange = (e, p) => {
        onPageChange(p)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <PaginationContainer>
            <Pagination
                count={Math.ceil(totalResults / resultSize)}
                page={parseInt(page)}
                onPageChange={handlePageChange}
            />
        </PaginationContainer>
    )
}