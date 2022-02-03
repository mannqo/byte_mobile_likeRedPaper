import styled from 'styled-components';

export const formData = (date) => {
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    m = m < 10 ? ('0' + m) : m;
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
}

export const parserDate = (date) => {
    const t = Date.parse(date);
    if (!isNaN(t)) {
        return new Date(Date.parse(date.replace(/-/g, "/")));
    } else {
        return new Date();
    }
}

//空格为分割符 
export const ToArr = (data) => {
    return String(data).split(' ');
}

//简介展示省略
export const handleDescription = (string) => {
    if (string.length > 12) return string.slice(0, 12) + '...';
    else return string
}

export const userMapCN = {
    nickname: '名字',
    gender: '性别',
    birthday: '生日',
    area: '地区', 
    description: '简介',
    backGroundPicture: '背景图',
}

export const userMapTip = {
    nickname: '请输入你的名字',
    gender: '请选择你的性别',
    birthday: '请选择你的生日',
    area: '请选择你所在的地区', 
    description: '有趣的简介可以吸引粉丝',
    backGroundPicture: '请选择你的背景图',
}
 

export const areaOptions = [
    {
        label: '浙江',
        value: '浙江',
        children: [
            {
                label: '杭州',
                value: '杭州',
            },
            {
                label: '宁波',
                value: '宁波',
            },
        ],
    },
    {
        label: '广东',
        value: '广东',
        children: [
            {
                label: '广州',
                value: '广州',
            },
            {
                label: '深圳',
                value: '深圳',
            },
        ],
    },
]

export const genderOptions = [
    {
        label: '男',
        value: '1',
    },
    {
        label: '女',
        value: '0',
    },
]


// style.js
export const EditContainer = styled.div`
    .list-wrap {
        letter-spacing:1px;
        .adm-list-item-content-main {
            color:#6a6a6a;
        }
        .adm-list-item-content-extra {
            color:#090909;
        }
        .list-item {
            .adm-list-item-content-extra {
                color:#c8c8c8;
            } 
        }
        .bg-main {
            position:relative;
            display:flex;
            justify-content:center;
            align-items:center;
            height:100%;
            .bg-upload {
                position:absolute;
                z-index: 10;
                width:100px;
                height:100px;
                border-radius:50%;
                opacity:0;
            }
        }
    }
    .modal-wrap {
        .form-wrap {
            .adm-list-item-content-main {
                display:flex;
                justify-content:space-around;
            }
            .form-ipt {
                input {
                    height:45px;
                    border: 1px solid #a062d4;
                    border-radius:20px;
                    padding-left:15px;
                }
            }
        }
        
        .btn-wrap {
            display:flex;
            justify-content:space-around;
            .btn {
                width:70px;
                border-radius:10px;
            }
            .cancel-btn {
                background-color:#fafafa;
                border-color:#b0b0b0;
            }
        }
        .adm-modal-footer {
            padding:0;
        }
    }
`