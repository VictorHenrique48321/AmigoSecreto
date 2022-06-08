import React from "react"

import './estilo.css'

const Card: React.FC = ({ children }) => {
    return (
        <div className="card">
            {children}
        </div>
    )
}

export default Card