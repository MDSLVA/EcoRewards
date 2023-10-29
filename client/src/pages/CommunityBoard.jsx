import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_POSTS } from '../utils/queries';
import { CREATE_POST } from '../utils/mutations';
import moment from 'moment';
import '../styles/CommunityBoard.css';

const CommunityBoard = () => {
  const [newPost, setNewPost] = useState('');
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [createPost] = useMutation(CREATE_POST, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
  });

  const handlePostSubmit = async () => {
    if (newPost.trim() !== '') {
      try {
        await createPost({ variables: { content: newPost } });
        setNewPost('');
      } catch (err) {
        console.error('Error creating post:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'No timestamp available';
    const formattedDate = moment(Number(timestamp)).format('MMMM Do YYYY, h:mm:ss a');
    return formattedDate === 'Invalid date' ? 'No timestamp available' : formattedDate;
  };
  
  return (
    <div className="community-board">
      <h2>Community Board</h2>
      <div className="post-form">
        <textarea
          rows="4"
          placeholder="Share your eco-action..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
        />
        <button onClick={handlePostSubmit}>Post</button>
      </div>
      <div className="posts">
        {data?.getAllPosts?.map((post) => (
          <div className="post" key={post._id}>
            <div className="post-user">
              <img src={post?.author?.profile?.image} alt="User Avatar" />
              <span>{post?.author?.username}</span>
            </div>
            <div className="post-content">
              <p>{post.content}</p>
            </div>
            <div className="post-timestamp">{formatTimestamp(post.timestamp)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityBoard;
