import React, { useRef } from 'react'
import { useEffect } from 'react'
import { Animator } from './Animator'

export const WebGlAnimation = () => {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const animator = new Animator({ canvas })
    animator.start()
    return () => animator.destroy()
  }, [])
  return <canvas id="example-canvas" ref={canvasRef} />
}
