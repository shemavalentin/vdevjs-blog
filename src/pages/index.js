import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Seo title="Home" />
      <div>
        <h1>JsReactTech Demistified </h1>
        <h3>{data.allMarkdownRemark.totalCount} </h3>
        {/* Javascript tag to loop into the edges in the graphQl querries */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <h2>
              <span>
                {node.frontmatter.tittle} - {node.frontmatter.date}
                <p>{node.excerpt}</p>
              </span>
            </h2>
          </div>
        ))}
      </div>
    </Layout>
  )
}
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

// Now calling the graphql querry inside this file

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            description
            title
            date
          }

          excerpt
        }
      }
    }
  }
`
