import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react'

const LoadingCircle = () => {
  return (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} />
  )
}

export default LoadingCircle