const path = require(`path`)
// importing some module to create a slug
const { graphql } = require("gatsby")
const { createFilePath } = require(`gatsby-source-filesystem`)

/* Codes written here are not react codes or complete node js.
they iclude some backend codes */

exports.onCreateNode = ({ node, getNode, actions }) => {
  //Adding a new field to node
  const { createNodeField } = actions
  // taking the interanal node markdown we need
  if (node.internal.type === `MarkdownRemark`) {
    // Here we are creating a slug(url) that is used to navigate through our pages.
    // we have to build the field path to our node.
    const slug = createFilePath({ node, getNode })

    // creating a node field
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

// an API to create a new page
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  // retirning a graphql query that gives us down our markdown and iterate over it.
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      // then here we create the page
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/blog-post.js`),
        context: {
          slug: node.fields.slug,
        },
      })
    })
  })
  // the graphql will resolve inside a promise. then we are going to use .then
}
