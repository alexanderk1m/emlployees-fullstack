import { Button, Result, Row } from 'antd'
import { Link, useParams } from 'react-router-dom'

const Statuses: Record<string, string> = {
  created: 'User created',
  updated: 'User updated',
  deleted: 'User deleted',
}

const Status = () => {
  const { status } = useParams()

  return (
    <Row align="middle" justify="center" style={{ width: '100%' }}>
      <Result
        status={status ? 'success' : 404}
        title={status ? Statuses[status] : 'not found'}
        extra={
          <Button key="dashboard">
            <Link to="/">To the Main page</Link>
          </Button>
        }
      />
    </Row>
  )
}

export default Status
