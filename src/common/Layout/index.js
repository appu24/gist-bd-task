import {
  Layout
} from 'antd';

import {
  BDContent,
  GlobalStyle
} from './style'

import Header from './Header';

export default (props) => {
  return <>
    <GlobalStyle />
    <Layout>
      <Header />
      <BDContent className="site-layout">
        {props.children}
      </BDContent>
    </Layout>
  </>
};
