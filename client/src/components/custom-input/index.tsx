import { Form, Input } from 'antd'

type CustomInputProps = {
  name: string
  placeholder: string
  type?: string
}

const CustomInput = ({
  name,
  placeholder,
  type = 'text',
}: CustomInputProps) => {
  return (
    <Form.Item
      name={name}
      shouldUpdate={true}
      rules={[{ required: true, message: 'required field' }]}
    >
      <Input placeholder={placeholder} type={type} size="large" />
    </Form.Item>
  )
}

export default CustomInput
