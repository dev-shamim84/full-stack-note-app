import NoteModel from "../models/NoteModel.js";
export const GetAllNote = async (_, res) => {
  try {
    const note = await NoteModel.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json({ status: true, message: "All Note Get Successfully!", note });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, err: error.message.toString() });
  }
};
export const GetNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await NoteModel.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }
    return res.status(200).json({ message: "Note Get SuccessFully!", note });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, err: error.message.toString() });
  }
};

export const CreateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      const error = new Error("Title and Content are required");
      error.StatusCode = 409;
    }
    const data = await NoteModel.create({
      title,
      content,
    });
    return res
      .status(201)
      .json({ status: true, message: "Note Created Successfully !", data });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, err: error.message.toString() });
  }
};
export const DeleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await NoteModel.findByIdAndDelete(id);
    return res.status(200).json({
      status: true,
      message: "Delete This Note Successfully !",
      data: data,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, err: error.message.toString() });
  }
};
export const UpDateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const updateNote = await NoteModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    if (!updateNote)
      return res.status(404).json({ message: "Note not found!" });
    return res.status(200).json({
      status: true,
      message: "Note Update Successfully!",
      data: id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, err: error.message.toString() });
  }
};
