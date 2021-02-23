# Gatbsby
intalação
`npm i -g gatsby-cli`

Tema limpo de hello world
`gatsby new my-hello-world-starter https://github.com/gatsbyjs/gatsby-starter-hello-world`

Para iniciar em dev `gatsby develop`
Para gerar o build de produção `gatsby build`
Para para rodar em prod  `gatsby server`

## Criando Páginas
Basta criar os componentes dentro da pasta `pages` e as rotas serão feitas automáticamente

## Links
podemos usar o link padrão `<a>` porém para funcionar como uma SPA basta importar `Link` de `gatsby`
````
import {Link} from 'gatsby'
````
Obviamente `Link` só será usado para páginas internas

## Componentes
por padrão normalmente se colocar os componentes na pasta `compoenents` layouts também vão aqui, porém prefiro na pasta Layout

## CSS
Global, pode ser importado no componente `Layout` já que ele engloba todo o site. Minha preferência é colocar o css global em uma pasta `CSS` importar o css é simple 
````
import '../css/layout.css'
````

### CSS modules
única particularidade é que precisa ter `{nome_do_arquivo}.modules.css` no nome

para usar o sass terá que instalar `npm i --save sass gatsby-plugin-sass` ou `yarn add sass gatsby-plugin-sass`
e adicionar `gatsby-plugin-sass` ao array de plugins no arquivo `gatsby-config.js`:
````
plugins: [
  {
    resolve: `gatsby-plugin-sass`,
    //   options: {
    //     implementation: require("sass"),
    //   },
 },
]
````
**Nota: as opções do plugin estão comentadas pois não são necessárias, porém a instalação do `sass` é necessária**

### Styled Components
para usar styled components temos que instalar `npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components`
 e adicionar `gatsby-plugin-styled-components` ao array de plugins no arquivo `gatsby-config.js`:
 ````
plugins: [
    {
        resolve: `gatsby-plugin-sass`,
    },
    {
        resolve: `gatsby-plugin-styled-components`,
    },
]
````

## GraphQL
O projeto sempre terá uma uma url para acesso ao graphql: `http://localhost:8000/___graphql` que é um abiente de teste para as querys também.


### Tipode da dados
#### metadata
no arquivo gatsby-config.js:
dentro do export segue um exemplo de metadata:
````
module.exports = {
  siteMetadata:{
    title:"Gatsby tutorial",
    description:"alguma descrição",
    author:"@rene",
    data:['item1', 'item2'],
    person:{name:'Erica', age:31}
  },
  plugins: [
    ...
  ]
}

````
### Escrevendo uma query de GraphQL
a query abaixo só trará o titulo de metadatas
````
{
    site{
        siteMetadata{
            title
        }
    }
}
````
o resultado será:
````
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Gatsby tutorial"
      }
    }
  },
  "extensions": {}
}
````

Para trazer tudo, basta escrever tudo.
````
{
  site{
    siteMetadata{
      title,
      description,
      author,
      data,
      person{
        name,
        age
      }
    }
  }
}
````
o resultado será:
````
{
  "data": {
    "site": {
      "siteMetadata": {
        "title": "Gatsby tutorial",
        "description": "alguma descrição",
        "author": "@rene",
        "data": [
          "item1",
          "item2"
        ],
        "person": {
          "name": "Erica",
          "age": 31
        }
      }
    }
  },
  "extensions": {}
}
````
é possível usar o explorer para montar a query e o code exporter para exportar o código em react já, tudo isso no  `http://localhost:8000/___graphql`

### tipos de query
StaticQery
PageQuery
useStaticQuery

### Static Query 
static query hook
````
import React from 'react'
import {useStaticQuery, graphql} from 'gatsby'
const query = graphql`
{
    site {
      siteMetadata {
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
            siteMetadata:{
                title, 
                person:{
                    name
                }
            }
        }
    } = useStaticQuery(query)
    
    return (
        <div>
            {/* <h1>title: {data.site.siteMetadata.title}</h1>
            <h1>name: {data.site.siteMetadata.person.name}</h1> */}
            <h1>title: {title}</h1>
            <h1>name: {name}</h1>
        </div>
    )
}

export default Header

````

#### Static query component (normalmente não usarei)

````
import React from "react"
import { StaticQuery, graphql } from "gatsby"

const ComponentName = () => (
  <StaticQuery
    query={graphql`
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
    `}
    render={data => <pre>{JSON.stringify(data, null, 4)}</pre>}
  ></StaticQuery>
)

export default ComponentName
````

### Page query
Tem de ser usado dentro dos componentes da pasta `Pages`
basta importar `graphql` de gatsby e exportar a query como uma constante:

````
import React from 'react'
import Header from '../components/Examples/Header'
import Layout from '../Layout/Layout'
import { graphql } from 'gatsby'

const examples = (props) => {
    console.log(props);
    return(
    <Layout>
        <h1>Hellow from examples page</h1>
        <Header />
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

````

### Field Alias
colocamos um alias em siteMetadada como infos

````
{
    site {
      infos:siteMetadata {
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
````
o resultado da query será:
````
{
  "data": {
    "site": {
      "infos": {
        "title": "Gatsby tutorial",
        "author": "@rene",
        "data": [
          "item1",
          "item2"
        ],
        "description": "alguma descrição",
        "person": {
          "age": 31,
          "name": "Erica"
        }
      }
    }
  },
  "extensions": {}
}
````
### query keywords
````
query firstQuery { //este é o nome da query e precisa ser único
    site {
      infos:siteMetadata {
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
````

## Images
intale o plugin : `yarn add gatsby-source-filesystem`
adicione o plugin ao arquivo `gatsby-config.js`:
´´´´
...
{
  resolve: `gatsby-source-filesystem`,
  options:{
    name: `images`,
    path: `${__dirname}/src/images`  
  }
}
...
´´´´
para ter outras pastas expostas basta criar outra instancia do  `gatsby-source-filesystem` neste arquivo
### Query for images and files
jeito recomendado:
````
{
  allFile {
    totalCount
    nodes {
      birthTime
      size
      absolutePath
    }
  }
}
````
ou 
jeito antigo:
````
{
  allFile {
    totalCount
    edges{
      node {
        birthTime
        size
        absolutePath
      }
    }
  }
}
````
o resultado será :
````
{
  "data": {
    "allFile": {
      "totalCount": 2,
      "nodes": [
        {
          "birthTime": "2021-01-14T12:20:22.960Z",
          "size": 28321,
          "absolutePath": "C:/DEV/Rene/Gatsby Course/my-hello-world-starter/src/images/medieval-bg.jpeg"
        },
        {
          "birthTime": "2021-01-14T12:21:22.341Z",
          "size": 43889,
          "absolutePath": "C:/DEV/Rene/Gatsby Course/my-hello-world-starter/src/images/refresh.jpeg"
        }
      ]
    }
  },
  "extensions": {}
}
````
### Query arguments Files
query para pegar todos dados da pasta definida no plugin `gatsby-source-filesystem`
exemplo de opções:  limit | skip | sort: {fields: ${nome_do_campo}, order:${ASC|DESC}} | filter: {relativeDirectory: {eq: "copy"}}
````
{
  allFile(limit:1) { 
    totalCount
    nodes {
      birthTime
      size
      absolutePath
    }
  }
}
````

#### file field
pega um unico dado(node) na pasta definida no plugin `gatsby-source-filesystem`
````
{
  file(relativePath: {eq: "refresh.jpeg"}) {
    size
    relativePath
  }
}

```` 

### SourceinstanceName
caso tenha mais de uma instancia do  `gatsby-source-filesystem`, quando buscarmos por `allFile` no graphql todas as pastas definidas no config com `gatsby-source-filesystem` seram concatenadas e mostrarm os arquivos de todas, para buscar por uma pasta específica basta usar `sourceInstanceName` na query apontando para a propriedade `name` definida na instancia do `gatsby-source-filesystem`.

no caso abaixo se tivermos duus instancias do `sourceInstanceName`, uma com name "images" e outra como "teste",
para pegar apenas da pasta teste fariamos:
````
{
  allFile(filter: {sourceInstanceName: {eq: "teste"}}) {
    nodes {
      size
      absolutePath
    }
  }
}

````
### usando as imagens e renderizando
instalar os 3 plugins `yarn add gatsby-image gatsby-transformer-sharp gatsby-plugin-sharp`, 
e colocar os ultimos 2 no arquvi `gatsby-config.js`:
````
...
    {
      resolve: `gatsby-plugin-sharp`,
    },
    {
      resolve: `gatsby-transformer-sharp`,
    } 
...
````
#### Img component
fixed or fluid

##### query for fixed and fluid, same time sample

Nota:  ...GatsbyImageSharpFixed e  ...GatsbyImageSharpFluid, são fragmentos, e não funcionam na ferramenta visual do graphql: `http://localhost:8000/___graphql`, apenas no código diretamente

````
{
  fixed: file(relativePath: {eq: "teste-medieval-bg.jpeg"}) {
    childImageSharp {
      fixed(width: 300, height: 300) {
         ...GatsbyImageSharpFixed
      }
    }
  }
  fluid: file(relativePath: {eq: "refresh.jpeg"}) {
    childImageSharp {
      fluid (max-width:100){
         ...GatsbyImageSharpFluid
      }
    }
  }
}

````
resultado será:
````
{
  "data": {
    "fixed": {
      "childImageSharp": {
        "fixed": {
          "src": "/static/312588de2dcdc53b3f875ffd164e1f56/25e3f/teste-medieval-bg.jpg"
        }
      }
    },
    "fluid": {
      "childImageSharp": {
        "fluid": {
          "src": "/static/345cf155f55d3b39f00b02b670f024c7/0f3a1/refresh.jpg"
        }
      }
    }
  },
  "extensions": {}
}
````
**NOTA: max width para fluid images Não é de fato o tamanho maximo da imagem, e sim o tamanho intermediário que o gatsby era gerar de images. Ele gera 5 tamanhos diferente de modo que dependendo do dispositivo ou tamanho da tela, pea o melhor então se colocarmos max width 300, ele os seguintes tamanhos: 75w, 150w, 300w, 450w e 500w o defautl é 800px**



## rotas com params (exemplo /products/:slug)
### Criar arquivo gatsby-node.js
Criar um arquivo chamado `gatsby-node.js` na raiz do projeto, no mesmo lugar que está o `gatsby-config.js`

````
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
````
### Criar o template para a página de produto
````
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
````
**Desta form "slug" do gatsby-node.js é passado para a página do produto e a query que recebe slug e faz a chamada para buscar um único produto**