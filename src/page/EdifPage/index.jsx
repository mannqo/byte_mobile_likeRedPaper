import { Form, NavBar, List, Modal, DatePicker, CascadePicker, Toast } from 'antd-mobile';
import React, { memo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UploadAvatar from './UploadAvatar';
import { editMy, getBaseUserInfo, getFullUserInfo, upload } from '../../services/users';
import cookie from 'react-cookies';
import { EditContainer } from './util';
import { formData, parserDate, areaOptions, professionOptions, genderOptions, userMapCN, userMapTip, ToArr, handleDescription } from './util';
import BgPic from './BgPic';
import FormNode from './FormNode';
import FormPickerNode from './FormPickerNode';


//待改成自动
const pickerMapOption = {
    profession: professionOptions,
    area: areaOptions,
    gender: genderOptions
}

export default memo(function EditPage() {
    const history = useHistory();
    const userInfo = cookie.load('userInfo');
    const { userId } = userInfo;
    const [user, setUser] = useState(userInfo);
    const [showModal, setShowModal] = useState(false);
    const [showSelect, setShowSelect] = useState(false);
    const [showDataSelect, setShowDataSelect] = useState(false);
    const [type, setType] = useState('name');
    const [tipText, settipText] = useState('');
    const [profession, setProfession] = useState(userInfo.profession)
    const [form] = Form.useForm()

    useEffect(async () => {
        try {
            const res = await getBaseUserInfo({ userId });
            const { user } = res;
            setUser(user);
            setProfession(user.profession);
        } catch (err) {
            console.log(err);
        }
    }, [userId])

    const send = async (dataObj) => {
        const fixUser = { userId, ...dataObj };
        try {
            const res = await editMy(fixUser);
            const { msg } = res;
            cancel();
            setUser({ ...user, ...dataObj });  // 修改cookies 
            cookie.save('userInfo', { ...user, ...dataObj });
            Toast.show({
                icon: 'success',
                content: msg,
            })
        } catch (err) {
            Toast.show({
                icon: 'loadding',
                content: '修改异常',
            })
        }

    }

    const showForm = (type, tipText) => {
        setType(type);
        settipText(tipText);
        form.setFieldsValue({
            [type]: user[type]
        })
        setShowModal(true);
    }
    const showDataPicker = (type) => {
        setType(type)
        setShowDataSelect(true);
    }
    const showPicker = (type) => {
        setType(type);
        setShowSelect(true);
    }
    const cancel = () => {
        setShowModal(false);
        setShowSelect(false);
        setShowDataSelect(false);
    }

    const dataConfirm = (value) => {
        const birthday = formData(value);
        send({ birthday });
    }

    const pickerConfirm = (value) => {
        switch (type) {
            case 'gender':
                const gender = value[0];
                send({ gender });
                break;

            case 'profession':
                const data = value[1];
                setProfession([...profession, data]);
                break;

            case 'area':
                const area = value.join(' ');
                send({ area });
                break;
            default:
                break;
        }
    }

    const showProfessionPicker = () => {
        setShowSelect(true);
    }

    const professionConfirm = () => {
        send({ profession });
    }

    const handleBackGround = async (e) => {
        const file = e.target.files[0];
        const formdata = new FormData();
        if (!file.name) return;
        formdata.append('backGroundPicture', file, file.name);
        formdata.append('userId', Number(userId));
        try {
            const res = await upload(formdata)
            const { backGroundPicture, msg } = res;
            setUser({ ...user, backGroundPicture });
            Toast.show({
                icon: 'success',
                content: msg,
            })
        } catch (err) {
            Toast.show({
                icon: 'loadding',
                content: '修改异常',
            })
        }
    }


    return (
        <EditContainer>
            <NavBar onBack={history.goBack} > 编辑资料 </NavBar>
            <UploadAvatar />
            <List className='list-wrap'>
                <List.Item className={user.nickname ? '' : 'list-item'} onClick={() => { showForm('nickname', '请输入你的名字') }} extra={user.nickname}>名字</List.Item>
                <List.Item onClick={() => { showPicker('gender') }} extra={user.gender === '1' ? '男' : '女'}>性别</List.Item>
                <List.Item className={user.birthday ? '' : 'list-item'} onClick={() => { showDataPicker('birthday') }} extra={user.birthday ? user.birthday : '请选择你的生日'}>生日</List.Item>
                <List.Item className={user.area ? '' : 'list-item'} onClick={() => { showPicker('area') }} extra={user.area ? user.area : '请选择你所在的地区'}>地区</List.Item>
                {/* <List.Item className={user.profession ? '' : 'list-item'} onClick={() => { showForm('profession') }} extra={user.profession ? user.profession.join(' ') : '选择职业'}>职业</List.Item> */}
                <List.Item className={user.description ? '' : 'list-item'} onClick={() => { showForm('description') }} extra={user.description ? handleDescription(user.description) : '有趣的简介可以吸引粉丝'}>简介</List.Item>
                <List.Item className={user.backGroundPicture ? '' : 'list-item'} onClick={() => { }} extra={(<BgPic user={user} handleBackGround={handleBackGround} />)}>背景图</List.Item>
            </List>
            <Modal
                className='modal-wrap'
                visible={showModal}
                getContainer={false}
                title={userMapCN[type]}
                content={type == 'profession'
                    ? <FormPickerNode cancel={cancel} profession={profession} showProfessionPicker={showProfessionPicker} professionConfirm={professionConfirm} />
                    : <FormNode send={send} form={form} tipText={tipText} type={type} cancel={cancel} />}
            />
            <DatePicker
                visible={showDataSelect}
                onClose={() => {
                    setShowSelect(false)
                }}
                precision='day'
                title={userMapTip[type]}
                min={new Date('1980/01/01')}
                max={new Date()}
                value={parserDate(user.birthday)}
                onConfirm={dataConfirm}
                onCancel={cancel}
            />
            <CascadePicker
                title={userMapTip[type]}
                visible={showSelect}
                value={ToArr(user[type])}
                options={pickerMapOption[type] ? pickerMapOption[type] : []}
                onClose={() => {
                    setShowSelect(false);
                }}
                onConfirm={pickerConfirm}
            />
        </EditContainer>

    );
});

