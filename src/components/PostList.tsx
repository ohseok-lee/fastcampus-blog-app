import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore"
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";

interface PostListPage{
  hasNavigation?: boolean;
}

//study typescript 선택컬럼 지정
export interface PostProps{
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
}

type TabType = "all" | "my";

export default function PostList({hasNavigation = true}){
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    const postData = await getDocs(collection(db, "posts"));
    postData?.forEach((doc) => {
      const postDataObj = { ...doc.data(), id: doc.id};
      setPosts((prev) => [...prev, postDataObj as PostProps]);
    })
  }

  //study useEffect
  //React에서 Component가 렌더링될 때마다 특정 함수를 실행하도록 하는 hook
  useEffect(() => {
    getPosts();
  }, []);

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
            {posts?.length > 0 ? posts?.map((post, index) => (
              <div key={post?.id} className="post__box"> 
                <Link to={`/posts/${post?.id}`}>
                  <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">{post?.email}</div>
                    <div className="post__date">{post?.createdAt}</div>
                  </div>
                  <div className="post__title">{post?.title}</div>
                  <div className="post__text">{post?.summary}</div>
                </Link>
                {post?.email === user?.email && (
                  <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">수정</Link>
                  </div>
                )}
                
              </div>
            )) : 
              <div className="post__no-post">
                게시글이 없습니다.
              </div>}
          </div>
    </>
  );
}