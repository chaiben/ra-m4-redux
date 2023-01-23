import React, { useState } from 'react'
import { Body } from '../components/layout'
import { Container, FlexBox } from '../styles'
import { Button, Text } from '../components/atoms'
import { useDispatch, useSelector } from 'react-redux'
import { InputTextGroup } from '../components/molecules'
import {
  updateFirstSurname,
  updateName,
  updateSecondSurname,
} from '../store/user.slice'

const UserProfile = () => {
  const user = useSelector((state) => state.user)
  return (
    <FlexBox>
      <Text>
        <strong>Nombre</strong>: {user.name}
      </Text>
      <Text>
        <strong>Apellidos</strong>: {user.surnames.first} {user.surnames.second}
      </Text>
    </FlexBox>
  )
}

const UpdateUserForm = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [userFormData, setUserFormData] = useState({ ...user })

  const handleUpdate = () => {
    dispatch(updateName(userFormData.name))
    dispatch(updateFirstSurname(userFormData.surnames.first))
    dispatch(updateSecondSurname(userFormData.surnames.second))
  }

  return (
    <FlexBox as="form">
      <InputTextGroup
        id="nombre"
        label="Nombre"
        value={userFormData.name}
        onChange={(e) =>
          setUserFormData({ ...userFormData, name: e.target.value })
        }
      />
      <InputTextGroup
        id="primer-apellido"
        label="Primer apellido"
        value={userFormData.surnames.first}
        onChange={(e) =>
          setUserFormData({
            ...userFormData,
            surnames: { ...userFormData.surnames, first: e.target.value },
          })
        }
      />
      <InputTextGroup
        id="segundo-apellido"
        label="Segundo apellido"
        value={userFormData.surnames.second}
        onChange={(e) =>
          setUserFormData({
            ...userFormData,
            surnames: { ...userFormData.surnames, second: e.target.value },
          })
        }
      />
      <Button type="button" onClick={handleUpdate}>
        Enviar
      </Button>
    </FlexBox>
  )
}

function Profile() {
  return (
    <Body>
      <Container direction="row">
        <UserProfile />
        <UpdateUserForm />
      </Container>
    </Body>
  )
}

export default Profile
