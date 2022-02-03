import { Button } from 'antd-mobile';
import React, { memo } from 'react';

export default memo(function FormPickerNode(props) {
    const { cancel, profession, showProfessionPicker, professionConfirm } = props;
    return (
        <div className='profession-wrap'>
            <div className='profession-main'>
                {
                    profession.map(item => {
                        return (
                            <div key={item} className='profession-item'>
                                {item}
                            </div>
                        )
                    })
                }
                {
                    profession.length < 2 ?
                        (
                            <Button className='profession-add' onClick={showProfessionPicker}>
                                添加职业+
                            </Button>
                        ) : ''
                }
            </div>
            <div className='btn-wrap'>
                <Button className='btn' color='primary' onClick={professionConfirm}>确定</Button>
                <Button className='btn cancel-btn' color='default' onClick={cancel}>取消</Button>
            </div>
        </div>
    );
});
