import React from "react"
import {Link} from 'gatsby'
import Navbar from '../components/Navbar'

export default () => (
  <div>
    <Navbar />
    Hello Gatsby!
      <Link to="/blog">Blog page</Link>
      <a href="https://www.gatsbyjs.org">Gatsby docs</a>
  </div>
)
