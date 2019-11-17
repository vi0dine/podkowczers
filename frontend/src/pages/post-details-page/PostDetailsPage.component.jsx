import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {CSSTransitionGroup} from 'react-transition-group';
import './PostDetailsPage.styles.scss';
import {Slideshow} from "../../components/slideshow/Slideshow.component";
import axios from "axios";

export const PostDetailsPage = () => {
    const { id } = useParams();

    const [ready, setReady] = useState(false);
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        let response = await axios.request({url: `/api/v1/posts/${id}`, method: "GET"});
        setPost(response.data.data);
        setReady(true);
    };

    useEffect(() => {
        fetchPost()
    }, []);

    return ready && (
        <CSSTransitionGroup
            transitionName={'post-details-page'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className={'PostDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'column is-7'}>
                    <div className={'columns'}>
                            <div className={'column'}>
                                <h1 className={'title'}>{post.attributes.title}</h1>
                            </div>
                    </div>
                    <div className={'columns'}>
                        <div className={'PostDetailsBody columns'}>
                            <p>{post.attributes.body}</p>
                        </div>
                    </div>
                </div>
                <div className={'column is-5'}>
                        <Slideshow images={post.attributes.images} delay={5000} />
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};