import React from 'react';
import {Link} from 'react-router-dom';

const PriorityShow = ({title, subtitle, longDesc, link, posterImage}) => (
    <div>
        <div className='text-center'>
            <img src={posterImage} alt="Poster" className='img-thumbnail img-fluid w-50'/>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{longDesc}</p>
            <Link to={title ? title.toLowerCase().split(' ').join("-") : '/shows'} className='btn btn-primary'>See
                more...</Link>
        </div>
    </div>
);

export default PriorityShow;