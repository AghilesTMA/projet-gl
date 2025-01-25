'use client'

import { Avatar, Box, Card, CardContent, Typography } from '@mui/material'
import { Verified } from '@mui/icons-material'
import PropTypes from 'prop-types'

export function TestimonialCard({ name, agency, comment, image }) {
    return (
    <Card sx={{ maxWidth: 320, position: 'absolute', top: '20%', right: '45%' }}>
    <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar src={image} sx={{ width: 48, height: 48, mr: 2 }} />
        <Box>
            <Typography variant="subtitle1" fontWeight="bold">
            {name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Typography variant="body2" color="text.secondary">
                {agency}
            </Typography>
            <Verified color="primary" sx={{ fontSize: 16 }} />
            </Box>
        </Box>
        </Box>
        <Typography variant="body2">{comment}</Typography>
    </CardContent>
    </Card>
)
}

TestimonialCard.propTypes = {
name: PropTypes.string.isRequired,
agency: PropTypes.string.isRequired,
comment: PropTypes.string.isRequired,
image: PropTypes.string, // image is optional
}
