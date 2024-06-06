import { useState }from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import { AiOutlineExpand, AiOutlineShrink } from 'react-icons/ai';

import './MovieDirector.scss';

export const MovieDirector = ({ director }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return isExpanded ? (
    <div className="director-section-expanded d-flex justify-content-center align-items-start mb-3">
      <Image className="director-portrait p-2" src="https://placehold.co/230x260"/>
      <div className="director-text ml-3 p-2">
        <h3 className="director-name">{director.Name}</h3>
        <p>{director.Death ? `b. ${director.Birth} - d. ${director.Death}` : `b. ${director.Birth}`}</p>
        <div className="director-bio">
          <p className="bio-content">{director.Bio}</p>
        </div>
        <div className="d-flex justify-content-end hide-on-big-screens">
          <AiOutlineShrink 
            onClick={toggleExpand} 
            size={20}
            className="hide-on-big-screens"
          />
        </div>
      </div>
    </div>
  ) : (
    <div 
      className="director-section d-flex justify-content-center align-items-start mb-3"
      onClick={toggleExpand}
    >
      <Image className="director-portrait p-2" src="https://placehold.co/230x260"/>
      <div className="director-text ml-3 p-2">
        <h3 className="director-name">{director.Name}</h3>
        <p>{director.Death ? `b. ${director.Birth} - d. ${director.Death}` : `b. ${director.Birth}`}</p>
        <div className="director-bio">
          <p className="bio-content">{director.Bio}</p>
        </div>
        <div className="d-flex justify-content-end hide-on-big-screens">
          <AiOutlineExpand 
            onClick={toggleExpand} 
            size={20}
            className="hide-on-big-screens"
          />
        </div>
      </div>
    </div>
  );
};



MovieDirector.propTypes = {
  director: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    birth: PropTypes.string,
    death: PropTypes.string,
  }).isRequired,
};
