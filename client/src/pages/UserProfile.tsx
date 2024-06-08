import React from 'react';
import profileHeaderImage from '../assets/sky.jpeg';
import Button from '../components/button/Button';
import '../style/profile.css';

const UserProfile: React.FC = () => {

    return (
        <div className='profile-container'>
            <div className='profile-user-info'>
                <h2>ユーザー情報</h2>
                <img src={profileHeaderImage} className='profile-user-image' />
                <div className='profile-user-info-detail'>
                    <label>ユーザ識別子</label>
                    <p>a0a70a6b-20e4-46b4-8310-09313e90f3ab</p>
                </div>
                <div className='profile-user-info-detail'>
                    <label>ユーザID</label>
                    <p>@daisuke-test</p>
                </div>
                <div className='profile-user-info-detail'>
                    <label>ユーザ名</label>
                    <p>阿部大輔</p>
                </div>
            </div>
            <div className='profile-user-trend'>
                <h2>興味あるカテゴリ</h2>
            </div>
            {/* <div className='profile-box'>
                <div className='profile-header-image-area'>
                    <img src={profileHeaderImage} className='profile-user-image' />
                </div> */}
            {/* <div className='profile-header-image-area'>
                    <img src={""} className='profile-header-image' />
                    <img src={profileHeaderImage} className='profile-user-image' />
                    <div className='profile-user-follow-button-area'>
                        <Button
                            label="フォロー"
                            style={{}}
                            className="profile-user-follow-button"
                            icon={<i className=""></i>}
                            ariaLabel="Click Me Button"
                        />
                    </div>
                </div>
                <div className='profile-user-info-area'>
                    <p>ユーザーネーム</p>
                    <p>職業</p>
                    <p>私はこのLinneを開発している阿部大輔と申します。最近はTypeScriptにハマっており、React周りやDockerあたりの勉強をしています！</p>
                </div> */}
            {/* </div> */}
        </div>
    );
};

export default UserProfile;