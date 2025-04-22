'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  AppBar, 
  Toolbar, 
  Container, 
  Box, 
  IconButton, 
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: 'none',
  transition: 'all 0.3s ease-in-out',
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem 0',
});

const NavLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
  margin: '0 1rem',
  fontWeight: 500,
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

const HamburgerButton = styled(motion.button)(({ theme }) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '30px',
  height: '24px',
  '& span': {
    display: 'block',
    width: '100%',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '3px',
    transition: 'all 0.3s ease-in-out',
  },
}));

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const menuItems = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Services', href: '/services' },
    { text: 'Contact', href: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          transition={{ duration: 0.3 }}
        >
          <StyledAppBar position="fixed">
            <Container maxWidth="lg">
              <StyledToolbar>
                <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
                  <img src="/logo.png" alt="Logo" style={{ height: '40px' }} />
                </Box>
                
                {isMobile ? (
                  <>
                    <HamburgerButton
                      onClick={toggleDrawer}
                      animate={isDrawerOpen ? "open" : "closed"}
                      variants={{
                        open: {
                          rotate: 180,
                          transition: { duration: 0.3 }
                        },
                        closed: {
                          rotate: 0,
                          transition: { duration: 0.3 }
                        }
                      }}
                    >
                      <motion.span
                        animate={isDrawerOpen ? "open" : "closed"}
                        variants={{
                          open: {
                            rotate: 45,
                            y: 10,
                            transition: { duration: 0.3 }
                          },
                          closed: {
                            rotate: 0,
                            y: 0,
                            transition: { duration: 0.3 }
                          }
                        }}
                      />
                      <motion.span
                        animate={isDrawerOpen ? "open" : "closed"}
                        variants={{
                          open: {
                            opacity: 0,
                            transition: { duration: 0.1 }
                          },
                          closed: {
                            opacity: 1,
                            transition: { duration: 0.3 }
                          }
                        }}
                      />
                      <motion.span
                        animate={isDrawerOpen ? "open" : "closed"}
                        variants={{
                          open: {
                            rotate: -45,
                            y: -10,
                            transition: { duration: 0.3 }
                          },
                          closed: {
                            rotate: 0,
                            y: 0,
                            transition: { duration: 0.3 }
                          }
                        }}
                      />
                    </HamburgerButton>

                    <Drawer
                      anchor="right"
                      open={isDrawerOpen}
                      onClose={toggleDrawer}
                      PaperProps={{
                        sx: {
                          width: '250px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          backdropFilter: 'blur(10px)',
                        }
                      }}
                    >
                      <List>
                        {menuItems.map((item) => (
                          <ListItem 
                            key={item.text} 
                            component={Link} 
                            href={item.href}
                            onClick={toggleDrawer}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                              },
                            }}
                          >
                            <ListItemText 
                              primary={item.text} 
                              primaryTypographyProps={{
                                color: 'primary',
                                fontWeight: 500,
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Drawer>
                  </>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {menuItems.map((item) => (
                      <NavLink key={item.text} href={item.href}>
                        {item.text}
                      </NavLink>
                    ))}
                  </Box>
                )}
              </StyledToolbar>
            </Container>
          </StyledAppBar>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Header; 