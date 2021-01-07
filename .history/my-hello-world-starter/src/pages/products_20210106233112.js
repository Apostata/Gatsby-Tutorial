import React from 'react'
import Layout from '../Layout/Layout'
import Styles from '../css/products.module.scss'
console.log(Styles)
function products() {
    return (
        <Layout>
            <div className={Styles.page}>
                <h1>Página de produtos</h1>
                <p className={Styles.text}>Texto qualquer</p>
            </div>
        </Layout>
    )
}

export default products
