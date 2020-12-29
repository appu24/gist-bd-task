import React, {
  useState,
  useEffect
} from 'react'
import {
  Link
} from 'react-router-dom';
import {
  Spin,
  Collapse,
  Typography,
  Input,
  Table,
  Space,
  Radio
} from 'antd';

import { LoadingOutlined } from '@ant-design/icons';
import { Octokit } from "@octokit/rest";

import {
  GistBlock,
  SearchBlock
} from './style'

import Layout from '../../common/Layout';

const octokit = new Octokit();
const { Column } = Table;
const { Search } = Input;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export default () => {
  const [gist, setGist] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(100);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('gistID');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGist(search);
  }, [page]);

  const getGist = async (searchKey) => {
    try {
      setLoading(true);
      if(searchBy === "username" && searchKey && searchKey !== '') {
        let g = await octokit.gists.listForUser({
          username: searchKey, //"nayelyzarazua-bluetrail"
          per_page: 10,
          page: page
        });
        setPageTotal(100);
        setGist(g.data);
      } else {
        setSearchBy('gistID');
        let g = await octokit.gists.listPublic({
          per_page: 10,
          page: page
        });
        setPageTotal(1000);
        setGist(g.data);
      }
    } catch(err) {
      console.log("error - ", err);
      setGist([]);
      setPageTotal(0);
    }
    setLoading(false);
  };

  const onSearch = async (searchKey) => {
    try {
      setLoading(true);
      setSearch(searchKey);

      if(!searchKey || searchKey === "") {
        getGist(searchKey);
        return;
      }

      setPage(1);

      if(searchBy === "username") {
        let g = await octokit.gists.listForUser({
          username: searchKey, //"nayelyzarazua-bluetrail"
          per_page: 10,
          page: 1
        });
        setGist(g.data);
        if(g.data.length < 10) {
          setPageTotal(g.data.length);
        } else {
          setPageTotal(100);
        }
      } else {
        let g = await octokit.gists.get({
          gist_id: searchKey, // 44ce722a0dd04e000ca79955a2dbca71
        });
        setGist([g.data]);
        setPageTotal(1);
      }
    } catch(err) {
      console.log("error - ", err);
      setGist([]);
      setPageTotal(0);
    }
    setLoading(false);
  };

  const onPageChange = (page, pageSize) => {
    setPage(page);
  };

  return <Layout page={"gist"}>
    <GistBlock>
      <SearchBlock>
        <Search
          placeholder={`Search by ${(searchBy === "username" ? "Username" : "Gist ID")}`}
          allowClear
          onSearch={onSearch}
          enterButton
        />
        <Radio.Group value={searchBy} onChange={(data) => {setSearchBy(data.target.value)}}>
          <Radio.Button value="gistID">Gist ID</Radio.Button>
          <Radio.Button value="username">Username</Radio.Button>
        </Radio.Group>
      </SearchBlock>
      {(loading) ? <Spin indicator={antIcon} /> : <>
        <Table
          dataSource={gist}
          pagination={{
            position: ["none", "bottomCenter"],
            total: pageTotal,
            onChange: onPageChange,
            current: page
          }}
        >
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Owner" dataIndex={["owner", "login"]} />
          <Column title="Description" dataIndex="description" key="description" />
          <Column
            title="Action"
            key="action"
            render={(record) => (
              <Space size="middle">
                <Link
                  to={{
                    pathname: `/view/${record.id}`,
                    data: record
                  }}
                >
                  View
                </Link>
              </Space>
            )}
          />
        </Table>
      </>}
    </GistBlock>
  </Layout>
};
