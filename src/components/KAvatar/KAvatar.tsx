import React from 'react';
import { Avatar } from '@material-ui/core';

interface IKAvatarProps {
  name: string;
}

const KAvatar: React.FC<IKAvatarProps> = (props) => {
  const { name } = props;
  const splittedName = name.split(' ');
  let avatarAcronym = '';
  splittedName.forEach((name) => {
    avatarAcronym = avatarAcronym + name.charAt(0).toUpperCase();
  });

  return <Avatar>{avatarAcronym}</Avatar>;
};

export default KAvatar;
