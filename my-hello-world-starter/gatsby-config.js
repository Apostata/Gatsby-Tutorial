/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const dotenv = require('dotenv')
dotenv.config({
  path:`.env.${process.env.NODE_ENV}`
})

module.exports = {
  /* Your site config here */
  siteMetadata:{
    title:"Gatsby tutorial",
    description:"alguma descrição",
    author:"@rene",
    data:['item1', 'item2'],
    person:{name:'Erica', age:31}
  },
  
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
    },
    {
      resolve: `gatsby-plugin-styled-components`,
    },
    {
      resolve: `gatsby-source-filesystem`,
      options:{
        name: `images`,
        path: `${__dirname}/src/images`  
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options:{
        name: `teste`,
        path: `${__dirname}/src/teste`  
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.SPACE_ID,
        // Learn about environment variables: https://gatsby.dev/env-vars
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
  ]
}
