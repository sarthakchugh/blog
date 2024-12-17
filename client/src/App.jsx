import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import PostList from './pages/PostList';
import SinglePost from './pages/SinglePost';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import SavedPosts from './pages/SavedPosts';
import About from './pages/About';

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Homepage />} />
                <Route path="posts" element={<PostList />} />
                <Route path="new" element={<NewPost />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="saved" element={<SavedPosts />} />
                <Route path="about" element={<About />} />
                <Route path=":slug" element={<SinglePost />} />
            </Route>
        </Routes>
    );
}

export default App;
