import styled from 'styled-components'
import { Layout } from 'antd';
const {
  Header
} = Layout;

export const BDHeader = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  background: #D3D3D3;

  .logo {
    width: 120px;
    height: 64px;
    background: url("https://media.istockphoto.com/vectors/round-initial-letter-bd-or-db-logo-design-template-element-colored-vector-id961950982?b=1&k=6&m=961950982&s=612x612&w=0&h=9VxLpdXmyT-oMyJ3S64BQSM6jO3S8bs7EVN9r5DKO9k=");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    float: left;
  }
`;
