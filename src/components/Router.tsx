import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/home";
import PostNew from "../pages/home/posts/new";
import PostDetail from "../pages/home/posts/detail";
import PostEdit from "../pages/home/posts/edit";
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";
import SignupPage from "../pages/signup";
import PostsPage from "../pages/home/posts";
import { useState } from "react";


export default function Router() {
    const [isAuth, setIsAuth] = useState<boolean>(false);
    return(
        <>
            <Routes>
                {isAuth ? (
                    <>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/posts' element={<PostsPage />}></Route>
                        <Route path='/posts/new' element={<PostNew />}></Route>
                        <Route path='/posts/:id' element={<PostDetail />}></Route>
                        <Route path='/posts/edit/:id' element={<PostEdit />}></Route>
                        <Route path='/profiles' element={<ProfilePage />}></Route>
                        <Route path='/login' element={<LoginPage />}></Route>
                        <Route path='/signup' element={<SignupPage />}></Route>
                        <Route path='*' element={<Navigate replace to='/'/>}></Route>
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                        <Route path="*" element={<LoginPage />} />
                    </>
                )}
            </Routes>
        </>
    );
}