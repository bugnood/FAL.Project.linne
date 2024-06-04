import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { CiCirclePlus } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import ReactModal from 'react-modal';
import axios from 'axios';
import '../style/timeline.css';
import miraiSpectrumIcon from '../assets/mirai-spectrum_icon.png';

const Timeline: React.FC = () => {

    // タイムライン表示
    const [posts, setPosts] = useState<any[]>([]);

    // 投稿内容の状態を管理
    const [newPopsContents, setNewPopsContents] = useState<string>('');

    // モーダルの状態を管理
    const [popsModalIsOpen, setPopsModalIsOpen] = useState(false);

    // ログインモーダルを開く関数
    const openPopsModal = () => {
        setPopsModalIsOpen(true);
    };

    // 登録モーダルを閉じる関数
    const closePopsModal = () => {
        setPopsModalIsOpen(false);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:5002/api/posts');
                if (!response.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error(error);
                setPosts([]);
            }
        };

        fetchPosts();
    }, []);

    const handleFavorite = async (index: number) => {
        const post_no = posts[index].post_no;
        try {
            const response = await fetch(`http://localhost:5002/api/posts/favorite/${post_no}`, {
                method: 'PUT',
            });
            if (!response.ok) {
                throw new Error('Failed to update favorite count');
            }
            const data = await response.json();
            setPosts((prevPosts) => {
                const newPosts = [...prevPosts];
                newPosts[index].favorites_count = data.favorites_count;
                return newPosts;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();

    // 新規投稿処理
    const handleNewCreatePops = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5002/api/posts/', { newPopsContents });
            // setMessage(response.data.message);
            if (response != null) {
                navigate('/timeline');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // setMessage(error.response?.data.message || 'An error occurred');
            } else {
                // setMessage('An error occurred');
            }
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
                                <p className='user-name'>ユーザー名</p>
                                <p className='user-id'>ユーザーID</p>
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
                        <button className='timeline-modal-close-button' onClick={closePopsModal}><IoIosCloseCircle size={35} /></button>
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