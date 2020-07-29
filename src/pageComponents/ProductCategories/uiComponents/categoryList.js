import Category from './category'
import React from 'react'

export default function CategoryList(props) {
    let { categories, match, ...rest } = props;
    if(!categories) return null;
    console.log("In category list", categories)
    return (
        <>
            {categories.map((c) => {
                return (
                    <Category key={c.nameForUrl} text={c.name} linkTo={`${match.url}/${c.nameForUrl}`} image={c.bannerUrl} ></Category>
                );
            })}
        </>
    );
};
