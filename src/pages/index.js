import * as React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const Title = styled.h2`
  display: inline-block;
  color: darkorange;
`
// making the title ckickable
const BlogLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`
const BlogTitle = styled.h3`
  margin-bottom: 20px;

  &:hover {
    color: #1dcaff;
  }
`

const BlogBody = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => {
  return (
    <Layout>
      <div>
        <SEO title="Home" />
        <Title>ON DEMAND TECH INFO</Title>
        <h4>{data.allMarkdownRemark.totalCount} Posts </h4>
        {/* Javascript tag to loop into the edges in the graphQl querries */}
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogBody key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                {node.frontmatter.title} <span>- {node.frontmatter.date}</span>
                {/* <p>{node.excerpt}</p> */}
              </BlogTitle>
            </BlogLink>
            <p>{node.frontmatter.description || node.excerpt}</p>
          </BlogBody>
        ))}
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
            description
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
