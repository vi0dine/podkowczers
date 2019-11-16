import React, {useEffect, useState} from 'react';
import { PostTile } from "../../components/post-tile/PostTile.component";
import './BlogPage.styles.scss';
import axios from "axios";

export const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [ready, setReady] = useState(false);

    const fetchPosts = async () => {
        let response = await axios.request({url: `/api/v1/posts`, method: "GET"});
        setPosts(response.data.data);
        setReady(true);
    };

    useEffect(() => {
        fetchPosts()
    }, []);

    return ready && posts.length >= 4 && (
        <div className='Blog container is-fluid'>
            <div className="tile is-ancestor">
                <div className="tile is-vertical">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <PostTile id={posts[0].id} title={posts[0].attributes.title} imageUrl={posts[0].attributes.images[0]} />
                        </div>
                        <div className="tile is-parent">
                            <PostTile id={posts[1].id} title={posts[1].attributes.title} imageUrl={posts[1].attributes.images[0]} />
                        </div>
                    </div>
                    <div className="tile is-parent">
                        <PostTile id={posts[2].id} title={posts[2].attributes.title} imageUrl={posts[2].attributes.images[0]} />
                    </div>
                </div>
                <div className="tile is-parent">
                    <PostTile id={posts[3].id} title={posts[3].attributes.title} imageUrl={posts[3].attributes.images[0]} />
                </div>
            </div>
        </div>
    );
};