

import React from 'react'

const LangBtn = () => {
  return (
    <div>
      <select onChange={(e)=> console.log(e.target.value)}>
        <option value="en">English</option>
        <option value="ar">arabic</option>
      </select>
    </div>
  )
}

export default LangBtn


