import { dbService } from "fbInstance";
import React, {useState} from "react";

const Nweet = ({nweetObj, isOwner}) => {
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            //delete nweet
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

    return <div>
        {
            editing ? <><form onSubmit={onSubmit}><input type="text" value={newNweet} onChange={onChange} placeholder="Eidt your nweet" required/><input type="submit" value="update Nweet" /></form><button onClick={toggleEditing}>Cancel</button></> :<>
            <h4>{nweetObj.text}</h4>
            {isOwner && <><button onClick={onDeleteClick}>Delete Nweet</button>
            <button onClick={toggleEditing}>Edit Nweet</button></>}</>
        }
    </div>
}

export default Nweet;