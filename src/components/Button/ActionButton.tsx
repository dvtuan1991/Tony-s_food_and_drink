import  Button  from 'antd/lib/button';
import { ReactNode } from 'react';

const ActionButton: React.FC<{title?: ReactNode, id?: number, action: Function, icon?: ReactNode, className?: string}> = 
({title, id, action, icon, className }) => {
  return (
    <Button onClick={(e) => action(id)} shape="circle" icon={icon} className={className} >
      {title}
    </Button>
  )
}

export default ActionButton