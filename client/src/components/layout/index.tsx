import { ReactNode } from 'react'
import styles from './index.module.css'
import { Layout as AntLayout } from 'antd'
import Header from '../header'

type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={{ height: '100%' }}>
        {children}
      </AntLayout.Content>
    </div>
  )
}

export default Layout
