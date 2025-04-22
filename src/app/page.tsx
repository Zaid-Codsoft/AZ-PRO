import { Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container maxWidth="lg">
      {/* Hero Section */}
      <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Our Business
        </Typography>
      </Box>

      {/* Content Sections */}
      {[1, 2, 3, 4, 5].map((section) => (
        <Box 
          key={section}
          sx={{ 
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            py: 4
          }}
        >
          <Typography variant="h3" gutterBottom>
            Section {section}
          </Typography>
          <Typography variant="body1" paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Typography>
          <Typography variant="body1" paragraph>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum.
          </Typography>
        </Box>
      ))}
    </Container>
  );
} 