"use client";

import { useAuth } from "@/context/AuthContext";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function Header() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const { logout } = useAuth();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box
      style={{
        width: "100%",
        height: "72px",
        boxShadow: "0 0px 4px 0 rgba(0,0,0,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 40px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="avatar" src="/icons/avatar.svg" />
        </IconButton>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography
              sx={{ textAlign: "center" }}
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
