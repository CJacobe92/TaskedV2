import WrappedComponent from '@components/Outlet/WrappedComponent'
import Urgent from '@components/Urgent'

const page = () => {
  return<Urgent />
  
}

export default WrappedComponent(page)