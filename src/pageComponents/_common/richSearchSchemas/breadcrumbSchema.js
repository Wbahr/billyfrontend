import React from 'react'

export function breadcrumbSchema(elements) {
    return (
        <script type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BreadcrumbList',
                itemListElement: elements.map((el, idx) => ({
                    '@type': 'ListItem',
                    position: idx+1,
                    name: el.name,
                    item: el.item
                }))
            }
            )}
        </script>
    )
}