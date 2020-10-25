import React, { useRef, useEffect, createRef } from 'react'

export type position = [number, number]

const useArrdraggable = (dataSource: Array<any>) => {
  const storeAllRef = useRef<any>(null)
  const ISMOVE = useRef<boolean[]>([])
  const POSITIONARR = useRef<Array<position>>([])
  const MOUSEPOSITION = useRef<position>([0, 0])

  useEffect(() => {//div坐标获取
    const Store = storeAllRef.current as Array<any>
    const position: Array<position> = []
    Store.forEach((v, i) => {
      position.push([v.current.offsetLeft, v.current.offsetTop])
      v.current.style.position = 'absolute'
      v.current.style.zIndex = 0
      v.current.addEventListener('mousedown', (e: any) => { MouseDown(e, i) })
      v.current.addEventListener('mousemove', (e: any) => { MouseMove(e, i) })
      v.current.addEventListener('mouseup', (e: any) => { MouseUp(e, i) })
    })
    POSITIONARR.current = position
    ISMOVE.current = isMoveArr
  }, [])

  const MouseDown = (e: any, index: number) => {
    e.preventDefault()
    const isMoveArr = [...ISMOVE.current]
    MOUSEPOSITION.current = [e.clientX, e.clientY]
    isMoveArr[index] = true
    ISMOVE.current = isMoveArr
    const curPos = [...POSITIONARR.current]
    curPos[index][0] = storeAllRef.current[index].current.offsetLeft
    curPos[index][1] = storeAllRef.current[index].current.offsetTop
    POSITIONARR.current = curPos
    storeAllRef.current[index].current.style.cursor = 'move'
    storeAllRef.current[index].current.style.zIndex = 999
  }

  const MouseMove = (e: any, index: number) => {
    e.preventDefault()
    const isMoveArr = [...ISMOVE.current]
    if (isMoveArr[index] === false) {
      return;
    }
    const [mouseX, mouseY] = [e.clientX, e.clientY]
    storeAllRef.current[index].current.style.left = `${POSITIONARR.current[index][0] + mouseX - MOUSEPOSITION.current[0]}px`
    storeAllRef.current[index].current.style.top = `${POSITIONARR.current[index][1] + mouseY - MOUSEPOSITION.current[1]}px`
  }

  const MouseUp = (e: any, index: number) => {
    e.preventDefault()
    const isMoveArr = [...ISMOVE.current]
    isMoveArr[index] = false
    ISMOVE.current = isMoveArr
    storeAllRef.current[index].current.style.zIndex = 0
    storeAllRef.current[index].current.style.cursor = 'default'
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
          onClick={() => { }}
          ref={allRef[index]}
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

export default useArrdraggable