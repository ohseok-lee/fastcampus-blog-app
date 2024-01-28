import { Link } from "react-router-dom";
import { BsSun, BsMoonFill } from "react-icons/bs";
import ThemeContext from "context/ThemeContext";
import { useContext } from "react";

export default function Footer() {
  const context = useContext(ThemeContext);
  console.log(context);
  return (
    <footer>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/profiles">프로필</Link>
      <div className="footer__theme">
        {
          context.theme === "light" ? (
            <BsSun onClick={context.toggleMode} className="footer__theme-btn" />
          ) : (
            <BsMoonFill onClick={context.toggleMode} className="footer__theme-btn" />
          )
        }
      </div>
    </footer>
  );
}