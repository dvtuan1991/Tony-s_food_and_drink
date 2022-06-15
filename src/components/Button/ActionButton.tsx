import  Button  from 'antd/lib/button';
import { ReactNode } from 'react';

const ActionButton: React.FC<{title: ReactNode, id?: number, action: Function, }> = ({title, id, action }) => {
  return (
    <Button onClick={(e) => action(id)} shape="circle" >
      {title}
    </Button>
  )
}

export default ActionButton