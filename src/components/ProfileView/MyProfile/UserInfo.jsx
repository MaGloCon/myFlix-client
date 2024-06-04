import { FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillGift } from 'react-icons/ai';

export const UserInfo = ({user}) => {
  const formattedBirthday = user.Birthday ? new Date(user.Birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  return (
  <>
    <div className="d-flex align-items-center mb-4">
      <FaUser className="me-2" />
      <span>{user.Username}</span>
    </div>
    <div className="d-flex align-items-center mb-4">
      <MdEmail className="me-2" />
      <span>{user.Email}</span>
    </div>
    <div className="d-flex align-items-center mb-4">
      <AiFillGift className="me-2" />
      <span>{formattedBirthday}</span>
    </div> 
  </>
)
}