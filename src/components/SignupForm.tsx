import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { app } from "firebaseApp";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

export default function SingupForm() {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");
  const [chkPwd, setChkPwd] = useState<string>("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, pwd);
      toast.success("성공적으로 회원가입 되었습니다.");
      navigate("/");
    } catch (error: any) {
      toast.error("회원가입에 실패했습니다. " + error?.code);
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: {
        name,
        value
      }
    } = e;

    if (name === 'email') {
      setEmail(value);
      const validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!value?.match(validRegex)) {
        setError("이메일 형식이 올바르지 않습니다.");
      } else {
        setError("");
      }
    }
    if (name === 'password') {
      setPwd(value);
      if (value?.length < 8) {
        setError("비밀번호는 8자리 이상이어야 합니다.");
      } else if (value?.length > 0 && value != chkPwd) {
        setError("비밀번호와 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
    if (name === 'password_confirm') {
      setChkPwd(value);
      if (value != pwd) {
        setError("비밀번호와 값이 다릅니다. 다시 확인해주세요.");
      } else {
        setError("");
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">회원가입</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input type="text" name="email" id="email" required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input type="password" name="password" id="password" required onChange={onChange} />
      </div>
      <div className="form__block">
        <label htmlFor="password">비밀번호 확인</label>
        <input type="password" name="password_confirm" id="password_confirm" required onChange={onChange} />
      </div>
      {error && error?.length > 0 && (
        <div className="form__block">
          <div className="form__error">{error}</div>
        </div>
      )}
      <div className="form__block">
        계정이 있으신가요?
        <Link to="/login" className="form__link">
          로그인하기
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="회원가입" className="form__btn--submit" disabled={error?.length > 0} />
      </div>
    </form>
  );
}