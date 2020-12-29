import {
  Layout
} from 'antd';

import {
  BDContent,
  GlobalStyle
} from './style'

import Header from './Header';

const BDLayout = (props) => {
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

export default BDLayout;
