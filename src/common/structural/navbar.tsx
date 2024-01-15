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
  useTheme,
} from "@mui/material"

import MenuIcon from "@mui/icons-material/Menu"
import Link from "next/link"
import { FlexBox } from "../generic/flexbox.styled"

const drawerWidth = 240
const navItems = [
  { label: "Data", path: "/data" },
  { label: "About", path: "/about" },
  { label: "Add Rules", path: "/rules" },
]

export default function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()

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
            href={path}
            passHref>
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
      <AppBar
        component="nav"
        sx={{
          background: theme.palette.grey[900],
        }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}>
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            <Link href="/">Simple Game Rules</Link>
          </Typography>
          <FlexBox sx={{ display: { xs: "none", sm: "flex", gap: 20 } }}>
            {navItems.map(({ label, path }) => (
              <Link
                key={label}
                href={path}>
                <Button
                  variant="contained"
                  key={label}
                  sx={{
                    color: theme.palette.common.black,
                    background: theme.palette.background.default,
                    fontWeight: 800,
                    ":hover": {
                      color: theme.palette.background.default,
                      background: theme.palette.grey[800],
                    },
                  }}>
                  {label}
                </Button>
              </Link>
            ))}
          </FlexBox>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
