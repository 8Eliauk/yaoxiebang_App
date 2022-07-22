import './index.css'
import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import {Form, Input } from 'antd';

const DrawerComponents = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  
  const onFinish = (values) => {
    // console.log(values);
    props.getFormValue(values);
  };


  return (
    <>
      <Space>
        <Button type="primary" onClick={showDrawer}>
          我要兑换商品
        </Button>
      </Space>
      <Drawer
        title=""
        placement={'bottom'}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'bottom'}
      >
        {/* <div className='FormTable'> */}
            <Form onFinish={onFinish} >
                <Form.Item
                    label="收件人"
                    name="receiver"
                    rules={[{required: true,message: '请输入收件人姓名',},]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="手机号"
                    name="phone"
                    rules={[{required: true,message: '请输入您的手机号',},]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="收货地址"
                    name="address"
                    rules={[{required: true,message: '请输入您的收货地址',},]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[{required: true,message: '请输入您的邮箱',},]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                    offset: 8,
                    span: 16,
                    }}
                >
                    <Button htmlType="submit" >
                        提交
                    </Button>
                </Form.Item>
            </Form>
        {/* </div> */}
      </Drawer>
    </>
  );
};

export default DrawerComponents;