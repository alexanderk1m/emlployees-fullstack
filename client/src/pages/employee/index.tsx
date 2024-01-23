import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  useGetEmployeeQuery,
  useRemoveEmployeeMutation,
} from '../../app/services/employers'
import Layout from '../../components/layout'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/auth/authSlice'
import { Descriptions, Divider, Modal, Space } from 'antd'
import CustomButton from '../../components/custom-button'
import { Paths } from '../../paths'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import ErrorMessage from '../../components/error-message'
import { isErrorWithMessage } from '../../utils/is-error-with-message'

const Employee = () => {
  const navigation = useNavigate()
  const [error, setError] = useState('')
  const params = useParams<{ id: string }>()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { data, isLoading } = useGetEmployeeQuery(params.id || '')
  const [removeEmployee] = useRemoveEmployeeMutation()
  const user = useSelector(selectUser)

  if (isLoading) {
    return (
      <Layout>
        <span>Loading...</span>
      </Layout>
    )
  }

  if (!data) {
    return <Navigate to="/" />
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const hideModal = () => {
    setIsModalOpen(false)
  }

  const handleDeleteUser = async () => {
    hideModal()
    try {
      await removeEmployee(data.id).unwrap()
      navigation(`${Paths.status}/deleted`)
    } catch (error) {
      const maybeError = isErrorWithMessage(error)

      if (maybeError) {
        setError(error.data.message)
      } else {
        setError('unknown error')
      }
    }
  }

  return (
    <Layout>
      <Descriptions title="Employee info" bordered>
        <Descriptions.Item label="Name" span={3}>
          {`${data.firstName} ${data.lastName}`}
        </Descriptions.Item>
        <Descriptions.Item label="Age" span={3}>
          {`${data.age}`}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={3}>
          {`${data.address}`}
        </Descriptions.Item>
      </Descriptions>
      {user?.id === data.userId && (
        <>
          <Divider orientation="left">Actions</Divider>
          <Space>
            <Link to={`${Paths.employeeEdit}/${data.id}`}>
              <CustomButton
                shape="round"
                type="default"
                icon={<EditOutlined />}
              >
                Edit
              </CustomButton>
            </Link>
            <CustomButton
              shape="round"
              danger
              onClick={showModal}
              icon={<DeleteOutlined />}
            >
              Delete
            </CustomButton>
          </Space>
        </>
      )}
      <ErrorMessage message={error} />
      <Modal
        title="Confirm deletion"
        open={isModalOpen}
        onOk={handleDeleteUser}
        onCancel={hideModal}
        okText="Confirm"
        cancelText="Cancel"
      >
        Are you sure?
      </Modal>
    </Layout>
  )
}

export default Employee
