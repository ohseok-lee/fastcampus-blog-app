import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "firebaseApp";
import AuthContext from "context/AuthContext";
import { toast } from "react-toastify";

interface PostListProps{
  hasNavigation?: boolean;
  defaultTab?: TabType | CategoryType;
}

export type CategoryType = "Frontend" | "Backend" | "Web" | "Natvie";
export const CATEGORIES: CategoryType[] = ["Frontend", "Backend", "Web", "Natvie"];

//study typescript 선택컬럼 지정
export interface PostProps{
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updatedAt?: string;
  uid: string;
  category: CategoryType;
  comments?: Array<CommentInterface>;
}

export interface CommentInterface {
  content: string;
  uid: string;
  email: string;
  createAt: string;
}

type TabType = "all" | "my";

export default function PostList({hasNavigation = true, defaultTab = "all"}){
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(defaultTab as TabType);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPosts = async () => {
    setPosts([]);
    let postRef = collection(db, "posts");
    let postQuery;
    if(user && activeTab === "my"){
      postQuery = query(postRef, where("uid", "==", user?.uid), orderBy("updatedAt", "desc")) ;
    }else if(user && activeTab === "all"){
      postQuery = query(postRef, orderBy("updatedAt", "desc"));
    }else{
      postQuery = query(postRef, where("category", "==", activeTab), orderBy("updatedAt", "desc"))
    }
    const postData = await getDocs(postQuery);
    postData?.forEach((doc) => {
      const postDataObj = { ...doc.data(), id: doc.id};
      setPosts((prev) => [...prev, postDataObj as PostProps]);
    })
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("게시글을 삭제하시겠습니까?");
    if(confirm && id){
      await deleteDoc(doc(db, "posts", id));

      toast.success("게시글을 삭제했습니다.");
      getPosts(); //변경된 포스트 다시 불러오기
    }
  };

  //study useEffect
  //React에서 Component가 렌더링될 때마다 특정 함수를 실행하도록 하는 hook
  useEffect(() => {
    getPosts();
  }, [activeTab]);

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
          {CATEGORIES.map((cat)=>(
            <div 
              key={cat}
              role="presentation" 
              className={activeTab === cat ? "post__nav--active" : ""} 
              onClick={() => {setActiveTab(cat)}}>
                {cat}
            </div>
          ))}
        </div>
      )}
      <div className="post__list">
            {posts?.length > 0 ? posts?.map((post, index) => (
              <div key={post?.id} className="post__box"> 
                <Link to={`/posts/${post?.id}`}>
                  <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">{post?.email}</div>
                    <div className="post__date">{post?.createAt}</div>
                  </div>
                  <div className="post__title">{post?.title}</div>
                  <div className="post__text">{post?.summary}</div>
                </Link>
                {post?.email === user?.email ? (
                  <div className="post__utils-box">
                    <div 
                      className="post__delete"
                      role="presentation"
                      onClick={()=>{handleDelete(post?.id as string)}}>삭제</div>
                    <Link to={`/posts/edit/${post?.id}`} className="post__edit">수정</Link>
                  </div>
                ) : (<div className="post__utils-box"></div>)}
                
              </div>
            )) : 
              <div className="post__no-post">
                게시글이 없습니다.
              </div>}
          </div>
    </>
  );
}