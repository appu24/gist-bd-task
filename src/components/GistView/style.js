import styled from 'styled-components'

export const GistDetailsBlock = styled.div`
  width: 80%;
  margin: auto;
  h4 {
    margin: 20px 0px!important;
  }
`;

export const GistDetail = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;

  .label {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    font-size: 16px;
    word-break: keep-all;
  }

  p {
    line-height: 1;
    word-break: break-word;
  }
`;
