import React, { useEffect, useState } from 'react';
import './index.css'
import qs from 'qs'
import { Table } from 'antd';
import axios from 'axios';

export default function Clinic() {
    const token = qs.parse(localStorage.getItem('token'))
    const [clinicData, setClinicData] = useState([])
    useEffect(() => {
        axios.post('/my/getClinicRecord', qs.stringify({ userid: token.userid })).then(res => {
            console.log(res);
            setClinicData(res.data.results)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const topicColumns = [
        {
            title: '诊所名称',
            dataIndex: 'name',
        },
        {
            title: '上门日期',
            dataIndex: 'treatmentdate',
        },
        {
            title: '时间段',
            dataIndex: 'timeslot',
        },
        {
            title: '联系电话',
            dataIndex: 'tel',
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (status) => {
                let mList = {
                    '0': ['red', '未开始'],
                    '1': ['green', '进行中'],
                    '2': ['blue', '已结束'],
                }
                return <span className="my_hoard_modify" style={{ borderColor: mList[status][0], color: mList[status][0] }}>{mList[status][1]}</span>
            }
        }
    ];


    return (
        <div className="my_clinic">
            <h1>我预约的上门门诊</h1>
            <Table rowKey={item => item.clinicrecord} pagination={{ position: ['bottomCenter'], defaultPageSize: [10] }} columns={topicColumns} dataSource={clinicData} />
        </div>
    );
}
