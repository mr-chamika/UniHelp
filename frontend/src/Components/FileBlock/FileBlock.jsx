import './FileBlock.css';
import pic1 from '../../assets/Storage/folder.png';
import pic2 from '../../assets/Storage/file.png';
import dlt from '../../assets/EventCard/delete.png';
import edt from '../../assets/EventCard/edit.png';

const FileBlock = ({ content, onFolderClick, deleting, write, edit, get }) => {

    return (
        <div className="c-fileblock">
            <div className="content">

                {content.length === 0 &&

                    <p>No content found</p>

                }

                {content.length != 0 &&

                    content.map((folder) => {
                        if (folder) {
                            const type = folder.type === "folder" ? "folder" : "file";
                            const icon = type === "folder" ? pic1 : pic2;
                            const handleClick = type === "folder" ? () => onFolderClick(folder._id) : () => write(folder._id);


                            return (
                                <div className='block' key={folder._id}>
                                    <div className="buts">
                                        <img src={dlt} width='17px' onClick={() => deleting(folder._id)} />
                                        <img src={edt} width='17px' onClick={() => edit(folder._id)} />
                                    </div>
                                    {(folder.type == "folder" || folder.type == "file") ?
                                        <img onClick={handleClick} src={icon} width='60px' /> :
                                        <img onClick={() => get(folder._id)} src={icon} width='60px' />
                                    }
                                    <span>{folder.name}</span>

                                </div>
                            )
                        }
                    })

                }

            </div>
        </div>
    );
}

export default FileBlock;