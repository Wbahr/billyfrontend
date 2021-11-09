import React from 'react'
import Modal from '../../_common/modal'

export default function EditCostModal(props) {
    const { showModal, hideModal } = props

    return (
        <Modal
            open={showModal}
            onClose={hideModal}
            contentStyle={{ width: 810, height: '530', borderRadius: 3 }}
        >
            <iframe src='https://lf-forms.airlinehyd.com/Forms/USeMV' width='800' height='500' />
        </Modal>
    )
}