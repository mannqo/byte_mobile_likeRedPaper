import { Button, Dialog, Input, NavBar, Space, Tag, TextArea, Toast } from "antd-mobile";
import ImageUploader, { ImageUploadItem } from "antd-mobile/es/components/image-uploader";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { revertUploadImage, uploadImage } from "../../services/upload";
import { UserFullInfo } from "../PostDetail";
import cookie from 'react-cookies';
import { postArticle } from "../../services/article";
import { ExecuteError } from "../../services/axios";
import { DialogShowRef } from "antd-mobile/es/components/dialog";

export default function WriteArticle() {
    const history = useHistory();
    const userInfo = cookie.load('userInfo') as UserFullInfo;
    if (!userInfo) history.push('/login');

    // Ref
    const handler = useRef<DialogShowRef>();

    // State
    const [fileList, setFileList] = useState<ImageUploadItem[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    let tagText = "";

    // 上传之前的检查
    const beforeUpload = (files: File[]) => {
        return files.filter(file => {
            if (file.size > 10 * 1024 * 1024) {
                Toast.show('请选择小于 10M 的图片');
                return false;
            }
            return true;
        })
    }

    // 上传图片
    const imageUpload = async (file: File) => {
        const data = new FormData();
        data.append('image', file, file.name);
        return (await uploadImage(data)) as ImageUploadItem;
    }

    // 撤销上传图片
    const revertImageUpload = async (item: ImageUploadItem) => {
        return Dialog.confirm({
            content: '是否确认删除',
        }).then(async confirmed => {
            if (confirmed) {
                try {
                    const splited = item.url.split('/');
                    const fileName = splited[splited.length - 1];
                    await revertUploadImage({ fileName });
                } catch (err) {
                    Toast.show((err as ExecuteError).message);
                    return false;
                }
                return true;
            }
            return false;
        })
    }

    // 添加Tag
    const addTagBtn = () => {
        const afterClose = (confirmed: boolean) => {
            if (confirmed) {
                let arr = [...tags];
                arr.push(tagText);
                setTags(arr);
            }
            tagText = "";
        }
        handler.current = Dialog.show({
            content: <div>
                <div><Input
                    placeholder="请输入要添加的Tag"
                    onEnterPress={() => {
                        handler.current?.close();
                        afterClose(true);
                    }}
                    onChange={text => tagText = text}
                /></div>
            </div>,
            actions: [[
                {
                    key: 'cancel',
                    text: '取消',
                    onClick: () => {
                        handler.current?.close();
                        afterClose(false);
                    },
                },
                {
                    key: 'close',
                    text: '确定',
                    onClick: () => {
                        handler.current?.close();
                        afterClose(true);
                    },
                },
            ]],
        })

    }

    // 删除Tag
    const removeTag = (index: number) => {
        Dialog.confirm({
            content: '是否要删除 #' + tags[index],
        }).then(confirmed => {
            if (confirmed) {
                let arr = [...tags];
                arr.splice(index, 1);
                setTags(arr);
            }
        })
    }

    // 发布笔记
    const postArticleBtn = async () => {
        try {
            if (fileList.length === 0) {
                throw new Error('请至少上传一张图片');
            }
            await postArticle({
                userId: userInfo.userId,
                title,
                content,
                tags,
                images: fileList.map(item => item.url)
            })
            Toast.show('发布成功');
            history.goBack();
        } catch (err) {
            Toast.show((err as ExecuteError).message);
        }
    }

    // 文章的Tags
    const tagItems = tags.map((text, idx) =>
        <Tag
            className="tag"
            color="primary"
            fill="outline"
            style={{
                '--border-color': 'transparent',
                'cursor': 'pointer',
                fontSize: '1rem'
            }}
            key={idx}
            onClick={() => removeTag(idx)}
        >
            #{text}
        </Tag>
    )

    return <Container>
        <NavBar onBack={history.goBack} > </NavBar>
        <div className="main">
            <ImageUploader
                className="images"
                value={fileList}
                onChange={setFileList}
                upload={imageUpload}
                onDelete={revertImageUpload}
                multiple
                maxCount={9}
                showUpload={fileList.length < 9}
                beforeUpload={beforeUpload}
                onCountExceed={exceed => {
                    Toast.show(`最多选择 ${9} 张图片，你多选了 ${exceed} 张`)
                }}
            />
            <Input
                placeholder="填写标题会有更多赞哦 ~"
                onChange={text => setTitle(text)}
            />
            <hr />
            <TextArea
                style={{ '--font-size': '15px' }}
                placeholder="添加正文"
                rows={5}
                onChange={text => setContent(text)}
            />
            <Space block style={{ margin: '12px 0' }}>
                <Button size="mini" onClick={addTagBtn}># 话题</Button>
                <Button size="mini">@ 用户</Button>
            </Space>
            {tagItems.length > 0 ? <Space block wrap={true}>{tagItems}</Space> : undefined}
            <hr />
        </div>
        <Space className="bottom" block align="center">
            <Button
                onClick={postArticleBtn}
                color="primary"
                shape="rounded"
                style={{
                    'width': '100%'
                }}
            >
                发布笔记
            </Button>
        </Space>
    </Container>;
}

const Container = styled.div`
    * {
        box-sizing: border-box;
    }

    .main {
        padding: 12px;
        margin-bottom: 50px; 
    }

    hr {
        border-color: #f8f8f838;
        border-width: 0.5px 0 0 0;
        margin: 12px 0;
    }

    .images {
        margin-bottom: 24px;
    }

    .bottom {
        position: fixed;
        width: 100%;
        padding: 6px 12px;
        background-color: white;
        bottom: 0;
        font-weight: bold;
    }

    .bottom > * {
        flex: auto;
    }
`