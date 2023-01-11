import React, { useState, useEffect, useRef } from 'react'
import { Button, Col, Form, Input, Row, Select, DatePicker, Table, Tag, Modal, Space, Drawer, Radio, message, Dropdown, Breadcrumb, Tree } from 'antd';
import { DownOutlined, UpOutlined, ExclamationCircleFilled, createFromIconfontCN } from '@ant-design/icons';
import moment from 'moment';
import { roleList, addRole, delRole, updateRole, excel, sideMenusApi } from '../../../apis/ums';
import { Link } from 'react-router-dom';
const { Option } = Select;
const { confirm } = Modal;
export default function Role() {
  const [rootList, setRootList] = useState([]);
  const [addAndUpdate, setAddAndUpdate] = useState(false);
  const [pageNumber, setPageNumber] = useState('');
  const username = useRef();
  const roleDescription = useRef();
  const [roleValue, setRoleValue] = useState([]);
  const [Page, updatePage] = useState(0);
  const [deptValue, setDeptValue] = useState('');
  const [getOptions, setGetOptions] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [ssexValue, setSsexValue] = useState('');
  const [searchInfor, setSearchInfor] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  const [userDataList, setUserDataList] = useState([]);
  const [total, setTotal] = React.useState(0);
  const { RangePicker } = DatePicker;
  const [expand, setExpand] = useState(false);
  const [form] = Form.useForm();
  const [openDrawer, setOpenDrawer] = useState(false);
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/c/font_3835532_c4tmklw5son.js',
    ],
  });
  function treeD() {
    let o = [];
    function a(data) {
      data.forEach(item => {
        if (item.children) {
          o.push(item.title)
          treeD(item.children);
        }
      })
    }

    console.log(o);
    return o;
  }
  const treeData = [
    {
      title: '系统管理',
      key: 'systemManage',
      children: [
        {
          title: '用户管理',
          key: 'userManage',
          children: [
            {
              title: '新增用户',
              key: 'addUser',
            },
            {
              title: '修改用户',
              key: 'updateUser',
            },
            {
              title: '删除用户',
              key: 'delUser',
            },
            {
              title: '导出Excel',
              key: 'excel',
            },
            {
              title: '密码重置',
              key: 'reset',
            },
          ],
        }
      ],
    },
  ];
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };
  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };
  const showDrawer = () => {
    setSearchInfor('');
    setOpenDrawer(true);
    setAddAndUpdate(false);
    sideMenusApi().then(res => {
      setRootList(res.rows.children)
      console.log(res.rows.children);
      treeD(res.rows.children)
    })
    updatePage(e => e + 1);
  };
  const onClose = () => {
    setOpenDrawer(false);
    updatePage(false);
  };

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    // console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  // const clearFilters = () => {
  //   setFilteredInfo({});
  // };
  // const clearAll = () => {
  //   setFilteredInfo({});
  //   setSortedInfo({});
  // };
  // const setAgeSort = () => {
  //   setSortedInfo({
  //     order: 'descend',
  //     columnKey: 'age',
  //   });
  // };
  const columns = [
    {
      title: '角色',
      dataIndex: 'roleName',
    },
    {
      title: '描述',
      dataIndex: 'remark',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      defaultSortOrder: '',
      sorter: (a, b) => Date.parse(a.createTime) - Date.parse(b.createTime),
      render: (text) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      defaultSortOrder: '',
      sorter: (a, b) => Date.parse(a.modifyTime) - Date.parse(b.modifyTime),
      render: (text) => {
        return moment(text).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      render: (item) => <div><Space onClick={() => update(item.userId)} style={{ cursor: 'pointer' }}>
        <IconFont type="icon-setting" />
      </Space>&nbsp;&nbsp;&nbsp;<Space onClick={() => showModal(item.userId)} style={{ cursor: 'pointer' }}>
          <IconFont type="icon-yanjing-" />
        </Space></div>
    },
  ];
  useEffect(() => {
    getList(10, (pageNumber || 1));
    form.setFieldsValue(searchInfor);
  }, [searchInfor])
  const getFields = () => {
    const children = [];
    children.push(
      <Col span={12} key='role'>
        <Form.Item
          name='role'
          label={'角色'}
        >
          <Input />
        </Form.Item>
      </Col>,
      <Col span={12} key='cjsj'>
        <Form.Item name="cjsj" label="创建时间">
          <RangePicker style={{ width: '400px' }} />
        </Form.Item>
      </Col>
    );

    return children;
  };
  const onFinish = (values) => {
    let a = '';
    let b = '';
    console.log('Received values of form: ', values);
    if (values.cjsj && values.cjsj[0].$D < 10) {
      values.cjsj[0].$D = `0${values.cjsj[0].$D}`
      a = `${values.cjsj[0].$y}-${values.cjsj[0].$M + 1}-${values.cjsj[0].$D}`;
    } else {
      values.cjsj = ''
    }
    if (values.cjsj && values.cjsj[1].$D < 10) {
      values.cjsj[1].$D = `0${values.cjsj[1].$D}`
      b = `${values.cjsj[1].$y}-${values.cjsj[1].$M + 1}-${values.cjsj[1].$D}`;
    } else {
      values.cjsj = ''
    }
    if (!values.yhm) {
      values.yhm = ''
    }
    if (!values.bm) {
      values.bm = ''
    }
    roleList(`pageSize=${10}&pageNum=${pageNumber || 1}&roleName=${values.role || ''}&createTimeFrom=${a}&createTimeTo=${b}`).then(res => {
      setUserDataList(res.rows);
      setTotal(res.total)
    })
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setGetOptions(newSelectedRowKeys)
    // console.log('selectedRowKeys changed1: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  function onChange(pageNumber, pageSize) {
    getList(pageSize, pageNumber);
    // console.log(pageSize, pageNumber);
    setPageNumber(pageNumber);
  }
  function getList(a, b) {
    roleList(`pageSize=${a}&pageNum=${b}`).then(res => {
      setUserDataList(res.rows)
      setTotal(res.total)
    })
  }
  const [open, setOpen] = useState(false);
  const showModal = (a) => {
    setOpen(true);
    userDataList.forEach(item => {
      if (item.userId == a) {
        setSearchInfor(item);
      }
    })
  };
  const hideModal = () => {
    setOpen(false);
  };
  function judgeSex(a) {
    if (a == '0') {
      return a = '男'
    } else if (a == '1') {
      return a = '女'
    } else {
      return a = '保密'
    }
  }
  function judgeStatus(a) {
    if (a == '1') {
      a = '有效'
    } else {
      a = '锁定'
    }
    return (
      <Tag color={a == '有效' ? 'green' : 'red'} key={a}>
        {a.toUpperCase()}
      </Tag>
    );
  }
  function getStatus(e) {
    // console.log(e);
    setStatusValue(e.target.value);
  }
  function getSsex(e) {
    setSsexValue(e.target.value);
  }
  function addPost() {
    addUser({
      username: username.current.input.value,
      password: password.current.input.value,
      email: email.current.input.value,
      mobile: mobile.current.input.value,
      roleId: roleValue.toString(),
      status: statusValue,
      ssex: ssexValue,
      deptId: deptValue
    }).then(() => {
      userList(`pageSize=${10}&pageNum=${pageNumber || 1}`).then((res) => {
        setUserDataList(res.rows)
        setTotal(res.total)
        message.success('新增成功');
        setOpenDrawer(false);
        updatePage(e => e + 1);
      })
    })
  }
  function updatePost() {
    updateUser({
      username: username.current.input.value,
      email: email.current.input.value,
      mobile: mobile.current.input.value,
      roleId: roleValue.toString() || searchInfor.roleId,
      status: statusValue || searchInfor.status,
      ssex: ssexValue || searchInfor.ssex,
      deptId: deptValue,
      userId: searchInfor.userId
    }).then(() => {
      userList(`pageSize=${10}&pageNum=${pageNumber || 1}`).then((res) => {
        setUserDataList(res.rows)
        setTotal(res.total)
        setOpenDrawer(false);
        message.success('修改成功');
        updatePage(e => e + 1);
      })
    })
  }
  function del() {
    if (getOptions) {
      let a = [];
      userDataList.forEach(item => {
        getOptions.forEach(item2 => {
          if (item2 == item.userId) {
            a.push(item.username)
          }
        })
      })
      confirm({
        title: '提示',
        icon: <ExclamationCircleFilled />,
        content: `您确定删除${a.toString()}吗？`,
        onOk() {
          delUser(getOptions).then(() => {
            userList(`pageSize=${10}&pageNum=${pageNumber || 1}`).then((res) => {
              setUserDataList(res.rows)
              setTotal(res.total)
              message.success('删除成功');
              updatePage(e => e + 1);
            })
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      messageApi.open({
        type: 'warning',
        content: '请选择需要删除的用户',
      });
    }

  }
  const update = (a) => {
    updatePage(e => e + 1);
    userDataList.forEach(item => {
      if (item.userId == a) {
        setSearchInfor(item);
      }
    })
    setOpenDrawer(true);
    setAddAndUpdate(true);
  }
  function selectRole(e) {
    let a = [];
    a.push(e);
    setRoleValue(a);
  }
  function selectDept(e) {
    setDeptValue(e);
  }
  const items = [
    {
      key: '1',
      label: (
        <div onClick={passwordReset}>
          密码重置
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div onClick={getExcel}>
          导出Excel
        </div>
      ),
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  function passwordReset() {
    if (getOptions) {
      confirm({
        title: '您确定重置选中用户密码吗？',
        icon: <ExclamationCircleFilled />,
        content: '当您点击确定按钮后，这些用户的密码将会重置为1234qwer',
        onOk() {
          reset({ usernames: getOptions }).then(() => {
            message.success('密码重置成功');
          })
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    } else {
      messageApi.open({
        type: 'warning',
        content: '请选择需要重置密码的用户',
      });
    }
  }
  function getExcel() {
    excel().then(() => {
      messageApi.open({
        type: 'loading',
        content: '导出数据中',
        duration: 0,
      });
      setTimeout(messageApi.destroy, 2500);
    })
  }
  return (
    <div>
      <Breadcrumb style={{ marginBottom: '40px' }}>
        <Breadcrumb.Item><Link to="/home/index">系统主页</Link></Breadcrumb.Item>
        <Breadcrumb.Item>
          系统管理
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          角色管理
        </Breadcrumb.Item>
      </Breadcrumb>
      <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
      >
        <Row gutter={24}>{getFields()}</Row>
        <Row>
          <Col
            span={24}
            style={{
              textAlign: 'right',
            }}
          >
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => {
                form.resetFields();
              }}
            >
              重置
            </Button>
          </Col>
        </Row>
        <Button style={{ marginRight: '10px' }} onClick={showDrawer}>新增</Button>
        <Button style={{ marginRight: '10px' }} onClick={del}>删除</Button>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottom"
        >
          <Button>更多操作<IconFont type="icon-keyboard_arrow_down" /></Button>
        </Dropdown>
      </Form>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={userDataList}
        rowKey='roleId'
        pagination={{ total, onChange, showTotal: (total, range) => `显示${range[0]}-${range[1]} 条记录，共 ${total} 条记录`, pageSizeOptions: [10, 20, 30, 40], showSizeChanger: true }}
        style={{ marginTop: '20px' }}
        onChange={handleChange}
      />
      <Modal
        title="用户信息"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="确认"
        cancelText="取消"
        width='750px'
      >
        <table style={{ width: '700px' }}>
          <tbody>
            <tr>
              <td rowSpan='4'><img src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + searchInfor.avatar} alt="" style={{ width: '115px', height: '115px', borderRadius: '5px' }} /></td>
              <td><IconFont type="icon-jurassic_user" />&nbsp;&nbsp;&nbsp;账户：{searchInfor.username}</td>
              <td><IconFont type="icon-fangzi" />&nbsp;&nbsp;&nbsp;部门：{searchInfor.deptName}</td>
            </tr>
            <tr>
              <td><IconFont type="icon-star" />&nbsp;&nbsp;&nbsp;角色：{searchInfor.roleName}</td>
              <td><IconFont type="icon-xiaolian" />&nbsp;&nbsp;&nbsp;状态：{judgeStatus(searchInfor.status)}</td>
            </tr>
            <tr>
              <td><IconFont type="icon-clothes" />&nbsp;&nbsp;&nbsp;性别：{judgeSex(searchInfor.ssex)}</td>
              <td><IconFont type="icon-shijian_o" />&nbsp;&nbsp;&nbsp;创建时间：{searchInfor.createTime}</td>
            </tr>
            <tr>
              <td><IconFont type="icon-dianhuazixun-dianhua" />&nbsp;&nbsp;&nbsp;电话：{searchInfor.mobile}</td>
              <td><IconFont type="icon-denglu" />&nbsp;&nbsp;&nbsp;最近登录：{searchInfor.lastLoginTime}</td>
            </tr>
            <tr>
              <td></td>
              <td><IconFont type="icon-youxiang" />&nbsp;&nbsp;&nbsp;邮箱：{searchInfor.email}</td>
              <td><IconFont type="icon-62" />&nbsp;&nbsp;&nbsp;描述：{searchInfor.description}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
      <Drawer
        title={addAndUpdate ? "修改用户" : "新增用户"}
        width={720}
        onClose={onClose}
        open={openDrawer}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={addAndUpdate ? updatePost : addPost} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        {Page ? <Form layout="vertical" hideRequiredMark initialValues={{
          'username': searchInfor.username,
          'email': searchInfor.email,
          'mobile': searchInfor.mobile,
          'roleName': addAndUpdate ? searchInfor.roleId.split(',') : [],
          'deptName': searchInfor.deptName,
          'status': searchInfor.status,
          'ssex': searchInfor.ssex,
        }}>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item
                name="roleName"
                label="角色名称"
                rules={[
                  {
                    required: true,
                    message: '请输入角色名称',
                  },
                ]}
              >
                <Input ref={username} />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="roleDescription"
                label="角色描述"
              >
                <Input.TextArea ref={roleDescription} style={{ height: '100px' }} />
              </Form.Item>
            </Col>
            <Col span={18}>
              <Form.Item
                name="rootChoice"
                label="权限选择"
              >
                <Tree
                  checkable
                  // defaultExpandedKeys={['0-0-0', '0-0-1']}
                  // defaultSelectedKeys={['0-0-0', '0-0-1']}
                  // defaultCheckedKeys={['0-0-0', '0-0-1']}
                  onSelect={onSelect}
                  onCheck={onCheck}
                  treeData={treeData}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
          : null}
      </Drawer>
      {contextHolder}
    </div>
  )
}

