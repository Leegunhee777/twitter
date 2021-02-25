import React, { useEffect, useState } from "react";
import Myfirebase from "../Myfirebase";

const Home = () => {
  const dbService = Myfirebase.firestore(); //데이터 저장을 위한 firestore()를 불러온다. //심지어 존나멋있는게 파이어베이스디비는 데이터넣고, 삭제하고이런게 실시간으로 바로바로 반영됨 realTime이라는말, 소켓처럼 채팅방구현에도 사용할수있을듯
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    //파이어베이스에서 값가져오는부분
    // const dbnweets =  dbService.collection("tweet").get(); 여기서 밑에서처럼 await안쓰면 에러남. 왜냐고?? 리엑트가 존나 빨라서 dbnweets변수에 .collection..get()함수로부터의 값이 들어오지도 않았는데, 즉 아직 null인데,
    const dbnweets = await dbService.collection("tweet").get(); //아직 값이 들어오지 않은null인 dbnweets.forEach()함수를 하려니 , null.forEach()하는거랑 똑같은데 당연히 에러나지 ,그래서 이런 패턴은 await 를 무조건써야함 값이 들어와야 .forEach()가 제대로작동하고,에러가 안나니까!!
    dbnweets.forEach((document) => {
        const nweetObject = {
            ...document.data(),
            id: document.id,
        };
      setNweets((prev) => [ nweetObject, ...prev]); //배열에 접근하여 각 data를 방문하며, 각 데이터를, state배열인 nweets에 옮겨담는 참신한 방법임!!! useState()의 인자에 함수를 넣어 이전state를 참조할수있는방법이있다니!! 굿굿!!!
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    //dbService.collection...add()함수는 Promise를 리턴한다. Promise를 리턴하는 놈에겐 await 와 async를 쓸수있으니 써주자!!!!!!
    event.preventDefault();
    await dbService.collection("tweet").add({
      //해당함수에 커서를 올리면 Promise를 리턴한다고 나온다 그런놈에겐 await를 써주는게 국룰!!!
      nweet: nweet,
      createAt: Date.now(),
    }); //우리가 파이어베이스에서 생성한 컬렉션의이름(tweet)을 .collection("tweet")인자로 적어주고,
    // add({ nweet: nweet}) 해당컬렉션에 document를 추가하는데 nweet라는이름의 Key를 가지고, 그 값은 state값의 nweet를 value 넣어준다.
    setNweet(""); //이거 해줘야 input에 넣은값 form으로 보낸뒤 , input창 비워진다. 이거 안하면 데이터보내도 ,input값 그대로 남음
  };
  const onChange = (event) => {
    setNweet(event.target.value);
  };

  console.log(nweets); //여기에 nweets를 찍어봐도!!! nweets배열에 담기는 과정을 다 찍어볼수있음
  //why? useEffect(,[])에의해 초기렌더된후 getNweets함수실행됨( BUT getNweets함수는 ,[]로 선언했기때문에 초기렌더링 1회만 발생하고 재랜더링시엔 발동안됨!!!!)중요!!!!!!
  //but 이 위치에 찍은 console.log는 state업데이트에의해 재랜더링되는만큼 실행되므로 state 추적용으로 쓸수있음,

  //getNweets함수안의 forEach로 data수만큼 forEach실행됨,,또 그만큼 state값 변하기 때문에 그 만큼 재렌더링됨,
  //그래서 console.log를 여기에 찍어봐도 상태를 관찰할수있는것임!!!!
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="what's on your mind"
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
          {nweets.map((nweet)=>(
              <div key={nweet.id}> 
                  {nweet.nweet}
              </div>
          ))}
      </div>
    </div>
  );
};
export default Home;
