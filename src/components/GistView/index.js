import React, {
  useState,
  useEffect
} from 'react'
import PropTypes from 'prop-types';
import {
  Typography,
  Card
} from 'antd';

import { Octokit } from "@octokit/rest";

import {
  GistDetailsBlock,
  GistDetail
} from './style'
import Layout from '../../common/Layout';

const { Title } = Typography;
const octokit = new Octokit();

const GistView = ({history, match, location}) => {

  const [data, setData] = useState({});
  const [gistID, setGistID] = useState("");
  const [loading, setLoading] = useState(true);

  const gistDetailsKey = [
    {key: 'node_id', type: 'text', label: 'Node ID'},
    {key: 'description', type: 'text', label: 'Description'},
    {key: 'user', type: 'text', label: 'User'},

    {key: 'created_at', type: 'date', label: "Created On"},
    {key: 'updated_at', type: 'date', label: "Updated On"},

    {key: 'url', type: 'link', label: "URL"},
    {key: 'forks_url', type: 'link', label: "Fork URL"},
    {key: 'commits_url', type: 'link', label: "Commits URL"},
    {key: 'html_url', type: 'link', label: "HTML URL"},
    {key: 'comments_url', type: 'link', label: "Comments URL"}
  ];

  const gistFileKeys = [
    {
      key: "filename",
      type: "text",
      label: "File Name"
    }, {
      key: "raw_url",
      type: "link",
      label: "File Link"
    }
  ];

  const gistOwnerKeys = [
    {key: 'login', type: 'text', label: "Username"},
    {key: 'id', type: 'text', label: "Owner ID"},
    {key: 'node_id', type: 'text', label: "Node ID"},

    {key: 'url', type: 'link', label: "User URL"},
    {key: 'avatar_url', type: 'link', label: "Avatar URL"},
    {key: 'followers_url', type: 'link', label: "Followers URL"},
    {key: 'following_url', type: 'link', label: "Following URL"},
    {key: 'repos_url', type: 'link', label: "Repos URL"},
  ];

  useEffect(() => {
    setLoading(true);

    if(match && match.params && match.params.gistID && match.params.gistID !== "") {
      setGistID(match.params.gistID);
    } else {
      setLoading(false);
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(gistID === "") return;

    if(location && location.data) {
      setData(location.data);
      setLoading(false);
    } else {
      getGistData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gistID]);

  const getGistData = async () => {
    try {
      setLoading(true);
      let g = await octokit.gists.get({
        gist_id: gistID, // "44ce722a0dd04e000ca79955a2dbca71"
      });
      setData(g.data);
    } catch(err) {
      console.log("error - ", err);
      setData({});
    }
    setLoading(false);
  };

  const renderKeys = (gistData, key, dataType) => {
    switch(dataType) {
      case 'link':
        return <p>
          <a href={gistData[key]} target="_blank">
            {gistData[key]}
          </a>
        </p>;
      case 'date':
        return <p>{new Date(gistData[key]).toDateString()}</p>
      case 'text':
      default:
        return <p>{gistData[key]}</p>;
    }
  };

  return <Layout>
    <GistDetailsBlock>
      <Card title={<Title level={3}>{`Gist ID - ${gistID}`}</Title>} bordered={false} loading={loading}>
        {(gistID === "" || Object.keys(data).length === 0) ? <>
          <p>No records found!</p>
        </> : <>
          <Title level={4} underline>Gist Details:</Title>
          {gistDetailsKey.map((keyObj, index) => {
            return <GistDetail key={index}>
              <p className="label">{keyObj.label}</p>
              {renderKeys(data, keyObj.key, keyObj.type)}
            </GistDetail>;
          })}

          <Title level={4} underline>Owner Details:</Title>
          {gistOwnerKeys.map((keyObj, index) => {
            return <GistDetail key={index}>
              <p className="label">{keyObj.label}</p>
              {renderKeys(data.owner, keyObj.key, keyObj.type)}
            </GistDetail>;
          })}

          {(data.files && Object.keys(data.files).length) ? <>
            {Object.keys(data.files).map((filename, index) => {
              return <div key={index}>
                <Title level={4} underline>File - {filename}</Title>
                {gistFileKeys.map((keyObj, index) => {
                  return <GistDetail key={index}>
                    <p className="label">{keyObj.label}</p>
                    {renderKeys(data.files[filename], keyObj.key, keyObj.type)}
                  </GistDetail>;
                })}
              </div>;
            })}
          </> : null}
        </>}
      </Card>
    </GistDetailsBlock>
  </Layout>
};

GistView.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  location: PropTypes.object
}

export default GistView;
