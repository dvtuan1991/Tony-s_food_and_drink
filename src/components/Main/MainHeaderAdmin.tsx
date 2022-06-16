import Breadcrumb from "antd/lib/breadcrumb"
import {  useLocation } from "react-router-dom"
import HomeOutlined from '@ant-design/icons/HomeOutlined';


const MainHeaderAdmin = () => {
  const location = useLocation();

  const pathName = location?.pathname.split('/').filter(i => i);
  console.log(pathName);
  const url = pathName.map((path, index) => {
    if (index === pathName.length - 1) {
      if (typeof +(path) == 'number') {
        return (<Breadcrumb.Item className="text-base" key={index}>detail</Breadcrumb.Item>)
      } else {
        return (<Breadcrumb.Item className="text-base" key={index}>{path}</Breadcrumb.Item>)
      }
    } else if (path === 'admin') {
      return (
        <Breadcrumb.Item className="align-middle inline-flex text-base" key={index} href='/admin'><HomeOutlined  /></Breadcrumb.Item>
      )
    } else {
      return <Breadcrumb.Item className="text-base" key={index} href={`/admin/${path}` }>{path}</Breadcrumb.Item>
    }
  });
  return (
    <div className="h-10 p-5 bg-gray-400 flex items-center">
      <Breadcrumb separator=">"  >
        {url}
      </Breadcrumb>
    </div>
  )
}

export default MainHeaderAdmin