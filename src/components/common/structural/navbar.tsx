import React, { useState } from 'react'

import MenuIcon from '@mui/icons-material/Menu'
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
  useTheme,
  Avatar,
} from '@mui/material'
import Link from 'next/link'

import { FlexBox } from '../generic/flexbox.styled'

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const theme = useTheme()
  const drawerWidth = 240
  const navItems = [
    { label: 'Model', path: '/model' },
    { label: 'About', path: '/about' },
    { label: 'Add Rules', path: '/rules', variant: 'outlined' },
  ]

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <Link href="/" passHref>
          SGR
        </Link>
      </Typography>
      <Divider />
      <List>
        {navItems.map(({ label, path }) => (
          <Link key={label} href={path} passHref>
            <ListItem key={label} disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" position="sticky" color="inherit">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            p: 1,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" fontWeight="bold" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link href="/">
              <Avatar alt="Remy Sharp" variant="rounded" src="/assets/dsp-project-logo.jpeg" sx={{ width: 58, height: 58 }} />
            </Link>
          </Typography>
          <FlexBox sx={{ display: { xs: 'none', sm: 'flex', gap: 50 } }}>
            {navItems.map(({ label, path, variant = 'text' }) => (
              <Link key={label} href={path}>
                <Button
                  variant={variant}
                  key={label}
                  size="large"
                  color="warning"
                  sx={{
                    fontWeight: 900,
                  }}
                >
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}
