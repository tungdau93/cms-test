import React, { Component } from 'react'
import { Layout, Row, Input, Button, Typography, Form, Select, Col, message, Upload, Icon } from "antd"
import ReactLoading from 'react-loading'
import LayoutComponent from '../../layout/LayoutComponent'
import { connect } from 'react-redux'
import TestTypes from '../../redux/test-redux'

const { Title } = Typography
const { Option } = Select
const quantityRegex = /^[1-9][0-9]?$|^100$/
const timeRegex = /0*[1-9][0-9]*$/

class EditTest extends Component {
  state = {
    name: '',
    category: '',
    quantity_question: '',
    time: '',
    file: undefined,
    loading: false,
    imageUrl: '',
    image: '',
    image_old: ''
  }

  componentDidMount() {
    const pathName = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    this.props.getDetailData(pathName)
  }

  componentDidUpdate(nextProps) {
    if (this.props.detailTest && nextProps.detailTest !== this.props.detailTest) {
      this.setState({
        imageUrl: `http://27.72.88.246:8228${this.props.detailTest.image}`,
        image: this.props.detailTest.image,
        image_old: this.props.detailTest.image,
        name: this.props.detailTest.name,
        quantity_question: this.props.detailTest.quantity_question,
        time: this.props.detailTest.time,
        category: this.props.detailTest.category
      })
    }

    if (this.props.notifyMessage === 'Edit test successfully!') {
      message.success(this.props.notifyMessage, 1)
      nextProps.updateNotifyMessage()
      setTimeout(() => {
        this.props.history.push('/test')
      }, 1000)
    }
  }

  handleInputChange = (key, event) => {
    this.setState({
      [key]: event.target.value
    })
  }

  handleTypeChange = (value) => {
    this.setState({
      type: value
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return (isJpgOrPng && isLt2M)
  }

  handleImageChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({
        loading: true
      })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response.
      this.getBase64(info.file.originFileObj, imageUrl => {
        console.log(info.file.response.data.url)
        this.setState({
          file: info.file,
          imageUrl: imageUrl,
          image: info.file.response.data.url,
          loading: false,
        })
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFieldsAndScroll((error, values) => {
      values.quantity_question = Number(this.state.quantity_question)
      values.time = Number(this.state.time)
      values.image = this.state.image
      values.image_old = this.props.detailTest.image
      if (!error) {
        this.props.editData({
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
          data: values
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }
    // const { imageUrl } = this.state
    return (
      <LayoutComponent>
        <Layout>
          <Row className='header-wrapper'>
            <Title className='title-wrapper' level={3}>Create New Test</Title>
          </Row>
          <Row className='form-wrapper'>
            <Form {...formItemLayout} layout='horizontal' onSubmit={this.handleSubmit} className='addTest-horizontal'>
              <Col span={14}>
                <Form.Item label="Name">
                  {
                    getFieldDecorator("name", {
                      initialValue: this.state.name,
                      rules: [
                        {
                          required: true,
                          message: "Please input name of the test"
                        },
                        {
                          min: 6,
                          message: 'The name must be more than 6 characters'
                        },
                        {
                          max: 125,
                          message: 'The name must be less than 125 characters'
                        }
                      ]
                    })(
                      <Input placeholder='Name of the test' onChange={(event) => { this.handleInputChange('name', event) }} />
                    )
                  }
                </Form.Item>
                <Form.Item label="Category" hasFeedback>
                  {
                    getFieldDecorator("category", {
                      initialValue: this.state.category,
                      rules: [
                        { required: true, message: "Please select category of the test" },
                      ]
                    })(
                      <Select placeholder="Please select a category of the test" onChange={this.handleCategoryChange}>
                        <Option value={1}>ReactJS</Option>
                        <Option value={2}>PHP</Option>
                        <Option value={3}>Python</Option>
                        <Option value={4}>Golang</Option>
                        <Option value={5}>MySQL</Option>
                        <Option value={6}>HTML&CSS</Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item label="Quantity">
                  {
                    getFieldDecorator("quantity_question", {
                      initialValue: this.state.quantity_question,
                      rules: [
                        { required: true, message: "Please input number of question in the test" },
                        { pattern: quantityRegex, message: 'Must be positive number in the range 0 -> 100' },
                      ]
                    })(
                      <Input placeholder='The number of questions in the test' onChange={(event) => { this.handleInputChange('quantity_question', event) }} />
                    )
                  }
                </Form.Item>
                <Form.Item label="Time (minutes)" >
                  {
                    getFieldDecorator("time", {
                      initialValue: this.state.time,
                      rules: [
                        { required: true, message: "Please input time of the test" },
                        { pattern: timeRegex, message: 'Time must be positive number' }
                      ]
                    })(
                      <Input placeholder='Time of the test' onChange={(event) => { this.handleInputChange('time', event) }} />
                    )
                  }
                </Form.Item>
                <Form.Item wrapperCol={{ span: 14, offset: 6 }} className='ant-form-button'>
                  <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                  <Button type="danger" htmlType="button" onClick={() => { this.props.history.push('/test') }}>
                    Cancel
                </Button>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item className='form-upload-image'>
                  {
                    getFieldDecorator('image', {
                      initialValue: this.state.image_old,
                    })(
                      <div>
                        <Upload
                          name="image"
                          listType="picture"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="http://27.72.88.246:8228/api/upload/"
                          headers={
                            { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
                          }
                          beforeUpload={this.beforeUpload}
                          onChange={this.handleImageChange}
                        >
                          {
                            this.state.imageUrl ? <img src={this.state.imageUrl} alt="image" /> : (
                              <div className='show-upload-imageUrl'>
                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                <div className="ant-upload-text">Upload</div>
                              </div>
                            )
                          }
                        </Upload>
                        {
                          this.state.imageUrl ? (
                            <Icon
                              type="close-circle"
                              theme='twoTone'
                              twoToneColor='red'
                              style={{
                                fontSize: '26px'
                              }}
                              onClick={
                                () => {
                                  this.setState({
                                    imageUrl: '',
                                    image: ''
                                  })
                                }
                              }
                            />
                          ) : null
                        }
                      </div>
                    )
                  }
                </Form.Item>
              </Col>
            </Form>
          </Row>
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
    detailTest: state.tests.detailTest,
    processing: state.tests.processing,
    notifyMessage: state.tests.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailData: (id) => {
      dispatch(TestTypes.testDetailRequest(id))
    },

    editData: (content) => {
      dispatch(TestTypes.testEditRequest(content))
    },

    updateNotifyMessage: () => {
      dispatch(TestTypes.testNotifyMessage())
    }
  }
}

const FormEditTest = Form.create()(EditTest)
export default connect(mapStateToProps, mapDispatchToProps)(FormEditTest)
