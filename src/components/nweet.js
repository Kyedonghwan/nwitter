import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dbService, storageService } from "fbInstance";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //delete nweet
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
        }
    }

    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const toggleEditing = () => setEditing(prev => !prev);
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text:newNweet
        });
        setEditing(false);
    }
    const onChange = (e) => {
        const { target: { value} } = e;
        setNewNweet(value);
    }

    return <div className="nweet">
        {
            editing ? <><form onSubmit={onSubmit} className="container nweetEdit"><input autoFocus className="formInput" type="text" value={newNweet} onChange={onChange} placeholder="Eidt your nweet" required/><input className="formBtn" type="submit" value="update Nweet" /></form><span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span></> :<>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
            {isOwner && <div className="nweet__actions"><span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>}</>
        }
    </div>
}

export default Nweet;