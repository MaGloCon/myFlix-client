import {Button, Form, Row}  from 'react-bootstrap';

export const UpdateForm = ({profileUpdateData, handleUpdate, handleSubmit}) => {
  return (
    <Row>
      <Form onSubmit={handleSubmit}>
        <h3>Update profile information</h3>

        <Form.Group className='mb-2'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            name="username"
            type="text"
            minLength={4}
            value={profileUpdateData.Username}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label>Password:
          <p>Your new password must be at least 8 characters long.</p>
          </Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="........"
            minLength={8}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group >

        <Form.Group className='mb-2'>
          <Form.Label> Email: </Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={profileUpdateData.Email}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Form.Group className='mb-4'>
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            name="birthday"
            type="date"
            value={profileUpdateData.Birthday ? profileUpdateData.Birthday.slice(0, 10) : ""}
            onChange={(e) => handleUpdate(e)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" >Submit Changes</Button>
      </Form>
    </Row>
  )
}