import { AccountCircle } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";

export default function CustomAccountCircle({
  handleMenu,
  handleClose,
  anchorEl,
  contextLogout,
}: {
  handleMenu(event: React.MouseEvent<HTMLElement>): void;
  handleClose(): void;
  anchorEl: null | HTMLElement;
  contextLogout(): void;
}) {
  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={"/profile"}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            handleClose();
            contextLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
