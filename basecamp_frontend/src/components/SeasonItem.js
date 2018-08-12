import React from 'react';
import {Link} from 'react-router-dom';

const SeasonItem = ({seasonNumber, showTitle}) => (
    <div className='text-center'>
        <h5><Link to={`/${showTitle}/${seasonNumber}-season`} className='nav-link text-dark'>{`Season ${seasonNumber}`}</Link></h5>
    </div>
);

export default SeasonItem;