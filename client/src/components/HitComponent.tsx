import * as React from "react";
import { DateTime } from "luxon";
import styled from "styled-components";

type Props = {
  hit: any;
};

const Wrapper = styled.div`
  font-size: 1.2rem;
  margin: 20px 0;
`;

export const HitComponent: React.FC<Props> = (props: Props) => (
  <Wrapper className="hit">
    {props.hit.name} {props.hit.gender === 1 ? "男性" : "女性"} / 登録日:{" "}
    {DateTime.fromSeconds(props.hit.createdAt).toFormat("yyyy-MM-dd")}
  </Wrapper>
);
