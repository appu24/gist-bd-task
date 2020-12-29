import styled, { createGlobalStyle, css } from 'styled-components'
import { Layout } from 'antd';

const {
  Content
} = Layout;

const antdCss = css`
  ${import('antd/dist/antd.css')}
`;

export const GlobalStyle = createGlobalStyle`
  ${antdCss}
`;

export const BDContent = styled(Content)`
  padding: 0 50px;
  margin-top: 100px;
  min-height: 550px!important;

  .site-layout-background {
    background: #fff;
    padding: 24px;
    min-height: 380px;
  }

  [data-theme="dark"] .site-layout-background {
    background: #185471;
  }
`;
