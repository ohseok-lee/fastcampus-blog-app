import AuthContext from "context/AuthContext";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, app } from "firebaseApp";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PostProps } from "./PostList";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [post, setPost] = useState<PostProps | null>(null);
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if(params?.id){
      getPost(params?.id);
    }
  }, [params?.id]);

  useEffect(() => {
    if(post){
      setTitle(post?.title);
      setSummary(post?.summary);
      setContent(post?.content);
    }
  }, [post]);

  const getPost = async (id: string) => {
    if(id){
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setPost({id: docSnap?.id, ...docSnap.data() as PostProps});
    }
  };
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(post && post?.id){
      try{
        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: title,
          summary: summary,
          content: content,
          updatedAt: new Date()?.toLocaleDateString(),
        });

        toast.success("게시글을 수정했습니다.");
        navigate("/");
      }catch(error: any){
        toast.error(error?.code);
      }
    }else{
      try{
        await addDoc(collection(db, "posts"), {
          title: title,
          summary: summary,
          content: content,
          createAt: new Date()?.toLocaleDateString(),
          email: user?.email,
          uid: user?.uid,
        });
        
        toast.success("게시글을 생성했습니다.");
        navigate("/");
      }catch(error: any){
        console.log(error);
        toast.error(error?.code);
      }
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const {target: {name, value}} = e;

    if(name === "title"){
      setTitle(value);
    }
    if(name === "summary"){
      setSummary(value);
    }
    if(name === "content"){
      setContent(value);
    }
  };

  return(
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input type="text" name="title" id="title" onChange={onChange} value={title} required />
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input type="text" name="summary" id="summary" onChange={onChange} value={summary} required />
      </div>
      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea name="content" id="content" onChange={onChange} value={content} required />
      </div>
      <div className="form__block">
        <input type="submit" value={!post ? "발행" : "수정"} className="form__btn--submit" />
      </div>
    </form>
  );
}