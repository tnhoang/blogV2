import * as React from "react"
import { PageProps, graphql } from "gatsby"
import {
  Container,
  Stack,
  Text,
  Badge,
  Box,
  Flex,
  Grid,
  Link as ChakraLink,
  usePrefersReducedMotion,
} from "@chakra-ui/react"
import { Link } from "../components/link"
import { Layout } from "../components/blocks/layout"
import { MotionBox } from "../components/blocks/motion-box"
import { FullWidthContainer } from "../components/blocks/full-width-container"
import { Spacer } from "../components/blocks/spacer"
import { SkipNavContent } from "../components/a11y/skip-nav"
import { Heading } from "../components/typography/heading"
import { PrimaryButton, SubtleButton } from "../components/buttons"
import { space } from "../constants/space"
import { SEO } from "../components/seo"
import { homepage } from "../constants/json-ld"

type RepositoryInfo = {
  stargazerCount: number
  description: string
  name: string
  url: string
}

type DataProps = {
  posts: {
    nodes: {
      title: string
      description: string
      slug: string
    }[]
  }
  garden: {
    nodes: {
      title: string
      slug: string
    }[]
  }
  primaryRepo: {
    repository: RepositoryInfo
  }
  secondaryRepo: {
    repository: RepositoryInfo
  }
}

const cardGradients = [
  `linear(to-tr, #A774F2, #F25D76, #FF964F)`,
  `linear(to-tr, #9B7BFE, #147cdd, #88F2A9)`,
  `linear(to-tr, #5a64f5, #a42be0, #f64f59)`,
  `linear(to-tr, #6666DE, #5778C9, #94D1C9, #A1D8FF)`,
  `linear(to-tr, #3e206d, #af3942, #d66a38, #eacc15)`,
  `linear(to-tr, #511a2a, #cb598d, #b24ecb, #ebb8eb)`,
]

const openSourceRepos = [
  {
    name: `Shop`,
    url: `https://github.com/tnhoang/shop`,
  },
]

const Index: React.FC<PageProps<DataProps>> = ({ data }) => {
  const shouldReduceMotion = usePrefersReducedMotion()
  const [firstPost, ...rest] = data.posts.nodes
  const otherPosts = [...rest]

  return (
    <Layout>
      <SEO>
        <script type="application/ld+json">{JSON.stringify(homepage)}</script>
      </SEO>
      <SkipNavContent>
        <FullWidthContainer variant="hero">
          <Stack py={8}>
            <Text variant="prominent">
              <strong>Software Engineer</strong> from Ho Chi Minh city, Vietnam. I’m passionate about working on open
              source products & building thriving communities around them.
            </Text>
          </Stack>
        </FullWidthContainer>
        <FullWidthContainer variant="light">
          <Stack alignItems="flex-start" spacing={24} py={space.paddingSmall}>
            <Stack alignItems="flex-start" spacing={[6, 8]}>
              <Badge variant="subtle">Latest Post</Badge>
              <Box>
                <Heading as="h2">{firstPost.title}</Heading>
                <Text variant="lightContainer">{firstPost.description}</Text>
              </Box>
              <PrimaryButton to={firstPost.slug}>Continue Reading</PrimaryButton>
            </Stack>
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" alignItems="center">
                <Badge variant="light">More Posts</Badge>
                <SubtleButton to="/writing">Read all</SubtleButton>
              </Flex>
              <Grid templateColumns={[`repeat(1, 1fr)`, null, `repeat(3, 1fr)`]} gap={[4, null, 8]}>
                {otherPosts.map((item, index) => (
                  <Link
                    to={item.slug}
                    key={item.slug}
                    borderRadius="lg"
                    _hover={{ textDecoration: `none`, boxShadow: shouldReduceMotion ? `outline` : null }}
                  >
                    <MotionBox
                      bgGradient={cardGradients[index]}
                      p={4}
                      borderRadius="lg"
                      height={[`150px`, null, null, `200px`, `250px`]}
                      boxShadow="lg"
                      display="flex"
                      alignItems="flex-end"
                      color="white"
                      fontSize={[`lg`, null, `md`, `1.125rem`, `1.3125rem`]}
                      sx={{ textShadow: `0 1px 2px rgba(0, 0, 0, 0.5)` }}
                    >
                      {item.title}
                    </MotionBox>
                  </Link>
                ))}
              </Grid>
            </Stack>
          </Stack>
        </FullWidthContainer>
        <Container>
          <Flex alignItems="left" flexDirection="column" py={space.paddingLarge}>
            <Heading as="h2">Projects</Heading>
            <Text variant="prominent" maxWidth="40ch" textAlign="center">
              Working in the open, interacting with the community & building projects that are accessible to everyone
              fill me with joy.
            </Text>
            <Spacer axis="vertical" size={20} />
            <Stack direction="column" width="100%" spacing={6}>
              <Flex justifyContent="space-between" flexWrap="wrap">
                {openSourceRepos.map((repo) => (
                  <ChakraLink key={repo.url} href={repo.url} p={2} fontSize={22}>
                    {repo.name}
                  </ChakraLink>
                ))}
              </Flex>
            </Stack>
          </Flex>
        </Container>
      </SkipNavContent>
    </Layout>
  )
}

export default Index

export const query = graphql`
  {
    posts: allPost(filter: { published: { eq: true } }, sort: { fields: date, order: DESC }, limit: 4) {
      nodes {
        title
        description
        slug
      }
    }
    garden: allGarden(
      limit: 3
      sort: { fields: lastUpdated, order: DESC }
      filter: { slug: { ne: "/garden/what-is-a-digital-garden" } }
    ) {
      nodes {
        title
        slug
      }
    }
  }
`
