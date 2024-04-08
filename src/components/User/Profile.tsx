import { Avatar, Badge, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import BoringAvatar from 'boring-avatars';
import React from 'react';

interface UserProfileProps {
  name: string;
  whatsappId?: string;
  imageUrl?: string;
  clientCode?: string;
  isNameBig?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  whatsappId,
  imageUrl,
  clientCode,
  isNameBig = false, // Default to false if not provided
}) => {
  return (
    <>
      <ListItemAvatar>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          {imageUrl ? (
            <Avatar src={imageUrl} alt={name} />
          ) : (
            <BoringAvatar
              size={40}
              name={name}
              variant="beam"
              colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
            />
          )}
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={isNameBig ? <Typography variant="h5">{name}</Typography> : name}
        secondary={whatsappId ? `WhatsApp ID: ${whatsappId}` : clientCode ? <Typography variant="caption">{clientCode}</Typography> : null} // Conditionally display whatsappId
      />
    </>
  );
};


export default UserProfile;
