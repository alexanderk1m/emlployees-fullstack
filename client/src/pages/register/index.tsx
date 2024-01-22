import { Card, Form, Row, Space, Typography } from 'antd'
import { FC } from 'react'
import CustomInput from '../../components/custom-input'
import PasswordInput from '../../components/password-input'
import CustomButton from '../../components/custom-button'
import { Link } from 'react-router-dom'
import { Paths } from '../../paths'
import Layout from '../../components/layout'

const Register: FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Register" style={{ width: '30rem' }}>
          <Form onFinish={() => null}>
            <CustomInput name="name" placeholder="Name" />
            <CustomInput name="email" placeholder="Email" type="email" />
            <PasswordInput name="password" placeholder="Password" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />
            <CustomButton type="primary" htmlType="submit">
              Sign Up
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Have an Account? <Link to={Paths.login}>Sign In</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Register
