import React from 'react'
import PropTypes from 'prop-types'

export default function LoadingRing({
  complete,
  totalSeconds,
  strokeWidth,
  radius,
}) {
  const size = radius * 1.1
  const normalizedRadius = radius - 14
  const circumference = normalizedRadius * 2 * Math.PI

  return (
    <div>
      <svg height={size * 2} width={size * 2}>
        <circle
          stroke="#007bff"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={
            circumference * (complete / totalSeconds) +
            ' ' +
            circumference * ((totalSeconds - complete) / totalSeconds)
          }
          transform={`rotate(-90 ${size} ${size})`}
          r={normalizedRadius}
          cx={size}
          cy={size}
        />
        <circle
          stroke="whitesmoke"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={
            circumference * ((totalSeconds - (complete)) / totalSeconds) +
            ' ' +
          circumference
          }
          transform={`rotate(${-90 +
            ((complete) / totalSeconds) * 360} ${size} ${size})`}
          r={normalizedRadius}
          cx={size}
          cy={size}
        />
        <text x="50%" y="50%" textAnchor="middle" stroke="#000" strokeWidth=".3px" dy=".3em" fontFamily="ProximaBold">
          {((complete/totalSeconds) * 100).toFixed(0) + '%'}
        </text>
      </svg>
    </div>
  )
}

LoadingRing.propTypes = {
  complete: PropTypes.number.isRequired,
  totalSeconds: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  radius: PropTypes.number,
}

LoadingRing.defaultProps = {
  strokeWidth: 10,
  radius: 50,
}
