import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Statistic } from 'semantic-ui-react';


function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [publicRepository, setPublicRepos] = useState('');
  const [privateRepository, setPrivateRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(null);
  const [descrip, setDescription] = useState('');
  const [totalCount, setTotalCount] = useState('');
  const [biggestRepo, setBiggestRepo] = useState('');

  useEffect(()=> {
    fetch("https://api.github.com/organizations?since=2")
      .then(res=> res.json())
      .then(data => {
        setData(data)
      })
  },[]);

  
  useEffect(()=> {
    fetch(`https://api.github.com/search/users?q=type%3Aorg`)
      .then(res=> res.json())
      .then(data => {
        numberOfOrganizations(data)
      })
  },[]);

  // useEffect(()=> {
  //   fetch(`https://api.github.com/orgs/ogc/repos`)
  //     .then(res=> res.json())
  //     .then(data => {
  //       biggestRepository(data)
  //     })
  // },[]);

  const setData = ({name, login, public_repos, total_private_repos, avatar_url, description}) => {
    setName(name)
    setUsername(login)
    setPublicRepos(public_repos)
    setPrivateRepos(total_private_repos)
    setAvatar(avatar_url)
    setDescription(description)
    
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value)
  };

  const handleSubmit = () => {
    fetch(`https://api.github.com/orgs/${userInput}`)
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }
  const numberOfOrganizations = ({total_count}) => {
    setTotalCount(total_count)
  }

  const biggestRepository = ({login, size}) => {
    setUsername(login)
    setBiggestRepo(size)
  }
  
  return (
    
    <div>
      <div className="navbar">Github Search</div>
      <div className="container">
      <Statistic horizontal>
    <Statistic.Value>{totalCount}</Statistic.Value>
    <Statistic.Label>Organizations</Statistic.Label>
  </Statistic>
      </div>
      <div className="search">
      <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder='Github Organization'
              name='github organization' onChange={handleSearch}
            />
            <Form.Button content='Search' />
          </Form.Group>
        </Form>
      </div>
      <div className="card">
        <Card>
          <Image src={avatar} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{name}</Card.Header>
            <Card.Header>{username}</Card.Header>
            <Card.Description>
            <Card.Header>{descrip}</Card.Header>
            </Card.Description>
            <Card.Header>{biggestRepo}</Card.Header>

          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='user'/>
              {[publicRepository] + [privateRepository]} Repositories
            </a>
          </Card.Content>
    </Card> 
      </div>
    </div>
  );
}

export default App;
