import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IOptions } from './typings';
import styles from '../CandidateHeroHeader/CandidateHeroHeader.module.scss';

const ITEM_HEIGHT = 48;

interface ILongMenuProps {
  candidateId: string;
  options: IOptions[];
}

function LongMenu({ candidateId, options }: ILongMenuProps) {
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
    option.type === 'Delete Candidate' ? (
      <MenuItem
        key={option.type}
        onClick={(event) => {
          option.deleteFn && option.deleteFn(candidateId);
          handleClose(event);
        }}
      >
        {option.type}
      </MenuItem>
    ) : (
      <Link
        key={option.type}
        to={`/candidates/edit/${candidateId}`}
        style={{ textDecoration: 'none', color: 'black' }}
      >
        <MenuItem onClick={handleClose}>{option.type}</MenuItem>
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
        classes={{ root: styles.optionsIcon }}
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
