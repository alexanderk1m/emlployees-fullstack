import { Card, Form, Row, Space, Typography } from 'antd'
import { FC, useEffect, useState } from 'react'
import CustomInput from '../../components/custom-input'
import PasswordInput from '../../components/password-input'
import CustomButton from '../../components/custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import Layout from '../../components/layout'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '../../features/auth/authSlice'
import { useRegisterMutation } from '../../app/services/auth'
import { User } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'
import ErrorMessage from '../../components/error-message'

type RegisterData = Omit<User, 'id'> & { confirmPassword: string }

const Register: FC = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsAuthenticated)
  const [error, setError] = useState('')
  const [registerUser] = useRegisterMutation()

  const register = async (data: RegisterData) => {
    try {
      await registerUser(data).unwrap()
      navigate('/')
    } catch (error) {
      const maybeError = isErrorWithMessage(error)
      if (maybeError) {
        setError(error.data.message)
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
        <Card title="Register" style={{ width: '30rem' }}>
          <Form onFinish={register}>
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
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  )
}

export default Register
