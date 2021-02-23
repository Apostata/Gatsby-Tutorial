import React from 'react'
import { graphql } from "gatsby"
import Image from 'gatsby-image'
import {Link} from 'gatsby'
import Layout from '../Layout/Layout'
import Styles from '../css/products.module.scss'

function products({data:{Products:{nodes:produtos}}}) {
    return (
        <Layout>
            <section className={Styles.page}>
              
                <h1>Página de produtos</h1>
                
                <div className={Styles.products}>
                  {produtos.map(produto=>{
                    const {image:{fluid}, id, title, slug, price} = produto
                    return(
                        <article key={id}>
                          
                          <h2>{title} - <span>{price}</span></h2>
                          <Image fluid={fluid}/>
                          <Link to={`/products/${slug}`}>Mais detalhes...</Link>
                        </article>
                    )
                  })}
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
  {
    Products: allContentfulProduct(filter: {node_locale: {eq: "en-US"}}) {
      nodes {
        id
        title
        price
        slug
        image {
          fluid {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default products
