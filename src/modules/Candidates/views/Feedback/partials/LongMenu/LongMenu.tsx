import React from 'react';
import { Link } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { IOptions } from './typings';

const ITEM_HEIGHT = 48;

interface ILongMenuProps {
  feedbackId: string;
  options: IOptions[];
}

function LongMenu({ feedbackId, options }: ILongMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (_event: unknown) => {
    setAnchorEl(null);
  };

  const MenuList = options.map((option: IOptions) =>
    option.type === 'DELETE' ? (
      <MenuItem
        key={option.type}
        onClick={(event) => {
          option.deleteFn && option.deleteFn(feedbackId);
          handleClose(event);
        }}
      >
        {option.type}
      </MenuItem>
    ) : (
      <Link
        key={option.type}
        to={feedbackId + option.path}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <MenuItem onClick={(event) => handleClose(event)}>
          {option.type}
        </MenuItem>
      </Link>
    ),
  );

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>

      <Menu
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
        onClose={handleClose}
        anchorEl={anchorEl}
        id="long-menu"
        keepMounted
        open={open}
      >
        {MenuList}
      </Menu>
    </div>
  );
}

export default LongMenu;
