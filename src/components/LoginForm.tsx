import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {app} from "firebaseApp"
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, pwd);
      toast.success("로그인에 성공했습니다.");
      navigate("/");
    }catch(error: any){
      toast.error("이메일, 비밀번호를 다시 확인해주세요.");
      console.log(error);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {name, value},
    } = e;

    if (name === "email"){
      setEmail(value);
      const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === "password"){
      setPwd(value);
      if (value?.length < 8){
        setError("비밀번호를 8자리 이상 입력해주세요.");
      }else {
        setError("");
      }
    }
  }
  return(
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" required onChange={onChange} value={email}/>
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required onChange={onChange} value={pwd}/>
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 없으신가요?
        <Link to="/signup" className="form__link">
          회원가입하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__btn--submit" disabled={error?.length > 0}/>
      </div>
    </form>
  );
}