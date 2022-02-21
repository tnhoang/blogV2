import * as React from "react"
import { Box, Stack, Flex } from "@chakra-ui/react"
import { FullWidthContainer } from "./full-width-container"

export const Footer: React.FC = () => (
  <FullWidthContainer variant="dark">
    <Box as="footer" py={4} role="contentinfo">
      <Stack direction="column" spacing={16}>
        <Flex flexDirection={[`column`, `row`]} textAlign="center" alignItems="center" justifyContent="flex-end">
          <div>&copy; {new Date().getFullYear()} by lekoarts.de. All rights reserved 🏕</div>
        </Flex>
      </Stack>
    </Box>
  </FullWidthContainer>
)
