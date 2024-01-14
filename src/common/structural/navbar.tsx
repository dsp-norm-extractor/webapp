import React, { useState } from "react"
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  styled,
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import Link from "next/link"
import FlexBox from "../generic/flexbox"

const drawerWidth = 240
const navItems = [
  { label: "Data", path: "/data" },
  { label: "About", path: "/about" },
  { label: "apitest", path: "/apitest" },
  { label: "Add New Rules", path: "/addrules", variant: "contained" },
]

const StyledAppBar = styled(AppBar)({
  background: "#5a617f", // Customize your background color here
})

const StyledTypography = styled(Typography)({
  flexGrow: 1,
  display: { xs: "none", sm: "block" },
})

const StyledButton = styled(Button)({
  color: "#fff",
})

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{ my: 2 }}>
        <Link
          href="/"
          passHref>
          SGR
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ label, path }) => (
          <Link
            key={label}
            href={path}>
            <ListItem
              key={label}
              disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <StyledAppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <StyledTypography
            variant="h6"
            fontWeight="bold">
            <Link href="/">SGR</Link>
          </StyledTypography>
          <FlexBox gap={2}>
            {navItems.map(({ label, path, variant }) => (
              <Link
                key={label}
                href={path}>
                <StyledButton
                  key={label}
                  variant={variant}>
                  {label}
                </StyledButton>
              </Link>
            ))}
          </FlexBox>
        </Toolbar>
      </StyledAppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}>
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
