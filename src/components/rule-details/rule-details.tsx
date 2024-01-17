// components/RuleDetails.tsx

import React from "react"

type RuleDetailsProps = {
  title: string
  frames: object
}

const RuleDetails: React.FC<RuleDetailsProps> = ({ title, frames }) => {
  // You can customize the rendering of the frames and title here
  return (
    <div>
      <h1>{title}</h1>
      {/* Render frames as needed */}
      <pre>{JSON.stringify(frames, null, 2)}</pre>
    </div>
  )
}

export default RuleDetails
