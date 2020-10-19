# draghooks 

一个用于react的拖拽hook，实现图片等html元素的拖拽功能

## useDraggable

`useDraggable()`

- 参数：void
- 返回值：Object 
  - Ref：在需要附加拖拽功能的元素上面设置属性ref={Ref}
  - MouseDown：在需要附加拖拽功能的元素上面设置onMouseDown事件
  - MouseMove：在需要附加拖拽功能的元素上面设置onMouseMove事件
  - MouseUp：在需要附加拖拽功能的元素上面设置onMouseUp事件

```tsx

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

```