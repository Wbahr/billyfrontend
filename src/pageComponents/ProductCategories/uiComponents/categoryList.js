import Category from './category'
import React from 'react'
import Loader from 'pageComponents/_common/loader';
import { useRouteMatch } from 'react-router';

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
