import React, { useRef, useState, useEffect, createRef } from 'react'

interface PropTypes { }
type position = [number, number]
const dataSource = [1, 2, 3, 4, 5, 6]

const useDraggableTest: React.FC<PropTypes> = (props) => {
  const [positionArr, setPositionArr] = useState<Array<position>>([])
  const [mousePosition, setMousePosition] = useState<position>([0, 0])//鼠标的坐标
  const [isMove, setIsMove] = useState<boolean[]>([])
  const storeAllRef = useRef<any>(null)

  useEffect(() => {//div坐标获取
    // console.log(isMove)
    // console.log(storeAllRef.current)
    const Store = storeAllRef.current as Array<any>
    const position: Array<position> = []
    Store.forEach((v, i) => {
      position.push([v.current.offsetLeft, v.current.offsetTop])
      v.current.style.position = 'absolute'
    })
    setPositionArr(position)
  }, [isMove])

  useEffect(() => {//初始化isMove
    setIsMove(isMoveArr)
  }, [])

  useEffect(() => {//div坐标实时
    // console.log(positionArr)
  }, [positionArr])

  const MouseDown = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    storeAllRef.current[index].current.style.cursor = 'move'
    const isMoveArr = [...isMove]
    isMoveArr[index] = true
    setIsMove(isMoveArr)
    setMousePosition([e.clientX, e.clientY])
  }

  const MouseMove = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    const isMoveArr = [...isMove]
    if (!isMoveArr[index]) return
    const [mouseX, mouseY] = [e.clientX, e.clientY]
    storeAllRef.current[index].current.style.left = `${positionArr[index][0] + mouseX - mousePosition[0]}px`
    storeAllRef.current[index].current.style.top = `${positionArr[index][1] + mouseY - mousePosition[1]}px`
  }

  const MouseUp = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    storeAllRef.current[index].current.style.cursor = 'default'
    const isMoveArr = [...isMove]
    isMoveArr[index] = false
    setIsMove(isMoveArr)
    const curPos = [...positionArr]
    curPos[index][0] = storeAllRef.current[index].current.offsetLeft
    curPos[index][1] = storeAllRef.current[index].current.offsetTop
    // console.log(curPos)
    setPositionArr(curPos)
  }

  const isMoveArr: boolean[] = []
  const allRef: any = []
  const generateList = (dataSource: any[]) => {
    let res = dataSource.map((item, index) => {
      allRef[`${index}`] = createRef<any>()
      isMoveArr.push(false)
      return (
        <div
          key={index}
          style={{
            width: 280,
            height: 50,
            border: '1px solid #ccc',
            left: `${17}px`,
            top: `${index * 65 + 20}px`
          }}
          ref={allRef[index]}
          onMouseDown={(e) => { MouseDown(e, index) }}
          onMouseMove={(e) => { MouseMove(e, index) }}
          onMouseUp={(e) => { MouseUp(e, index) }}
        >
          {item}
        </div>
      )
    })
    storeAllRef.current = allRef
    return res
  }

  return (
    <div
      style={{ width: 300, height: 500, border: '1px solid #ccc' }}
    >
      {generateList(dataSource)}
    </div>
  )
}

export default useDraggableTest