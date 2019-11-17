import React, { Component } from 'react'
import { Layout, Typography, Table, Button, Row, Col, Divider, Popconfirm, Icon, message } from "antd"
import SearchInput, { createFilter } from 'react-search-input'
import LayoutComponent from '../../layout/LayoutComponent'
import { withRouter } from 'react-router'
import QuestionTypes from '../../redux/question-redux'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading'

const { Title } = Typography
const KEYS_TO_FILTERS = ['name', 'type', 'level']

const type = ['ReactJS', 'PHP', 'Python', 'Golang', 'MySQL', 'HTML&CSS']

class ListQuestion extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    inputSearch: '',
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
    this.props.getData()
  }

  componentDidUpdate(nextProps) {
    if (this.props.notifyMessage === 'Delete question successfully!') {
      message.success(this.props.notifyMessage, 1)
      nextProps.updateNotifyMessage()
      nextProps.getData()
    }
  }

  handleDeleteMulti = () => {
    this.props.deleteData({
      set_id: this.state.selectedRowKeys,
    })
  }

  render() {

    const data = []
    for (let i = 0; i < this.props.listQuestion.length; i++) {
      const createdAt = (this.props.listQuestion[i].create_date).split('-')
      const date = createdAt[2].slice(0, 2) + '/' + createdAt[1] + '/' + createdAt[0]
      data.push({
        key: this.props.listQuestion[i].id,
        name: this.props.listQuestion[i].content,
        type: type[this.props.listQuestion[i].category - 1],
        level: this.props.listQuestion[i].level,
        createdAt: date,
        creator: this.props.listQuestion[i].creator
      })
    }

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
            <a><Icon type="edit" theme='twoTone' style={{ fontSize: '26px' }} onClick={() => { this.props.history.push(`/question/edit/${record.key}`) }} /></a>
            <Divider type="vpoststical" />
            <Popconfirm
              title="Are you sure delete this post?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                this.props.deleteData({
                  set_id: [record.key],
                })
                this.setState({
                  selectedRowKeys: []
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
                  <Popconfirm
                    title="Are you sure delete these questions?"
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
    listQuestion: state.questions.listQuestion,
    processing: state.questions.processing,
    notifyMessage: state.questions.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getData: () => {
      dispatch(QuestionTypes.questionGetRequest())
    },
    deleteData: (content) => {
      dispatch(QuestionTypes.questionDeleteRequest(content))
    },
    updateNotifyMessage: () => {
      dispatch(QuestionTypes.questionUpdateNotify())
    }
  }
}

ListQuestion = withRouter(ListQuestion)
export default connect(mapStateToProps, mapDispatchToProps)(ListQuestion)