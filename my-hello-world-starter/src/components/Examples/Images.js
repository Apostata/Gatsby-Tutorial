import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import img from '../../images/medieval-bg.jpeg'
import Styles from './Images.module.scss'
import Image from 'gatsby-image'

const getImages = graphql`
{
    fixed: file(relativePath: {eq: "teste-medieval-bg.jpeg"}) {
      childImageSharp {
        fixed(width: 300, grayscale: true) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    fluid: file(relativePath: {eq: "refresh.jpeg"}) {
      childImageSharp {
        fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
const Images = () => {
    const {fixed:{childImageSharp:{fixed}}, fluid:{childImageSharp:{fluid}}} = useStaticQuery(getImages);
    return (
       <section className={Styles.images}>
           <article className={Styles.singleImage}>
               <h3>Básic react Images</h3>
               <img src={img} width="100%" alt="teste"/>
           </article>
           <article className={Styles.singleImage}>
                <h3>Fixed image and blur</h3>
                <Image fixed={fixed} />
           </article>
           <article className={Styles.singleImage}>
                <h3>Fluid image/svg</h3>
                <Image fluid={fluid} />
           </article>
       </section>
    )
}

export default Images
