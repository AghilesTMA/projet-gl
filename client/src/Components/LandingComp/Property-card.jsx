'use client';

import { Card, CardContent, CardMedia, Typography, Box, IconButton, Chip } from '@mui/material';
import { Favorite, Hotel, Bathroom, AspectRatio } from '@mui/icons-material';
import PropTypes from 'prop-types';

export function PropertyCard({ price, title, location, beds, baths, area, image }) {
  return (
    <Card sx={{ position: 'relative', height: '100%' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={image}
          alt={title}
        />
        <Chip
          label="POPULAR"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            bgcolor: '#ff4d4f',
            color: 'white',
            fontWeight: 'bold',
          }}
        />
        <IconButton
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bgcolor: 'white',
            '&:hover': { bgcolor: 'white' },
          }}
        >
          <Favorite sx={{ color: '#d4d4d4' }} />
        </IconButton>
      </Box>
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" color="#1976d2" sx={{ fontWeight: 'bold', mb: 1 }}>
            ${price}<Typography component="span" color="text.secondary">/month</Typography>
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Hotel fontSize="small" />
            <Typography variant="body2">{beds} Beds</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Bathroom fontSize="small" />
            <Typography variant="body2">{baths} Bathrooms</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AspectRatio fontSize="small" />
            <Typography variant="body2">{area} m²</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

// Prop validation using PropTypes
PropertyCard.propTypes = {
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  beds: PropTypes.number.isRequired,
  baths: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};
