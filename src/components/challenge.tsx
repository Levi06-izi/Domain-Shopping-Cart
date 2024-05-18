import { Box, Flex } from "@chakra-ui/react";
import SearchBar from "./searchbar";
import {Cart} from "./cart"
import { useStore } from "@/store/store";

export interface ChallengeProps {
  /**
   * The maximum number of domains the user is allowed to have
   * in their cart. Invalid domains count toward this limit as well.
   */
  maxDomains: number;
}

export function Challenge(props: ChallengeProps) {
  const { maxDomains } = props;
  const setNumDomainsReq = useStore((state) => state.setNumDomainsReq);
  setNumDomainsReq(maxDomains)
  console.log(maxDomains)


  return (
    <Box  minWidth="200px" width="100%" mx="auto" px={0} borderWidth={0}> 
        <SearchBar onSearch={() => {}} />
        <Cart />
    </Box>
  );
}
