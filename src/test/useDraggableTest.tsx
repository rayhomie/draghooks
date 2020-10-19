import React from 'react';
import useDraggable from '../hooks/useDraggable';

const useDraggableTest = () => {
  const { Ref, MouseDown, MouseMove, MouseUp } = useDraggable()

  return (
    <img
      src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603698944&di=1768992638edcd61edc375faf9c546d9&imgtype=jpg&er=1&src=http%3A%2F%2Fa3.att.hudong.com%2F64%2F52%2F01300000407527124482522224765.jpg'
      alt='1'
      ref={Ref}
      onMouseDown={MouseDown}
      onMouseMove={MouseMove}
      onMouseUp={MouseUp}
    />
  )
}

export default useDraggableTest