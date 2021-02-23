const path = require('path')

exports.createPages = async ({graphql, actions:{createPage}}) => {
    const result =  await graphql(`
    query GetProducts {
        products: allContentfulProduct(filter: {node_locale: {eq: "en-US"}}) {
          nodes {
            slug
          }
        }
      }
      
    `)
    result.data.products.nodes.forEach((product)=>{
      const {slug} = product
        createPage({
            path: `products/${slug}`,
            component: path.resolve('src/pages/product/product.js'),
            context:{
                slug
            }
        })
    })
}