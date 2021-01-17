import React from "react"
import { Input } from "../Input/Input";
import { MyButton } from "../MyButton/MyButton";
import "./CreatePlaylist.css"
const CreatePlaylist = () => {
  return (
    <div className="CreatePlaylist">
      <div className="Playlist-button-img">
      <button type="button">
      <span>Elegir foto</span>
      </button>
      </div>
      <div>
      <h1 className="title-create-playlist">Create Playlist</h1>
      <h3>Name</h3>
      <Input
        type="text"
        name="title"
        placeholder={"My Playlist"}
        required
      />
      <h3>Description</h3>
      <textarea 
      autoFocus
      className="Textarea-description"
      type="text"
      name="description"
      placeholder={"Add your best description."}
      />
      </div>
      <div>
      <MyButton
        variant="pink-or"
        size="50%"
        className="button-Playlist"
      >
        CREATE
       </MyButton>
       </div>
    </div>
  )
}
export default CreatePlaylist;