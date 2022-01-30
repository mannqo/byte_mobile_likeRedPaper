import { Redirect } from "react-router-dom";
import BeLiked from "../page/BeLiked";
import ChatRecord from "../page/ChatRecord";
import CreateChatting from "../page/CreateChatting";
import Fans from "../page/Fans";
import PostDetail from "../page/PostDetail";
import Search from "../page/Search";
import Tabbar from "../page/Tabbar";
import HomePage from "../page/Tabbar/HomePage";
import Message from "../page/Tabbar/Message";
import PersonalCenter from "../page/Tabbar/PersonalCenter";
import Login from "../page/Login";

const routes = [
    {
        path: "/login",
        exact: true,
        component: Login
    },
    {
        path: "/",
        exact: true,
        render: () => <Redirect to="/login" />
    },
    {
        path: "/tabbar",
        component: Tabbar,
        routes: [
            {
                path: "/tabbar",
                exact: true,
                render: () => <Redirect to="/tabbar/home" />
            },
            {
                path: "/tabbar/home",
                exact: true,
                component: HomePage,
            },
            {
                path: "/tabbar/message",
                exact: true,
                component: Message,
            },
            {
                path: "/tabbar/me",
                exact: true,
                component: PersonalCenter,
            },
        ]
    },
    {
        path: "/message/detail",
        exact: true,
        component: ChatRecord,
    },
    {
        path: "/message/fans",
        exact: true,
        component: Fans,
    },
    {
        path: "/message/like",
        component: BeLiked
    },
    {
        path: "/search",
        component: Search,
    },
    {
        path: "/createChatting",
        component: CreateChatting
    },
    {
        path: "/post/detail/:articleId",
        exact: true,
        component: PostDetail,
    }
]

export default routes;