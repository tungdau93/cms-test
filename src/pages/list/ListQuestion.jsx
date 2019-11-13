import React, { Component } from 'react'
import { Layout, Typography, Table, Button, Row, Col, Divider, Popconfirm, Icon } from "antd"
import SearchInput, { createFilter } from 'react-search-input'
import LayoutComponent from '../../layout/LayoutComponent'
import { withRouter } from 'react-router'
import QuestionTypes from '../../redux/question-redux'
import { connect } from 'react-redux'

const { Title } = Typography
const KEYS_TO_FILTERS = ['name', 'type', 'level']
const data = []
const type = ['ReactJS', 'PHP', 'Python', 'Golang', 'MySQL', 'HTML&CSS']
for (let i = 1; i < 46; i++) {
  data.push({
    key: i,
    name: `Question ${i}`,
    type: type[Math.floor(Math.random() * type.length)],
    level: Math.floor((Math.random() * 5) + 1),
    image: 30,
    createdAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`,
    modifiedAt: `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
  })
}

class ListQuestion extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    inputSearch: '',
    token: ''
  }

  handleInputChange = (value) => {
    this.setState({
      inputSearch: value
    })
  }

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys })
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    this.setState({
      token: token
    })
    this.props.getData(this.state.token)
  }

  handleDeleteMulti = () => {
    this.props.deleteData({
      id: this.state.selectedRowKeys,
      token: this.state.token
    })
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
        title: 'Level',
        dataIndex: 'level',
        key: 'level',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
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
        title: 'ModifiedAt',
        dataIndex: 'modifiedAt',
        key: 'modifiedAt',
        align: 'center',
        ellipsis: true
      },
      {
        title: 'Actions',
        key: 'action',
        align: 'center',
        render: (text, record) => (
          <span>
            <a><Icon type="edit" theme='twoTone' style={{ fontSize: '26px' }} onClick={() => { this.props.history.push(`/question/edit/${record.key}`) }} /></a>
            <Divider type="vpoststical" />
            <Popconfirm
              title="Are you sure delete this post?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                this.props.deleteData({
                  id: record.key,
                  token: this.state.token
                })
              }}
            >
              <a><Icon type="delete" theme='twoTone' style={{ fontSize: '26px' }} twoToneColor='#f51000' /></a>
            </Popconfirm>
          </span>
        )
      }
    ]

    const filtered = data.filter(createFilter(this.state.inputSearch, KEYS_TO_FILTERS))
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
        },
      ],
    }
    return (
      <LayoutComponent>
        <Layout>
          <Row>
            <Col span={6} className='title-wrapper'>
              <Title level={3}>List Questions</Title>
            </Col>
            <Col span={12} className='search-wrapper'>
              <SearchInput className="search-input" onChange={this.handleInputChange} />
            </Col>
            <Col span={6} className='button-wrapper'>
              <Button type="primary" onClick={() => { this.props.history.push('/question/create') }}>Add</Button>
              {
                selectedRowKeys.length > 0 ? (
                  <Button type="danger" onClick={this.handleDeleteMulti}>Delete</Button>
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
      </LayoutComponent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    listQuestion: state.questions.listQuestion,
    processing: state.questions.processing
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: (token) => {
      dispatch(QuestionTypes.questionGetRequestt(token))
    },
    deleteData: (content) => {
      dispatch(QuestionTypes.questionDeleteRequest(content))
    }
  }
}

ListQuestion = withRouter(ListQuestion)
export default connect(mapStateToProps, mapDispatchToProps)(ListQuestion)