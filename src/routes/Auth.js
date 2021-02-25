import React, {useState} from 'react';
import Myfirebase from '../Myfirebase';

const Auth = ()=> {
    const authService = Myfirebase.auth();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = e=>{
        
        if(e.target.name === "email"){
            setEmail(e.target.value);
        }else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
    }
    
    const onSubmit = async e=>{
        e.preventDefault();
        try {
        if(newAccount) { //개발자도구 application의 IndexedDB의 firebaseLocalStrotage에서 토큰회원정보확인가능, 파이어베이스가 자동으로 스토리지에 저장해 새로고침해도 토큰값유지하게해줌
            //create account  파이어베이스의 내장함수로 간단하게 유저를 만들수있고(파이어베이스홈페이지의 twitter프로젝트에들어가면 가입한 유저 list도 확인가능함)
            const data = await authService.createUserWithEmailAndPassword(
                email,password
            )
            console.log(data);
        }else{
            //log in  파이어베이스의 내장함수로 간단하게 유저를 체크할수있음, 이미 등록되있는 유저면 로그인됨
            const data = await authService.signInWithEmailAndPassword(email, password)
            console.log(data);
        }
        
        }catch(error){
            setError(error.message);
        }
    }

    const toggleAccount = ()=> setNewAccount((prev) => !prev);
    return(
    <div>
        <form onSubmit={onSubmit}> 
            <input type = "email   " name="email" placeholder ="Email" value= {email} onChange={onChange}required/>
            <input type = "password" name="password" placeholder="Password" onChange={onChange} value = {password}required/>
            <input type = "submit" value = {newAccount ? "Create Account":"Log In"}/>
            {error}
        </form>
        <span onClick = {toggleAccount}>
            {newAccount ? "Sign in" : "Create Account"}
        </span>
        <div>
            <button>Continue with Google</button>
        </div>
    </div>
    )
}
export default Auth;