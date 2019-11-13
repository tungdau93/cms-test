import React, { Component } from 'react'
import { Layout, Row, Input, Button, Typography, Form, Select, Col, message, Upload, Icon } from "antd"
import ReactLoading from 'react-loading'
import LayoutComponent from '../../layout/LayoutComponent'
import { connect } from 'react-redux'
import TestTypes from '../../redux/test-redux'

const { Title } = Typography
const { Option } = Select
const quantityRegex = /^[1-9][0-9]?$|^100$/
const timeRegex = /^[1-9][0-9]*$/

class EditTest extends Component {
  state = {
    name: '',
    type: '',
    quantity: '',
    time: '',
    file: undefined,
    loading: false,
    token: ''
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    this.setState({
      token: token
    })
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

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFieldsAndScroll((error, values) => {
      // image là url từ phía backend trả về từ response
      values.image = this.state.imageUrl
      if (!error) {
        // submit form (call api)
        // console.log('Received error of form: ', error)
        console.log('Received values of form: ', values)
        this.props.editData({
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
          token: this.state.token,
          data: values
        })
        message.success('Create test successfully!', 1)
      }
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
    const isLt2M = file.size / 1024 / 1024 < 2.5
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
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          file: info.file,
          imageUrl,
          loading: false,
        })
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    const { imageUrl } = this.state
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
                      <Input placeholder='Name of the test' allowClear onChange={(event) => { this.handleInputChange('name', event) }} />
                    )
                  }
                </Form.Item>
                <Form.Item label="Type" hasFeedback>
                  {
                    getFieldDecorator("type", {
                      initialValue: this.state.type,
                      rules: [
                        { required: true, message: "Please select type of the test" },
                      ]
                    })(
                      <Select placeholder="Please select a type of the test" onChange={this.handleTypeChange}>
                        <Option value="1">ReactJS</Option>
                        <Option value="2">PHP</Option>
                        <Option value="3">Python</Option>
                        <Option value="4">Golang</Option>
                        <Option value="5">MySQL</Option>
                        <Option value="6">HTML&CSS</Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item label="Quantity">
                  {
                    getFieldDecorator("quantity", {
                      initialValue: this.state.quantity,
                      rules: [
                        { required: true, message: "Please input number of question in the test" },
                        { pattern: quantityRegex, message: 'Must be positive number in the range 0 -> 100' },
                      ]
                    })(
                      <Input placeholder='The number of questions in the test' allowClear onChange={(event) => { this.handleInputChange('quantity', event) }} />
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
                      <Input placeholder='Time of the test' allowClear onChange={(event) => { this.handleInputChange('time', event) }} />
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
                      initialValue: this.state.file,
                      // rules: [
                      //   { required: true, message: "Please input file" },
                      // ]
                    })(
                      <div>
                        <Upload
                          name="image"
                          listType="picture"
                          className="avatar-uploader"
                          showUploadList={false}
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          beforeUpload={this.beforeUpload}
                          onChange={this.handleImageChange}
                        >
                          {
                            imageUrl ? <img src={imageUrl} alt="image" style={{ width: '100%' }} /> : (
                              <div className='show-upload-imageUrl'>
                                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                                <div className="ant-upload-text">Upload</div>
                              </div>
                            )
                          }
                        </Upload>
                        {
                          imageUrl ? (
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
                                    imageUrl: ''
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
          {
            this.state.processing ? (
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
        </Layout>
      </LayoutComponent>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    processing: state.tests.processing,
    notifyMessage: state.tests.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editData: (content) => {
      dispatch(TestTypes.testEditRequest(content))
    }
  }
}

const FormEditTest = Form.create()(EditTest)
export default connect(mapStateToProps, mapDispatchToProps)(FormEditTest)
