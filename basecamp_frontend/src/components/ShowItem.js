import React from 'react';
import {Link} from 'react-router-dom';

const ShowItem = ({title, subtitle, shortDesc, posterImage}) => (
    <div className='col-md-3 col-sm-6 mb-2'>
        <div className='img-thumbnail text-center'>
            <img src={posterImage} alt={title} className='img-fluid'/>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{shortDesc}</p>
            <Link to={`/${title.toLowerCase().split(' ').join("-")}`} className='btn btn-primary'>See more...</Link>
        </div>
    </div>
);

export default ShowItem;

