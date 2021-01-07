import React from 'react'
import {Link} from 'gatsby'
import Layout from '../Layout/Layout'

const blog = () => {
    return (
        <Layout>
            Página do blog
            <Link to="/">Home page</Link>
        </Layout>
    )
}

export default blog
