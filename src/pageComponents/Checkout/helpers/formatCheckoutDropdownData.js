import _ from 'lodash'

//These functions drive the dropdown lists on the ship to page

export default function formatCheckoutDropdownData(data){
    const mutatedShipTos = formatShipToData(data.shipToAddresses)
    const mutatedCarriers = formatCarriers(data.carriers)
    const mutatedContacts = formatContacts(data.contacts)
    return {
        shiptos: mutatedShipTos,
        carriers: mutatedCarriers,
        contacts: mutatedContacts
    }
}

function formatShipToData(data){
    const mutatedData = [{
        label: 'Custom Ship To',
        value: -1
    }]
    if (!_.isNil(data)){
        for (let i=0;data.length > i;i++){
            const element = data[i]
            mutatedData.push({
                label: element.companyName + ' - ' + element.physAddress1 + ' ' + element.physCity +', ' + element.physState + ' ' + element.physPostalCode,
                value: element.id
            })
        }
    }
    return mutatedData
}

function formatCarriers(data){
    const mutatedData = []
    if (!_.isNil(data)){
        for (let i=0;data.length > i; i++){
            const element = data[i]
            mutatedData.push({
                label: element.name,
                value: element.id
            })
        }
    }
    return mutatedData
}

function formatContacts(data){
    const mutatedData = [{
        label: 'Custom Contact',
        value: -1
    }]
    if (!_.isNil(data)){
        for (let i=0;data.length > i;i++){
            const element = data[i]
            mutatedData.push({
                label: element.firstName + ' ' + element.lastName + ' - ' + element.id,
                value: element.id
            })
        }
    }
    return mutatedData
}