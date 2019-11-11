import React from 'react';
import {CSSTransitionGroup} from 'react-transition-group';
import './PostDetailsPage.styles.scss';
import {Slideshow} from "../../components/slideshow/Slideshow.component";

export const PostDetailsPage = () => {
    const post = {
        id: 1,
        title: "Test post 1",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec hendrerit fringilla lorem, sed congue arcu sagittis sed. Maecenas nec felis vel metus egestas vehicula in id massa. Quisque efficitur ac purus ac venenatis. Quisque gravida dolor at nibh porta, sed iaculis lorem aliquam. Maecenas malesuada arcu vitae pretium venenatis. Aliquam eget sapien ipsum. Curabitur quis vulputate ante, eu ultrices nisi.\n" +
            "\n" +
            "Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi quam ante, euismod vel mi non, lacinia venenatis purus. Aliquam lobortis nec nisi in efficitur. Suspendisse dapibus purus eu eros facilisis efficitur. Integer quis arcu et leo vehicula vehicula. Vivamus rhoncus lacus facilisis, hendrerit lacus eu, ultrices neque. Donec sed ultricies diam. Etiam id tortor quis dolor mattis ultricies. Cras sit amet elit vitae neque scelerisque finibus sed id nisi. Curabitur varius nulla in condimentum iaculis. Quisque luctus ex sem, at efficitur arcu blandit vel. Aenean dignissim, purus in imperdiet dignissim, leo libero fermentum purus, ut hendrerit risus lacus sit amet risus. Aliquam erat volutpat. Suspendisse at arcu scelerisque, ornare nunc vel, luctus sapien. Donec nec cursus massa.\n" +
            "\n" +
            "Fusce pellentesque, augue quis placerat rhoncus, erat est hendrerit tortor, at congue elit erat vel urna. Duis rutrum varius sapien a blandit. Fusce interdum lectus finibus, convallis nibh id, ullamcorper orci. Morbi ac nulla lacus. Duis quis elit ut est commodo bibendum nec pellentesque eros. Cras ut tortor eu eros tempor dapibus. Cras vitae metus convallis sem vulputate vehicula. Cras tempor placerat mi non elementum.\n" +
            "\n" +
            "Curabitur et mi placerat, pretium diam eget, gravida turpis. Nulla eleifend faucibus porta. Proin rutrum ut quam sed porta. Fusce vulputate quam et nulla rutrum luctus. Phasellus orci tortor, imperdiet non nulla suscipit, egestas rhoncus magna. Praesent nisl velit, interdum non laoreet quis, blandit volutpat neque. Vivamus eget augue sed orci mattis accumsan eget a massa. Donec vitae libero non neque iaculis rutrum vitae a urna. Morbi iaculis dictum eleifend. Fusce vitae leo sed mi blandit dignissim in sed elit. Proin condimentum eget magna sit amet porttitor.\n" +
            "\n" +
            "Sed tincidunt ut tortor non mollis. Nunc id luctus sem, in congue magna. Aenean varius felis sed finibus sagittis. Etiam porta eros et nibh placerat laoreet. Morbi elementum non dolor eget fringilla. Maecenas eu tincidunt sem. Duis laoreet faucibus convallis. Sed sodales orci tempus, elementum libero a, scelerisque metus. Fusce nec ipsum sed arcu elementum luctus id sit amet turpis. Phasellus posuere odio nec efficitur rhoncus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam elit quam, ornare sed erat et, finibus sodales libero. Sed quis pulvinar nisi. Sed luctus quam nec est faucibus tristique. Maecenas sed fermentum velit, mollis convallis ligula. Vivamus vulputate nibh vel pellentesque pharetra.",
        author: "Some user",
        attachments: [{src: 'http://lorempixel.com/1280/720/nightlife/1/'}, {src: 'http://lorempixel.com/1280/720/nightlife/2/'}, {src: 'http://lorempixel.com/1280/720/nightlife/3/'}]
    };
    return (
        <div className={'PostDetails container is-fluid'}>
            <div className={'columns'}>
                <div className={'column is-7'}>
                    <div className={'columns'}>
                        <CSSTransitionGroup
                            transitionName={'text'}
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <div className={'column'}>
                                <h1 className={'title'}>{post.title}</h1>
                                <h3 className={'subtitle'}>{post.author}</h3>
                            </div>
                        </CSSTransitionGroup>
                    </div>
                    <div className={'columns'}>
                        <CSSTransitionGroup
                            transitionName={'text'}
                            transitionAppear={true}
                            transitionAppearTimeout={2000}
                            transitionEnter={false}
                            transitionLeave={false}
                        >
                            <div className={'PostDetailsBody column'}>
                                <p>{post.body}</p>
                            </div>
                        </CSSTransitionGroup>
                    </div>
                </div>
                <div className={'column is-5'}>
                        <Slideshow images={post.attachments} delay={5000} />
                </div>
            </div>
        </div>
    );
};