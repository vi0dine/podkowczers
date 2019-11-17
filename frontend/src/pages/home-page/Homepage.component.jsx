import React from 'react';
import './Homepage.styles.scss';
import {CSSTransitionGroup} from "react-transition-group";

export const HomePage = () => {
    return (
        <CSSTransitionGroup
            transitionName={'homepage'}
            transitionAppear={true}
            transitionAppearTimeout={500}
        >
        <div className='Homepage'>
            <div className='Homepage-content'>
                <div className='columns'>
                    <div className='column title-container is-offset-6-desktop'>
                        <CSSTransitionGroup
                            transitionName={'title'}
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                        >
                        <h1 className='title'>
                            DePodkówczers
                        </h1>
                        </CSSTransitionGroup>
                    </div>
                </div>
            </div>
        </div>
        </CSSTransitionGroup>
    );
};