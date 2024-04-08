type Props = {
  children: any | JSX.Element | JSX.Element[]
}

const PageContainer = ({ children }: Props) => <div style={{ width: '100%', height: '100%' }}>{children}</div>

export default PageContainer
