import React, { Component } from 'react'
import { Layout, Typography, Table, Button, Row, Col, Divider, Popconfirm, Icon, message } from "antd"
import SearchInput, { createFilter } from 'react-search-input'
import LayoutComponent from '../../layout/LayoutComponent'
import TestTypes from '../../redux/test-redux'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

const { Title } = Typography
const KEYS_TO_FILTERS = ['name', 'type', 'quantity', 'time']
const type = ['ReactJS', 'PHP', 'Python', 'Golang', 'MySQL', 'HTML&CSS']

class ListTest extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    inputSearch: '',
  }

  componentDidMount() {
    this.props.getData()
  }

  componentDidUpdate(nextProps) {
    if (this.props.notifyMessage === 'Delete test successfully!') {
      message.success(this.props.notifyMessage, 1)
      nextProps.updateNotifyMessage()
      nextProps.getData()
    }
  }

  handleInputChange = (value) => {
    this.setState({
      inputSearch: value
    })
  }

  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys: selectedRowKeys
    })
  }

  handleClickDetail = (id) => {
    this.props.history.push(`test/edit/${id}`)
  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Time (minutes)',
        dataIndex: 'time',
        key: 'time',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'CreatedAt',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Actions',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            <a onClick={() => {
              this.handleClickDetail(record.key)
            }}
            ><Icon type="edit" theme='twoTone' style={{ fontSize: '26px' }} /></a>
            <Divider type="vpoststical" />
            <Popconfirm
              title="Are you sure delete this test?"
              okText="Yes"
              cancelText="No"
              onConfirm={
                () => {
                  this.props.deleteData({
                    set_id: [record.key]
                  })
                  this.setState({
                    selectedRowKeys: []
                  })
                }
              }
            >
              <a><Icon type="delete" theme='twoTone' style={{ fontSize: '26px' }} twoToneColor='#f51000' /></a>
            </Popconfirm>
          </span>
        )
      }
    ]

    const listData = []
    const listTest = Object.values(this.props.listTest)

    listTest.map((item) => {
      const createdAt = (item.create_date).split('-')
      const date = createdAt[2].slice(0, 2) + '/' + createdAt[1] + '/' + createdAt[0]
      listData.push({
        key: item.id,
        name: item.name,
        type: type[item.category - 1],
        quantity: item.quantity_question,
        time: item.time,
        createdAt: date,
        creator: item.creator
      })
    })

    let filtered = ''
    if (this.props.listTest) {
      filtered = listData.filter(createFilter(this.state.inputSearch, KEYS_TO_FILTERS))
    }
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
            let newSelectedRowKeys = []
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false
              }
              return true
            })
            this.setState({ selectedRowKeys: newSelectedRowKeys })
          },
        },
        {
          // selected even row
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = []
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true
              }
              return false
            })
            this.setState({ selectedRowKeys: newSelectedRowKeys })
          },
        }
      ],
    }
    return (
      <LayoutComponent>
        <Layout>
          <Row>
            <Col span={6} className='title-wrapper'>
              <Title level={3}>List Tests</Title>
            </Col>
            <Col span={12} className='search-wrapper'>
              <SearchInput className="search-input" onChange={this.handleInputChange} />
            </Col>
            <Col span={6} className='button-wrapper button-test-wrapper'>
              <Button type="primary" onClick={() => { this.props.history.push('/test/create') }}>Add</Button>
              {
                selectedRowKeys.length > 0 ? (
                  <Popconfirm
                    title="Are you sure delete these tests?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={
                      () => {
                        this.props.deleteData({
                          set_id: this.state.selectedRowKeys
                        })
                        this.setState({
                          selectedRowKeys: []
                        })
                      }
                    }
                  >
                    <Button type="danger">Delete</Button>
                  </Popconfirm>

                ) : (
                    <Button type="danger" disabled>Delete</Button>
                  )
              }
            </Col>
          </Row>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filtered}
            size='small'
            pagination={{ pageSize: 10 }}
            style={{ whiteSpace: 'unset' }}
          ></Table>
        </Layout>
        {
          this.props.processing ? (
            <div>
              <ReactLoading
                type={'spin'}
                color={'#f8bf63'}
                height={'65px'}
                width={'65px'}
                className="loading"
              />
              <div className="loadingOverlay" />
            </div>
          ) : null
        }
      </LayoutComponent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listTest: state.tests.listTest,
    notifyMessage: state.tests.notifyMessage,
    processing: state.tests.processing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(TestTypes.testGetRequest())
    },

    deleteData: (content) => {
      dispatch(TestTypes.testDeleteRequest(content))
    },

    updateNotifyMessage: () => {
      dispatch(TestTypes.testNotifyMessage())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTest)
