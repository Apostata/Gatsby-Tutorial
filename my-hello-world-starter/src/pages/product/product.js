import React from 'react'
import { graphql } from "gatsby"
import Image from 'gatsby-image'
import {Link} from 'gatsby'
import Layout from '../../Layout/Layout'
import Styles from '../../css/product.module.scss'

const Product = ({data:{product:{title, price, info:{info}, image:{fixed}}}}) => {
  return (
    <Layout>
      <div style={{textAlign:'center'}}>
        <Link to="/products">Back to products</Link>
        <h4>product: {title}</h4>
      </div>
      <section className={Styles.product}>
        <article>
          <Image fixed={fixed}/>
        </article>
        <article>
          <h1>{title}</h1>
          <h3>${price}</h3>
          <p>{info}</p>
          <button>add to cart</button>
        </article>
      </section>
    </Layout>
  )
}

export default Product

export const query = graphql`
query GetSingleProduct($slug: String) {
  product: contentfulProduct(slug: {eq: $slug}) {
    title
    price
    info {
      info
    }
    image {
      fixed(width:300) {
        ...GatsbyContentfulFixed
      }
    }
  }
}
`