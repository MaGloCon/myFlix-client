export const UserInfo = ({user}) => {
  const formattedBirthday = user.Birthday ? new Date(user.Birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  return (
    <>
      <p>Username: {user.Username} </p>
      <p>Email: {user.Email} </p>
      <p>Birthday: {formattedBirthday} </p>
    </>
  )
}