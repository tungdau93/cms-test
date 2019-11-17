import React, { Component } from 'react'
import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'
import { connect } from 'react-redux'
import QuestionTypes from '../../redux/question-redux'
import LayoutComponent from '../../layout/LayoutComponent'
import renderHTML from 'react-render-html'
import { Form, Select, Button, Rate, Input, Radio, message, Upload, Icon, Typography, Row, Col, Layout } from 'antd'
import ReactLoading from 'react-loading'

const { Title } = Typography
const { Option } = Select
const { TextArea } = Input

class EditQuestion extends Component {
  state = {
    file: undefined,
    answer1: {
      is_true: false,
      content: ''
    },
    answer2: {
      is_true: false,
      content: ''
    },
    answer3: {
      is_true: false,
      content: ''
    },
    answer4: {
      is_true: false,
      content: ''
    },
    loading: false, //loading image
    note: '',
    content: '',
    category: 1,
    level: 0,
    correctAnswer: 0,
    imageUrl: '',
    image: '',
    image_old: ''
  }

  componentDidMount() {
    const pathName = window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
    this.props.getDetailData(pathName)
  }

  componentDidUpdate(nextProps) {
    if (this.props.detailQuestion && nextProps.detailQuestion !== this.props.detailQuestion) {
      this.props.detailQuestion.answers.map((item, index) => {
        if (item.is_true == true) {
          this.setState({
            correctAnswer: index + 1
          })
        }
      })
      this.setState({
        content: this.props.detailQuestion.content,
        category: this.props.detailQuestion.category,
        note: this.props.detailQuestion.note,
        level: this.props.detailQuestion.level,
        answer1: this.props.detailQuestion.answers[0],
        answer2: this.props.detailQuestion.answers[1],
        answer3: this.props.detailQuestion.answers[2],
        answer4: this.props.detailQuestion.answers[3],
        imageUrl: `http://27.72.88.246:8228${this.props.detailQuestion.image}`,
        image_old: this.props.detailQuestion.image,
        image: this.props.detailQuestion.image
      })
    }

    if (this.props.notifyMessage === 'Edit question successfully!') {
      message.success(this.props.notifyMessage, 1)
      this.props.updateNotify()
      setTimeout(() => {
        this.props.history.push('/question')
      }, 1000)
    }
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
        console.log(info.file)
        this.setState({
          file: info.file,
          image: info.file.response.data.url,
          imageUrl: imageUrl,
          loading: false,
        })
      })
    }
  }

  handleDeleteImageUrl = () => {
    this.setState({
      imageUrl: '',
      image: ''
    })
  }

  handleEditorChange = (event) => {
    this.setState({
      note: event
    })
  }

  handleTextAreaChange = (event) => {
    this.setState({
      content: event.target.value
    })
  }

  handleRadioChange = (event) => {
    const key = event.target.value
    switch (key) {
      case 1:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, is_true: true },
          answer2: { ...this.state.answer2, is_true: false },
          answer3: { ...this.state.answer3, is_true: false },
          answer4: { ...this.state.answer4, is_true: false }
        })
        break
      case 2:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, is_true: false },
          answer2: { ...this.state.answer2, is_true: true },
          answer3: { ...this.state.answer3, is_true: false },
          answer4: { ...this.state.answer4, is_true: false }
        })
        break
      case 3:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, is_true: false },
          answer2: { ...this.state.answer2, is_true: false },
          answer3: { ...this.state.answer3, is_true: true },
          answer4: { ...this.state.answer4, is_true: false }
        })
        break
      default:
        this.setState({
          value: event.target.value,
          answer1: { ...this.state.answer1, is_true: false },
          answer2: { ...this.state.answer2, is_true: false },
          answer3: { ...this.state.answer3, is_true: false },
          answer4: { ...this.state.answer4, is_true: true }
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
      values.note = this.state.note
      values.image = this.state.image
      values.image_old = this.props.detailQuestion.image
      values.answers = [
        this.state.answer1,
        this.state.answer2,
        this.state.answer3,
        this.state.answer4
      ]
      const questionData = {
        answers: values.answers,
        note: values.note,
        image: values.image,
        category: values.category,
        level: values.level,
        content: values.content,
        image_old: values.image_old
      }
      if (!err) {
        this.props.editData({
          id: window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
          data: questionData
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
                        initialValue: this.state.content,
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
                          placeholder="Note"
                          rows={5}
                        />
                      )}
                  </Form.Item>

                  <Form.Item label="Type" hasFeedback>
                    {
                      getFieldDecorator('category',
                        {
                          initialValue: this.state.category,
                          rules: [{ required: true, message: 'Please select question type!' }],
                        }
                      )(
                        <Select placeholder="Please select a type" onChange={this.handleTypeChange}>
                          <Option value={1}>ReactJS</Option>
                          <Option value={2}>PHP</Option>
                          <Option value={3}>Python</Option>
                          <Option value={4}>Golang</Option>
                          <Option value={5}>MySQL</Option>
                          <Option value={6}>HTML&CSS</Option>
                        </Select>,
                      )}
                  </Form.Item>

                  <Form.Item label="Rate">
                    {
                      getFieldDecorator('level', {
                        initialValue: this.state.level,
                        rules: [{ required: true, message: 'Please select level!' }],
                      }
                      )(
                        <Rate

                        />
                      )}
                  </Form.Item>

                  <Form.Item {...formItemLayout} label="Note" className='editor-container'>
                    <ReactQuill
                      className='editor'
                      modules={EditQuestion.modules}
                      formats={EditQuestion.formats}
                      value={this.state.note}
                      placeholder="Note"
                      onChange={this.handleEditorChange}
                      initialvalue={renderHTML(`${this.state.note}`)}
                    />
                  </Form.Item>

                </Col>
                <Col span={10}>
                  <Form.Item label='Answer' className='radio-wrapper'>
                    {
                      getFieldDecorator('correctAnswer', {
                        initialValue: this.state.correctAnswer,
                        rules: [
                          { required: true, message: 'Please choose correct answer!' }
                        ]
                      })(
                        <Radio.Group
                          onChange={this.handleRadioChange}>
                          <Radio className='radio-style' value={1} >
                            <Form.Item >
                              {getFieldDecorator('answer1', {
                                initialValue: this.state.answer1.content,
                                rules: [
                                  { required: true, message: 'Please fill answer1' },
                                ]
                              }
                              )(
                                <Input onChange={(event) => {
                                  this.handleInputChange('1', event)

                                }}
                                />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={2}>
                            <Form.Item>
                              {
                                getFieldDecorator('answer2', {
                                  initialValue: this.state.answer2.content,
                                  rules: [{ required: true, message: 'Please fill answer2' }]
                                }
                                )(
                                  <Input onChange={(event) => {
                                    this.handleInputChange('2', event)
                                  }}
                                  />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={3} >
                            <Form.Item>
                              {
                                getFieldDecorator('answer3', {
                                  initialValue: this.state.answer3.content,
                                  rules: [{ required: true, message: 'Please fill answer3' }]
                                }
                                )(
                                  <Input onChange={(event) => {
                                    this.handleInputChange('3', event)
                                  }}
                                  />)}
                            </Form.Item>
                          </Radio>
                          <Radio className='radio-style' value={4}>
                            <Form.Item>
                              {
                                getFieldDecorator('answer4', {
                                  initialValue: this.state.answer4.content,
                                  rules: [{ required: true, message: 'Please fill answer4' }]
                                }
                                )(
                                  <Input onChange={(event) => {
                                    this.handleInputChange('4', event)
                                  }}
                                  />)}
                            </Form.Item>
                          </Radio>
                        </Radio.Group>)}
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
                            action="http://27.72.88.246:8228/api/upload/"
                            headers={
                              { "Authorization": `Bearer ${window.localStorage.getItem('token')}` }
                            }
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleImageChange}>
                            {
                              this.state.imageUrl ? <img src={this.state.imageUrl} alt="image" style={{ width: '150px', height: '150px' }} /> : (
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
                                onClick={this.handleDeleteImageUrl}
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
//toolbar for editor
EditQuestion.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
  ]
}
EditQuestion.formats = [
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
    detailQuestion: state.questions.detailQuestion,
    processing: state.questions.processing,
    notifyMessage: state.questions.notifyMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailData: (id) => {
      dispatch(QuestionTypes.questionGetDetail(id))
    },

    editData: (content) => {
      dispatch(QuestionTypes.questionEditRequest(content))
    },

    updateNotify: () => {
      dispatch(QuestionTypes.questionUpdateNotify())
    }
  }
}

const FormEditQuestion = Form.create()(EditQuestion)
export default connect(mapStateToProps, mapDispatchToProps)(FormEditQuestion)