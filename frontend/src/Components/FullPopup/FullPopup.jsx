import './FullPopup.css'

const FullPopup = ({ show, children }) => {

    if (!show) { return null; }

    return (

        <div className="full-overlay">

            <div className="full-content">

                {children}

            </div>

        </div>

    )

}

export default FullPopup;
