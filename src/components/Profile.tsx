import { Link } from "react-router-dom";

export default function Profile(){
  return(
    <div className="profile__box">
      <div className="flex__box-lg">
        <div className="profile__img" />
        <div className="profile__info">
          <div className="profile__email">realvividream2510@gmail.com</div>
          <div className="profile__name">이오석</div>
        </div>
      </div>
      <Link className="profile__logout" to="/logout">로그아웃</Link>
    </div>
  );
}