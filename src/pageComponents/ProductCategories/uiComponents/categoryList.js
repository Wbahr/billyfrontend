import Category from './category'
import React from 'react'

export default function CategoryList(props) {
    const { categories, match, ...rest } = props;
    if(!categories) return <Loader />;
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
