import { Link } from "react-router-dom";

export default function PostDetail(){
  return (
    <div className="post__detail">
      <div className="post__box">
        <div className="post__title">
          제목입니다.
        </div>
        <div className="post__profile-box">
          <div className="post__profile" />
          <div className="post__author-name">패스트캠퍼스</div>
          <div className="post__date">2023.12.29 금요일</div>
        </div>
        <div className="post__utils-box">
          <div className="post__delete">삭제</div>
          <div className="post__edit">
            <Link to={`/posts/edit/1`}>수정</Link>
          </div>
        </div>
        <div className="post__text">
          국비지원/기업 강의는 별도로 안내된 학습 사이트를 이용해 주세요. 쉐어엑스 강의는 해당 홈페이지를 이용해 주세요. 온라인 강의는 오픈일 오후 5시 이후 수강이 가능하며, 당사 사정에 따라 오픈 시간이 조금 늦어질 수 있습니다.
        </div>
      </div>
    
    </div>
  );
}