import * as React from "react";
import { connectRange } from "react-instantsearch-dom";
import { DateTime } from "luxon";
import styled from "styled-components";

interface OwnProps {
  currentRefinement: any;
  min: any;
  max: any;
  precision: any;
  refine: any;
}

const StyledInput = styled.input`
  font-size: 1.2rem;
`;

const RangeInput: React.FC<OwnProps> = ({
  currentRefinement,
  min,
  max,
  precision,
  refine
}) => {
  console.info("currentRefinement", currentRefinement);
  if (!currentRefinement.min || !currentRefinement.max) {
    return null;
  }
  return (
    <form>
      <StyledInput
        type="date"
        min={min}
        max={max}
        value={DateTime.fromSeconds(currentRefinement.min).toFormat(
          "yyyy-MM-dd'"
        )}
        onChange={event => {
          refine({
            ...currentRefinement,
            min: DateTime.fromFormat(
              event.target.value,
              "yyyy-MM-dd'"
            ).toSeconds()
          });
        }}
      />
      {" - "}
      <StyledInput
        type="date"
        min={min}
        max={max}
        value={DateTime.fromSeconds(currentRefinement.max).toFormat(
          "yyyy-MM-dd'"
        )}
        onChange={event => {
          refine({
            ...currentRefinement,
            max: DateTime.fromFormat(
              event.target.value,
              "yyyy-MM-dd'"
            ).toSeconds()
          });
        }}
      />
    </form>
  );
};

export const CreatedAtRangeInput = connectRange(RangeInput);
