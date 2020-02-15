import * as React from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";
import algoliasearch from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  ClearRefinements,
  RefinementList,
  Configure,
  Pagination
} from "react-instantsearch-dom";
import { CreatedAtRangeInput } from "./components/CreatedAtRangeInput";

export default function Search(_: RouteComponentProps) {
  const [searchClient, setSearchClient] = React.useState({});

  React.useEffect(() => {
    const f = async () => {
      axios.defaults.withCredentials = true;
      const headers: any = {
        "Content-Type": "application/json"
      };
      const client = axios.create({
        baseURL: "YOUR_API_URL",
        headers: headers,
        responseType: "json"
      });
      const res = await client.post("/api-key", {
        companyId: "1d792a16-4cd2-11ea-b77f-2e728ce88125"
      });
      console.info(res.data.key);
      setSearchClient(algoliasearch("AZYZS3A698", res.data.key));
    };
    f();
  }, []);

  return (
    <>
      {searchClient && (
        <div>
          <div className="ais-InstantSearch">
            <h2>Search from Users</h2>
            <InstantSearch
              searchClient={searchClient}
              indexName="algolia-search-users"
            >
              <div>
                <ClearRefinements />
                <h2>companyId</h2>
                <RefinementList attribute="companyId" />
                <Configure hitsPerPage={8} />
                <h2>gender</h2>
                <RefinementList attribute="gender" />
                <Configure hitsPerPage={8} />
                <CreatedAtRangeInput attribute="createdAt" />
              </div>
              <div className="right-panel">
                <SearchBox />
                <Hits />
                <Pagination />
              </div>
            </InstantSearch>
          </div>
        </div>
      )}
    </>
  );
}
