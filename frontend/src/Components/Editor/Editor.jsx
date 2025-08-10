import './Editor.css'

const Editor = ({ show, children }) => {

    if (!show) { return null; }

    return (

        <div className="editor-overlay">

            <div className="editor-content">

                {children}

            </div>

        </div>

    )

}

export default Editor;
