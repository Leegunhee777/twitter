import React, { useState } from "react";
import Myfirebase from "../Myfirebase";

//각각의 list의 한부분을 담당하는 조각조각 컴포넌트임
const Nweet = ({ nweetObj, isOwner }) => {
  const dbService = Myfirebase.firestore();

  //toggle을 위한 state
  const [editing, setEditing] = useState(false);

  //수정을위한 각각의 조각컴포넌트의 text는 기존의 text값을 가지고있어야함
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete thie nweet?");
    //confirm함수는 true/false 를 반환한다.

    if (ok) {
      //delete nweet
      await dbService.doc(`tweet/${nweetObj.id}`).delete(); //삭제하고싶은 doc가있을때 해당 경로를 적어주면됨 ex) 컬렉션이름/doc고유id
    } else {
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev); //기존에 가지고있던 State값의 반댓값으로 셋팅, 모달창같은 개념임,
  //edit버튼에의해 토글이 일어나면, 삼항연산자에 의해 기존에 보여주던것은 사라지고, form을 보여줌
  const onSubmit = async (event) =>{
      event.preventDefault();
      await dbService.doc(`tweet/${nweetObj.id}`).update(
          {
              text:newNweet //원하는 컬렉션의 원하는 document의 text필드를 수정하는 함수
          }
      )
      setEditing(false); //edit을위한 form창을 원래대로 되돌려야함
      
  };
  const onChange = (event)=>{
      setNewNweet(event.target.value);
  }

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit ={onSubmit}>
            <input value={newNweet} onChange = {onChange} required />
            <input type = "submit" value = "Update Nweet"/>
          </form>
          <button onClick ={toggleEditing} >Cancel</button>
        </>
      ) : (
        <>
          <h4>{nweetObj.text}</h4>

          {/*로그인한사람이 작성자라면 수정,삭제버튼을 보여준다. */}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Nweet</button>
              <button onClick={toggleEditing}>Edit Nweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Nweet;
