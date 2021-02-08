/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-02-08 09:04:22
 * @Description: 用户列表
 * @LastEditTime: 2021-02-08 09:36:10
 */
import { useEffect } from 'react';
import { connect } from 'dva';

//插件
import { Table } from 'antd';

//自定义组件
import FormData from '@/components/Form/FormData';

//样式
import _style from './index.less'
const Account = ({ dispatch, main }) => {
  const { account } = main;
  useEffect(() => {
    dispatch({ type: 'main/getUsers', payload: {} });
  }, []);

  //查询表单
  const formProps = {
    // formClass: styles.searchStyle,
    formColumns: [
      {
        placeholder: '请输入姓名',
        field: 'name',
        label: '姓名',
        colSpan: 6,
        // prefix={prefix} type={inputType}
      },
      {
        placeholder: '请输入年龄',
        field: 'age',
        label: '年龄',
        colSpan: 6,
        // prefix={prefix} type={inputType}
      },

      {
        type: 'input',
        field: 'address',
        label: '地址',
        colSpan: 6,
        // formItemClass: styles.formItem,
        placeholder: '请输入户籍地址',
      },

      {
        type: 'input',
        field: 'nation',
        label: '国籍',
        colSpan: 6,
        // formItemClass: styles.formItem,
        placeholder: '请输入国籍',
      },
      {
        type: 'input',
        field: 'department',
        label: '职业',
        colSpan: 6,
        // formItemClass: styles.formItem,
        placeholder: '请输入职业',
      },
      {
        type: 'btn',
        colSpan: 6,
        btnLists: [
          {
            title: '查询',
            type: 'primary',
            clickFuc: `onSubmitValues`,
            // btnClass: styles.btnLeft,
          },
          {
            title: '重置',
            clickFuc: `onReset`,
          },
        ],
      },
    ],
    formValue: values => {
      dispatch({ type: 'main/setState', payload: { searchForm: values } });
      dispatch({ type: 'main/getUsers', payload: {} });
      console.log(values, '提交表单');
    },
  };

  //tablepros
  const tableProps = {
    columns: [
      {
        title: '',
        dataIndex: 'vatar',
        width:60,
        render: (value,record)=>{
            return <div className={_style.vatar}><img src={record.portait}></img></div>
        }
      },
      {
        title: '姓名',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },

      {
        title: '国籍',
        dataIndex: 'national',
      },
      {
        title: '职业',
        dataIndex: 'accupation',
      },
      {
        title: '地址',
        dataIndex: 'address',
      },
    ],
    dataSource: account,
    // pagination: userListPage,
    // className: styles.userTable,
    // ref: currentRef,
  };

  return (
    <div>
      {/* form表单 */}
      <FormData {...formProps} />

      {/* 表格展示 */}
      <Table {...tableProps} scroll={{ y: 'calc(100vh - 370px)' }} />
    </div>
  );
};
export default connect(({ main }) => ({ main }))(Account);
