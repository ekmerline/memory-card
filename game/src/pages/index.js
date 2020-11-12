import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <ul>
      {
        data.allContentfulMemoryGame.edges.map(edge => (
          <li key={edge.node.id}>
            <Link to={edge.node.slug} key={edge.node.id}>{edge.node.gameTitle}</Link>
            <div>
              <img src={edge.node.previewImage.fluid.src} alt="preview"/>
            </div>
          </li>
        ))
      }
    </ul>
  </Layout>
)

export default IndexPage

export const query = graphql`
{
  allContentfulMemoryGame {
    edges {
      node {
        id
        gameTitle
        slug
        previewImage {
          fluid(maxWidth: 300){
            src
          }
        }
      }
    }
  }
}
`