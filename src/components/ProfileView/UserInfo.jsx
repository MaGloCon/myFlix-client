export const UserInfo = ({email, name, birthday}) => {
  const formattedBirthday = birthday ? new Date(birthday).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }) : '';

  return (
    <>
      <p>Username: {name} </p>
      <p>Email: {email} </p>
      <p>Birthday: {formattedBirthday}</p>
    </>
  )
}