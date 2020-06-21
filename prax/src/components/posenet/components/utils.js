import * as posenet from '@tensorflow-models/posenet'


const pointRadius = 13

export const config = {
  videoWidth: (550),
  videoHeight: (550),
  flipHorizontal: true,
  algorithm: 'single-pose',
  showVideo: false,
  showSkeleton: true,
  showPoints: true,
  minPoseConfidence: 0.1,
  minPartConfidence: 0.1,
  multiplier: .5,
  maxPoseDetections: 2,
  nmsRadius: 2,
  outputStride: 16,
  imageScaleFactor: .2,
  skeletonColor: "#148aa3",
  skeletonLineWidth: 12,
  loadingText: 'Loading...please be patient...'
}

function toTuple({x, y}) {
  return [x, y]
}

export function drawKeyPoints(
  keypoints,
  minConfidence,
  {skeletonColor = "#ee7e5b"},
  canvasContext,
  scale = 1
) {
  
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {x, y} = keypoint.position
      canvasContext.beginPath()
      canvasContext.arc(x * scale, y * scale, pointRadius, 0, 5 * Math.PI)
      canvasContext.fillStyle = skeletonColor
      canvasContext.fill()
      canvasContext.moveTo(20, 20);
      // canvasContext.bezierCurveTo(20, 100, 200, 100, 200, 20);
      canvasContext.stroke();
    }
  })
}

function drawSegment(
  [firstX, firstY],
  [nextX, nextY],
  color,
  lineWidth,
  scale,
  canvasContext
) {
  canvasContext.beginPath()
  canvasContext.moveTo(firstX * scale, firstY * scale)
  canvasContext.lineTo(nextX * scale, nextY * scale)
  canvasContext.lineWidth = lineWidth
  canvasContext.strokeStyle = color
  canvasContext.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  canvasContext,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      canvasContext
    )
  })
}