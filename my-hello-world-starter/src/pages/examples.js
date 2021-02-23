import React from 'react'
import Header from '../components/Examples/Header'
// import HeaderStatic from '../components/Examples/HeaderStatic'
import Layout from '../Layout/Layout'
import { graphql } from 'gatsby'

const examples = ({data:{site:{infos:{author}}}}) => {
    return(
    <Layout>
        <h1>Hellow from examples page</h1>
        <Header />
        <h5>{author}</h5>
    </Layout>
    )
}

export const data = graphql`
query FirstQuery {
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

export default examples
