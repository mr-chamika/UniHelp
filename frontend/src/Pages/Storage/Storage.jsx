import './Storage.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/userContext';
import FileBlock from '../../Components/FileBlock/FileBlock';
import FullPopup from '../../Components/FullPopup/FullPopup';
import Editor from '../../Components/Editor/Editor';
import uploadi from '../../assets/Storage/upload.png';
import createi from '../../assets/Storage/create.png';

const Storage = () => {

    const { user } = useContext(UserContext);

    // const [folders, setFolders] = useState([]);
    // const [files, setFiles] = useState([]);
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [currentFolderId, setCurrentFolderId] = useState(null);
    const [folderStack, setFolderStack] = useState([]);
    const [show, setShow] = useState(false);
    const [Dshow, setdShow] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [Wshow, setwShow] = useState(false);

    const [fileContent, setFileContent] = useState('');
    const [currentItem, setCurrentItem] = useState({});
    const [editing, setEditing] = useState(false);
    const [count, setCount] = useState(0);
    const [Fshow, setfShow] = useState(false);
    const [file, setFile] = useState(null);
    const [rename, setRename] = useState(false);
    const [showPic, setShowPic] = useState(false);

    const fetchFolderContent = (folderId) => {
        fetch(`http://localhost:5000/storage/${folderId || ""}/${user.userId}`)
            .then(res => res.json())
            //.then(data => { if (data.folders || data.files) { setFolders(data.folders); setFiles(data.files); } })
            .then(data => { if (data) { setItems(data.content) } })
            .catch(err => console.log(err))
    };

    useEffect(() => {

        if (!user?.userId) return;
        fetchFolderContent(currentFolderId);

    }, [currentFolderId, user]);

    const create = (e) => {
        e.preventDefault();

        var x = items.find(item => item.name == name)

        if (!x || x.type != type) {

            if (name.trim() && type.trim()) {
                fetch('http://localhost:5000/storage/create', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId: user.userId, name, type, parentId: currentFolderId })
                })
                    .then(res => res.json())
                    .then(data => {
                        // if (data.content.type === 'folder') {
                        //     setFolders([...folders, data.content]);
                        // } else {
                        //     setFiles([...files, data.content]);
                        // }
                        if (data) {

                            setItems([...items, data.content])

                        }
                        setName('');
                        setType('');
                        setShow(false);
                    })
                    .catch(err => console.log(err));
            } else {
                alert('Fill all fields');
            }

        } else {

            alert(`Same ${x.type} name detected`)

        }
    };

    const deleteId = (fileId) => {

        setConfirm(fileId);
        setdShow(true);

    }

    const writeId = (fileId) => {

        const x = items.find(item => item._id == fileId)

        if (x) {

            setwShow(true);
            setCurrentItem(x);
            setEditing(false);
            setFileContent(x.content || '');
            setCount(x.content == null ? 0 : x.content.length)

        } else {

            alert("Item not found");

        }


    }
    const EditId = (fileId) => {

        const x = items.find(item => item._id == fileId)

        if (x) {

            setCurrentItem(x);
            setRename(true);
            setName(x.name);

        } else {

            alert("Item not found");

        }


    }

    const deleteFile = () => {

        fetch(`http://localhost:5000/storage/${confirm}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => { if (data) { setConfirm(null); setItems(items.filter(item => item._id != confirm)) }; setdShow(false); })
            .catch(err => alert(err))

    };

    const openFolder = (folderId) => {
        setCurrentFolderId(folderId);
        setFolderStack([...folderStack, currentFolderId]);
    };

    const goBack = () => {
        const prev = folderStack.pop();
        setFolderStack([...folderStack]);
        setCurrentFolderId(prev || null);
    };

    const handleFileContent = (e) => {

        e.preventDefault();

        if (fileContent.trim() != "") {

            if (fileContent.trim() != currentItem.content) {

                fetch(`http://localhost:5000/storage/`, {

                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileContent, userId: user.userId, confirm: currentItem._id })

                })
                    .then(res => res.json())
                    .then(data => { alert(data.message); setFileContent(''); setwShow(false); setConfirm(null); setEditing(false); fetchFolderContent(currentFolderId); setCurrentItem(null) })
                    .catch(err => alert(err))
            } else {

                alert("Content is same");
                setFileContent('');
                setwShow(false);
                setConfirm(null);
                setEditing(false);
                setCurrentItem(null)

            }
        } else {

            alert("Content is empty.");

        }

    }

    const upload = (e) => {

        e.preventDefault();

        if (!file) {

            alert("Select a file first"); return;

        } else {

            const formData = new FormData();
            formData.append('file', file);
            formData.append('userId', user.userId);
            formData.append('parentId', currentFolderId);

            fetch('http://localhost:5000/storage/upload', {

                method: 'POST',
                body: formData

            })
                .then(res => res.json())
                .then(data => { alert("upload success"); setItems([...items, data.content]); setFile(null); fetchFolderContent(currentFolderId); setfShow(false) })
                .catch(err => console.log(err))


        }

    }

    const renaming = (e) => {

        e.preventDefault();

        if (name != currentItem.name) {

            fetch(`http://localhost:5000/storage/`, {

                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, userId: user.userId, confirm: currentItem._id })

            })
                .then((res) => res.json())
                .then(data => { alert(data.message); setRename(false); setCurrentItem(null); fetchFolderContent(currentFolderId) })
                .catch(err => alert(err))


        } else {

            alert('Name is not changed');

        }

    }

    const getImage = (id) => {

        const x = items.find(item => item._id == id)

        if (x) {

            setCurrentItem(x);
            setShowPic(true);

        } else {

            alert("Item not found");

        }


    }

    return (
        <div className='outF'>
            <div className="c-storage">
                <div className="content">

                    <div className="head">
                        <div className='bak' >
                            {folderStack.length > 0 && <button onClick={goBack}>⬅</button>}
                        </div>

                        <img src={uploadi} onClick={() => setfShow(true)} />
                        <img src={createi} onClick={() => setShow(true)} />
                        {/* <button>Create Folder</button> */}
                    </div>

                    <FileBlock

                        content={items}
                        onFolderClick={openFolder}
                        deleting={deleteId}
                        write={writeId}
                        edit={EditId}
                        get={getImage}

                    />
                    {/* <FileBlock content={files} pic={File} /> */}

                </div>

            </div>
            <FullPopup show={show}>
                <form onSubmit={create}>
                    <div>
                        <label>Enter file/folder name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <label>Enter folder / file </label>
                        <select value={type} onChange={e => setType(e.target.value)}>
                            <option value="" hidden>Set type</option>
                            <option value="folder">Folder</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div className='cnc'>
                        <button type="submit" style={{ backgroundColor: 'green' }}>Create</button>
                        <button onClick={() => { setShow(false); setName('') }} style={{ backgroundColor: 'red' }}>Cancel</button>
                    </div>
                </form>
            </FullPopup>
            <Editor show={showPic}>
                <div className="pic">
                    <div>
                        <p onClick={() => { setShowPic(false); setCurrentItem(null) }}>X</p>
                        {currentItem && <img src={`http://localhost:5000/${currentItem.filePath}`} />}
                    </div>
                </div>
            </Editor>
            <FullPopup show={rename}>
                <form onSubmit={renaming}>
                    <div>
                        <label>Enter file/folder name</label>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div>
                        <label>Enter folder / file </label>
                        <select value={type} onChange={e => setType(e.target.value)} disabled>
                            <option value="" hidden>Set type</option>
                            <option value="folder">Folder</option>
                            <option value="file">File</option>
                        </select>
                    </div>
                    <div className='cnc'>
                        <button type="submit" style={{ backgroundColor: 'green' }}>Rename</button>
                        <button onClick={() => setRename(false)} style={{ backgroundColor: 'red' }}>Cancel</button>
                    </div>
                </form>
            </FullPopup>
            <FullPopup show={Fshow}>
                <form onSubmit={upload}>
                    <div>
                        <label>Select the file</label>
                        <input type="file" onChange={(e) => { setFile(e.target.files[0]) }} />
                    </div>
                    <div className='cnc'>
                        <button type="submit" style={{ backgroundColor: 'green' }}>Upload</button>
                        <button onClick={() => setfShow(false)} style={{ backgroundColor: 'red' }}>Cancel</button>
                    </div>
                </form>
            </FullPopup>
            <FullPopup show={Dshow}>
                <form>

                    <p>
                        <label>Are you sure you want delete the file ?</label>
                    </p>
                    <div className='cnc'>
                        <button type='button' onClick={() => deleteFile()} style={{ backgroundColor: 'green' }}>Confirm</button>
                        <button type='button' onClick={() => { setdShow(false); }} style={{ backgroundColor: 'red' }}>Cancel</button>
                    </div>
                </form>
            </FullPopup>
            <Editor show={Wshow}>

                <form className='editor' onSubmit={handleFileContent}>
                    <div className='e-buts'>
                        {(currentItem && currentItem.content == null || editing) &&
                            <div className="cnt">
                                <p>Number of characters : </p>
                                <p style={{ color: 'green', fontWeight: 'bolder' }}> {count}</p>
                            </div>
                        }
                        <div className='x'>
                            {(currentItem && currentItem.content != null && !editing) && <button className='edit' type='button' onClick={() => setEditing(true)}>Edit</button>}
                            {(currentItem && currentItem.content == null || editing) && <button className='save' type='submit'>Save</button>}
                            <button onClick={() => { setwShow(false); setFileContent(''); setCurrentItem(null); setEditing(false) }} className='cancel'>Cancel</button>
                        </div>
                    </div>
                    <textarea

                        placeholder='write...'
                        value={fileContent}
                        onChange={e => { setFileContent(e.target.value); setCount(e.target.value.replace(/\s/g, '').length) }}
                        readOnly={(currentItem && currentItem.content != null) && !editing}

                    />

                </form>

            </Editor>
        </div>
    );
};

export default Storage;
