import { Row } from 'antd'
import Layout from '../../components/layout'
import EmployeeForm from '../../components/employee-form'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { useAddEmployeeMutation } from '../../app/services/employers'
import { Paths } from '../../paths'
import { Employee } from '@prisma/client'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const AddEmployee = () => {
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const [addEmployee] = useAddEmployeeMutation()

  useEffect(() => {
    if (!user) {
      navigate(Paths.login)
    }
  }, [navigate, user])

  const handleAddEmployee = async (data: Employee) => {
    try {
      await addEmployee(data).unwrap()
      navigate(`${Paths.status}/created`)
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setError(err.data.message)
      } else {
        setError('unknown error')
      }
    }
  }

  return (
    <Layout>
      <Row align="middle" justify="center">
        <EmployeeForm
          title="Add employee"
          btnText="Done"
          onFinish={handleAddEmployee}
          error={error}
        />
      </Row>
    </Layout>
  )
}

export default AddEmployee
