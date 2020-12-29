import React, {
  useState,
  useEffect
} from 'react'
import {
  Link
} from 'react-router-dom';
import {
  Spin,
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

const Gist = () => {

  // Declaring state variables for Gist details, pagination and search attributes
  const [gist, setGist] = useState([]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(100);
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('gistID');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getGist(search);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchBy]);

  // Function to get list of Gists
  const getGist = async (searchKey) => {
    try {
      setLoading(true);
      setSearch(searchKey);

      if(searchBy === "username" && searchKey && searchKey !== '') {
        let g = await octokit.gists.listForUser({
          username: searchKey, //"nayelyzarazua-bluetrail"
          per_page: 10,
          page: page
        });
        setGist(g.data);
        if(g.data.length < 10) {
          setPageTotal(g.data.length);
        } else {
          setPageTotal(100);
        }
      } else {
        setSearchBy('gistID');
        if(searchKey && searchKey !== '') {
          let g = await octokit.gists.get({
            gist_id: searchKey, // 44ce722a0dd04e000ca79955a2dbca71
          });
          setGist([g.data]);
          setPageTotal(1);
        } else {
          let g = await octokit.gists.listPublic({
            per_page: 10,
            page: page
          });
          setPageTotal(1000);
          setGist(g.data);
        }
      }
    } catch(err) {
      console.log("error - ", err);
      setGist([]);
      setPageTotal(0);
    }
    setLoading(false);
  };

  // Function initiated on Page change
  const onPageChange = (page, pageSize) => {
    setPage(page);
  };

  // Function initiated on change on Search-by option
  const onChangeOfSearchBy = (data) => {
    setPage(1);
    setSearchBy(data.target.value)
  };

  return <Layout page={"gist"}>
    <GistBlock>
      <SearchBlock>
        <Search
          placeholder={`Search by ${(searchBy === "username" ? "Username" : "Gist ID")}`}
          allowClear
          onSearch={getGist}
          enterButton
        />
        <Radio.Group value={searchBy} onChange={onChangeOfSearchBy}>
          <Radio.Button value="gistID" key="gistID">Gist ID</Radio.Button>
          <Radio.Button value="username" key="username">Username</Radio.Button>
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

export default Gist;
