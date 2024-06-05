import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import ReactModal from 'react-modal';
import axios from 'axios';
import '../style/timeline.css';
import miraiSpectrumIcon from '../assets/mirai-spectrum_icon.png';

const Timeline: React.FC = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [newPopsContents, setNewPopsContents] = useState<string>('');
    const [popsModalIsOpen, setPopsModalIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5002/api/posts');
            setPosts(response.data);
        } catch (error) {
            console.error('Failed to fetch posts', error);
            setPosts([]);
        }
    };

    const handleFavorite = async (index: number) => {
        const post_no = posts[index].post_no;
        try {
            const response = await axios.put(`http://localhost:5002/api/posts/favorite/${post_no}`);
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts];
                newPosts[index].favorites_count = response.data.favorites_count;
                return newPosts;
            });
        } catch (error) {
            console.error('Failed to update favorite count', error);
        }
    };

    const openPopsModal = () => {
        setPopsModalIsOpen(true);
    };

    const closePopsModal = () => {
        setPopsModalIsOpen(false);
    };

    const handleNewCreatePops = async (event: React.FormEvent) => {
        event.preventDefault();
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.userId) {
            console.error('User ID not found');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5002/api/posts/', {
                userId: user.userId,
                newPopsContents
            });
            if (response != null) {
                closePopsModal();
                setNewPopsContents('');
                fetchPosts();
            }
        } catch (error) {
            console.error('Failed to create post', error);
        }
    };

    return (
        <div className="timeline-container">
            <div className="timeline-post">
                {posts.map((post, index) => (
                    <div key={post.post_no} className='post-content-area'>
                        <div className='post-left-area'>
                            <img src={miraiSpectrumIcon} alt='プロフィールアイコン' className='user-icon' />
                        </div>
                        <div className='post-right-area'>
                            <div className='user-info'>
                                <p className='user-name'>{post.user_name}</p>
                                <p className='user-id'>@{post.user_identification_code}</p>
                            </div>
                            <p className='post-content'>{post.content}</p>
                            <div className='reaction-button'>
                                <button onClick={() => handleFavorite(index)} className="favorite-button">
                                    <FaStar color="#ddd" />
                                    <span>{post.favorites_count}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                <button className='timeline-new-pops-button' onClick={openPopsModal}>
                    <CiCirclePlus className='timeline-new-pops-icon' color='#009da3' size={80} />
                </button>
                <ReactModal
                    isOpen={popsModalIsOpen}
                    onRequestClose={closePopsModal}
                    shouldCloseOnOverlayClick={false}
                    contentLabel="新規投稿モーダル"
                    className={"timeline-new-pops-modal"}
                    overlayClassName="custom-overlay"
                >
                    <div className='timeline-modal-top-area'>
                        <button className='timeline-modal-top-area-button cancel-button' onClick={closePopsModal}>キャンセル</button>
                        <button className='timeline-modal-top-area-button' onClick={handleNewCreatePops}>つぶやく</button>
                    </div>
                    <form onSubmit={handleNewCreatePops}>
                        <textarea
                            placeholder='今、何してる？'
                            maxLength={140}
                            value={newPopsContents}
                            onChange={(e) => setNewPopsContents(e.target.value)}
                            className="timeline-new-pops-contents" />
                    </form>
                </ReactModal>
            </div>
        </div>
    );
};

export default Timeline;