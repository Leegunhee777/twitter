import React from 'react';

const Nweet = ({ nweetObj,isOwner}) => (
    <div>
        <h4>{nweetObj.text}</h4>
        {/*로그인한사람이 작성자라면 수정,삭제버튼을 보여준다. */}
        {isOwner && (
            <> 
        <button>Delete Nweet</button>
        <button>Edit Nweet</button>
            </>
        )}
    </div>
);

export default Nweet;