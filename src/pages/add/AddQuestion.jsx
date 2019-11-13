import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import '../css/add-question.css'
import 'antd/dist/antd.css'
import LayoutComponent from '../../layout/LayoutComponent'
import { connect } from 'react-redux'
import QuestionTypes from '../../redux/question-redux'
import { Form, Select, Button, Rate, Input, Radio, message, Upload, Icon, Typography, Row, Col, Layout } from 'antd'
const { Title } = Typography
const { Option } = Select
const { TextArea } = Input


class AddQuestion extends Component {
  state = {
    value: '',
    file: undefined,    //image file
    rating: 0,    //rating star
    type: '',  //type of question
    answer1: {
      status: false,
      content: ''
    },
    answer2: {
      status: false,
      content: ''
    },
    answer3: {
      status: false,
      content: ''
    },
    answer4: {
      status: false,
      content: ''
    },
    loading: false, //loading image
    editorValue: '',
    token: ''
  }

  componentDidMount() {
    const token = window.localStorage.getItem('token')
    this.setState({
      token: token
    })
  }

  getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    const isLt2M = file.size / 1024 / 1024 < 2.5
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    } else if (!isLt2M) {
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

  handleDeleteImageUrl = () => {
    this.setState({
      imageUrl: '',
    })
  }
  handleEditorChange = (event) => {
    this.setState({
      editorValue: event
    })
  }

  handleRadioChange = (event) => {
    const key = event.target.value
    switch (key) {
      case 1:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, status: true },
          answer2: { ...this.state.answer2, status: false },
          answer3: { ...this.state.answer3, status: false },
          answer4: { ...this.state.answer4, status: false }
        })
        break
      case 2:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, status: false },
          answer2: { ...this.state.answer2, status: true },
          answer3: { ...this.state.answer3, status: false },
          answer4: { ...this.state.answer4, status: false }
        })
        break
      case 3:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, status: false },
          answer2: { ...this.state.answer2, status: false },
          answer3: { ...this.state.answer3, status: true },
          answer4: { ...this.state.answer4, status: false }
        })
        break
      default:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, status: false },
          answer2: { ...this.state.answer2, status: false },
          answer3: { ...this.state.answer3, status: false },
          answer4: { ...this.state.answer4, status: true }
        })
        break
    }
  }

  handleInputChange = (key, event) => {
    this.setState({
      [`answer${key}`]: { ...this.state['answer' + key], content: event.target.value },
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      values.editorValue = this.state.editorValue
      //image la url backend tra ve tu response
      values.image = this.state.imageUrl
      values.answers = [
        this.state.answer1,
        this.state.answer2,
        this.state.answer3,
        this.state.answer4
      ]
      if (!err) {
        console.log('Received values of form: ', values)
        // message.success('Create question successfully!', 1)
        this.props.addData({
          token: this.state.token,
          data: values
        })
      }
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }

    const { imageUrl } = this.state
    return (
      <LayoutComponent>
        <Layout>
          <Row className='header-wrapper'>
            <Title className='title-wrapper' level={3}>Create New Question</Title>
          </Row>

          <Row className='form-wrapper'>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className='addQuestion-horizontal'>
              <Row>
                <Col span={14} >
                  <Form.Item {...formItemLayout} label="Content" >
                    {
                      getFieldDecorator('content', {
                        rules: [
                          {
                            required: true, message: 'Please input question content!'
                          },
                          {
                            min: 6, message: 'Content must be more than 6 characters'
                          },
                          {
                            max: 5000, message: 'Content must smaller than 5000 characters'
                          }
                        ]
                      }
                      )(
                        <TextArea
                          placeholder="Controlled autosize"
                          rows={5}
                        />
                      )}
                  </Form.Item>

                  <Form.Item label="Type" hasFeedback>
                    {
                      getFieldDecorator('type', {
                        rules: [{ required: true, message: 'Please select question type!' }],
                      })(
                        <Select placeholder="Please select a type"  >
                          <Option value="1">ReactJS</Option>
                          <Option value="2">PHP</Option>
                          <Option value="3">Python</Option>
                          <Option value="4">Golang</Option>
                          <Option value="5">MySQL</Option>
                          <Option value="6">HTML&CSS</Option>
                        </Select>,
                      )
                    }
                  </Form.Item>

                  <Form.Item label="Rate">
                    {
                      getFieldDecorator('rate', {
                        rules: [{ required: true, message: 'Please select level!' }],
                      })(<Rate />)
                    }
                  </Form.Item>

                  <Form.Item {...formItemLayout} label="Note" className='editor-container'>
                    <ReactQuill
                      className='editor'
                      modules={AddQuestion.modules}
                      formats={AddQuestion.formats}
                      value={this.state.editorValue}
                      placeholder="Note"
                      onChange={this.handleEditorChange}
                    />
                  </Form.Item>

                </Col>
                <Col span={10}>
                  <Form.Item label='Answer' className='radio-wrapper'>
                    {
                      getFieldDecorator('value', {
                        initialValue: this.state.value,
                        rules: [
                          { required: true, message: 'Please choose correct answer!' }
                        ]
                      })(
                        <Radio.Group
                          onChange={this.handleRadioChange}>
                          <Radio className='radio-style' value={1} >
                            <Form.Item >
                              {getFieldDecorator('answer1', {
                                rules: [
                                  { required: true, message: 'Please fill answer1' },
                                ]
                              }
                              )(<Input onChange={(event) => {
                                this.handleInputChange('1', event)
                              }}
                                value={this.state.answer1.content} />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={2}>
                            <Form.Item>
                              {getFieldDecorator('answer2', { rules: [{ required: true, message: 'Please fill answer2' }] }
                              )(<Input onChange={(event) => {
                                this.handleInputChange('2', event)
                              }}
                                value={this.state.answer2.content} />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={3} >
                            <Form.Item>
                              {getFieldDecorator('answer3', { rules: [{ required: true, message: 'Please fill answer3' }] }
                              )(<Input onChange={(event) => {
                                this.handleInputChange('3', event)
                              }}
                                value={this.state.answer3.content} />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={4}>
                            <Form.Item>
                              {getFieldDecorator('answer4', { rules: [{ required: true, message: 'Please fill answer4' }] }
                              )(<Input onChange={(event) => {
                                this.handleInputChange('4', event)
                              }}
                                value={this.state.answer4.content} />)}
                            </Form.Item>
                          </Radio>
                        </Radio.Group>)
                    }
                  </Form.Item>

                  <Form.Item label='Image' className='uploadImage-wrapper'>
                    {
                      getFieldDecorator('image', {
                        initialValue: this.state.file,
                      })(
                        <div>
                          <Upload
                            name="image"
                            listType="picture"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleImageChange}>
                            {
                              imageUrl ? <img src={imageUrl} alt="image" style={{ width: '150px', height: '150px' }} /> : (
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
              </Row>
              <Row className='row-button'>
                <Button type='primary' htmlType='submit' style={{ marginRight: '20px' }}>Submit</Button>
                <Button type='danger' htmlType='button' onClick={() => { this.props.history.push('/question') }}>Cancel</Button>
              </Row>
            </Form>
          </Row>
        </Layout>
      </LayoutComponent>
    )
  }
}

//toolbar for editor
AddQuestion.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ]
}

AddQuestion.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'list',
]

const mapStateToProps = (state) => {
  return {
    proccessing: state.questions.proccessing,
    notifyMessage: state.questions.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addData: (content) => {
      dispatch(QuestionTypes.questionAddRequest(content))
    }
  }
}


const FormAddQuestion = Form.create()(AddQuestion)
export default connect(mapStateToProps, mapDispatchToProps)(FormAddQuestion)