import { Layout, Space, Typography } from 'antd'
import styles from './index.module.css'
import { LoginOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons'
import CustomButton from '../custom-button'
import { Link, useNavigate } from 'react-router-dom'
import { Paths } from '../../paths'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../features/auth/authSlice'

const Header = () => {
  const user = useSelector(selectUser)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onLogoutClick = () => {
    dispatch(logout())
    navigate(Paths.login)
    localStorage.removeItem('token')
  }

  return (
    <Layout.Header className={styles.header}>
      <Space>
        <TeamOutlined className={styles.teamIcon} />
        <Link to={Paths.home}>
          <CustomButton type="ghost">
            <Typography.Title level={1}>Employees</Typography.Title>
          </CustomButton>
        </Link>
      </Space>
      {user ? (
        <CustomButton
          type="ghost"
          icon={<LoginOutlined />}
          onClick={onLogoutClick}
        >
          Logout
        </CustomButton>
      ) : (
        <Space>
          <Link to={Paths.register}>
            <CustomButton icon={<UserOutlined />} type="ghost">
              Register
            </CustomButton>
          </Link>
          <Link to={Paths.login}>
            <CustomButton icon={<LoginOutlined />} type="ghost">
              Login
            </CustomButton>
          </Link>
        </Space>
      )}
    </Layout.Header>
  )
}

export default Header
