import { Button, NavBar, PullToRefresh, SearchBar, Tabs, Toast } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input';
import { useEffect, useState } from 'react'
import { useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components';
import { ExecuteError } from '../../services/axios';
import { searchByArticle, searchByUser } from '../../services/search';
import { Article } from '../PostDetail';
import ArticleResult from './component/ArticleResult';
import UserResult from './component/UserResult';

export default function Search() {
    const history = useHistory();

    const { keyWord } = useParams<{ keyWord: string | undefined }>()

    // State
    const [searchText, setSearchText] = useState(keyWord);
    const [searched, setSearched] = useState(false);
    const [articles, setArticles] = useState<Article[]>([]);
    const [users, setUsers] = useState<any[]>([]);

    // Effect
    useEffect(() => {
        if (keyWord) {
            searchBtn();
        }
    }, []);

    // Ref
    let searchRef = useRef<InputRef>(null);

    // 搜索按钮
    const searchBtn = async () => {
        if (searchText !== "") {
            try {
                setArticles((await searchByArticle({ keyWord: searchText })).articles);
                setUsers((await searchByUser({ keyWord: searchText })).users);
                setSearched(true);
            } catch (err) {
                Toast.show((err as ExecuteError).message);
            }
        } else {
            Toast.show('请输入搜索内容');
            searchRef.current?.focus();
            setSearched(false);
        }
    }

    // 刷新搜索结果
    const refresh = async () => {
        await searchBtn();
    }

    return (
        <SearchContainer>
            <div className='nav'>
                <NavBar
                    onBack={history.goBack}
                    right={<Button size='mini' onClick={searchBtn}>搜索</Button>}
                >
                    <SearchBar
                        className='searchBar'
                        placeholder='请输入内容'
                        value={searchText}
                        onChange={text => setSearchText(text)}
                        ref={searchRef}
                    />
                </NavBar>
            </div>
            <div className='main'>
                {searched ?
                    <PullToRefresh onRefresh={refresh}>
                        <Tabs defaultActiveKey='1'>
                            <Tabs.Tab title='文章' key='1'>
                                <ArticleResult articles={articles} />
                            </Tabs.Tab>
                            <Tabs.Tab title='用户' key='2'>
                                <UserResult userList={users} />
                            </Tabs.Tab>
                        </Tabs>
                    </PullToRefresh> : undefined}
            </div>
        </SearchContainer>
    )
}

const SearchContainer = styled.div`
    * {
        box-sizing: border-box;
    }

    .nav {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 4px 0;
        background-color: #fff;
        z-index: 999;
    }

    .adm-nav-bar-left, 
    .adm-nav-bar-right {
        flex: 0;
    }

    .main {
        margin-top: 48px;
    }
`