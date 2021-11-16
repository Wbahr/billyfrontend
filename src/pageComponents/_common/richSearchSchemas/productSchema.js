import React from 'react'

export function productSchema(itemDetails, itemPrice, itemAvailability) {
    return (
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'http://schema.org/',
                '@type': 'Product',
                sku: itemDetails.itemCode,
                image: (itemDetails?.itemMedia || []).map(img => 'https://' + img.path),
                name: itemDetails.itemDesc,
                description: itemDetails.extendedDesc,
                mpn: itemDetails.mfgPartNo,
                brand: {
                    '@type': 'Brand',
                    name: itemDetails.brand?.name
                },
                offers: {
                    '@type': 'Offer',
                    url: `https://airlinehyd.com/product/${itemDetails.itemCodeUrlSanitized || encodeURIComponent(itemDetails.itemCode)}/${itemDetails.invMastUid}`,
                    price: itemPrice?.unitPrice,
                    priceCurrency: 'USD',
                    priceValidUntil: new Date(),
                    itemOffered: itemDetails.itemDesc,
                    inventoryLevel: {
                        '@type': 'QuantitativeValue',
                        value: itemAvailability?.availability,
                    },
                    // deliveryLeadTime: {
                    //     '@type': 'QuantitativeValue',
                    //     value: itemAvailability.leadTimeDays,
                    //     valueReference: 'days'
                    // },
                    availability: itemAvailability?.availability > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
                }
            })}
        </script>
    )
}