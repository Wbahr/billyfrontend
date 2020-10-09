import React from 'react'
import { Switch, Link, Route } from 'react-router-dom'
import styled from 'styled-components'
import CategoryList from './categoryList'
import Loader from 'pageComponents/_common/loader'

const DivRow = styled.div`
	display: flex;
	width: 100%;
`

export default function CategoryRouter(props) {
	const { categories, match, ...rest } = props;
	const baseUrl = match.url;
    console.log("match", match);
	if (!categories) return <div><Loader /></div>;

	return (
		<Switch>
			<Route
				path={`${match.path}/:nameForUrl/:subCatNameForUrl`}
				render={({match}) => {
					//Shuttle off to search component
					const parentCat = categories.find(c => c.nameForUrl == match.params.nameForUrl)
					const foundCat = parentCat.children.find(c => c.nameForUrl == match.params.subCatNameForUrl)
					if (foundCat) {
						return (
							<>
								<DivRow>
									<Link to={`${baseUrl}`}>All Categories</Link>&nbsp;&raquo;&nbsp;
									<Link to={`${baseUrl}/${parentCat.nameForUrl}`}>{parentCat.name}</Link>&nbsp;&raquo;&nbsp;
									<p>{foundCat.name}</p>
								</DivRow>
								<DivRow><h1>Viewing {foundCat.name}</h1></DivRow>
							</>
						)
					} else {
						return (
							<>
								<h2>Couldn't find the category {match.params.nameForUrl}</h2>
								<DivRow><Link to={`${baseUrl}`}>Back to all categories</Link></DivRow>
							</>);
					}
				}}
			/>
			<Route
				path={`${match.path}/:nameForUrl`}
				render={({match}) => {
					const foundCat = categories.find(c => c.nameForUrl == match.params.nameForUrl);
					if (foundCat) {
						return (
							<>
								<DivRow><Link to={`${baseUrl}`}>All Categories</Link> <p>&nbsp;&raquo; {foundCat.name}</p></DivRow>
								<CategoryList categories={foundCat.children} match={match} />
							</>
						)
					} else {
						return (
							<>
								<h2>Couldn't find the category {match.params.nameForUrl}</h2>
								<DivRow><Link to={`${baseUrl}`}>Back to all categories</Link></DivRow>
							</>);
					}
				}}
			/>
			<Route
				exact={true}
				path={match.path}
				render={({match}) => <>
                    <DivRow><p>All Categories</p></DivRow>
                    <CategoryList categories={categories} match={match} />
                </>}
			/>

		</Switch>
	)
}
