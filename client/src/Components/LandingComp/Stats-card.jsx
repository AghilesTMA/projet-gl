'use client';

import { Box, Typography } from '@mui/material';
import { People, Home } from '@mui/icons-material';
import PropTypes from 'prop-types';

export function StatsCard({ icon, count, text }) {
return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box
        sx={{
        bgcolor: 'primary.main',
        borderRadius: '50%',
        width: 48,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        }}
    >
        {icon === 'people' ? <People /> : <Home />}
    </Box>
    <Box>
        <Typography variant="h6" fontWeight="bold" color="primary">
        {count}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {text}
        </Typography>
    </Box>
    </Box>
);
}

StatsCard.propTypes = {
  icon: PropTypes.oneOf(['people', 'home']).isRequired, // Accepts only 'people' or 'home'
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Can be a number or a string
  text: PropTypes.string.isRequired, // Must be a string
};
