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