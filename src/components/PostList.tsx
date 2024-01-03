import { useState } from "react";
import { Link } from "react-router-dom";

interface PostListPage{
  hasNavigation?: boolean;
}

type TabType = "all" | "my";

export default function PostList({hasNavigation = true}){
  const [activeTab, setActiveTab] = useState<TabType>("all");
  return(
    <>
      {hasNavigation && (
        <div className="post__nav">
          <div 
            role="presentation" 
            className={activeTab === "all" ? "post__nav--active" : ""}
            onClick={() => setActiveTab("all")}>
              전체
          </div>
          <div 
            role="presentation" 
            className={activeTab === "my" ? "post__nav--active" : ""}
            onClick={() => setActiveTab("my")}>
              나의 글
          </div>
        </div>
      )}
      <div className="post__list">
            {[...Array(10)].map((e, index) => (
              <div key={index} className="post__box"> 
                <Link to={`/posts/${index}`}>
                  <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">패스트캠퍼스</div>
                    <div className="post__date">2023.12.29 금요일</div>
                  </div>
                  <div className="post__title">게시글 {index}</div>
                  <div className="post__text">
                    국비지원/기업 강의는 별도로 안내된 학습 사이트를 이용해 주세요. 쉐어엑스 강의는 해당 홈페이지를 이용해 주세요. 온라인 강의는 오픈일 오후 5시 이후 수강이 가능하며, 당사 사정에 따라 오픈 시간이 조금 늦어질 수 있습니다.
                  </div>
                  <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <div className="post__edit">수정</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
    </>
  );
}