import Category from './category'
import React from 'react'
import Loader from 'pageComponents/_common/loader';

export default function CategoryList(props) {
	const {categories, match} = props;
	
	if (!categories) return <Loader/>;
	return (
		<>
			{categories.map((c) => (
					<Category key={c.urlSlug} text={c.name} linkTo={`${match.url}/${c.urlSlug}`} image={c.imageUrl}/>
				)
			)}
		</>
	);
};
