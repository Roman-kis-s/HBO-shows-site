import React from 'react';
import {Link} from 'react-router-dom';

const EpisodeItem = ({seasonNumber, showTitle, episodeNumber, episodeName}) => (
    <div>
        <h5><Link to={`/${showTitle}/${seasonNumber}/${episodeNumber}-${episodeName.split(" ").join("-")}`} className='nav-link text-dark'>
            Episode {episodeNumber}
        </Link></h5>
    </div>
);

export default EpisodeItem;