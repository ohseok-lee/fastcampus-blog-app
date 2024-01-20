import AuthContext from "context/AuthContext";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CommentInterface, PostProps } from "./PostList";
import { toast } from "react-toastify";

interface CommentProps{
  post: PostProps;
  getPost: (id: string) => void;
}

const COMMENTS = [
  {
    id: 1,
    email: "oslee@test.com",
    content: "댓글입니다 1",
    createAt: "2023-01-20",
  },
  {
    id: 2,
    email: "oslee@test.com",
    content: "댓글입니다 2",
    createAt: "2023-01-20",
  },
  {
    id: 3,
    email: "oslee@test.com",
    content: "댓글입니다 3",
    createAt: "2023-01-20",
  },
  {
    id: 4,
    email: "oslee@test.com",
    content: "댓글입니다 4",
    createAt: "2023-01-20",
  },
  {
    id: 5,
    email: "oslee@test.com",
    content: "댓글입니다 5",
    createAt: "2023-01-20",
  },
];

export default function Comment({ post, getPost }: CommentProps){
  const [comment, setComment] = useState<string>("");
  const {user} = useContext(AuthContext);
  let postRef: any;
  if(post && post?.id){
    postRef = doc(db, "posts", post?.id);
  }


  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement> ) => {
    const {target: {name, value}} = e;

    if(name === "comment"){
      setComment(value);
    }
  };

  const handleDeleteComment = async (data: CommentInterface) => {
    const confirm = window.confirm("댓글을 삭제하시겠습니까?");
    if(confirm && postRef && post?.id){
      await updateDoc(postRef, {
        comments: arrayRemove(data),
        updatedAt: new Date()?.toLocaleDateString("ko",{
          hour: "2-digit",
          minute:"2-digit",
          second:"2-digit",
        }),
      });

      toast.success("댓글을 삭제했습니다.");
      await getPost(post?.id);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(post && post?.id){
      try{
        if(user?.uid){
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createAt:  new Date()?.toLocaleDateString("ko",{
              hour: "2-digit",
              minute:"2-digit",
              second:"2-digit",
            }),
          };
          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedAt: new Date()?.toLocaleDateString("ko",{
              hour: "2-digit",
              minute:"2-digit",
              second:"2-digit",
            }),
          });
        }

        toast.success("댓글을 생성했습니다.");
        setComment("");
        await getPost(post?.id);
      }catch(error: any){
        toast.error(error?.code);
      }
    }
  }

  return (
    <div className="comment">
      <form onSubmit={onSubmit} className="comment__form">
        <div className="form__block">
          <label htmlFor="comment">댓글입력</label>
          <textarea name="comment" id="comment" value={comment} onChange={onChange} required />
        </div>
        <div className="form__block form__block-reverse">
          <input type="submit" value="입력" className="form__btn-submit" />
        </div>
      </form>
      <div className="comment__list">
        {post?.comments
          ?.slice()?.reverse()
          ?.map((comment) => (
          <div key={comment?.createAt} className="comment__box">
            <div className="comment__profile-box">
              <div className="comment__email">{comment?.email}</div>
              <div className="comment__date">{comment?.createAt}</div>
              {user?.uid && user?.email === comment?.email ? (
                <div className="comment__delete" onClick={() => handleDeleteComment(comment)}>삭제</div>
              ) : ""}
            </div>
            <div className="comment__text">{comment?.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}