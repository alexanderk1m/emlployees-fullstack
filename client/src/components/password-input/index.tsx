import { Form, Input } from 'antd'
import { NamePath } from 'antd/es/form/interface'

type PasswordInputProps = {
  name: string
  placeholder: string
  dependencies?: NamePath[]
}

const PasswordInput = ({
  name,
  placeholder,
  dependencies,
}: PasswordInputProps) => {
  return (
    <Form.Item
      name={name}
      dependencies={dependencies}
      hasFeedback
      rules={[
        {
          required: true,
          message: 'required field',
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value) {
              return Promise.resolve()
            }
            if (name === 'confirmPassword') {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(
                new Error('The two passwords that you entered do not match!')
              )
            } else {
              if (value.length < 6) {
                return Promise.reject(new Error('Password must be > 6 symbols'))
              }
              return Promise.resolve()
            }
          },
        }),
      ]}
    >
      <Input.Password placeholder={placeholder} size="large" />
    </Form.Item>
  )
}

export default PasswordInput
