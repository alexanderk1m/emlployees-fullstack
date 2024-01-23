import { FC, useEffect, useState } from 'react'
import { Card, Form, Row, Space, Typography } from 'antd'
import Layout from '../../components/layout'
import CustomInput from '../../components/custom-input'
import PasswordInput from '../../components/password-input'
import CustomButton from '../../components/custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { UserData, useLoginMutation } from '../../app/services/auth'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import ErrorMessage from '../../components/error-message'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../features/auth/authSlice'

const Login: FC = () => {
  const navigate = useNavigate()
  const [loginUser, loginUserResult] = useLoginMutation()
  const [error, setError] = useState('')
  const isLoggedIn = useSelector(selectIsAuthenticated)

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap()
      navigate('/')
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('unknown error')
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/')
    }
  }, [isLoggedIn, navigate])

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Login" style={{ width: '30rem' }}>
          <Form onFinish={login}>
            <CustomInput name="email" placeholder="Email" type="email" />
            <PasswordInput name="password" placeholder="Password" />
            <CustomButton type="primary" htmlType="submit">
              Sign In
            </CustomButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Don't have an Account? <Link to={Paths.register}>Sign Up</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Login
