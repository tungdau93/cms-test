import React, { Component } from 'react'
import { Layout, Typography, Table, Button, Row, Col, Divider, Popconfirm, Icon } from "antd"
import SearchInput, { createFilter } from 'react-search-input'

const { Title } = Typography

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity'
  },
  {
    title: 'Time (minutes)',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'ModifiedAt',
    dataIndex: 'modifiedAt',
    key:'modifiedAt'
  },
  {
    title: 'Actions',
    key: 'action',
    render: (text, record) => (
      <span>
        <a><Icon type="edit" theme='twoTone' style={{fontSize: '26px'}} /></a>
        <Divider type="vpoststical" />
        <Popconfirm
          title="Are you sure delete this post?"
          okText="Yes"
          cancelText="No"
        >
          <a><Icon type="delete" theme='twoTone' style={{fontSize: '26px'}} /></a>
        </Popconfirm>
      </span>
    )
  }
]

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Test ${i}`,
    type: 'logic',
    quantity: 8,
    time: 30,
    createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    modifiedAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    address: `London, Park Lane no. ${i}`,
  })
}

class ListTest extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  }

  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  render() {
    const { selectedRowKeys } = this.state
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      selections: [
        {
          // selected odd row
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          // selected even row
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    }
    return (
      <Layout>
        <Row>
          <Col span={6} className='title-wrapper'>
            <Title level={2}>List Tests</Title>
          </Col>
          <Col span={12} className='search-wrapper'>
            <SearchInput className="search-input" />
          </Col>
          <Col span={6} className='button-wrapper'>
            <Button type="primary">Add</Button>
            <Button type="danger">Delete</Button>
          </Col>
        </Row>
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} style={{whiteSpace: 'unset'}} ></Table>
      </Layout>
    )
  }
}

export default ListTest