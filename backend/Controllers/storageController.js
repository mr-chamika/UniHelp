import Content from '../Models/Content.js';
import fs from 'fs/promises';

export const createContent = async (req, res) => {

    try {

        const { userId, name, type, parentId } = req.body;

        const newContent = new Content({ userId, name, type, parentId, filePath: null });

        await newContent.save();

        res.json({ content: newContent });

    } catch (error) {

        res.json({ message: error });
    }

}

export const getContent = async (req, res) => {

    try {

        // const folders = await Content.find({ type: "folder" });
        // const files = await Content.find({ type: "file" });
        const x = req.params.uid.toString();

        const content = await Content.find({ parentId: null, userId: x });

        res.json({ content: content });



    } catch (err) {

        res.json({ message: err.message });

    }

}
export const getContentI = async (req, res) => {

    try {

        const id = req.params.id.toString();
        const x = req.params.uid.toString();

        // const folders = await Content.find({ parentId: id, type: "folder" });
        // const files = await Content.find({ parentId: id, type: "file" });

        const content = await Content.find({ parentId: id, userId: x });

        res.json({ content: content });



    } catch (err) {

        res.json({ message: err.message });

    }

}

export const deleteContent = async (req, res) => {

    try {

        const id = req.params.id.toString();

        const content = await Content.findByIdAndDelete({ _id: id });

        res.json({ message: 'deletion success' });



    } catch (err) {

        res.json({ message: err.message });

    }

}

export const insertContent = async (req, res) => {

    try {

        const { fileContent, userId, confirm, name } = req.body;

        const file = await Content.findOne({ _id: confirm });

        if (fileContent && userId == file.userId) {

            file.content = fileContent;
            await file.save();
            res.json({ message: 'Content added successfully' });

        } else if (name && userId == file.userId) {

            file.name = name;
            await file.save();
            res.json({ message: 'Renamed successfully' });

        } else {

            res.json({ message: 'Authorization failed' });

        }

    } catch (err) {

        res.json({ message: 'from backend' + err.message });

    }

}

export const uploadContent = async (req, res) => {

    try {
        const { userId, parentId } = req.body;

        const file = req.file;

        const cleanParentId = parentId == 'null' ? null : parentId;

        if (!file) {

            res.json({ message: 'No files to upload' })

        } else {

            const x = await fs.readFile(file.path, 'utf-8')

            const newContent = new Content({ userId, name: file.originalname, type: null, parentId: cleanParentId, content: x, filePath: file.path || null });

            await newContent.save();

            res.json({ content: newContent });

        }

    } catch (err) {

        res.json({ message: err.message });

    }
}