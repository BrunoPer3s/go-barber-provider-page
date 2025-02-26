import React, {useEffect} from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo} from 'react-icons/fi';

import {ToastMessage, useToast} from '../../hooks/Toast';
import {Container} from './styles';


interface ToastContainerProps {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={20}/>,
  success: <FiCheckCircle size={20}/>,
  error: <FiAlertCircle size={20}/>,
}


const Toast: React.FC<ToastContainerProps> = ({message, style}) => {
  const {removeToast} = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [removeToast, message.id]);

  return (
    <Container style={style} type={message.type} hasdescription={Number(!!message.description)}>
        {icons[message.type || 'info']}
        <div>
          <strong>{message.title}</strong>
          { message.description && <p>{message.description}</p>}
        </div>
        <button onClick={() => removeToast(message.id)} type="button">
          <FiXCircle size={18} />
        </button>
      </Container>
  );
};

export default Toast;