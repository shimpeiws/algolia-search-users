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
import styled from "styled-components";
import { HitComponent } from "./components/HitComponent";

const Header = styled.div`
  width: 100%;
  height: 100px;
  padding: 50px 0 0 0;
`;

const HeaderBody = styled.h2`
  font-size: 2rem;
  padding: 10px;
`;

const Wraapper = styled.div`
  width: 970px;
  margin: 30px auto 40px;
  font-family: "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "メイリオ",
    Meiryo, "ＭＳ Ｐゴシック", sans-serif;
`;

const Sidebar = styled.div`
  float: left;
  width: 275px;
`;

const Main = styled.div`
  display: block;
  float: right;
  width: 660px;
  font-size: 1rem;
`;

const StyledClearRefinements = styled(ClearRefinements)`
  .ais-ClearRefinements-button {
    width: 100px;
    padding: 3px;
  }
`;

const Facet = styled.div`
  margin: 20px 0;
  font-size: 1.2rem;
`;

const StyledRefinementList = styled(RefinementList)`
  margin: 10px 0;

  .ais-RefinementList-item {
    margin: 10px 0 0 0;
  }
`;

const StyledSearchBox = styled(SearchBox)`
  .ais-SearchBox-input {
    font-size: 1.5rem;
    width: 300px;
    height: 100px;
  }

  .ais-SearchBox-submit {
    margin: 0 20px;
  }
`;

const StyledHits = styled(Hits)`
  margin: 20px 0;
`;

const StyledPagination = styled(Pagination)`
  margin: 20px 0;
  .ais-Pagination-list {
    display: inline;
  }
  .ais-Pagination-item {
    display: inline;
    margin: 0 10px;
  }
`;

export default function Search(_: RouteComponentProps) {
  const [searchClient, setSearchClient] = React.useState({});

  React.useEffect(() => {
    const f = async () => {
      axios.defaults.withCredentials = true;
      const headers: any = {
        "Content-Type": "application/json"
      };
      const client = axios.create({
        baseURL:
          "https://krb3lq5lv3.execute-api.ap-northeast-1.amazonaws.com/dev",
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
        <>
          <Header>
            <HeaderBody>Search from Users</HeaderBody>
          </Header>
          <Wraapper>
            <div className="ais-InstantSearch">
              <InstantSearch
                searchClient={searchClient}
                indexName="algolia-search-users"
              >
                <Sidebar>
                  <StyledClearRefinements
                    translations={{
                      reset: "クリア"
                    }}
                  />
                  <Facet>
                    <h3>会社ID</h3>
                    <StyledRefinementList attribute="companyId" />
                    <Configure hitsPerPage={8} />
                  </Facet>
                  <Facet>
                    <h3>性別</h3>
                    <StyledRefinementList attribute="gender" />
                    <Configure hitsPerPage={8} />
                  </Facet>
                  <CreatedAtRangeInput attribute="createdAt" />
                </Sidebar>
                <Main>
                  <StyledSearchBox
                    translations={{
                      submitTitle: "Submit your search query.",
                      resetTitle: "Clear your search query.",
                      placeholder: "検索内容"
                    }}
                  />
                  <StyledHits hitComponent={HitComponent} />
                  <StyledPagination />
                </Main>
              </InstantSearch>
            </div>
          </Wraapper>
        </>
      )}
    </>
  );
}
