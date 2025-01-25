'use client'

import { Box, Typography, Rating } from '@mui/material'

export function Feedback() {
return (
    <Box
    sx={{
        position: 'absolute',
        bottom: '10%',
        right: '5%',
        bgcolor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        p: 2,
        borderRadius: 2,
        maxWidth: 250,
    }}
    >
    <Typography variant="h6" fontWeight="bold" gutterBottom>
        Excellent Feedbacks
    </Typography>
    <Rating value={5} readOnly sx={{ color: 'gold' }} />
    <Typography variant="body2" sx={{ mt: 1 }}>
        From 3,264 reviews
    </Typography>
    </Box>
)
}