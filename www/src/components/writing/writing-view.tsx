import * as React from "react"
import { graphql } from "gatsby"
import { Container, Divider, Text } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Layout } from "../blocks/layout"
import { SEO } from "../seo"
import { SkipNavContent } from "../a11y/skip-nav"
import { Spacer } from "../blocks/spacer"
import { Prose } from "../typography/prose"
import { components } from "../mdx"
import { article } from "../../constants/json-ld"
import { TocItem, WithSidebarWrapper } from "./toc"

export type WritingViewDataProps = {
  post: {
    slug: string
    title: string
    date: string
    description: string
    body: string
    excerpt: string
    lastUpdated: string
    seoDate: string
    yearDate: string
    seoLastUpdated: string
    subtitle: string
    timeToRead: string
    tableOfContents?: {
      items?: TocItem[]
    }
    image?: string
    category: {
      name: string
      slug: string
    }
    parent: {
      parent: {
        relativePath: string
      }
    }
  }
  pathname: string
  type: "prose" | "tutorial"
}

// eslint-disable-next-line no-unused-vars
const WritingView: React.FC<WritingViewDataProps> = ({ post, pathname, children, type }) => {
  // eslint-disable-next-line no-unused-vars
  const [hasShareApi, setHasShareApi] = React.useState(false)

  React.useEffect(() => {
    setHasShareApi(!!window.navigator.share)
  }, [])

  return (
    <Layout>
      <SEO title={post.title} description={post.description ? post.description : post.excerpt} image={post.image}>
        <meta name="twitter:label1" value="Time To Read" />
        <meta name="twitter:data1" value={`${post.timeToRead} Minutes`} />
        <meta name="twitter:label2" value="Category" />
        <meta name="twitter:data2" value={post.category.name} />
        <meta name="article:published_time" content={post.seoDate} />
        <meta name="article:modified_time" content={post.seoLastUpdated} />
        <script type="application/ld+json">
          {JSON.stringify(
            article({
              isGarden: false,
              post: {
                title: post.title,
                description: post.description ? post.description : post.excerpt,
                date: post.seoDate,
                lastUpdated: post.seoLastUpdated,
                year: post.yearDate,
                image: post.image,
                slug: post.slug,
              },
              category: {
                name: post.category.name,
                slug: post.category.slug,
              },
            })
          )}
        </script>
      </SEO>
      <Container variant="proseRoot">
        <SkipNavContent>
          {children}
          {type === `tutorial` && post.tableOfContents?.items ? (
            <WithSidebarWrapper items={post.tableOfContents.items}>
              <Prose as="article" flex="1 1 100%" minW="100%">
                <MDXProvider components={components}>
                  <MDXRenderer>{post.body}</MDXRenderer>
                </MDXProvider>
              </Prose>
            </WithSidebarWrapper>
          ) : (
            <Prose as="article">
              <MDXProvider components={components}>
                <MDXRenderer>{post.body}</MDXRenderer>
              </MDXProvider>
            </Prose>
          )}
          <Spacer size={12} axis="vertical" />
          <Divider />
          <Spacer size={6} axis="vertical" />
          {type === `prose` && (
            <Text mt={6} fontSize={[`md`, null, null, `1.125rem`]}>
              Last updated: {post.lastUpdated}
            </Text>
          )}
        </SkipNavContent>
      </Container>
    </Layout>
  )
}

export default WritingView

export const query = graphql`
  fragment WritingView on Post {
    slug
    title
    description
    excerpt
    body
    seoLastUpdated: lastUpdated
    lastUpdated(formatString: "MMM DD, YYYY")
    seoDate: date
    yearDate: date(formatString: "YYYY")
    date(formatString: "MMM DD, YYYY")
    subtitle
    timeToRead
    image
    category {
      name
      slug
    }
    ... on MdxPost {
      parent {
        ... on Mdx {
          parent {
            ... on File {
              relativePath
            }
          }
        }
      }
    }
  }
`
