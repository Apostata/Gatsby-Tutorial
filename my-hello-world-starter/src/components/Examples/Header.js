import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
const query = graphql`
{
  site {
    infos: siteMetadata {
      title
      author
      data
      description
      person {
        age
        name
      }
    }
  }
}
`
const Header = () => {
    const {             //deeper destructuring
        site:{
            infos:{
                title, 
                person:{
                    name
                }
            }
        }
    } = useStaticQuery(query)
    
    return (
        <div>
            {/* <h1>title: {data.site.infos.title}</h1>
            <h1>name: {data.site.infos.person.name}</h1> */}
            <h1>title: {title}</h1>
            <h1>name: {name}</h1>
        </div>
    )
}

export default Header
