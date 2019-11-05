import React from 'react';
import './events-page.styles.scss';

export const EventsPage = () => {
    return (
        <div className={'Events container is-fluid'}>
            <div className={'container'}>
                <div className={'columns'}>
                    <div className={'column is-4'}>
                        <h2 className={'title'}>Wydarzenia</h2>
                    </div>
                    <div className={'column is-offset-6 has-text-centered'}>
                        <h2 className={'title is-size-5'}>Dostępne</h2>
                        <p className={'subtitle'}>3</p>
                    </div>
                </div>
                <div className={'columns'}>
                    <div className={'events_list column is-8'} style={{'background-color': 'red'}}>
                        LISTA WYDARZEŃ
                    </div>
                    <div className={'column is-4'} style={{'background-color': 'red'}}>
                        <div className={'columns'}>
                            <div className={'events_addons column'}>
                                <div style={{'background-color': 'coral', 'height':'50%'}}>
                                    KALENDARZ
                                </div>
                                <div style={{'background-color': 'blue', 'height':'50%'}}>
                                    COŚ
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};