import React from "react"
import {Link} from 'gatsby'
import Layout from '../Layout/Layout'



export default () => (
  <Layout>
    Hello Gatsby!
      <Link to="/blog">Blog page</Link>
      <a href="https://www.gatsbyjs.org">Gatsby docs</a>
  </Layout>
)
