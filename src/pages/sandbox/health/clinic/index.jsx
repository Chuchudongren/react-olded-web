import React, { useEffect, useRef, useState } from 'react';
import { Steps, Row, Col, Form, DatePicker, Input, Select, message } from 'antd';
import './index.css'
import moment from 'moment';
import testReg from '../../../../components/testReg'
import axios from 'axios';
import qs from 'qs'
import { provinceObj } from '../../../../components/pro'
const { Step } = Steps;
const { Option } = Select;
const { TextArea } = Input;

function Clinic() {

  const stepone = useRef()
  const steptwo = useRef()
  const stepthree = useRef()
  const clinic_info = useRef()
  const [current, setCurrent] = useState(0);
  const [oneDatas, setOneDatas] = useState({});
  const [twoDatas, setTwoDatas] = useState({});
  const [clinicList, setClinicList] = useState([]);
  const [chooseClinicList, setChooseClinicList] = useState({});
  const [flash, setflash] = useState(false);
  const token = qs.parse(localStorage.getItem('token'))
  useEffect(() => {
    if (typeof token === 'undefined' || !token.userid) {
      message.error('您还没有登录不能预约，请登录后使用')
      setCurrent(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  function disabledDate(current) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  const steps = [
    {
      title: '第一步',
      description: '请输入你的基本信息',
      content:
        <Form className="health_form1" ref={stepone}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="realname"
                label="姓名"
                rules={[{ required: true, message: '请输入您的姓名', whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="tel"
                label="联系电话"
                rules={[{ required: true, message: '请输入您的联系电话', whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                name="province"
                label="省份"
                rules={[{ required: true, message: '请输入您的姓名', whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="城市"
                rules={[{ required: true, message: '请输入您的联系电话', whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item
                label="详细地址"
                name="address"
                rules={[{ required: true, message: '请输入您的详细地址', whitespace: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
    },
    {
      title: '第二步',
      description: '请描述您的病情',
      content: <Form ref={steptwo}>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="describe"
              label="描述"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              name="describedetail"
              label="详细描述"
            >
              <TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>,
    },
    {
      title: '提交',
      description: '选择上门诊所',
      content: <Form className="health_form3" ref={stepthree}>
        <Row gutter={24}>
          <Col span={24}>
            <span className="clinic_tips">根据您的地址为您推荐以下诊所</span>
          </Col>
          <Col span={24}>
            <Form.Item
              name="clinic"
              label="上门诊所"
              rules={[{ required: true, message: '请选择诊所' }]}
            >
              <Select
                placeholder="请选择"
                onChange={(value) => { onClinicChange(value) }}
              >
                {clinicList && clinicList.length > 0 ? clinicList.map((item, index) =>
                  <Option key={item.clinicid} value={index}>{item.name}</Option>
                ) : <></>}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            {chooseClinicList ?
              <div ref={clinic_info} className="clinic_info">
                <header><span>门诊简介：</span>{chooseClinicList.introduce}</header>
                <section><span>地址：</span>{chooseClinicList.address}</section>
                <footer><span>联系电话：</span>{chooseClinicList.tel}</footer>
              </div>
              : <></>
            }
          </Col>
        </Row>
        <div className="clinic_data">
          <Row gutter={24}>

            <Col span={12}>
              <Form.Item
                name="date"
                label="选择上门日期"
                rules={[{ type: 'object', required: true, message: '请选择上门日期' }]}
              >
                <DatePicker showToday={false} disabledDate={disabledDate} placeholder='请选择时间' />
              </Form.Item>

            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="选择时间段"
                rules={[{ required: true, message: '请选择时间段' }]}
              >
                <Select
                  placeholder="请选择"
                >
                  <Option value={'上午8:00-12:00'}>上午8:00-12:00</Option>
                  <Option value={'下午2:00-6:00'}>下午2:00-6:00</Option>
                  <Option value={'晚上6:00-10:00'}>晚上6:00-10:00</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>,
    },
  ];
  const onClinicChange = (value) => {
    setChooseClinicList(clinicList[value])
    clinic_info.current.style.display = 'block'
  }
  const next = () => {
    if (current === 0) {
      let stepOneDatas = stepone.current.getFieldsValue(['realname', 'tel', 'province', 'city', 'address'])
      if (typeof stepOneDatas.realname === 'undefined' || stepOneDatas.realname.replace(/\s/g, "") === '') {
        message.error('您的姓名不能为空！')
      } else if (!testReg(stepOneDatas.tel, 'tel')) {
        message.error('您的手机号输入不正确！')
      } else if (typeof stepOneDatas.province === 'undefined' || stepOneDatas.province.replace(/\s/g, "") === '') {
        message.error('省份不能为空！')
      } else if (!provinceObj.hasOwnProperty(stepOneDatas.province)) {
        message.error('你输入的省份不合法！')
      } else if (typeof stepOneDatas.city === 'undefined' || stepOneDatas.city.replace(/\s/g, "") === '') {
        message.error('城市不能为空！')
      } else if (provinceObj[stepOneDatas.province].indexOf(stepOneDatas.city) === -1) {
        message.error('你输入的城市不合法！')
      } else if (typeof stepOneDatas.address === 'undefined' || stepOneDatas.address.replace(/\s/g, "") === '') {
        message.error('详细地址不能为空！')
      } else {
        setCurrent(current + 1);
        setOneDatas(stepOneDatas)
      }
    }
    if (current === 1) {

      let stepTwoDatas = steptwo.current.getFieldsValue(['describe', 'describedetail'])
      if (typeof stepTwoDatas.describe === 'undefined' || stepTwoDatas.describe.replace(/\s/g, "") === '') {
        message.error('您的描述不能为空！')
      } else if (typeof stepTwoDatas.describedetail === 'undefined' || stepTwoDatas.describedetail.replace(/\s/g, "") === '') {
        message.error('您的详细描述不能为空！')
      } else {
        setCurrent(current + 1);
        setTwoDatas(stepTwoDatas)
        axios.post('/health/getclinicList', qs.stringify({ province: oneDatas.province, city: oneDatas.city })).then(res => {
          if (res.data.results && res.data.results.length > 0) {
            setClinicList(res.data.results)
          } else {
            message.error('您的地区输入有误')
            setCurrent(0)
          }
        })
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const SubmitForm = () => {
    let stepThreeDatas = stepthree.current.getFieldsValue(['clinic', 'date', 'time'])
    stepThreeDatas.date = stepThreeDatas.date._d.getFullYear() + '-' + (stepThreeDatas.date._d.getMonth() + 1) + '-' + stepThreeDatas.date._d.getDate()
    const infos = {
      userid: token.userid,
      clinicid: chooseClinicList.clinicid,
      tel: oneDatas.tel,
      province: oneDatas.province,
      city: oneDatas.city,
      address: oneDatas.address,
      describe: twoDatas.describe,
      describedetail: twoDatas.describedetail,
      date: stepThreeDatas.date,
      timeslot: stepThreeDatas.time
    }

    axios.post('/health/setClinicRecord', qs.stringify(infos)).then(res => {
      if (res.data.status === 200) {
        message.success('提交成功，请到个人中心查看你的预约情况')
        setCurrent(0)
        setflash(!flash)
      } else {
        message.error('提交失败，请稍后再试')
      }
    })
  }
  return (
    <div className="clinic_bg">
      <div className="clinic_main container">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} description={item.description} title={item.title} />
          ))}
        </Steps>
        <div key={flash} className="steps-content">{current >= 0 ? steps[current].content : <div className="noLogin">您还没有登录，请登录后再来</div>}</div>
        <div className="clinic_action">

          {current > 0 && (
            <button onClick={() => prev()}>
              上一步
            </button>
          )}
          {current >= 0 && current < steps.length - 1 && (
            <button onClick={() => next()}>
              下一步
            </button>
          )}
          {current > 0 && current === steps.length - 1 && (
            <button onClick={() => SubmitForm()}>
              提交
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Clinic;
