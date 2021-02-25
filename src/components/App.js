import React ,{useEffect, useState} from 'react';
//firebase 사용하려면 홈페이지에서 프로젝트만들고 => 웹만들기 생성하고 => SDK받고,해당내용 firebase.js에 추가 =>npm install --save firebase 설치해야함, 
import Myfirebase from '../Myfirebase';
// firebaes application이 불러와진것임!!!console.log(firebase);
import AppRouter from './Router';


function App() {
  const authService = Myfirebase.auth(); //유저의 로그인상태를 관리할 수 있다.
  //const[isLoggedIn, setIsLoggedIn] = useState(authService.currentUser); //주의사항!!!!!!근데 이런식으로 로그인체크불가함 왜냐?? Firebase의 currentUser내장함수가 값을 불러오는 속도보다
                                                                        //리엑트가 렌더되는 속도가 더 빨라서, 리엑트가 firebase의 currentUser에 값이 불러오기도 전에 어??!!뭐야 없네 나 먼저간다 니 null이지??하고 가버리는 웃기는 상황이연출됨
                                                                        //아래와 같은 해결방안이 제시됨
  
  const [init ,setInit] = useState(false); //전체적인 초깃값의 초기화 즉, 필요한 데이터가 다 들어오지않으면 전체를 그냥 렌더하지 않는다의 용도로 쓰이는것임
  const[isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    //파이어스토어의 내장되어있는 이벤트 리스너!!같은거임 onAuthStateChanged , user의 로그인상태의 변화가 생기면 감지해낸다.
    authService.onAuthStateChanged((user)=>{  //user가 값이 없으면 Auth를 보여주고 값이 있으면 Home을 보여준다. !!!!!
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true); //초기화 즉, 값필요한거 다 받았으니 true로 바꾸고, 이제 렌더해도되!!!라는의미의 setInit(true)임 //필요한데이터의 로딩속도보다 훨씬빠른 리엑트의 렌딩속도를 제어하기위해 이런방식 적극추천!!!!!!!!!!
    });
  },[]);
  return (
    <>
    {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."} 
    <footer>&copy; twitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
